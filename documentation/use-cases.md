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

If you have active projects that utilize security and wish to experiment with WoTT's capabilities by yourself, here are some pointers to keep in mind:

* The WoTT directory on your device is only accessible by `sudo` group users
* The file path for WoTT information you call is in the form of `/opt/wott`
* WoTT CA issues certificates are x509 and are downloaded as a `.crt` file into this path `/opt/wott/certs`
* The certificates refresh every 7 days - you will need to account for this in your projects
* Credentials are downloaded as JSON files into this path `/opt/wott/credentials`
* WoTT fetches information via daemon every 15 minutes

If you need a refresher on credentials, refer back to the [Getting Started guide]({{site.url}}/documentation/getting-started). Otherwise, you are now all set up to use WoTT in your own applications. If you need any assistance, we have a [support thread](https://www.raspberrypi.org/forums/viewtopic.php?f=41&t=243538) where you can interact directly with our developers and contributors alike.

Let's move forward and together make edge devices more secure.

## Some use cases to inspire your projects

If you do not have any specific projects in mind; or are downloading WoTT to test our services out, then you can refer to some of our pre-written examples below to give you an idea of scenarios where you can use our Agent.

Many of these examples include using WoTT to secure connections with popular cloud platforms like Google Cloud or Adafruit IO with more use cases constantly being developed and added. If you have a platform in mind that we do not have a guide for, please suggest it on the support thread- or request to add it to our repository yourself; we're open-source after all and welcome contributors.

Our use cases can be divided into certificate managed or credential managed examples as both are required for different functionalities. We'll separate them below for clarity. As a general rule, certificate managed examples tend to be a bit trickier. Once again, please go to our support thread if you need any help.

### Certificate managed examples

* [Google Core IoT]({{site.url}}/blog/tutorials/2019/06/14/google-core-iot)
* [A Simple WebApp]({{site.url}}/blog/tutorials/2019/06/16/simple-webapp)
* [Configuring Nginx with Client Certificate Authentication (mTLS)]({{site.url}}/blog/tutorials/2019/07/15/mtls-with-nginx)
* [Securing Access to Mosquitto Broker]({{site.url}}/blog/tutorials/2019/07/15/mosquitto-mqtt)
* [Connecting Edge IoT Devices to a Kubernetes Cluster]({{site.url}}/blog/tutorials/2019/07/18/edge-to-kubernetes)
* [Securing Access to Mosquitto Broker from Paho Client]({{site.url}}/blog/tutorials/2019/07/19/paho-mqtt)


### Credential managed examples

* [Simple WebApp with Basic HTTP Auth access]({{site.url}}/blog/tutorials/2019/06/18/simple-webapp-auth)
* [Using WoTT credentials to manage Adafruit IO access through an MQTT Client]({{site.url}}/blog/tutorials/2019/06/27/adafruit-io)
* [Managing access to Screenly OSE via HTTP authentication with WoTT authentication]({{site.url}}/blog/tutorials/2019/06/25/screenly-ose)

## Final notes and thanks

Firstly from all of us, thank you for using WoTT.

While IoT has been a major revolution of the modern day lifestyle, from our homes to supermarkets; it poses a very real and exploitable security threat- but it doesn't need to. Through these examples, we hope you can see how easy it is to use WoTT to secure your projects so that you can be confident going forward as developers in the global phenomenom that is IoT.

At WoTT, we are a community of security-minded individuals and we value your contributions as the developers that use our product. We therefore encourage you to interact with us on our support thread and Github so that we can build a more secure IoT future together.
