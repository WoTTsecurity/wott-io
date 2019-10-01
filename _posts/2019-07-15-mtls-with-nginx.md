---
layout: post
current: post
cover: datacenter.jpg
title: Configuring Nginx with client certificate authentication (mTLS)
date: 2019-07-15 08:00:00
category: tutorials
author: Viktor Petersson
tags: [Open Source]
class: post-template
---

#  Configuring Nginx with client certificate authentication (mTLS)

**Required Skill Level**: Medium to Expert 

**Time to complete**: 15-20 min

In this post we will walk through how to configure Nginx to support mutual TLS to authenticate a client request in 3 steps:

1. Install certificate on client
2. Set up a server
3. Whitelist client

One of the cornerstones of Zero Trust Networking is Mutual TLS (known as mTLS). In simple terms, this means that each client is required to present a certificate to talk to the server. By replacing credentials with certificates, we are able to significantly improve the security (in particular with short-lived certificates, like the ones we offer), while also making the implementation *easier* (as it removes the need for API key/credential management).

In this article we will make this all more concrete by creating a sample implementation. The sample implementation will consist of a simple Python appserver, with an Nginx reverse proxy in front of it. Nginx will reject all connections without a valid certificate, and the appserver will then compare the certificate to a whitelist of devices that are allowed to talk to the server.

## Requirements

- Server (Debian VM, Ubuntu VM, etc.)
- Client node (running on Ubuntu, Debian, Raspbian)
- [Wott Agent](https://dash.wott.io/accounts/register/) installed on client (free for 5 instances)
- Docker and Docker Compose

## Preparation

Before we begin, we first need to install the WoTT agent on both the server and client(s). You can register for a free account [here](https://dash.wott.io/accounts/register/) and find instruction on getting started [here]({{ site.url }}/documentation/getting-started).

Once you have the WoTT agent installed, we need to install both [Docker CE](https://docs.docker.com/install/linux/docker-ce/debian/) and Docker Compose (you can install Docker Compose on a Raspberry Pi by just running `apt update && apt install docker-compose`). We use these to simplify the installation, as we are able to better pin the requirements.

## Setting up the server

Let's start by setting up the server. To save you the time (and potential typos), we have created a sample repo for this, so all you need to do is to clone the repository:

```
$ git clone https://github.com/WoTTsecurity/examples.git
$ cd examples/nginx-with-mtls-and-appserver
$ docker-compose build
```

Thanks to Docker and Docker Compose, this is all we need to kick off the demo. The only final thing we need to do is to add the device that we will be connecting *from* to the whitelist. You can find out the WoTT Device ID by running `sudo wott-agent whoami` on the device you're connecting from.

With the Device ID at hand, simply run the following commands on the server:

```
$ echo "MyDeviceId.d.wott.local" >> appserver/whitelist.txt
```

We can now fire up the server by simply running:

```
$ docker-compose up
```

To test the connection from your client, we need to find out two things:

 * The IP of the server
 * The WoTT Device ID of the server


## Let's test the client

Armed with the above information, we can now turn to our trusty old friend `curl`.

First, let's try connecting without passing on our certificate:

```
$ sudo curl \
  --cacert /opt/wott/certs/ca.crt \
  --resolve 'MyServerID.d.wott.local:443:a.b.c.d' \
  https://MyServerId.d.wott.local

  <html>
  <head><title>400 No required SSL certificate was sent</title></head>
  <body>
  <center><h1>400 Bad Request</h1></center>
  <center>No required SSL certificate was sent</center>
  <hr><center>nginx/1.16.0</center>
  </body>
  </html>

```

Because we have configured Nginx to require an SSL certificate, the server will reject the connection, and you won't even be able to reach the appserver that we reverse proxy to.

If we however pass on our certificate (and key), we are able to successfully access the appserver:

```
$ sudo curl \
  --key /opt/wott/certs/client.key \
  --cert /opt/wott/certs/client.crt \
  --cacert /opt/wott/certs/ca.crt \
  --resolve 'MyServerID.d.wott.local:443:a.b.c.d' \
  https://MyServerId.d.wott.local

Access Granted!
```

## That's really cool, but what happened here?

There's a lot to unpack in what we did above, so let's start with the client and work our way forward.


### Client

Let's break down the `curl` command we used to successfully connect to the server.

These two lines tell `curl` to send the client certificate and key.
```
  --key /opt/wott/certs/client.key
  --cert /opt/wott/certs/client.crt
```
This is our cryptographic identity provided by WoTT. In short, this replaces the need for a username and pasword. It should however be said that the key is not sent to the server (unlike a password), but rather it is used for a cryptographic challenge (vastly simplified).

Next, we need to tell `curl` to use the WoTT CA certificate to verify the remote server against (since WoTT is not a public CA):

```
  --cacert /opt/wott/certs/ca.crt
```

Lastly, we use a neat little feature in `curl` to tell it to map 'MyServerID.d.wott.local' to an IP address. We could instead have added this to our `/etc/hosts` file, but this is a quicker workaround when testing.

```
  --resolve 'MyServerID.d.wott.local:443:192.168.X.Y'
```


### Nginx

Let's move on to Nginx. We use Nginx as a reverse proxy for the appserver that we will cover below. We do this for a few reasons. The first reason is simply because Nginx is battle tested and does the first level of screening. If for instance, the client fails to present a valid certificate, the request will not be forwarded to the appserver. Hence this is a nice safety net from possible bugs in the appserver code.

In this particular example, we also terminate the TLS connection in Nginx. Should we want to improve security further (and adopt proper Zero Trust Networking), we could encrypt the traffic Nginx and the appserver too (even if they are on the same host in this case).

If the certificate is valid, Nginx will then reverse proxy the connection to the appserver.

The Nginx configuration is fairly straight forward and can be found [here](https://github.com/WoTTsecurity/examples/blob/master/nginx-with-mtls-and-appserver/nginx/reverse-proxy.conf). The most noteworthy lines in the configuration are these:

```
# This will return a 403 to all clients without a proper certificate
if ($ssl_client_verify != "SUCCESS") { return 403; }

# This tells Nginx what CA to verify against
ssl_client_certificate /opt/wott/certs/ca.crt;

# This tells Nginx to verify clients
ssl_verify_client on;
```

In theory, we could extend this further and write a [LUA script](https://github.com/openresty/lua-nginx-module#readme) to do further validation, and even incorporate the whitelisting that we will get to in the appserver section, but that's something for another day.

### Appserver

Assuming the client passed all validations, the request will be passed on to the appsever. The [appserver](https://github.com/WoTTsecurity/examples/blob/master/nginx-with-mtls-and-appserver/appserver/app.py) is a simple Flask app. In essence, all it does is to provide some validations on the headers. Since Nginx will pass on various HTTP Headers to the appserver, we can use them to implement access control.

When a request hits the appserver, it will check the HTTP header `Ssl-Client-Verify` is set to 'SUCCESS'. If it isn't, the request will be rejected with an error message. In theory, this shouldn't be possible, since Nginx should never forward such request, but when it comes to security it's better to be safe than sorry.

Assuming the above condition is correct, the appserver will parse the Client ID (from the 'Ssl-Client' header) and compare it to a whitelist (`whitelist.txt` from above). The whitelist is a simple text file with one Device ID per line. Only if the Client ID (i.e. the WoTT Device ID) matches a record in the whitelist, the appserver will return "Access Granted!".


## Conclusion

Hopefully you found this tutorial useful in illustrating a cornerstone of Zero Trust Networking - mTLS. With a relatively small amount of code we can implement better security in a real-world setting. For more mTLS use cases or for a better understanding of Trust Scoring in Zero Trust Networking checkout [wott.io](https://twitter.com/wottsecurity).

If you have any questions, please get in touch with us on [Twitter](https://twitter.com/wottsecurity) or open a Github Issue if you found any issues.
