---
layout: docs-cat
description: 'Use cases and examples for WoTT Agent and Dashboard'
title: 'Use Cases and Examples for WoTT After Setup'
full_description: Some use cases and examples for the WoTT Agent and Dashboard that you can use for inspiration as well as to help you get to grips with our services and secure your IoT devices.
title_content: 'Use Cases and Examples'
redirect_from: 
    - /documentation/setup
---

## How to use WoTT

Now that you have the WoTT Agent installed on your device(s), you're ready to use our certificates and credential manager for your projects. Recall that these two services have different purposes regarding your projects and what you hope to achieve. 

If you have active projects that utilise security and wish to experiment with WoTT's capabilities by yourself, here are some pointers to keep in mind:

* The WoTT directory on your device is only accessible by `sudo` group users
* The file path for WoTT information you call is in the form of `/opt/wott`
* WoTT CA issues certificates are x509 and are downloaded as a `.crt` file into this path `/opt/wott/certs`
* The certificates refresh every 7 days - you will need to account for this in your projects
* Credentials are downloaded as JSON files into this path `/opt/wott/credentials`
* WoTT fetches information via daemon every 15 minutes

If you need a refresher on credentials, refer back to the 'Getting Started' page. Otherwise, you are now all set up to use WoTT in your own applications. If you need any assistance, we have a [support thread](https://www.raspberrypi.org/forums/viewtopic.php?f=41&t=243538) where you can interact directly with our developers and contributors alike. 

Join the discussion and let's move forward together with making IoT more secure.

## Some use cases to inspire your projects

If you do not have any specific projects in mind; or are downloading WoTT to test our services out, then you can refer to some of our pre-written examples below to give you an idea of scenarios where you can use our Agent. 

Many of these examples include using WoTT to secure connections with popular cloud platforms like Google Cloud or Adafruit IO with more use cases constantly being developed and added.

**Note:** all these examples can be found on our [Github](https://github.com/WoTTsecurity/agent). If you have a platform in mind that we do not have a guide for, please suggest it on the support thread- or request to add it to our repository; we're open-source after all and welcome contributors.

Our use cases can be divided into certificate managed or credential managed examples as both are required for different functionalities. We'll separate them below for clarity. As a general rule, certificate managed examples tend to be a bit trickier. Once again, please go to our support thread if you need any help.

### Certificate managed examples

Many of the IoT cloud service examples use MQTT, a lightweight messaging protocol to publish/subscribe messages. This is ideal for unreliable network connections or high-latency environments (as can be with IoT devices) but is typically not encrypted and uses TCP transport protocols by default. 
WoTT uses mTLS which runs over the TCP layer. In essence, mTLS establishes a handshake and only allows connectivity if the handshake is successful (certificates are accepted).

#### [Google Core IoT]({{site.url}}/blog/tutorials/2019/06/14/google-core-iot)

Google Cloud Platform provides services that developers can use. Here we show you how to set up your WoTT Agent device and enroll it to your Google Cloud project to communicate with Google's services. Includes Google's MQTT example. 

#### [A Simple WebApp]({{site.url}}/blog/tutorials/2019/06/16/simple-webapp)

You will need two WoTT Agent devices: one acting as server, one as client. This example uses the concept of WoTT's cryptographic identity to verify devices and verify connection. We've included a very somple WebApp for the example, but the principle applies to any WebApp that you develop yourself- just ensure you do the correct setup as illustrated in the guide.

#### [Configuring Nginx with Client Certificate Authentication (mTLS)]({{site.url}}/blog/tutotrials/2019/07/15/mtls-with-nginx)

One of our harder examples. Nginx is a web server with several other useful functions including reverse proxy. For this example, you will need two WoTT Agent devices: one as the server and one as the client. We recommend a Debian and Raspberry Pi. Here we use certificates as a means to verify browser access (note current browser only verify the server) to a server run by Nginx using their reverse proxy capabilitites.

#### [Securing Access to Mosquitto Brokered MQTT Client and Server]({{site.url}}/blog/tutotrials/2019/07/15/mosquitto-mqtt)

Although this example does not technically use certificates, it still relies on cryptographically identifying devices through their unique WoTT ID. Mosquitto is a popular borker for the MQTT protocol with several inbuilt functions that allow for security conifguration to protect the server from fradulent or malicious access. Here you will need two WoTT Agent devices, one acting as server and the other as client. We'll show you how to use WoTT's unqiue ID to prevent access to secure access to a server without the need for a username and password.


### Credential managed examples

There are still many cases where we cannot verify a device's access rights through certificates alone. Securing browser accessible apps and some IoT cloud services require authentication. Our credential service is here so you can manage this from the WoTT Dashboard. You will need to have an account with WoTT for the following examples.

#### [Simple WebApp with Basic HTTP Auth access]({{site.url}}/blog/tutorials/2019/06/18/simple-webapp-auth)

Uses a similar WebApp to the certificate authenticated app but uses HTTP Basic Authentication instead which can be thought of as a typical login. A WoTT Agent device acts as a server and we show you how to use credentials to add login details for browser access.

#### [Using WoTT credentials to manage Adafruit IO access through an MQTT Client]({{site.url}}/blog/tutorials/2019/06/27/adafruit-io)

Adafruit IO is a service provided by Adafruit that concerns itself with simplifying the presentation and usage of data for IoT devices. To access Adafruit IO feeds within your own applications, you need your Adafruit IO username and access AIO key. This example shows how to store those credentials securely in WoTT and call the credentials to secure access to the feed within a Python 3 application.

#### [Managing access to Screenly OSE via HTTP authentication with WoTT authentication]({{site.url}}/blog/tutorials/2019/06/25/screenly-ose)

Screenly OSE is a free digital signage platform. Access to Screenly OSE's management page can be secured with HTTP authentication via a login with a username and password. This example shows how to use WoTT dash to create and store these access credentials. These credentials can then be used within Screenly OSE.

## Final notes and thanks

Firstly from all of us, thank you for using WoTT. 

While IoT has been a major revolution of the modern day lifestyle, from our homes to supermarkets; it poses a very real and exploitable security threat- but it doesn't need to. Through these examples, we hope you can see how easy it is to use WoTT to secure your projects so that you can be confident going forward as developers in the global phenomenom that is IoT. 

At WoTT, we are a community of security-minded individuals and we value your contributions as the developers that use our product. We therefore encourage you to interact with us on our support thread and Github so that we can build a more secure IoT future together.