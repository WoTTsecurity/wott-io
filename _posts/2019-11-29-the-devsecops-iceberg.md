---
layout: post
current: post
cover: devsecops-iceberg.png
title: The DevSecOps Iceberg
date: 2019-11-29 10:00:00
category: thoughts
author: Viktor Petersson
tags: [open-source]
class: post-template
---

Security is a complicated topic. There are countless attack vectors and threat models to take into consideration when designing a security strategy.

Over the last year, we've spoken to companies of different sizes about their security strategies and practices. Based on these discussions, we've come up with something we call the DevSecOps Iceberg. The idea behind this is that too many organizations tend to only focus on the application layer or the network layer and turn a blind eye to everything else. This is a dangerous approach. Neglecting the other layers means that you may end up putting your entire infrastructure and data at risk.

To begin, let's define the three layers of the DevSecOps Iceberg and then explore what you can do to protect them:

* Application Layer
* Container Layer
* Operating System Layer

(Do however note that this article is by no means a comprehensive security checklist. It is merely an overview of the common layers.)

## The Application Layer

Let's start with the Application Layer, as this is likely the layer developers are most familiar with. Application security is a vast field by itself, but for the sake of this article, let's limit the scope to vulnerable dependencies.

It's not an understatement to say that open source libraries are essential to modern developers. Regardless if you're working on front-end or back-end services, you are most likely relying on a plethora of libraries to simplify (and speed up) your development. As a case in point, from Snyk's [The state of open source security (2019)](https://snyk.io/opensourcesecurity-2019/) reports that there was an astonishing 317 billion JavaScript packages downloaded from `npm` in 2018.

With a larger reliance on 3rd party packages in our source code, we are exposing ourselves to new risks. For instance, last year the popular `npm` package "event-stream" [was compromised](https://www.linux.com/news/compromised-npm-package-event-stream/) and as a consequence was able to pollute the entire supply chain of packages depending on this package. With more than 1.5m weekly downloads, this breach had a significant impact. As we are relying more on libraries, these types of attacks are likely to increase in the future.

So how can you protect yourself against attacks like this? This largely depends on your development workflow. If you're a modern company with frequent releases (daily or more) and a fully automated release pipeline using Continuous Integration (CI) and Contentions Delivery (CD), the best solution would be to include a dependency check as part of this pipeline. If a CVE is detected, the CI run should fail.

If you are releasing less frequently, using a service where you can submit your dependencies for ongoing audit, which will then alert you might be a better choice for you.

#### Suitable tools

* [Snyk](https://snyk.io/)
* GitHub's [Security Alerts](https://help.github.com/en/github/managing-security-vulnerabilities/about-security-alerts-for-vulnerable-dependencies)

## The Container Layer

Dependency vulnerability is usually where developers stop paying attention. This is why we have put the next layer under the surface in our illustration. While container layer security is no less important, it's often neglected.

Too many developers view containers as a Panacea that addresses all their issues, including security. While containers can help with security through isolation, attention still needs to be paid to security. If not, you may actually end up in a *worse* security state than without containers. For instance, most developers would consider it reckless to run a service as root on their host machine, but the same developer might run the same service as root inside a Docker container. By doing so, s/he opens up an attack vector that would not have existed otherwise.

If you're building your own images, you should follow security best practices for the image themselves. Aqua's [Docker Security Best Practices](https://blog.aquasec.com/docker-security-best-practices) provides a good guideline for this. However, it doesn't stop there. You need to build in vulnerability checking into your build pipeline. Tools like Aqua's MicroScanner makes this a painless process, and it helps you catch vulnerable packages in your Docker images.

Also, be careful when pulling Docker images from Docker Hub. In 2018 Docker [pulled 17 compromised Docker images](https://www.bleepingcomputer.com/news/security/17-backdoored-docker-images-removed-from-docker-hub/) from Docker Hub.


#### Suitable tools

* Aqua [MicroScanner](https://blog.aquasec.com/microscanner-free-image-vulnerability-scanner-for-developers)
* Sysdig [Secure](https://docs.sysdig.com/en/image-scanning.html)
* CoreOS (Now Red Hat) [Clair](https://coreos.com/quay-enterprise/docs/latest/clair.html)

## The Operating System Layer

Last, but no less important, we have the perhaps most neglected layer in recent time: the operating system. As the focus of developers have moved higher up in the abstraction layers, many companies have forgotten to patch their servers. Yes, it might not be as sexy as the latest JavaScript framework, but **if an attacker can gain root access on your VM, none of the other security layers considerations matter**.

Remember [Heartbleed](http://heartbleed.com/), [Spectre](https://spectreattack.com/) and [Meltdown](https://spectreattack.com/)? All of these affected the actual operating system. While containers could help mitigate some of these (to some degree), the actual operating system still needed to be patched. What we found surprising when talking to a number of companies was that they assumed these things were taken care of by their cloud provider (e.g. AWS).  Cloud providers usually offer some form of shared responsibility model that puts some onus on the user. AWS for instance [describes](https://aws.amazon.com/compliance/shared-responsibility-model/) security ‘of the cloud’ as their responsibility and security ‘in the cloud’ as the user responsibility.

You can partially mitigate the problem by using ephemeral servers (i.e. the 'Cattle' in the [Pet vs Cattle](https://news.ycombinator.com/item?id=7311704) analogy), and have short-lived and frequently replaced VM. This however assume that all new VMs always use the latest (patched) upstream, and that provision of the instances using something like CloudFormation, Terraform, CloudInit or a configuration management software (e.g. Puppet, Chef, Ansible). If however, you have long-lived servers (i.e. 'Pets'), you need to monitor the ongoing security posture of your servers. Yet, even if you are using short-lived servers, there is an attack window available.

While operating security doesn't fully fit into the CI/CD pipeline, it is important to continuously monitor the server state. This includes, but is not limited to:

* Service configuration (e.g. OpenSSH)
* Server hardening (i.e. the operating system itself)
* Scan all installed packages against known vulnerabilities (i.e. CVE scan)

To solve the pipeline problem, we at WoTT have solved with things like our [GitHub integration]({{site.url}}/blog/news/thoughts/2019/11/27/introducing-the-wott-github-integration).

#### Suitable tools

* [WoTT]({{site.url}})
* Red Hat [Satellite](https://www.redhat.com/en/technologies/management/satellite)
* Aqua [Security for Cloud VMs](https://blog.aquasec.com/secure-vm-cloud-native-security)
* Ubuntu [Landscape](https://landscape.canonical.com/)

# Conclusion

We hope that this article has provided a good overview of the different layers of security. As stated in the introduction, this is by no means a comprehensive security guide, but merely an overview. The takeaway is that you really should be using one tool in each category to improve your security posture, not just for the tip of the iceberg.

**Update 1:** Reworked wording to improve readability.
