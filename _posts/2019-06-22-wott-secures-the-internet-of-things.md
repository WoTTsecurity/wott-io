---
layout: post
current: post
cover:  image_0.png
title: WoTT secures the Internet of Things
date: 2019-06-22 10:00:00
category: thoughts
author: Al Esmail
tags: [Open Source]
class: post-template
---

TL;DR It’s Let’s Encrypt for IoT - you know you want it.


Figure 1 - If the web can have it, why can’t IoT?

In my first blog post, I articulated [why we do what we do](link to first blog post) at WoTT.  Namely, that security is a necessary condition for a future involving advanced cyber-physical systems where devices have agency.  In this post, I will share the details of our open-source developer tools. (We think devs will [play a big role in security](link to shift left security article).) It’s free to use for most everyone (except enterprises) - you can contribute or check the code base on [Github](github.com/wottsecurity).

The aim for WoTT is to do three things:
​​
* Make it easy to use asymmetric encryption for device communication (Northbound, Southbound and m2m)
* Provide a cryptographic identity for every device (such that the receiver can trust that the sender is who it claims to be)
* Rate each device’s trustworthiness (based on behavior and state)

In plain English, the goal is to allow other devices and services to ask the question: _How much can I trust this device at any given time?_

We do this in the shape of a dynamic Trust Score.

Naturally, we have a lovely feature set that extends beyond this core to simplify the lives of developers.  We want developers to be able to focus on product rather than invest too many cycles into security.  Here are some additional features (We would love to know which ones you like via comment/[Twitter](twitter.com/wottsecurity)):

* Fleet management dashboard
* Vulnerability warnings (CVE)
* Credential management
* Certification/Compliance (future)
​
Coming back to the _main_ goal of establishing device trust. Let’s unpack the _main_ functionality.
​
The fundamental building block that we use to encrypt communication between two peers is cryptographic identity.  We are not reinventing the wheel here.  We are leveraging existing standards and technology by using x509 certificates.  It works great for web and DevOps applications, so we are porting it to device communication.  (Spoiler: there is absolutely no blockchain needed to do this - find a different site for token investment tips. It ain’t me you’re looking for, babe.)

Certificates are provisioned automatically through the WoTT agent from our own Certificate Authority (CA).  Currently, we address back-end communication to services and machine to machine (M2M) communication.  (In future, we will handle browser-device communication.)  Certificates are automatically renewed every 7 days, though the renewal period can be revised up or down depending on the requirements of each use case.  For those that are familiar, this should look and sound a lot like [Let’s Encrypt](https://letsencrypt.org/) for IoT.  

We strongly recommend securely storing device keys in a secure environment like a trusted platform module ([TPM](https://en.wikipedia.org/wiki/Trusted_Platform_Module)).  Often the system on chip (SoC) includes a TPM but unfortunately the Raspberry Pi does not.  We worked with [Pi Supply](https://uk.pi-supply.com/) to offer the Security Hat for the Pi with easy documentation, but really you can use any TPM available on the market.  (Just try to avoid storing keys on your SD card.)

Figure 3 - Use a TPM, seriously.
(Another plug for the Security Hat here - you’ll love it.)

The certificate serves as both the unique device identifier and the means to distribute a public encryption key to encrypt data in motion.  With an installed certificate, the device can establish secure connections to other devices and services, and cryptographically attest to it’s identity using mutual TLS ([mTLS](https://en.wikipedia.org/wiki/Mutual_authentication)). For the WoTT agent, we are using Elliptic Curve cryptography ([ECC](https://arstechnica.com/information-technology/2013/10/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/)) because it offers better performance while achieving the same security as RSA.

It is worth mentioning that mTLS is different than how your browser works. In such a scenario, you as the client (i.e. the browser) verify that the remote server (e.g. https://www.google.com) is indeed being served from Google’s server and not an impersonator (spoofing attack). There is however no way for Google to cryptographically confirm you or your browser identity (which is why we login to access email). With WoTT, we add client-side authentication and eliminate the need for login credentials (username and password), since we can verify the client identity with the certificate.  This is a huge step in moving away from the problem of default login credentials in IoT. There are at least [61 default login credentials](https://www.csoonline.com/article/3126924/here-are-the-61-passwords-that-powered-the-mirai-iot-botnet.html) used in the Mirai botnet attack.

Finally, let me introduce the plat de resistance - _the Trust Score_.  The Trust Score is a numerical representation of the security or risk profile of your device.  Think of it like a credit score but instead of reflecting your probability of defaulting on debt, it reflects your probability of being hacked. (Low numbers are bad; high numbers are good.)  We consider variables of state and behavior from the device itself and peer devices, plug this into our magic machine and voila - out comes a number.  The specifics of the variables and algorithms are the part we keep under lock and key (see what I did there?) to prevent adversaries from gaming the metrics (though, ‘gaming the metrics’ could be an interesting daytime game show).

Figure 4 - This visual is a little basic. I probably should have shown you a clip of Alex Trebek

This Trust Score can then be used to answer the question: _should I trust this device?_  Access policies can then be set depending on the security sensitivity of the end-point. For instance, you may allow a device with a Trust Score of 0.4 to communicate with a weather service, but for customer payment data, a Trust Score of 0.9 or higher is needed.

To pull this all together, we hope to raise the security bar in cyber-physical or IoT systems.  We don’t have a silver bullet, but we do have some common sense solutions to some _really_ obvious problems that have already been solved in the DevOps world.  We also have a pretty neat way of enabling M2M communication and doing away with perimeter security, but I’ll ploy you with the explanation of ‘zero trust’ in another post.

Again, I have made some claims here that I will substantiate in future posts.  Check back in, subscribe to the [newsletter](link to sign up page) or [follow](https://twitter.com/wottsecurity) to see more.  If you’re interested to try out what we’re building, follow us on [Github] (github.com/wottsecurity) or check out the documentation.  

Want to troll me? Comments below or [twitter](twitter.com/wottsecurity) here.
