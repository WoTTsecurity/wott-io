---
layout: docs-cat
description: 'Getting started with WoTT'
title: 'Getting Started with the WoTT Agent and Dashboard'
full_description: We'll take you from startup to installation of the WoTT Agent and registering for the Dashboard so you can begin integrating security into your IoT devices.
title_content: 'Getting Started'
redirect_from:
  - /getting-started-1
  - /getting-started
  - /blog/categories/getting-started
---

Welcome to WoTT - the first step to securing your IoT devices.

## A brief overview of WoTT's services

WoTT's primary goal is to simplify and manage end-to-end security for IoT developers. 
We provide this in a number of ways:

* Simplified encryption of device communication
* Cryptographic identity (verification of access)
* Enabling the removal of hard coded credentials from web applications and firmware

You can access all these features by installing the [WoTT Agent](https://github.com/WoTTsecurity/agent) and using the [WoTT Dashboard](https://dash.wott.io) to manage your devices through a simple and user-friendly interface. We'll walk you through step-by-step in setting up and installing the WoTT agent so you can start to implement hassle-free security on your IoT devices. 

Ultimately we want to give you the developers the safety of secure devices on the internet so you can integrate your projects on a multitude of platforms without the complexity of managing individual certificates or authenitication. WoTT secures your projects so that you don't have to.

## A little more on 'cryptographic' identity

Our lightweight agent handles identifying your device as well as verifying inter-device communication cryptographically [1]. What this essentially means is that the agent assigns a certificate from WoTT's own certificate authority (CA) to your device to secure it [2].
The agent does this based on a unique value assigned to your device which acts as an identifier to other devices. The purpose of this is to restrict access to trusted devices preventing fraudlent access and attacks. 

* [1] Done through mutual TLS (mTLS)
* [2] WoTT does this using an x509 security certificate. These certificates refresh every 7 days.

The certificates are managed entirely by WoTT - the only thing you need to do to begin securing your device is install the WoTT Agent.

## Credentials and the WoTT Dashboard

In an ideal world, we would do away with the need for usernames and passwords entirely and rely on cryptographic identity alone. However, servers cannot verify identity from browsers via cryptographic identity (yet). Servers are unable to verify who you are which is why you are required to login to access for example your email or Google cloud services. The same applies to Web Applications that you as an IoT developer create which can be accessed from any browser.

As a developer, you will likely be accessing a large range of internet/cloud services that require basic HTTP authentication or an API key. In most instances, such credentials are hard coded into applications and can be easily read with access to said applications. WoTT introduces credential management so that you can remotely download the necessary credentials onto your device as a JSON file. This removes the need for hard coded keys and logins from your application. 

We do this via our Dasboard which you can use to monitor your devices. The Dashboard gives your device a trust score (based on how secure it is) as well as giving you the means to add and manage credentials for whatever purpose you need them for.

## Installing the WoTT agent and claiming your device

First, create an account for the [WoTT Dashboard](https://dash.wott.io) and login - you will need this to claim your device later.

Currently, the Agent is only available to Debian package distributions such as Raspbian (for Pi) or Debian. You will also need to have `curl` installed.

To install the agent, run the following in terminal:

```
$ curl -s https://packagecloud.io/install/repositories/wott/agent/script.deb.sh | sudo bash
$ sudo apt install wott-agent
```
The terminal will now output your WoTT Device ID, claim token, and a link to claim the device. 
Copy and paste this link into your browser- the fields may already have autofilled. Otherwise fill in the details in the relevant fields.

{% asset docs/claim-device.png srcset:width="1300 2x" srcset:width="650 1x" alt="Claim device on WoTT Dashboard" class="img-fluid" %}

**Note:** you can view your Device ID and claim token using the following commands as well:

```
$ wott-agent whoami
$ wott-agent claim-token
```
Your device will now be registered and viewable on the WoTT Dashboard. You can now see the relative trust scores of your devices. To see device specific information, select it and add appropriate tags to these devices (this is relevant for credential management).

See below for an example of a Raspberry Pi with its WoTT meta tags (automatically assigned based on hardware) and the user's personal tags for the Pi's purpose.

{% asset docs/rasbpi-profile.png srcset:width="1300 2x" srcset:width="650 1x" alt="Raspberry Pi example profile" class="img-fluid" %}

## Managing your own credentials through the WoTT Dashboard

In scenarios where you might require API keys or logins for your applications, you can add and manage these credentials to the WoTT Dashboard. On the left of WoTT Dashboard is a sidebar.

{% asset docs/sidebar.png srcset:width="1300 2x" srcset:width="650 1x" alt="WoTT Dashboard sidebar" class="img-fluid" %}

Navigate to 'Credentials.' Select 'Add a credential'

{% asset docs/credentials.png srcset:width="1300 2x" srcset:width="650 1x" alt="WoTT Credentias menu" class="img-fluid" %}

Let's break down the fields:

* **Name:** name of credential file, for example `my_app`. 
* **Key:** contents of credential, for example: `api_key`, `login_details`, or simply `credentials`.
* **Value:** actual value of the login/key required for access (the bit that should be hidden). This should be done in `username:password` format for a login.
* **Owner:** optional field, reccommended for Raspberry Pis. The owner is the Linux user that will own the file on the system. On Raspberry Pi, the default user is `pi`.
* **Tags:** must match the tags on the device that you are downloading to.

Once you've added a credential, you can check for it on your device by running:

```
$ cat /opt/wott/credentials/NAME.json
```
Note that you will either have to wait 15 minutes for the WoTT agent to refresh or restart it immediately with:
```
$ sudo service wott-agent restart
```
Additionally, older Pi hardware may take longer to load these certificates, so do wait a few minutes if the file has not downloaded yet. 

## Finishing notes

You're now set up with both the WoTT Agent and Dashboard and have taken the first steps in securing your IoT hardware and applications. 

WoTT certificates refresh every 7 days, so you will need to account for that in your applications.
Credentials are downloaded either when WoTT fetches data or when restarted. You may also find yourself being denied permissions for some of the commands we've shown you, use `sudo` where necessary to circumvent this.

These certificates and credentials can now be used to secure end-to-end device communication and web applications, check out some of the use cases and examples on the [WoTT Agent Github](https://github.com/WoTTsecurity/agent) for inspiration and ideas on how to use WoTT for your own projects.