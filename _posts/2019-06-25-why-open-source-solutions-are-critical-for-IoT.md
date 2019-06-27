---
layout: post
current: post
cover:  assets/images/image_0.png
title: Why open source solutions are critical for IoT
date: 2019-06-25 10:00:00
category: thoughts
author: Al Esmail
tags: [Open Source]
class: post-template
---

TL;DR IoT needs one ring to rule them all and it’s not a platform.

{% asset blog/iot-monster.png srcset:width="1580 2x" srcset:width="790 1x" alt="No Image" class="img-fluid" %}

In my last post, I described the relevance of [open source security](link to open source security blog post).  For very different reasons, I will argue here that the internet of things (and cyber-physical systems in general) are in desperate need of open source software and tooling.  In short, proprietary technology is fragmenting the market, slowing development in an emerging field and killing some really exciting use cases.  Custom hardware, too many operating systems and cloud lock-in are the problem.

Consider the challenge of building an IoT solution from end to end:

* Custom boards are designed for economy of scale
* Choose from a multitude of non-standard operating systems
* Select a platform with high technical switching costs that is incompatible with other services
* Roll your own certificates if they are supported by your platform

The result is a unique system that is tied to a particular back-end infrastructure and likely incompatible with other ecosystems of devices.  It also requires cross-functional skills that one developer cannot master without years of experience.  The process is inefficient, expensive and error-prone - not to mention insecure.

The opportunity to find interesting use cases beyond turning the lights on in my home while I’m out is hindered by the missing interoperability of the standard IoT development process.  If I switch from Spotify to Tidal, will it still integrate with my Bose speaker? Can I use either with Sonos? OK Google, where’s my iPhone? Did you order the Avocados from Ocado, Alexa?  I’m not endorsing any of these technologies, I am just saying that IoT makes it difficult to eat my Guacamole (not Avo/toast) and listen to the Black Album.  Though, check out the privacy conscious [Chatterbox](https://blog.hackster.io/chatterbox-is-an-amazon-echo-like-device-that-protects-your-kids-privacy-dac95d4d3280) for a great voice assistant alternative.

While it is tempting to build the one proprietary platform that will monopolize all others, what IoT needs is common technologies that are accessible to all.  What better way to achieve this goal than with open-source tools?

Consider an end to end solution like this:
C* ommon mass produced, reusable, modular hardware - Raspberry Pi (Admit it, you’re already using them in real-world use cases - not just for prototyping.)
* Common operating system - Linux
* Common communication protocol - MQTT
* Security - let’s be professional about it and use x509 certificates  

The result would be a device that could be supported by multiple services and supported by many developers.  Documentation and support would be plentifully provided by the community.  Hardware costs could decrease from larger production runs to meet increased demand.  

Cheaper, simpler, secure and interoperable. I like the sound of that.

Check back in to [blog]({{site.url}}/blog), join the [newsletter](link to newsletter sign up) or follow on [twitter](twitter.com/wottsecurity).
