---
layout: post
current: post
cover: 2019-08-28-iot-encryption-failures-and-how-to-avoid-them.png
title: IoT Encryption Failures and how to avoid them
date: 2019-08-28 12:00:00
category: [news,thoughts]
author: Nikoletta Triantafyllopoulou
tags: [open-source]
class: post-template
---
# IoT encryption failures and how to avoid them

## Introduction

The stories of misconfigured security systems leading to leaks of client data are common. Take for example the Equifax data breach back in 2017. The vulnerability was detected with a great delay due to expired certificates. According to [Venafi](https://www.venafi.com/blog/7-data-breaches-caused-human-error-did-encryption-play-role) *The device inspecting encrypted traffic was misconfigured because of a digital certificate that had expired ten months earlier. This along with other oversights enabled a digital attacker to crack into Equifax’s system in mid-May and maintain their access until the end of July*. Another example of how certificates can have a massive impact is the case of [Ericsson](https://www.zdnet.com/article/ericsson-expired-certificate-caused-o2-and-softbank-outages/). An expired certificate of the Swedish Telecommunications Company caused a major outage in 11 countries in December 2018 with over 32 million users affected by it.

The reality of the situation for IoT or any stack, is that there is no single solution, button or line of code to protect it in its whole. Devices use different platforms, servers, connectivity domains, and protocols. There is potential for failure which can lead to serious data-breaching issues. In the case of encryption, developers may be unwittingly more susceptible or prone to error than they realize.


## IoT Encryption Failures

The problem with devices and networks does not always lie in not having encryption but in the way encryption is applied. Following security guidelines is a good step but like many security systems, the devil is in the details and being overzealous is a good thing in this case. Let’s take a closer look:

**Misconfigured IoT encryption**. The added layers and the diversity of protocols in IoT create additional failure points where encryption can be incorrectly implemented (e.g. sensor to IoT device via SCADA > IoT device to IoT gateway via LPWAN > IoT gateway to MQTT broker via TCP/IP). A single hole caused by a configuration mistake on the platform, on the network, on the cloud or on the device may compromise the entire tech stack. A slight mistake could have tremendous consequences and land your company some unsavoury headlines in the press.

**Regulatory compliance alone does not protect devices**. Never assume that implementing a basic set of guidelines is enough. In fact, it is merely the beginning. Regulatory compliance for the sake of abiding to a set of standard rules is not security. What should be done is use those rules as a base and enhance them with IoT specific security solutions that suit your deployment. This way, security and IoT encryption are maximised on all layers and at all points.

**Not keeping track of machine identity protection**. Consider the scale of managing a fleet of thousands of devices (millions are possible, but let’s not break our minds). Managing SSL/TLS certificates at IoT scale is a daunting task, particularly if you issue the certificates manually (which is why most fail to use it altogether). Imagine the workload and the time wasted on a process which could and should be automated. TLS protocols grant secure communication over a network (assuming properly implemented). Security best practice dictates that certificates should have a lifespan of a days or hours to mitigate the impact of a leak. This is where [automating TLS certificate and key-issuing](https://wott.io/blog/thoughts/2019/06/22/wott-secures-the-internet-of-things) comes handy. By automating the certificate-issuing process, we reduce the burden that developers would face and eliminate human error.

**Poor Key Management**. Encryption keys are like passwords. Storing your keys on disk is not ideal.The only way to efficiently handle this situation is to have a Trusted Platform Module (TPM). TPM is a cryptographic Module which enhances computer security and boosts privacy. It is designed to ward off software compromising. Unfortunately this is still relatively rare outside of high-compliance devices largely due to the added complexity and added hardware components.

**Using weak, vulnerable, unknown or untested cryptographic algorithms**. Encryption is performed based on ciphers, complex algorithms and best developed by mathematical sophisticates. Some companies or developers choose to build and use their own encryption algorithms. This is a risky practice, particularly if it is not updated or reviewed for a prolonged period. Moreover, encryption protocols should undergo rigorous peer review and audit as is done in [open source](https://wott.io/blog/thoughts/2019/06/25/why-open-source-solutions-are-critical-for-IoT) security tools. It is better and more secure to use the already-tested and secure algorithms which are available out there. Some of the most popular encryption algorithms are: RSA, Advanced Encryption Standard (AES) and ECDSA. These are updated and they evolve so that they can help fend off cyber-attacks.

**Relying solely on cloud providers for securing your data**. Securing data on the cloud and opting for a trustworthy provider is essential yet, this is only one piece of the security puzzle. Admittedly, cloud providers are all doing a good job towards securing the data we all store in the cloud. This, however, does not mean that a data leak is not possible. The cloud only covers one area of your architecture and even on the cloud, there are settings that must be configured correctly by the customer. Do you really believe that a 3rd party service, even AWS is taking full responsibility for your entire stack? Will it matter when -your- client data is leaked? IoT encryption is not only about securing a certain layer or point in the architecture. It needs to be holistic and cover database to customer data, to identity and access management, and of course, down to the IoT device itself. In cases of organisations and enterprises, this is where [DevSecOps](https://wott.io/blog/thoughts/2019/06/23/why-shift-left-security-is-relevant-for-iot) can be of great help.


## Conclusion

The complexity of the IoT ecosystem and the uniqueness of every deployment creates many potential IoT encryption failures and security failures in general. These mistakes are avoided only with the provision of easy-to-integrate IoT security solutions. We at [Wott](https://wott.io/) offer tools for developers to help harden the security of IoT devices and to fix vulnerabilities during the development process. We offer a seamless and easy-to-use solution which is open source, cloud-agnostic and integrates easily with most  common hardware and operating system providers so that your IoT infrastructure remains secure.
