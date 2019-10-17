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

## Introduction

Today we're going to talk about SELinux - Security Enhanced Linux. For the everyday layman SELinux maybe daunting to setup, but is a good introduction into different ways to manage access control to your systems. More and more we give companies our precious data and the onus should be placed on developers to protect this data with growing cybersecurity threats. So we're going to show you how to implement SELinux for the security-conscious developer (and talk a little on AppArmor).

Proceed with caution though - SELinux and AppArmor are MAC protocols (more on that later) and you run the risk of locking yourself out of your own system. If you're interested in learning a bit more about SELinux and MAC protocols, read on below. If you just want to jump straight into the bare-bones edition, skip straight ahead to the [tutorial](#tutorial) itself.

**Required Skill Level**: Medium

**Time to Complete**: 30 minutes - 1 hour

**Prerequisites**:

 * Either:
    * have SELinux installed
    * use a Red Hat distribution of Linux
 * follow guide to install SELinux for Debian based Linux (Debian, Ubuntu, etc) using `apt` package
 * **have a virtual machine with your Linux distribution installed**
 * an understanding on MAC protocols (will make the tutorial easier) we give a brief introduction if you are not familiar.

But *please* test this out first on a VM to get familiar with MAC protocols as we do not want you locked out of your system.

## So what is SELinux and what is a MAC Model?

SELinux is a US National Security Agency project aimed at improving security in the Linux kernel (more specifically, kernel 2.6.x). You will already be familiar with Discretionary Access Control as it is the system employed by most consumer Operating Systems. File permissions are determined by the creator/user, in Linux this is the 'Access Control List' - think about times where you have used `chmod` or `sudo` to assign read or write permissions.

Mandatory Access Control, or MAC (not to be confused with Media Access Control) is different. Basically, the *operating system* determines access based on a security label (rules for access can be managed by a security officer- usually a single system administrator), not the user that created the file. For Linux, this system exists as SELinux.

The control is taken away from the user?! Why on Earth would you want that?! Many organisations deal with sensitive data like military or government. Within a military organisation, some information is reserved for specific individuals with associated security labels (need to know, top secret, etc;).

But beyond that, we tend to entrust our data to many corporations which we don't want everyone seeing. As a result, enterprise oriented Linux systems, like RedHat Enterprise Linux (RHEL) automatically have SELinux pre-installed. Familiarising yourself with it is absolutely the way to go.

Think of it this way: let's say you work for a hospital; you want to manage records of patients. Typically there are a few trusted individuals who have explicit access to these records (to update them, or manage them), but it is the governing board of regulations or the company itself that dictates how this information is shared. Of course, in a hospital, patient records should be confidential and strictly between patient and doctor. You may want another doctor to access your records, but you wouldn't want your employer or other hospital admin to.

In other words, there is a hierarchy that defines who has access to certain resources and information. At an organisation level, this is set by regulations. These regulations dictate MAC access.

## <a name = "tutorial"> </a> Setting up SELinux for yourself

SELinux is milder than most MAC models and a good introduction into implementing MAC for your own security. In SELinux, the system administrator is the security officer.

**Note**: There are Linux distributions that have SELinux preinstalled, such as RedHat Enterprise Linux (RHEL) and CentOS.


It's useful to have SELinux on your servers as it protects your server from malicious or flawed programs. The 'strength' of SELinux is at the discretion of the system administrator. It comes in 3 modes:

 * Disabled
 * Permissive
 * Enforcing

Permissive prints system warnings but does not enforce the protocol (useful for testing).

## Setting Up on Ubuntu/Debian

{% asset blog/selinux-install.png srcset:width="1300 2x" srcset:width="650 1x" alt="Install SELinux" %}

On Ubuntu or Debian, you need to install the required packages by running:

```
$ apt-get install selinux-basics selinux-policy-default auditd
```

If you're using Ubuntu, download [this](https://wiki.debian.org/SELinux/Setup?action=AttachFile&do=view&target=_load_selinux_policy) taken from the Debian Wiki. Copy it into: `/usr/share/initramfs-tools/scripts/init-bottom/` and run `update-initramfs -u ` in your terminal session.

Once done, you can check SELinux is installed/running:

```
# getenforce
Disabled
```

SELinux is installed but not running, you will need to activate and reboot:

```
# selinux-activate
# reboot
```

This should put SELinux into Permissive mode. To check, run `sestatus` and you should get the following:

```
SELinux status:                 enabled
SELinuxfs mount:                /sys/fs/selinux
SELinux root directory:         /etc/selinux
Loaded policy name:             default
Current mode:                   permissive
Mode from config file:          permissive
Policy MLS status:              enabled
Policy deny_unknown status:     allowed
Max kernel policy version:      30
```

## Setting Modes

Run:

```
# audit2why -al
[...]
```
This will return would-be blocked operations since your last boot. It is tedious but worth going through as SELinux has many reported bugs. We would suggest going through each bug one-by-one and follow [this Red Hat guide](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/security-enhanced_linux/sect-security-enhanced_linux-fixing_problems-allowing_access_audit2allow) for changing access using the `audit2allow` command.

If you are not confident, **we strongly suggest testing this on a virtual machine**.

You can now change the mode to enforcing:
 * to test, run: `setenforce = 1` in your terminal
 * or if you are confident, add `enforcing = 1` to the kernel command line in your `/etc/default/grub` file

and then reboot as earlier. You will now be running SELinux's default policy. To change this, simply manoeuvre back to the root user and set it back to permissive via `setenforce = 0`.

Provided you have access to the root user, you can feel free to play around with SELinux's [other policies](https://docs.fedoraproject.org/en-US/quick-docs/changing-selinux-states-and-modes/) until you are comfortable.

## Finishing Up

And that concludes our intro to SELinux. Play around with policies until you are comfortable, then you can ship SELinux to your own servers with confidence. SELinux essentially acts as a sandbox protecting your information from fradulent or corrupted access by external programs or daemons. As for AppArmor, it's just another MAC protocol that's used particularly for Ubuntu. It's easier to use as it deals with pathing rules; but SELinux is widely considered the more secure of the two. SELinux is better for those who are very familiar with Unix based systems, but AppArmor is another great introduction to MAC.

SELinux is a great way to implement security, but it is known for its bugs and disruptive mechanisms. Actual sandboxing is another alternative to protecting your kernel.

Good work getting to the end of this tutorial. You have taken a big step in securing your Linux environment. There are additional steps you can take to improve security posture like CVE scanning, firewall management and service configuration. WoTT can help you do that with a lightweight agent that scans for vulnerabilities and provides clear recommended actions to fix those issues. Get started [here]({{site.url}}/documentation/getting-started).
