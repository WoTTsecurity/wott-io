---
layout: post
current: post
cover:  image_0.png
title: Why open source is critical for InfoSec
date: 2019-06-24 10:00:00
category: thoughts
author: Al Esmail
tags: [Open Source]
class: post-template
---

TL;DR Proprietary security is a fresh cow pie hiding in the tall grass.

{% asset blog/cow.jpg srcset:width="1300 2x" srcset:width="650 1x" alt="Figure 1 - How I imagine decision fatigued CTOs see the world when speaking to proprietary security vendors. Can you spot the cow pie?" class="img-fluid" %}

Figure 1 - How I imagine decision fatigued CTOs see the world when speaking to proprietary security vendors. Can you spot the cow pie?

In a previous post, I advocated for the merits of [DevSecOps]({{site.urk}}/blog/thoughts/2019/06/23/why-shift-left-security-is-relevant-for-iot) and shift left security.  In this post, I will present our position on open source security vs. security by obfuscation (STO).  If you read the title and are familiar with the mid-western American expression [cow pie](https://www.urbandictionary.com/define.php?term=Cow%20pie), you hopefully know where I am going.  If not, here’s a verbose description: fresh bovine excrement collapses under its own weight to form a flat cylindrical shape about the size of a pie and is well concealed by uncut grass.  It’ll really mess up your cowboy (or cowgirl) boots - get the picture?

Let’s begin in 1883 when the Dutch-born cryptographer, Auguste Kerkchoffs articulated six design principles on [La Cryptographie Militaire](http://www.gutenberg.us/articles/shannon%27s_maxim):

* The system must be practically, if not mathematically, indecipherable;
* It should not require secrecy, and it should not be a problem if it falls into enemy hands;
* It must be possible to communicate and remember the key without using written notes, and correspondents must be able to change or modify it at will;
* It must be applicable to telegraph communications;
* It must be portable, and should not require several persons to handle or operate;
* Lastly, given the circumstances in which it is to be used, the system must be easy to use and should not be stressful to use or require its users to know and comply with a long list of rules.

Some of these are certainly redundant given advances in computation since the 19th century but the second principle remains and is referred to as Kerchoffs’ principle.  The principle was stated slightly differently (or perhaps restated) as "the enemy knows the system", by American mathematician, Claude Shannon.  The latter is referred to as [Shannon’s maxim](http://netlab.cs.ucla.edu/wiki/files/shannon1949.pdf). (An aside, I would be tickled to be the author of either a maxim or a principle but alas, such accolades have eluded me.)

In searching for academic references to STO, I unfortunately was hard pressed to find even a postulate in favor of the practice.  I did not intend to run STO through the google test but the fourth organic result gives an indication of popular perception (don’t use it).  Though, Ross Patel does make a fair argument that [STO can enhance security](https://www.bcs.org/content/ConWebDoc/2788) in conjunction with other security methods.  He cites the example of network administrators placing sensitive services on non-standard ports to evade script kiddies and programs that exploit common vulnerabilities.  

It is a fair point that STO can indeed increase security if the means of obfuscation is consistently unique.  A metaphor to drive the point home - open source security is the safe in which you store the jewels; STO is the act of hiding the safe. Of course your safe is useless without a [strong password]({{site.url}}/blog/thoughts/2019/06/22/wott-secures-the-internet-of-things). That being said, a security company that offered a service to hide your safe behind the family portrait (and offered the same service to all its clients) is probably not offering a valuable service and likely why popular opinion does not favor the method. However, choosing to hide your safe somewhere non-obvious and random would indeed be a valuable addition to your security system.  

I would propose that security systems/methods/software that are used in many places or by many clients should adhere to Kerchoffs’ principle. Consider the following assumptions:

As the number of users of a security system increases, the value of the assets protected by that system increases.

* As  the value of assets protected by a system increases, the reward of compromising that system increases.
* As the reward of compromising a system increases, the number of adversaries attacking the system increases.
* As the number of adversaries attacking a system increases, the adversaries’ knowledge of that system increases.

Therefore, the enemy knowledge of a security system increases with the number of users.  I argue that widely used security systems must be completely open-source as these systems are designed to resist attack under complete enemy knowledge of its workings. Let it henceforth be known as _‘Esmail’s Postulate’_. ;)

Beyond adversary or enemy knowledge, we should consider the value added of public knowledge to a system.  Blackhats often work together by publishing their hacks on the dark web or Github (Mirai is on Github - I won’t link to it, but you can find it if you like). Others then contribute and build upon these tools furthering the capabilities.  Whitehats can mirror this collaborative behavior in releasing their tools to the commons and crowdsourcing audit, vulnerability disclosure and patches.

To substantiate theory with practice, there are successful companies doing a great job with open source security:

* [Sysdig](https://github.com/draios): Unified cloud native visibility + security platform
* [Hashicorp Vault](https://github.com/hashicorp/vault): Secure, store and tightly control access to tokens, passwords, certificates, encryption keys for protecting secrets and other sensitive data using a UI, CLI, or HTTP API.
* [Snyk](https://github.com/snyk/snyk): A developer-first solution that automates finding & fixing vulnerabilities in your dependencies
* [WoTT](https://github.com/WoTTsecurity/agent): Plug and play cyber sec tools for IoT developers ;)

What these companies have in common is that they are building developer tools.  We believe this is the best place to think about security - during development (link to shift left security).

To conclude, security through obfuscation is a single piece to consider in building a strong system.  The _plat de resistance_ in your security system should be open source, resilient in enemy hands and supported by crowdsourced audit.

Join the [newsletter](http://eepurl.com/ge0niv) or follow on [twitter](https://www.twitter.com/wottsecurity).

Want to troll me? Comments below or [twitter](https://www.twitter.com/wottsecurity).
