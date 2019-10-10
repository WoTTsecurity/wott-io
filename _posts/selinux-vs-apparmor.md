---
layout: post
current: post
cover: chain.jpg
title: What is SELinux and Why You Might Want it
date: 2019-09-09 08:00:00
category: tutorials
author: Fiona McAllister
tags: [tutorial]
class: post-template
---
# What is SELinux? Who is it for? How do I Use it?

## Introduction

Today we're going to talk about SELinux, or Security Enhanced Linux; and a little on AppArmor. It's a fairly niche and unique way of managing access control in a system; and for the everyday layman is well above what most people or companies require. However in a growing world of cybersecurity threats, such systems will become more prevalent and important in security. More and more we give companies our precious data and the onus should be placed on developers to protect it. So we're going to show you how to implement SELinux for the security-conscious developer (and talk a little on AppArmor).

Proceed with caution though- SELinux and AppArmor are MAC protocols (more on that later) and you run the risk of locking yourself out of your own system. If you're interested in learning a bit more about SELinux and MAC protocols, read on below. If you just want to jump straight into the bare-bones edition, skip straight ahead to the [tutorial] itself.

## So what is SELinux and what is a MAC Model?

SELinux is a US National Security Agency project aimed at improving security in the Linux kernel (more specifically, kernel 2.6.x). You will already be familiar with Discretionary Access Control as it is the system employed by most consumer Operating Systems. File permissions are determined by the creator/user, in Linux this is the 'Access Control List' - think about times where you have used `chmod` or `sudo` to assign read or write permissions.

INSERT IMAGE

Mandatory Access Control, or MAC (not to be confused with Media Access Control) is different. Basically, the *operating system* determines access based on a security label (rules for access can be managed by a security officer), not the user that created the file. For Linux, this system exists as SELinux. 

The control is taken away from the user?! Why on Earth would you want that?! Well, as a commercial user you might not (and commercially bought machines won't have MAC protocols). 
But what if you're dealing with extremely sensitive data like military data? Within a military organisation, some information is reserved for specific individuals with associated security labels (need to know, top secret, etc;).

Think of it this way: let's say you work for a hospital; you want to manage records of patients. Typically there are a few trusted individuals who have explicit access to these records (to update them, or manage them), but it is the governing board of regulations or the company itself that dictates how this information is shared. Of course, in a hospital, patient records should be confidential and strictly between patient and doctor.
But let's say you see a different doctor, that doctor needs to be able to access your records; or a nurse refills a prescription, they can write a new prescription but can't necessarily read your file. You wouldn't want the janitor to see your medical records- but you do want them to have access to the cleaning inventory!
In other words, there is a hierarchy that defines who has access to certain resources and information. At an organisation level, this is set by regulations.

Selinux vs Apparmor
Selinux not default on Ubuntu (Apparmor is)
Debian has Selinux
