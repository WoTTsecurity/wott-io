---
layout: post
current: post
cover:  2019-06-23-why-shift-left-security-is-relevant-for-iot.png
title: Why shift-left security is relevant for IoT
date: 2019-06-23 10:00:00
category: thoughts
author: Al Esmail
tags: [open-source]
class: post-template
---

TL;DR Cyber is best handled by developers with big, bulging...brains.

![Natalie Portman](https://media.giphy.com/media/lQaO9Cf50zlM4/giphy.gif)
Figure 1 - Cyber is sexier than a Harvard trained, Academy Award winning actress.

In our [first blog post]({{site.url}}/blog/news/2019/06/20/why-we-are-doing-what-we-do), I articulated that we are strong proponents of shift-left security.  The idea that security should be incorporated as early as possible during application and infrastructure development.  In this post, I will explain why we feel that developers are in a strong position to improve security posture and why it’s more efficient for them to be involved in the solution.

Firstly, let me say that I think cyber is sexy - well, sexy in a very particular way.  It’s easy to lose sight of it in Whatsapp headlines or unflattering Julian Assange photos.  Normally though, the protagonist hacker is presented to us as odd in social disposition but powerful in IQ, perception and virtue - think Rami Malek playing Eliot Alderson - leader of _fsociety_. Sexy, right?

The cyber game is between adversaries playing offense and defense, like high stakes cat and mouse.  To get a sense of the calibre of minds playing in this battle of wits, consider the complexity of [zero knowledge science](https://www.youtube.com/watch?v=z1-eH3NJJX0), the magic math that goes into it and then trying to find a way around it.  It’s a hard game and a dynamic one at that. I feel bad for anyone that thinks they are on the sidelines.  We’re all playing the cyber game whether we realize it or not.

Given this high stakes sport is played by crafty and pragmatic geniuses, the best way you to protect yourself is to put your best line on the court.  Who better than your own developers that know the ins and outs of their own code?  Developers strive for efficiency, utility and happen to have big, bulging - _brains_.  Moreover, as application development and operations have merged into DevOps to bring about agile methods and higher velocity, it has become nearly impossible for security teams to keep up.  To solve the problem, merge security mindset with DevOps to spawn DevSecOps (yes, it’s a mouthful but I already mentioned that size matters in this sport).

Let’s define [DevSecOps](https://opensource.com/article/19/1/what-devsecops) a little more clearly.  It is the prioritization of security practices by developers and/or incorporating a security team member into product teams.  The current siloed nature of security incentivizes developers to work around it or push accountability to a different team.  Either way, the result is a less efficient, uncollaborative and ultimately less secure system.  The incorporation of security thinking into the earliest stages of design reduces the [cost of fixing flaws](https://www.researchgate.net/figure/Cost-to-fix-at-different-phases-of-development_fig1_301789336) by at least 5x, according to NIST.  In effect, shift left security is far cheaper than the alternative - waiting for vulnerabilities to be pointed out after code is committed (hopefully by a whitehat rather than a blackhat).  In a world where you are in an ongoing war with the aforementioned crafty genius adversaries, it would behoove you to be efficient with your resources.

{% asset blog/nist.png srcset:width="1300 2x" srcset:width="650 1x" alt="The NIST says so. Prove them wrong if you want" class="img-fluid" %}

Figure 4 - The NIST says so. Prove them wrong if you want. I don’t care.

In considering end-points, DevSecOps or shift-left security introduces another important concept: _secure by design_.  Presently, CISOs turn to perimeter security solutions (firewalls and networking monitoring) to protect devices.  Though, the latest thinking proposes making the assumption that closed networks have already been compromised and are hostile [Zero Trust](https://www.oreilly.com/library/view/zero-trust-networks/9781491962183/ch01.html ). I will take this concept further in a future post and consider remote and open networks.  Given the assumption that networks are hostile, we must build security into the device itself.  The only way to do that is during design and so we shift security left.

To hammer home the point, let’s use simile (not metaphor): network monitoring is like snipers on rooftops and secure by design is like bulletproof windows.  It’s simply not possible for snipers to see everything unless you have enough of them.  Eventually, these angry looking gunmen are bound to interfere with day to day life.  Bulletproof windows are transparent or seamless - quietly protecting you from danger.  Yes, windows can always be broken but it takes much bigger guns, which far fewer people have access to in most parts of the world.  This effectively reduces the size of the threat space or threat community.  If you’re only worried about state-sponsored cyber attacks, I’d say you’re doing pretty well.  I don’t advocate removing the snipers, but I do suggest adding additional layers of security in case one system fails (or ‘defense in depth’ if you want it in corporate speak).  In the case of open networks, secure by design is the _only_ option.

To conclude, cyber is sexy and the only obvious thing to do is to bring in the A-team and involve developers in security decision-making. We know you’re packing heat in those brains of yours, girls and boys. Get off the bench, get in the game, do your part, be part of the solution, be a whitehat, etcetera, etcetera, etcetera.

I claim that open networks are an important use case to cover. Will cover that in a future blog - Check back in to the [blog]({{site.url}}/blog), join the [newsletter](http://eepurl.com/ge0niv) or follow on [twitter](https://twitter.com/wottsecurity).

Want to troll me? Comments below or [twitter](https://www.twitter.com/wottsecurity)
