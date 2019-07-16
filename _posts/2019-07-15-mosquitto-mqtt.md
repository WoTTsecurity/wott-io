---
layout: post
current: post
cover: Image_5.png
title: Using WoTT to Cryptographically Secure Access Between a Mosquitto Brokered MQTT Client and Server
date: 2019-07-15 17:00:00
category: tutorials
author: Fiona McAllister
tags: [Open Source]
class: post-template
---

# Using WoTT to Secure Access to a Mosquitto MQTT Server

## Introduction 

Mosquitto is a lightweight message broker for MQTT. MQTT itself is a pub-sub messaging protocol that is particularly popular amongst IoT applications due to its optimisation for high-latency networks. Together, they are effective for IoT usage being low-power to run and adding a layer of security to IoT devices. 
By default the connection between a Mosquitto run client and server is unencrypted. Mosquitto does have provisions for securing messages between client and server that are very easy to configure- though most of these options involve a password file.

Here we'll look at using WoTT's unique device ID to authenticate and secure access for a Mosquitto brokered MQTT protocol essentially identifying the devices cryptographically removing the need for usernames and passwords. Keeping passwords in a system like this can be dangerous particularly when used without TLS as anyone with access to the network can potentially find the password. As you can imagine, this is a huge breach in security. We circumvent this by using identity to secure this instead.
This example looks at publishing messages to a temperature topic hosted by the Mosquitto server.

You will need two WoTT devices with the [WoTT Agent]({site.url}/documentation/getting-started) installed. We recommend that at least one of these is a Debian machine for the server (although two Pis is fine).

For this example, you will need Docker CE and therefore a distribution of Raspbian or Debian. Installation instructions for Docker [here](https://docs.docker.com/install/linux/docker-ce/debian/).
Installation of Docker CE is a different on Rasbperry Pis. More information is in the Docker installation link above.

We will also be asking you to clone our code snippets repository from Github, so ensure you have `git` on your system. Otherwise you can opt to use `curl` to manually clone the required files. For this tutorial, we will assume you have cloned our repo.

**Note:** while not required, familiarity with Mosquitto config files may also be helpful. If not, don't worry; but we encourage you to play around with our included files.

## Getting set up

Before we start, please clone our [repository](https://github.com/WoTTsecurity/examples) with WoTT's example code snippets onto your devices:

```
git clone https://github.com/WoTTsecurity/examples.git
```
If you navigate inside this folder, you will find a few folders. For this example we are interested in 'mosquitto-client' and 'mosquitto-server.'

Alternatively, you can download the files needed using `curl` followed by the raw output of the files if you prefer. In this case download the client files on the client device and server files on the server device. 

If you are using a Debian machine and a Rasberry Pi, we reccommend setting up your server on the Debian machine with the Pi acting as the client as this will be the most common form of setup.

We will now break down the tutorial into client and server.

## Setting up the server

First, we need to set up and establish our server with Mosquitto. For this we will need a Mosquitto configuration file. Information regarding set up of the [configuaration files](https://mosquitto.org/man/mosquitto-conf-5.html) is readily available if you wish to peruse through this yourself. Assuming you have the repository cloned, navigate to the directory on your server device (if you have a Debian machine and a Pi, the Debian machine):

``` 
$ cd examples
$ cd mosquitto-server
```
running `ls` you will notice there are 3 files including a 'mosquitto.conf' file. This contains the information we need to set up our Mosquitto server. By default we have the `acl_file` enabled. This is to secure access to the server later, however if you want to test this without the ACL configured, just find and comment out this line in the config:

```
acl_file /mosquitto/config/permission.acl
```

This means that all messages to the server are accepted. This may be useful to you for testing when establishing connection between your devices although we reccommend keeping the file as is. 

In this example, we provide the ACL file for you to configure with WoTT Device details to secure this. This file is in the same directory as `permissions.acl.`
Open this in your favourite text editor. You will notice it is filled with comments. Each block refers to a type of permissions you can associate with a device followed by the topic that you are giving permissions for. For this example, our messaging topic is `wott/temperature` and can receive messages of temperature. 

Replace the relevant fields with the details of your specific WoTT device. If you do not know the Device ID of your devices, simply run the following command:

```
$ sudo wott-agent whoami
```
This will print the unique ID of your device. Remember to use the correct subscribing/publishing device for your purposes. For this example, feel free to use the first block to give read and write permissions to your publishing device (the device *sending* messages); or assign it write only permissions (this is technically the most secure option). Give permissions to the subscribing device as well. With the ACL set up, you can now start up your server with the third file in the directory, a simple bash script `run.sh`. In the same directory: 

```
$ ./run.sh
```
You should get an output similar to this :

```
1563214210: mosquitto version 1.6.3 starting
1563214210: Config loaded from /mosquitto/config/mosquitto.conf.
1563214210: Opening ipv4 listen socket on port 8883.
1563214210: Opening ipv6 listen socket on port 8883.
```
**Note:** you may need to prefix with `sudo` if your permissions are denied. If it still does not work, ensure the file is executable.

The server is now up and running. We can now move onto the client.

## Connecting the client

On your client device, assuming you have our examples repository downloaded, navigate to the following:

``` 
$ cd examples
$ cd mosquitto-client
```
There are 3 files of note in this directory, `pub.sh`, `sub.sh`, and, `Dockerfile`. You do not need to alter any of these files at all for this example. There is an additional `README.md` file containing client set up instructions although these are also contained in this document. If you choose to use these files in the future, you can refer to the `README` instead of ths this tutorial for quick reference. 

We will familiarise you with the files in the meantime for this tutorial.

### Subscribing 

First, we need to set up the Docker container with the Dockerfile. The file contains installation instructions for the Mosquitto client so you do not have to install it manually. Ensure you are in the correct directory `mosquitto-client`.

```
$ sudo docker build . -t wott-mqtt-client
```
The key thing this has done is created the topic `wott/temperature` which we will be publishing/subscribing to.

Now, to set up the subscriber in the same terminal instance:

```
$ export MQTT_SERVER_WOTT_ID=ServerDeviceID.d.wott.local
$ export MQTT_SERVER_IP=Server_inet_IP
$ sudo docker run -ti --rm \
    -e MQTT_SERVER=$MQTT_SERVER_WOTT_ID \
    --add-host $MQTT_SERVER_WOTT_ID:$MQTT_SERVER_IP \
    -v /opt/wott/certs:/opt/wott/certs:ro \
    wott-mqtt-client
```
If you do not know your IP address, you can obtain this through `ip addr show` or `sudo ifconfig` and the value corresponds to the `inet` value. Alternatively, you can get the value for the specific port you are using (in this case port 8883) through `ip route get 8.8.8.3`. Make sure you do this on your *server* device.

The subscriber should now be running. As there are no messages being published, you will not see anything on the terminal yet. To end the process use `CTRL + C`.

### Publishing

With the subscriber running, in a new instance of terminal; run the following:

```
$ export MQTT_SERVER_WOTT_ID=ServerDeviceID.d.wott.local
$ export MQTT_SERVER_IP=Server_inet_IP
$ sudo docker run -ti --rm \
    -e MQTT_SERVER=$MQTT_SERVER_WOTT_ID \
    --add-host $MQTT_SERVER_WOTT_ID:$MQTT_SERVER_IP \
    -v /opt/wott/certs:/opt/wott/certs:ro \
    wott-mqtt-client /pub.sh
```

You will get an output that looks something like this:

```
Sending temperature 40
Sending temperature 18
Sending temperature 42
Sending temperature 33
Sending temperature 3
[...]
```

This instance is publishing temperature data to the `wott/temperature` topic. To confirm this, check the subscriber terminal window now. If the ACL has been configured correctly, you will see the following:

```
wott/temperature 40
wott/temperature 18
wott/temperature 42
wott/temperature 33
wott/temperature 3
[...]
```

You can also check the terminal running the server on the server device to see the connections from the client.
And that's it. You have successfully set up a Mosquitto brokered MQTT server and client. 

To stop the publisher, you will need to stop the Docker container itself, `CTRL + C` will not work. To do so:

```
$ sudo docker container ps

CONTAINER ID        IMAGE               COMMAND                  [...]
8bfe61edb3bd        wott-mqtt-client    "/pub.sh"                [...]

[...]
```
You're looking for the Docker container that has the same `IMAGE` and `COMMAND` details as the above as it corresponds to the process containing the publisher. There may also be other containers running such as the subscriber. 

Copy the Container ID of the publisher and run:

```
$ sudo docker stop Container_ID_of_publisher
``` 
This should stop the process. To confirm, just check the terminal with the publisher and it will no longer be publishing data. It may take up to a few seconds. 

## Finishing Notes

Mosquitto is a very convenient way of managing MQTT messages with inbuilt features that promote security. Hopefully we've shown how easy it is to use WoTT to secure a Mosquitto server and client based off our unique ID that we assign to each WoTT device. 

Of course, our example code snippets are just that: an example; so feel free to experiment and augment the code as you see fit. We encourage you to go through our examples and change configurations and files for your needs. There's much more to Mosquitto than we have included in this example, so check out the [Mosquitto website](https://mosquitto.org) for more information. 