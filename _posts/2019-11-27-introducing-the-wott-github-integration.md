---
layout: post
current: post
cover: hacker.jpg
title: Introducing the WoTT's GitHub integration
date: 2019-11-27 08:00:00
category: [news, thoughts]
author: Viktor Petersson
tags: [announcement, github, devsecops, devops]
class: post-template
---

There's no doubt that GitHub has become one of the most popular platforms for developer collaboration and communication. Increasingly, GitHub is also used for project management across developer and Dev(Sec)Ops teams. Because of this, it is increasingly where the security fixes are being tracked too.

For instance, GitHub recently announced their [Security Alerts](https://help.github.com/en/github/managing-security-vulnerabilities/about-security-alerts-for-vulnerable-dependencies), which helps you audit vulnerabilities in dependencies. There's also [Snyk's GitHub integration](https://snyk.io/docs/github/), that does similar audits. Hence, GitHub is becoming the hub for tracking security issues.

While GitHub's Security Alerts (and Snyk) are great ways to secure your application dependencies, they only track part of the security posture. They neglect VM (or bare metal) security audits.

**This is why we are super excited to announce WoTT's GitHub integration.**

With WoTT's GitHub integration, the `wott-bot` will automatically generate GitHub Issues based on our Recommended Actions. You can then easily assign ownership and schedule the work as part of your sprints.

{% asset blog/wott-github-integration.png srcset:width="1300 2x" srcset:width="650 1x" alt="Example of an event in GitHub" %}

The integration is currently in beta and is available to all users.

To get started, login to your [WoTT Dashboard](https://dash.wott.io) and navigate to your profile (upper right-hand corner) and select GitHub Integration.

{% asset blog/wott-profile-github.png srcset:width="1300 2x" srcset:width="650 1x" alt="GitHub configuration in Dashboard" %}

Click the 'Authorize GitHub' and follow the wizard to authorize the `wott-bot` to create issues. The repository can be either public or private. Since these are security issues, it is recommended that you use a private repository. Also, please do note that WoTT **cannot** read your code base. It can only create GitHub issues.

Once you're finished the wizard, you should be able to select the repository that you've granted access from the drop down list.

{% asset blog/wott-github-finished.png srcset:width="1300 2x" srcset:width="650 1x" alt="GitHub configuration in Dashboard" %}

Lastly, you now need to select "Install App" for the bot to be able to create Issues. Once that's done, you should start seeing GitHub Issues created as they are discovered by WoTT (and updated when something changes).

If you got any questions or issues, please drop us a line at hey@wott.io or reach out to us at [@WoTTSecurity](https://twitter.com/wottsecurity) on Twitter.
