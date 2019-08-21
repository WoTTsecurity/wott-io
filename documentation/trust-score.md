---
layout: docs-cat
description: 'Trust Score'
title: 'What is the WoTT Trust Score?'
full_description: What is the WoTT Trust Score, what it is used for and what does it say about the security posture of my devices?
---

After enrolling your first device into WoTT, you have likely noticed the big percentage meter on top of each device. This is what we call a Trust Score, and it's a corner stone of [Zero Trust Networking](https://www.oreilly.com/library/view/zero-trust-networks/9781491962183/). In real simple terms, a Trust Score is a score ranging from 0-1 for how much a given device can be trusted.

{% asset docs/trust-score.png srcset:width="1300 2x" srcset:width="650 1x" alt="WoTT Trust Score" class="img-fluid" %}

To make this real, let's create a scenario where an edge devices are sending data to two different services: an ERP system and a logging service. These two systems have very different threat models and we want our policies to reflect this. Assuming we've setup our logging policies properly (with write-only), there is little we can do with this access (other than perhaps flood the system until we reach our rate limiting). Because we require both read and write access to the ERP system in this scenario, this is a much more sensitive. Not only can we do more things, but the data in the ERP system is arguably much more sensitive.

In a Zero Trust Networking model, you would use Mutual TLS (see [Connecting Edge IoT devices with Kubernetes]({{site.url}}/blog/tutorials/2019/07/18/edge-to-kubernetes) and [Configuring Nginx with client certificate authentication]({{site.url}}/blog/tutorials/2019/07/15/mtls-with-nginx)) to grant each device access to these systems individually. This by itself is a major improvement over regular access control due to the cryptographic nature of Mutual TLS. However, to properly implement Zero Trust Networking, we take this one step further. This is where the Trust Scores comes into play.

Let's say we have five edge devices. Four of them have been patched with all the latest security updates, but for some reason, the fifth devices have not applied the latest security updates and is vulnerable to a known security issue (available in the CVE databases). As part of our access control, we can factor this in. Because this device has a known security issue, this will automatically be reflected in the Trust Score (e.g. the first four devices might have a Trust Score of 0.93, whereas the fifth would have a Trust Score of 0.76).

Tying this back to our scenario above, we might determine that for a device to talk to the logging service, we require a Trust Score above 0.5, but for the ERP system, the Trust Score needs to exceed 0.9. As such, because this fifth device's Trust Score is lower than the threshold, it will be prevented to talk to the ERP system before the issue has been rectified.

This is much how Google's implementation of Zero Trust Networking (called BeyondCorp) works. If a remote worker tries to access the various internal services, the patch level of the given device is one of the many variables as part of the Trust Score, which subsequently determines what a given worker can access (along with job responsibilities etc).

## Trust Score and WoTT

When you install the WoTT agent on one of your devices, one of the things it does is to collect information about the system. The data we check for includes (but not limited to):

* Default credentials found
* The kernel hardening features (such as AppArmor and SELinux)
* Firewall configuration
* Installed packages (which are then checked against known vulnerabilities)
* Network behavior
* Insecure running services (such as Telnet)

This data is submitted to our back-end, which is then sent to our Machine Learning models, which then returns a Trust Score for a given device.

## How do I improve my Trust Score?

If you navigate to a device, you should see "Recommended Actions" in the upper right-hand corner. This should give you one or more things that you do in order to bump up your Trust Score.
