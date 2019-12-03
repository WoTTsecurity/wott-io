---
layout: post
current: post
cover: some-coding.jpeg
title: Using WoTT to secure a simple Python 3 WebApp
date: 2019-06-16 17:00:00
category: tutorials
author: Fiona McAllister
tags: [open-source]
class: post-template
---

# A simple WebApp example

## Introduction

In the following example, we'll walk you through how to secure a simple WebApp using WoTT.

Before you begin, you need two devices with the [WoTT Agent installed](https://github.com/WoTTsecurity/agent). This can be a combination of devices that are either a Raspberry Pi or a desktop running a Debian distribution of Linux.

You will also need to have our [examples](https://github.com/WoTTsecurity/examples) repository cloned onto your devices. To do this:

```
$ git clone https://github.com/WoTTsecurity/examples.git
```
Alternatively, you can use `curl` to download only the relevant files.

The first thing that we need to do is to setup a simple Python WebApp on a Raspberry Pi/Debian machine.

## Setting up the WebApp

Using `curl`, you can do the following:

```
$ apt update && apt install -y python3 python3-pip curl
$ mkdir ~/wott-webapp-example
$ cd ~/wott-webapp-example
$ curl -o app.py https://raw.githubusercontent.com/WoTTsecurity/examples/master/simple-webapp/app.py
$ curl -o requirements.txt https://raw.githubusercontent.com/WoTTsecurity/examples/master/simple-webapp/requirements.txt
$ pip3 install -r requirements.txt
$ python3 app.py
```
If you have the examples repository cloned, navigate to the directory which it is in and do the following instead:

```
$ apt update && apt install -y python3 python3-pip curl
$ cd examples
$ cd simple-webapp
$ pip3 install -r requirements.txt
$ python3 app.py
```

You now have a very simple webserver running on your Raspberry Pi. We can test it by running the following in another terminal session:

```
$ curl http://localhost:8080
Hello from WoTT!
```

However this webserver is insecure- the traffic to it is fully unencrypted. When communicating within the same device, this isn't a major security problem; but as soon as the communication leaves the local device (such as over the network, or even worse, over the internet), this becomes a big problem. It's then prone to a number of attacks, such as eavesdropping and impersonation attacks.

To solve this, we can secure this service using the WoTT agent. To do this, we can either create a tunnel between the agent and server, or use the WoTT certificates directly in the client (such as in `curl`). In this example, we'll opt for the former option (i.e. a tunnel).

## Setting up the server

While still leaving the session with our WebApp running, run the following command in a separate terminal:

```
$ ghostunnel server \
    --listen 0.0.0.0:${LISTEN_PORT:-8443} \
    --target 127.0.0.1:${TARGET_PORT:-8080} \
    --keystore "/opt/wott/certs/combined.pem" \
    --cacert "/opt/wott/certs/ca.crt" \
    ${CONNECTION_POLICY:---allow-all} $@
```

This will create a secure reverse proxy that redirects incoming traffic on port 8443 to the WebApp we started earlier in the first session (listening at localhost:8080). This will also automatically secure the service using mTLS. Hence, this means that not only is the connection encrypted and secure, it also doubles as a replacement for credentials since we can cryptographically identify the device making the request.

By default, the example will allow all clients with a valid certificate signed by WoTT to make connections to the device. If we want to lock down the service further, we can for set a policy such that only a given device can access it using the same ghostunnel command as above but replacing `$ {CONNECTION_POLICY:---allow-all} $@` with :

```
$ {CONNECTION_POLICY=--allow-cn=GivenDeviceID.d.wott.local} $@

```
**Note:**
If you are being denied permissions, use `sudo` before starting the ghostunnel.

## Setting up the client

With the server up and running, we can now move on to the client. This should be *another* device (either Raspberry Pi, or a desktop running Debian).

In order to connect to the server, we need to know the following:

* The IP of the device running the server
* The WoTT ID of the server (you can get this by running `wott-agent whoami` or by checking your (WoTT Dashboard)[dash.wott.io] if you have it registered)

Once we have this information, all we need to do is to start the client by running:

```
$ ghostunnel client \
    --listen 127.0.0.1:${LISTEN_PORT:-8080} \
    --target MY_IP:${TARGET_PORT:-8443} \
    --override-server-name=ServerDeviceID.d.wott.local \
    --keystore "/opt/wot/certs/combined.pem" \
    --cacert "/opt/wott/certs/ca.crt"
```

Inserting your the IP Address of the server which you can get by running`ip addr show` or `ip route get 8.4.4.3`.
Use the server WoTT device ID in place of `ServerDeviceID`.

Assuming you don't get any errors, there should now be an established secure tunnel between the client and server. The client is now proxying any request coming in on 127.0.0.1:8080 securely to the remote server (using mTLS).

To verify this, we can now make the same request as we did above using `curl` and get the same result:

```
$ curl http://localhost:8080
Hello from WoTT!
```

## Closing notes

We have now proven how easy it is to setup a secure connection between two devices using WoTT. The WebApp above can simply be replaced with any other application. Just be mindful of that you should always bind your WebApp to localhost to prevent it from being exposed to the world insecurely.
