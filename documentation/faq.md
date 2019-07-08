---
layout: docs-cat
description: 'Frequently asked questions regarding WoTT'
title: 'Frequently Asked Questions'
full_description: 'Some frequently asked questions we receive at WoTT regarding our Agent and services, we hope you find the answer to your questions here but please refer to our support thread if you are in need of more assistance.'
title_content: 'FAQ'
---

* [What Operating Systems does the WoTT agent support?](#wott-operating-system)
* [Do I need a WoTT Dashboard account to use the WoTT Agent?](#do-i-need-dashboard)
* [I've installed the WoTT Agent, now what?](#steps-after-installation)
* [Is WoTT Open Source?](#wott-open-source)
* [I'm a developer and want to modify your code/can't run virtualenv](#developing-for-wott-language)

## What Operating Systems does the WoTT agent support? <a name="wott-operating-system"></a>
Currently the WoTT Agent can only be installed on Debian package distributions of Linux such as Debian itself or Rasbpian for Pi. This is because the WoTT Agent installation requires Debian packages (`apt` and `dpkg`); although we are working on adding new systems- your favourite Linux distro will be added soon.

## Do I need a WoTT Dashboard account to use the WoTT Agent? <a name="do-i-need-dashboard"></a>
Strictly speaking, no; you will still have access to the certificates. However, we *highly* reccommend registering and using the Dashboard as it will give you access to WoTT's credential management which is useful in securing web and browser based applications. The Dash provides a user friendly interface where you can easily visualise and monitor your devices as well as seeing what security risks your devices have and how to fix them. Additionally, the WoTT Dashboard is free to use, you just need to register with your email.

## I've installed the WoTT Agent, now what? <a name="steps-after-installation"></a>
Firstly, thank you for installing the Agent and welcome to the world of security conscious IoT developers! If you need some inspiration, head to our Use Cases page. You'll find a list of use cases and examples utilising both our CA provided certificates and Dashboard managed credentials. We've included examples of some popular cloud services which you may already have projects on and how to secure them.

## Is WoTT Open Source? <a name="wott-open-source"></a>

Yes, the WoTT agent is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## I'm a developer and want to modify your code/can't run virtualenv <a name="developing-for-wott-language)"></a>

The WoTT Agent is written in Python 3. You will need the relevant libraries to create virtual environments, in this case `venv` not `virtualenv`. Linux by default comes with Python 2.7 installed- install `pip3` using `apt-get` to get access to `venv` to create your own virtual environments; and when running applications that use WoTT Agent, use `python3`. Additionally any modifications you wish to make must also be in Python 3.