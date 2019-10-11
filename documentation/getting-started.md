---
layout: docs-cat
description: 'Getting started with WoTT'
title: 'Getting Started with the WoTT Agent and Dashboard'
full_description: We'll take you from startup to installation of the WoTT Agent so you can begin integrating security for your needs.
title_content: 'Getting Started'
redirect_from:
  - /getting-started-1
  - /getting-started
  - /blog/categories/getting-started
---

WoTT's primary goal is to help developers manage and resolve security risks for linux instances by identifying vulnerabilities and providing clear instructions to resolve them. We also manage the credentials and authentication for your servers. WoTT secures your projects so that you don't have to. WoTT works on any linux system including edge devices.

How do we do this?

1. Recommended actions and developer guides to fix vulnerabilities
2. Insights on vulnerabilities and metrics to manage the risk of your linux instances
3. Simplified encryption of point-to-point communication and cryptographic identity (x509 certificate issued from our CA)
4. Enabling the removal of hard coded credentials from web applications and firmware

To access all these features, you will need to install the [WoTT Agent and Dashboard](https://dash.wott.io) to manage your various nodes through a simple and user-friendly interface. 

We'll provide a step-by-step walkthrough of set-up and installation of the WoTT agent. It's hassle-free and simple to implement.

## Why you should consider DevSecOps:

1. Most data breaches are caused by poor security hygiene (known CVEs, poor configuration, weak authentication).
2. Cyber criminals exploit common vulnerabilities affecting large and small firms in untargeted ransomware attacks.
3. Developers can fix problems faster than anyone else. Save them time with clear instructions and developer guides.

## Installing the WoTT agent in 3 steps 

**Required Skill Level: Beginner to intermediate**

**Time to complete: 5 min**

First, register for a [WoTT account](https://dash.wott.io) and login. It's free and fully featured to start, so you know what you're getting. We have several paid plans available for larger deployments. See our [prices]({{site.url}}/pricing) for more information.

{% asset docs/Register.png srcset:width="1300 2x" srcset:width="650 1x" alt="Register for WoTT Dash" class="img-fluid" %}

**Note:** Currently, the Agent is only available to Debian package distributions such as Debian (including Raspbian) and Ubuntu.

To install the agent, access your WoTT dashboard and press the 'Add Device' button. Next, copy the following block line-by-line; or use the copy icon to get the entire block as a one-liner.

{% asset docs/add-device.png srcset:width="1300 2x" srcset:width="650 1x" alt="Add device from the dashboard" class="img-fluid" %}

With this in your clip board/buffer, SSH into your instance (be it an EC2 instance, server, raspberry pi, etc;) and paste the command in terminal. Assuming things went well, you should see something similar to this:

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

Your node will now be registered and viewable on the WoTT Dashboard where you can now see the relative trust scores of your services. 
You can view node-specific information and change it. Select one and add some appropriate tags to differentiate it from your other nodes (this is relevant for credential management).

Here's an example of what a Raspberry Pi with its WoTT meta tags(automatically assigned based on hardware) and user-added tags might look like on the Dashboard.

{% asset docs/rasbpi-profile.png srcset:width="1300 2x" srcset:width="650 1x" alt="Raspberry Pi example profile" class="img-fluid" %}

## What's next?

And that's it! You're now set up with WoTT. 
With that, you're good to go. If you're interested in how WoTT works, feel free to continue reading on, otherwise we have some handy links here for you to begin using WoTT for your projects:

* [Manage credentials with WoTT]({{site.url}}/documentation/manage-credentials)
* [Learn more about the WoTT Trust Score]({{site.url}}/documentation/trust-score)
* [Learn more about our use cases]({{site.url}}/documentation/use-cases)

**If you're interested in learning a bit more about WoTT, carry on reading- otherwise you're all done! Why not play with some of our use cases?**

## Credentials and the WoTT Dashboard

In an ideal world, we would do away with the usernames and passwords entirely and rely only on cryptographic identity. However, we can't because servers aren't able to verify who you are (yet!) from browsers via cryptographic identity. This is why you need to login with a password (which in theory only you know) to access, for example, your email; or Google cloud services. The same applies to Web Applications that you as an IoT developer create which can be accessed from any browser.

As a developer, you're likely going to be accessing a huge range of internet/cloud services that require basic HTTP authentication or an API key. In most instances, these credentials are hard coded into applications and can be easily read with access to said applications. WoTT introduces credential management so that you can remotely download the necessary credentials onto your chosen endpoint (we do this as a JSON file). This removes the need for you to hard code your keys and logins into your applications.

We do this via our Dashboard which you can use to monitor your projects. The Dashboard gives you a trust score (based on the security posture of your node) as well as giving you the means to add and manage credentials for whatever purpose you need them for.

## A little more on 'cryptographic' identity

We've spoken a lot about cryptographic identity so far without going into it in much depth. For the everyday user, it's enough to know that we secure you and you can develop your apps free from password nightmares; however if you've made it this far, you're interested to know how WoTT works.

Our lightweight agent handles identifying your node as well as verifying point-to-point communication cryptographically [1]. What this essentially means is that the agent assigns a certificate from WoTT's own certificate authority (CA) to your node to secure it [2].
The agent does this based on a unique value assigned to your node which acts as an identifier to other potential endpoints. The purpose of this is to restrict access to trusted nodes preventing fraudulent access and attacks.

* [1] Done through mutual TLS (mTLS)
* [2] WoTT does this using an x509 security certificate. These certificates refresh every 7 days.

The certificates are managed entirely by WoTT - the only thing you need to do to begin securing your services is install the WoTT Agent.

## Finishing notes

With the WoTT Agent and Dashboard set up, you have now taken the first steps in securing your IoT hardware and applications.

WoTT certificates refresh every 7 days, so you will need to account for that in your applications.
Credentials are downloaded either when WoTT fetches data or when restarted. You may also find yourself being denied permissions for some of the commands we've shown you, use `sudo` where necessary to circumvent this.

