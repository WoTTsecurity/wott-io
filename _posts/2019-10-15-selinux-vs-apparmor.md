---
layout: post
current: post
cover: server-room.jpg
title: What is SELinux and Why You Might Want It
date: 2019-10-15 17:00:00
category: tutorials
author: Fiona McAllister
tags: [tutorials]
class: post-template
---

# What is SELinux? Who is it for? How do I Use it?

## Introduction

Today we're going to talk about SELinux- Security Enhanced Linux. For the everyday layman SELinux is well above what most people or companies require, but is a good introduction into different ways to manage access control to your systems. More and more we give companies our precious data and the onus should be placed on developers to protect this data with growing cybersecurity threats. So we're going to show you how to implement SELinux for the security-conscious developer (and talk a little on AppArmor).

Proceed with caution though- SELinux and AppArmor are MAC protocols (more on that later) and you run the risk of locking yourself out of your own system. If you're interested in learning a bit more about SELinux and MAC protocols, read on below. If you just want to jump straight into the bare-bones edition, skip straight ahead to the [tutorial](#tutorial) itself.