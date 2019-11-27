---
layout: post
current: post
cover: chain.jpg
title: The significance of mTLS and why you should care about it
date: 2019-09-09 08:00:00
category: [thoughts, news, tutorials]
author: Fiona McAllister
tags: [open source]
class: post-template
---
## Introduction

**Note** there are some [tutorials](#tutorials) within this article. These vary in difficulty. All require a linux distribution to be compatible with our agent.1

Cybersecurity is an ever-growing, ever-complicating field. As a new developer, it can be daunting to think of where to start. Here we're going to talk a little about mTLS and why you as a developer should care about it (and implement it!). 

mTLS is just a type of TLS (Transport Layer Security). This is commonly found in verifying endpoints and for encrypting communications (think of WhatsApp messages). Unlike a password which is manually entered by a single user, TLS is typically managed by cryptographic certificates. Most TLS protocols usually verify this with an x509 certificate; and it's typically the client requesting a valid certificate from the server (DNS name on server must match that of the certificate). Secure Sockets Layer (SSL) security is based off this principle.

The main thing that makes mTLS different (and arguably more secure) is that it requires *both* the server and client to verify each other: a handshake. This is particularly useful in instances where you want two servers to communicate with each other. Ultimately it's flexible and lightweight being perfect for edge devices.

This might still seem a bit overcomplicated. At WoTT we have our own dedicated Certificate Authority and examples of securing mTLS connections. We encourage you to try it out to familiarise yourself with the concept. Additionally, our agent is lightweight and can be used flexibly on servers and other edge devices. 

## <a name = "tutorials"> </a> How to Implement mTLS: Some Tutorials by WoTT

There are actually several different ways to implement an mTLS style security layer for security. We have several examples for you to try and implement yourself of varying difficulties.

### Easy 

We have a very simple to implement tutorial showing how you can use mTLS to secure a basic Web Application using WoTT's agent as a manager. See [here]({{site.url}}blog/tutorials/2019/06/16/simple-webapp) for more details.

### Medium

If you're familiar with Nginx servers, we have a useful tutorial to help guide you through setting up mTLS on it using our CA. See [here]({{site.url}}blog/tutorials/2019/07/15/mtls-with-nginx)

### Hard

(Recommended after following Nginx tutorial) you may want to up the ante if you have a Kubernetes cluster you want to secure. If you want to dive into securing Kubernetes with mTLS using WoTT, go [here](}}site.url}}blog/tutorials/2019/07/18/edge-to-kubernetes)

The important thing to take away is that you need a Certificate Authority from which to configure your system to. WoTT provides one for you. All these examples are designed to be adaptable so feel free to modify them at your will.

## How it works

After all that you may still be interested in how mTLS actually works. 

 * popular uses of mTLS (SSH, IKE); encryption tool for major companies such as Skype
 * browsers don't use mTLS 
 * cryptographic identity 

## Why you should care?
 
 * Outline the risks of NOT doing so
 * talk about security breaches as a result of not using mTLS
 * data is more and more precious - encryption necessary for privacy
 * not secure not to at this point

## Conclusions