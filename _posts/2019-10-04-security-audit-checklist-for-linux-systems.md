---
layout: post
current: post
cover:  fence.jpg
title: Why open source is critical for InfoSec
date: 2019-10-04 10:00:00
category: thoughts
author: Al Esmail
tags: [Open Source]
class: post-template
---

We so often hear from developers that they don’t need to worry about cyber security because they’re too small to be targeted or because they trust their service providers to take care of it for them. Sound like someone you know? Well, let’s start with a quick synopsis of recent cloud failures that were not targeted attacks and where service providers weren’t a silver bullet.  Each of these examples were simply failures in security hygiene.

## Security Fails

### Facebook

* **Year:** 2019
* **Security Fail:** Cultura Colectiva (a 3rd party user of Facebook data) exposed 500 million customer phone numbers
* **Cause:** AWS server was configured to be public facing
* **Source:** [CBS News](https://www.cbsnews.com/news/millions-facebook-user-records-exposed-amazon-cloud-server/)

### MongoDB

* **Year:** Ongoing
* **Security Fail:** 52,000 databases searchable through [Shodan](shodan.io)
* **Cause:** If MongoDB is installed with default server settings, it allows anyone to browse, download, edit or delete data
* **Source:** [KrebsOnSecurity](https://krebsonsecurity.com/tag/mongodb/)

### Capital One

* **Year:** 2019
* **Security Fail:** 100 million records including bank details and social security
* **Cause:** Misconfigured web application firewall (WAF) in AWS
* **Source:** [KrebsOnSecurity](https://krebsonsecurity.com/tag/capital-one-breach/)

### Medical facilities

* **Year:** Ongoing
* **Fail:** 187 servers with x-ray and medical data open to public. >1m records with medical procedures, etc.
* **Cause:** Medical data exposed to the public internet without requiring authentication
* **Source:** [ProPublica](https://www.propublica.org/article/millions-of-americans-medical-images-and-data-are-available-on-the-internet)


## Linux security audit checklist

Still think you’re above the fray? Well maybe you are, so the checklist below will just be reassurance that you and your team have already done everything you need to do. Let’s dig in  with this set of 5 security practices that can get you going in the right direction.

### 1. CVE scanner

The CVE databases are great but, but are you monitoring your system for known vulnerable packages? Most developers will setup a server and then perhaps just periodically update it a few times a year, leaving the server(s) vulnerable for an extended period of time.

CVE scanners solve this problem by checking the system packages in your operating system against the database and flagging packages that need an update.

### 2. Services audit

SSH is meant to be secure and is secure when it is configured correctly. Unfortunately, an error configuring SSH can mean that an attacker can apply a brute-force attack against your node(s). Root access, passwordless login, timeout intervals and updates are all points that need to be managed correctly.

The same is true for any service accessing your server. It’s important to regularly audit your services for threats and vulnerabilities.

### 3. mTLS (mutual TLS) for authentication

mTLS solves two problems: password management and client side authentication. There are great tools out there for secrets  management like [Vault by Hashicorp](https://www.vaultproject.io/)]. However, even more sophisticated than passwords and API keys is using TLS certificates for both client and server authentication.

The difficulty here is in setting up your own CA. [Let’s Encrypt](https://letsencrypt.org/) can be used but it is generally not advisable to use a public CA for your internal infrastructure. There are some reliable private CAs as a service like [WoTT](https://www.wott.io) that can support your needs.

### 4. Firewall configuration

Firewall configurations seem fairly trivial, yet so often this is the source of massive breaches at large companies (see above Facebook fail). Tracking and managing the appropriate access to servers can be incredibly difficult at scale.

### 5. SELinux and AppArmor

Security Enhanced Linux (SELinux) and AppArmor are Linux kernel security modules that support access control policies and include mandatory access controls. Enabling these tools is a rigorous process but provides hardening at the application level.

SELinux is more sophisticated in its settings but consequently presents more pitfalls to the developer since more decisions need to be made. AppArmor provides similar functionality but requires less customization.

## Automate cyber security checks

So you know what you need to do but that’s only part of the problem. The bigger part of the problem seems to be making sure these things actually get prioritized and handled consistently. We have a few tips for making that happen.

### Behavior

Agile development is too dynamic for retroactive security audits. Build security practice into your team processes and make it part of your DNA. Security does not belong in the hands of a single team, it should be part of a mindset and a culture at the organization level.

### Measure it to manage it

Create metrics to measure the security dimension and manage performance accordingly. Behavior is nurtured through culture, metrics and rewards. Find ways to attribute numbers to security posture of the individual, the team, the asset and reward your people for making improvements.

### DevSecOps is taking over.

Integrate security tools into your tool chain. Companies like [Snyk ](snyk.io) have done an excellent job of auditing dependencies and providing developers with real time feedback.  The [NIST](https://www.nist.gov/sites/default/files/documents/director/planning/report02-3.pdf) states that it is at least 10x cheaper to implement security before code is committed. It’s also faster to get things right the first time than to use up product and developer time on bug fixes that are retroactively identified by a security team.

Consider a tool like [WoTT](www.wott.io) to monitor, measure and provide actions to improve security.
