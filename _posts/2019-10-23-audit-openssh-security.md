---
layout: post
current: post
cover: openssh_article_cover 
title: How to Audit OpenSSH Configuration and Secure It
date: 2019-10-25 17:00:00
category: tutorials
author: Mahmoud Fahmy
tags: [tutorials]
class: post-template
---


## Introduction

**Required Skill Level**: Beginner to Medium

**Reading Time**: 15-20 Minutes

In this post, we will review the fundamentals of a secure OpenSSH server. As you probably know the SSH (Secure Shell) is a method to remote login to a server. SSH is usually secure however if used with the default settings, can be vulnerable to attacks from unwanted parties. 

We will look at the basics of auditing and securing your OpenSSH configuration file, to make sure that only trusted users can remote login to your server, and are privy to the information they are permitted to.

**Requirements:**
* A Linux Distribution (this guide should be good for most Distro's)
* A server
* The config file (usually located at /etc/ssh/ssh_config)

you can open this file from the terminal using the command:

~~~
$ sudo nano /etc/ssh/ssh_config
~~~

*We also want to quickly mention that our service [WoTT](https://wott.io/) audits the security of your linux machine/s including your OpenSSH configuration. It is free for up to 5 nodes and contains many guides and documentation to make sure setting up is simple and painless whilst easing your mind on the strenuous work that is securing your system.*

Here are a few key features to check if your OpenSSH server is secure:

## 1. Use a Strong Password

This might seem like an obvious one, but a lot of systems are vulnerable to brute force attacks or simple guesswork due to having easy to guess passwords or generic passwords. By ensuring that your password/s is complex and long, it makes it a lot more difficult and more time consuming to brute force (can result in you noticing the attack) if the password has capital letters, special characters and numbers. Also make sure to use a non-conspicuous word or phrase as your base. Something like idontlikemeltedicecream rather than your first car or the name of your pet.

*Side note: we strongly recommend you don't use passwords to begin with (see point 5). But we understand that some people would like to keep using passwords so we'll keep this up here.*

## 2. Change the Default SSH Port

By default, any SSH port is 22. This makes it so that anyone connecting to your SSH server can find it simply by connecting to the default port. Changing the port makes it more difficult to find and slows down the attacker's process significantly. To change it, navigate to the config file as shown above and open it in your terminal (you can also edit it through a text editor although this guide will show you how to do so in a terminal). 

Once you have the config file open, locate the line that says Port 22, and change the number to a port that is not in use on your server yet.

*You can check to see which ports are not in use by running the following command on another terminal:*

~~~
$ netstat -ntap
~~~

*This command will show you a long list of ports and connections that are open.*

## 3. Use Protocol 2

Again this is a simple one but can be overlooked. There are two protocol versions SSH uses, by default it should be set to 2, but be sure to check that version 2 is being used. For more information on why protocol 2 should be used instead of 1, [please refer to this webpage](http://www.snailbook.com/faq/ssh-1-vs-2.auto.html).

## 4. Disable Root Login

This one is interesting because it is a use-by-case recommendation. We highly recommend disabiling root login, because a common attack is to brute force against the name of the root superuser. 

**Please Note**: If you do plan on disabling Root Login, please test the SSH login with your non-root user that you plan to use for SSH logins **before** you disable the root account. If you don't, you may be stuck without a way to access your server through SSH.

To disable root login, navigate to the config file, locate the "PermitRootLogin" and change that to "no". This will make it so that you cannot login with the root user anymore.

~~~
PermitRootLogin no
~~~


## 5. Use Key-based Authentication

Key-based Authentication (aka Public key authentication), are a much more secure way of authenticating users as they are much less prone to brute force attacks. To enable key-based authentication, you must disable password authentication, this will leave your users with no choice but to use keys.

Look for these settings and apply the following changes:

~~~
PubkeyAuthentication yes
PasswordAuthentication no
~~~

For more information on key-based authentication and a more detailed guide on setting up keys, please refer to [this](https://linux-audit.com/using-ssh-keys-instead-of-passwords/) article.


## 6. Check Integrity of User Database

You've probably added users to the config file to allow trusted people to access your server. Make sure that there are no old users that have access to your server if they shouldn't. Again, maybe a bit obvious but can be overlooked.

## 7. Disable Agent Portforwarding

This is another example of something that is a use-by-case scenario. We do recommend disabling agent portforwarding if there is no legitimate use for it. Since it allows connections outside of your server whilst leaving a socket open on the local machine, anyone with sufficient permissions can connect to and use your local ssh-agent. This is a very unlikely scenario, however, is it worth the risk of having a compromised machine connected to your server with Agent Portforwarding enabled? For more information, please refer to this article [here](https://heipei.io/2015/02/26/SSH-Agent-Forwarding-considered-harmful/).

To disable agent portforwarding, navigate to the following setting in the config file and apply the changes:

~~~
AllowAgentForwarding no
~~~

## 8. Use of a Bastion Host

A bastion host is a special purpose computer on a network with the purpose of withstanding attacks. They usually host a single application (for example a proxy server) and all other services are removed or limited to reduce the threats on the network through the computer. 

Having a bastion host can act as a second line of defense against attackers on your network. To set one up, we recommend going through [this extensive guide](https://blog.scottlowe.org/2015/11/21/using-ssh-bastion-host/).

## 9. Limit Users Logging in over SSH

Limiting which users can login over SSH can save you from worrying who's able to login and who isn't. This point is bouncing off of point 6. To allow certain users, we will assume you want only users "Gecko" and "Marko" to login over SSH. Navigate to the SSH config file and add the following line:

~~~
AllowUsers Gecko Marko
~~~

## Conclusion

There are many other ways you can secure your OpenSSH configuration, we have outlined the glaring flaws that quite a few developers and admins overlook. We do recommend reading through the config file and checking what can be changed thoroughly as even the small mistakes can result in an attack on your server.

[WoTT](https://wott.io/) is a developer tool to automatically run CVE scans, audit service configurations, manage your firewalls, simplify mTLS, and more. By using this tool to scan your OpenSSH config, you can cut throught the hassle of looking for similar guides online or reading through your config files to make sure everything is as secure as it can be.
