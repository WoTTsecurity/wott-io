---
layout: post
current: post
cover:  assets/images/image_0.png
title: Why we are doing what we do
date: 2019-06-20 10:00:00
category: news
author: Al Esmail
tags: [Open Source]
class: post-template
---

## TL;DR the future has flying cars, transformers and low calorie diets.

{% asset blog/open-source.png srcset:width="1300 2x" srcset:width="650 1x" alt="No Image" %}
Figure 1 - Best free photo I could find when searching for ‘open source’

In our inaugural blog post, my aim is to introduce how we see the world and what we care about. Regarding what we do, I will simply say that we are an open source software company concerned with security for cyber-physical systems - i.e. protecting the ‘real world’ stuff that is being connected to the internet like cars, trains, factories, implanted medical devices and of course smart toasters.

The term ‘Internet of Things’ has unfortunately become a buzzword that draws associations to home devices that are connected to the internet with limited thought given to relevance of the use case, long term sustainability of back-end infrastructure or security.  In trying to describe the integration of internet connectivity into new hardware applications, let us instead refer to [cyber-physical systems](https://ptolemy.berkeley.edu/projects/cps/).  These are the integrations of computation, networking and physical processes.  The field builds on embedded systems that are used in devices whose primary function is not computation.  

The aforementioned examples of internet connected devices are the proverbial tip of the melting iceberg. I am of the opinion that was perhaps stated a bit too early in 2014 by [Ben Evans at a16z](https://www.ben-evans.com/benedictevans/2014/5/26/the-internet-of-things), but is still very relevant, “Today, I have no idea how many devices I own with a chip, but I could tell you how many have a network connection. And I doubt my children will know that, in their turn.”  The principle here is that everything we use will find itself communicating over TCP/IP in the coming years.

At [WoTT]({{site.url}}), we are very excited about this.  We dream of the world of [unmanned aerial vehicles](https://www.airxos.io/) (UAVs) quietly and autonomously zipping around overhead easing congestion and speeding up the time it takes to get from Heathrow to Old street (Newark to the West Village is an equally hateful commute that I would love to solve with UAVs).  We’re patiently waiting for neural implants that will [synthesize speech](https://www.nature.com/articles/s41586-019-1119-1) from thought and that let us skip to the next SNL clip in the queue or adjust the temperature based on how we feel [(assuming Google doesn’t cut access to the necessary APIs)](https://www.home-assistant.io/blog/2019/05/08/nest-data-bye-bye/). If we’re really lucky, maybe we’ll get more transformers - yes, it was done back in 2016.

{% asset blog/neural-implant.png srcset:width="1300 2x" srcset:width="650 1x" alt="No Image" %}

Figure 2 - Representation of a neural implant (FYI - It’s not accurate.)

We also believe machines will be collaborative.  As a thought experiment, let’s take the usual smart home automation to the extreme and assume that everything in your flat is connected.  Let’s go through your morning ritual:

* Wake up/shower/brush your teeth (hygiene is important, friends)
* Get dressed (black tee and jeans, because even in the future we don’t complicate this)
* Look in the mirror (you know you do)
* Breakfast
* Commute to work (or [work from home](https://stripe.com/gb/blog/remote-hub) - yes [WoTT](https://www.wott.io) also believes in remote working)

Let’s introduce some intelligence into the process in the form of a Raspberry Pi mounted camera above your mirror that [recognizes objects](https://www.hackster.io/dexterindustries/pi-camera-vision-detect-objects-e6c936) and categorizes their attributes over time. From December to February, your machine vision camera tracks that beautiful body of yours and pings your smart fridge to keep ordering the avocados and sliced bread. It lets you indulge and maybe pack on a few (visible) pounds through the winter. But…come March, warmer temperatures and the flight to Barcelona booked for June, your mirror decides that it’s time to cut the winter weight and let’s your fridge know to switch you from the carbs to a low calorie yogurt for breakfast. And boom, you’ve got your [hardbody](https://www.quora.com/American-Psycho-1991-book-What-does-the-term-hardbody-mean-Where-did-the-term-originate) back for speedo season without sparing a thought.  All of this because your devices securely share data and make multi-variable decisions.

The example also illustrates an important point about the future of cyber-physical systems: devices will have [agency](https://en.wikipedia.org/wiki/Agency_(philosophy)). This means that devices will make decisions on your behalf.  In thinking of the billions and billions of devices that consultants have estimated will come online over the next decade, it makes sense that we will not be able to manually control all of them or pre-program an output for every scenario.

![My mental image of a consulting firm’s quantification of billions of IoT devices](https://giphy.com/gifs/mike-myers-JWH857oECO0rC)

Figure 3 - My mental image of a consulting firm’s quantification of billions of IoT devices.  

Now here comes the teaser - _how do you implement reasonable security/privacy practices in a world where devices are autonomously making decisions or are literally in the driver’s seat?_  At WoTT, we aim to deal with that question - it keeps us up at night.  For us, security is the burning question that needs to be answered before we step into a cyber-physical future.

I’ll save the self-indulgent explanation of how we aim to solve it for a later post and point you to our [website]({{site.url}}) if you want more information.  Here instead, I want to briefly share some of our thoughts on security.  Security is sexy lately and like anything in the spotlight, the space is buzzing with new ideas, viewpoints and philosophies.  It is an important step for consumers, users and mainstream media to acknowledge that security/privacy is a topic requiring some attention.  We take a clear stand in favour of the following principles:

* Open source: Transparency, peer audit and crowdsourced vulnerability reporting are the future. Security by obfuscation means there are fewer eyes on the problem and users have no idea that vulnerabilities exist.
* Secure by design: Security belongs directly in the device not just on the users’ network.  Some burden of security should be on the technology provider not the user alone. In fact, the best security does not rely on the end user at all.
* Shift-left: The cheapest and most efficient way to include security is during development rather than during security audits after the build is complete. It requires upskilling and new tooling, but devs are capable people - let’s give them the opportunity to shine.
* Zero Trust: Networks are not impenetrable. Perimeter security is a false sense of security. Assume the network is hostile and take measures to authenticate and encrypt every transmission.

In closing, we at WoTT are techno-optimists.  While societies, cities and civilizations shift, there are upcoming challenges that we will need to collectively address.  WoTT is going to tackle security - well, part of it.

I have made a lot of claims here.  For the sake of being thorough and my attention span, I will explore each of these in separate posts over the coming weeks.  Check back in to the [blog here] (wott.io/blog), subscribe to the newsletter here (wott.io/blog) or [follow here] (twitter.com/wottsecurity).

Interested to see what we’re building? Follow us on [Github](github.com/wottsecurity) or check out the [website]({{site.url}}).  Want to troll me? Comments below or [twitter](twitter.com/wottsecurity).
