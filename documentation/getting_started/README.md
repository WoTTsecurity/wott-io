# Getting Started

Welcome to WoTT - the first step to securing your IoT devices.

## A brief overview of WoTT's services

WoTT's primary goal is to simplify and manage end-to-end security for IoT developers. 
We provide this in a number of ways:

- Simplified encryption of device communication
- Cryptographic identity (verification of access)
- Enabling the removal of hard coded credentials from web applications and firmware

You can access all these features by installing the [WoTT Agent](https://github.com/WoTTsecurity/agent) and using the [WoTT IO dash](https://dash.wott.io) to manage your devices through a simple and user-friendly interface. We'll walk you through step-by-step in setting up and installing the WoTT agent so you can start to implement hassle-free security on your IoT devices. 

Ultimately we want to give you the developers the safety of secure devices so you can integrate your projects on a multitude of platforms without the complexity of managing individual certificates or authenitication. WoTT secures your projects so that you don't have to.

## A little more on 'cryptographic' identity

Our agent handles identifying your device as well as verifying inter-device communication [1] cryptographically. What this essentially means is that the agent assigns a certificate from WoTT's own certificate authority (CA) to your device to secure it [2]. This is the cryptographic aspect of WoTT's security provisions. The agent does this based on a unique value assigned to your device which acts as an identifier to other devices. 
The purpose of this is to restrict access to trusted devices - WoTT secured devices - preventing fraudlent access and attacks. 

* [1] Done through mutual TLS (mTLS)
* [2] WoTT does this using an x509 security certificate. These certificates refresh every 7 days.

The certificates are managed entirely by WoTT - the only thing you need to do to obtain a WoTT certificate and begin securing your device is the WoTT Agent itself.

## Credentials and WoTT IO Dash

In an ideal world, we would do away with the need for usernames and passwords entirely and rely on cryptographic identity alone. However, servers cannot verify identity in browsers via cryptographic identity (yet). There is no way for example for Google to verify who you are which is why you are required to login in order to access your email or other Google account services. The same applies to Web Applications that you may develop as an IoT developer that can be accessed by any browser.

As a developer, you will likely be accessing a large range of internet/cloud services that require basic HTTP authentication; or MQTT services that are accessed via an API key. In most instances, such credentials are hard coded into applications and can be easily read with access to said application. WoTT introduces credential management in such a way you can remotely download the necessary credentials onto your device and remove the need for hard coded keys and logins from your application. This is done via our Dasboard which you can use to both view and monitor your devices as well as add and manage credentials for whatever purpose you need them for.

## Installing and setting up the WoTT Agent
