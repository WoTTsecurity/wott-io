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

WoTT's primary goal is to simplify and manage end-to-end security for developers.

We provide this in a number of ways:

* Simplified encryption of device communication
* Cryptographic identity (x509 certificate issued from our CA)
* Enabling the removal of hard coded credentials from web applications and firmware

You can access all these features by installing the [WoTT Agent](https://github.com/WoTTsecurity/agent) and using the [WoTT Dashboard](https://dash.wott.io) to manage your devices through a simple and user-friendly interface. We'll walk you through step-by-step in setting up and installing the WoTT agent so you can start implementing hassle-free security on your own IoT or edge devices.

Ultimately, we want to give you the developers the safety of secure devices on the internet so you can integrate your projects on a multitude of platforms without the complexity of managing individual certificates or authentication. WoTT secures your projects so that you don't have to.

First, let's get the WoTT agent set up.

## Installing the WoTT agent and claiming your device

You will need to register for an account on the [WoTT Dashboard](https://dash.wott.io) and login. You can manage the credentials for your first 5 devices for free. For additional features, we offer more comprehensive packages. See our [prices]({{site.url}}/pricing) for more information.

{% asset docs/Register.png srcset:width="1300 2x" srcset:width="650 1x" alt="Register for WoTT Dash" class="img-fluid" %}

Currently, the Agent is only available to Debian package distributions such as Debian (including Raspbian) and Ubuntu.

To install the agent, access your WoTT dashboard and press the 'Add Device' button. Next, copy the following block line-by-line; or use the copy icon to get the entire block as a one-liner.

{% asset docs/add-device.png srcset:width="1300 2x" srcset:width="650 1x" alt="Add device from the dashboard" class="img-fluid" %}

With this in your clip board/buffer, SSH into your device and paste in the command. Assuming things went well, you should see something similar to this:

```
[...]
$ sudo apt install -y wott-agent
[...]
Good job installing the wott-agent and welcome to the community of security conscious hardware devs!

Your device has already been claimed in the WoTT dashboard (https://dash.wott.io).

Your device's unique ID is: x.d.wott.local

For more information, visit wott.io/getting-started or drop us a line at hey@wott.io.

Regards,
The WoTT Team
```

Your device will now be registered and viewable on the WoTT Dashboard. You can now see the relative trust scores of your devices. To see device specific information, select it and add appropriate tags to these devices (this is relevant for credential management).

Here's an example of what a Raspberry Pi with its WoTT meta tags (automatically assigned based on hardware) might look like on the Dashboard.

{% asset docs/rasbpi-profile.png srcset:width="1300 2x" srcset:width="650 1x" alt="Raspberry Pi example profile" class="img-fluid" %}

## What's next?

And that's it! You're now set up with WoTT. 
With that, you're good to go. If you're interested in how WoTT works, feel free to continue reading on, otherwise we have some handy links here for you to begin using WoTT for your projects:

* [Manage credentials with WoTT]({{site.url}}/documentation/manage-credentials)
* [Learn more about the WoTT Trust Score]({{site.url}}/documentation/trust-score)
* [Learn more about our use cases]({{site.url}}/documentation/use-cases)

## A little more on 'cryptographic' identity

Our lightweight agent handles identifying your device as well as verifying inter-device communication cryptographically [1]. What this essentially means is that the agent assigns a certificate from WoTT's own certificate authority (CA) to your device to secure it [2].
The agent does this based on a unique value assigned to your device which acts as an identifier to other devices. The purpose of this is to restrict access to trusted devices preventing fraudulent access and attacks.

* [1] Done through mutual TLS (mTLS)
* [2] WoTT does this using an x509 security certificate. These certificates refresh every 7 days.

The certificates are managed entirely by WoTT - the only thing you need to do to begin securing your device is install the WoTT Agent.

## Credentials and the WoTT Dashboard

In an ideal world, we would do away with the need for usernames and passwords entirely and rely on cryptographic identity alone. However, servers cannot verify identity from browsers via cryptographic identity (yet). Servers are unable to verify who you are which is why you are required to login to access for example your email or Google cloud services. The same applies to Web Applications that you as an IoT developer create which can be accessed from any browser.

As a developer, you will likely be accessing a large range of internet/cloud services that require basic HTTP authentication or an API key. In most instances, such credentials are hard coded into applications and can be easily read with access to said applications. WoTT introduces credential management so that you can remotely download the necessary credentials onto your device as a JSON file. This removes the need for hard coded keys and logins from your application.

We do this via our Dashboard which you can use to monitor your devices. The Dashboard gives your device a trust score (based on how secure it is) as well as giving you the means to add and manage credentials for whatever purpose you need them for.

## Finishing notes

You're now set up with both the WoTT Agent and Dashboard and have taken the first steps in securing your IoT hardware and applications.

WoTT certificates refresh every 7 days, so you will need to account for that in your applications.
Credentials are downloaded either when WoTT fetches data or when restarted. You may also find yourself being denied permissions for some of the commands we've shown you, use `sudo` where necessary to circumvent this.

