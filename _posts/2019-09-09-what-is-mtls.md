---
layout: post
current: post
cover: chain.jpg
title: The significance of mTLS and why should you care about it?
date: 2019-09-09 08:00:00
category: thoughts
author: Nikoletta Triantafyllopoulou
tags: [Open Source]
class: post-template
---
## Introduction
Security in the IoT industry should also include the devices and not only the network or the cloud. Secure device management is all about machine identities and mTLS. Let us have a closer look at what mTLS does and why it is an essential parameter of IoT security.    

## What is mTLS?
mTLS  is a protocol that verifies the cryptographic identity of both endpoints before initiating communication, rather than just one. This cryptographic verification ensures that your messages and your connection are private, by ensuring that your device's identity is authenticated and thus, trustworthy. mTLS is a two-way authentication, hence, the m which stands for mutual. Mutual transport layer security means that the two parties, the client and the server, authenticate each other at the same time. Some of the most popular and innovative technology companies out there use mTLS, including Google. Mutual TLS is state-of-the-art security contributing to building a robust security posture. To implement mTLS for IoT, one must set up a secure Public Key Infrastructure (PKI).  PKI is a useful set of security tools and processes needed to manage certificates. Everything related to the provision, management, distribution and revocation of certificates lies in the PKI.    

## Why is mTLS authentication important?
IoT security rests on the proper management of machine identities. But, machine identities can be efficiently managed with the use of digital certificates and mTLS. mTLS authentication validates the trust between your device and your server by simultaneously identifying each other as authentic. That is a proper way for connection and data transmission to be established. If the initial validation process fails, access is denied and a connection is not made.

## What can go wrong if you do not use mTLS?
Not using mTLS may compromise your brand, your company, and your services in a multitude of ways. Consider a scenario where hackers compromise your device and use a commonly shared API key stored on disk to gain access to your back-end servers. This means that any sensitive information stored on your server might become accessible. Without mutual authentication there is no way to confirm client-side identity and isolate the compromised device. Imagine again, the occasion where without mTLS hackers take over a device and start sending falsified data. The data received and transmitted is altered, compromised and unreliable. But the users have no way of knowing this and they keep making critical decisions based on the compromised data received. They analyze metrics, they receive real-time data but…the integrity of the data is compromised so nothing can be trusted. What if the data compromised is related to health and smart healthcare devices? Or if it’s logistics-related data or even manufacturing and smart transportation data? What kind of a cataclysmic or disastrous impact will compromised data have? This is why in IoT infrastructure mTLS is an important piece of the security puzzle. IoT security is all about authenticating, trusting and securing the services provided.

## How can this affect you and your company?
For companies, the financial implications of security breaches are tremendous and difficult to recover from. It is not only the brand’s reputation plummeting but it is also the loss of customers and most importantly the huge fines incurred. The brand’s reliability is questioned and trust is lost.

##Takeaway
Machine identity is a critical element of a robust security system for IoT.  Issuing x509 certificates to devices (and rotating them) provides cryptographically verifiable identities that can be used in mutual authentication through mTLS. This limits the chances of adversaries compromising your devices and keeps their hands off your credentials or confidential data. mTLS is a powerful way to enhance security posture, and ensure that your company is taking the necessary precautions to prevent a breach.   
