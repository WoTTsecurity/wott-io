--
layout: docs-cat
description: 'Frequently asked questions regarding WoTT'
title: 'Frequently Asked Questions'
full_description: Some frequently asked questions we receive at WoTT regarding our Agent and services, we hope you find the answer to your questions here but please refer to our support thread if you are in need of more assistance.
title_content: 'FAQ'
---

# Dashboard FAQ

## What are default credentials? <a name="default-credentials"></a>
Default credentials are credentials (usually username/password combinations), such as admin/admin that device producers put in during manufacturing. These are intended to be temporary and changed by the user as soon as possible. In reality however, many users fail to change this, leaving the device(s) vulnerable to attackers.

Default credentials are usually attributed to one of the biggest problems in IoT, and enabled malware like [Mirai](https://en.wikipedia.org/wiki/Mirai_(malware)) to spread like wildfire.

WoTT will automatically scan your devices for default credentials. We have built a database that includes not only the data set that Mirai used (to ensure you won't get compromised), but also additional credentials we've found to be common.

If the WoTT Dashboard displays a warning that default credentials were found, we strongly recommend that you quickly resolve this issue.

Default credentials will lower your device's Trust Score.

## What is SELinux? <a name="selinux"></a>
[SELinux](https://selinuxproject.org/page/Main_Page), short for Security Enhanced Linux, provides more granular access control to Linux. You can use this to limit what your applications can and cannot do. Therefore if the application were to get compromised, the attacker is restricted in the damage they can inflict. For instance, you can configure what network resources and interprocess communication (IPC) the application can use.

The possible modes in WoTT's dashboard are:

 * Disabled
 * Enabled
 * Enforcing

(Where Enforcing will give you the best Trust Score).

## What is AppArmor? <a name="apparmor"></a>
[AppArmor](https://wiki.ubuntu.com/AppArmor) is similar to SELinux, and also provides more granular access control for processes. It is for instance heavily leverage in [Ubuntu Core](https://ubuntu.com/core) to confine what a particular application can and cannot do.

It is recommended that you either use AppArmor *or* SELinux (not both) for the best security posture of your device.

## What is Firewall Policy? <a name="firewall-policy"></a>
A firewall can be configured with two default policies:

 * Accept by default
 * Deny by default

If you select "Accept by default," all inbound communication is allowed unless explicitly blocked. With a "Deny by default" all incoming traffic is blocked, unless explicitly allowed.

The most secure firewall configuration is "Deny by default."

## What are open connections? <a name="open-connections"></a>
Open connections are network connections (incoming or outgoing) reported by the WoTT Agent during its last run. We monitor this on an ongoing basis in order to determine what the normal behavior of the device is. Contrary to a workstation, an IoT device tends to have very predictable network operations. Hence, by monitoring the network behavior for abnormalities, we are able to find potentially malicious activities.

## What is a device certificate? <a name="device-certificate"></a>
A device certificate is the public part of the cryptographic identity of a device (the private part is called a "private key"). Using the device certificate, we are able to perform cryptographic operations that only the device in possession of the private key can decrypt or interact with.

An example of how this can be used is found in our [Google Core IoT example]({{site.url}}/tutorials/2019/06/14/google-core-iot), where we upload the device certificate to Google in order to grant the device access to communicate to Google's IoT services. In this example, the device uses its private key to prove its identity.

The URL found in the dashboard is permanent, and you will always be able to download the latest certificate; but it is recommended that you do this programatically due to the short life span of the certificates. An example of how to do this can be found [here](https://github.com/WoTTsecurity/google-core-iot).

## What is Device/Node ID? <a name="device-id"></a>
The (WoTT) Node ID (formerly known as "Device ID"), is the unique identifier in WoTT. When creating policies, like in our [Nginx + Appserver example]({{site.url}}/blog/tutorials/2019/07/15/mtls-with-nginx), this is the identity we use for each node. Because this is a cryptographic identity, is is possible to issue challenges to the node and be certain that the node is what it claims to be.

## What's an FQDN? <a name="fqdn"></a>
An FQDN, or Fully Qualified Domain Name, is the hostname that the system itself has been given. This can either be a private name (like my-device.local) or a public name (like my-device.company.com). An FQDN is used to identify the device on a network.

# Recommended Actions FAQ

## OpenSSH: PerminRootLogin <a name="openssh-permitrootlogin"></a>

It is strongly recommended that you disable root login over SSH. The reason for this is that you shouldn't login as root remotely, and instead utilize something like `sudo` to escalate privileges whenever needed (i.e. don't use root as your day-to-day user account).

By changing "PermitRootLogin" to "no", you disable root login over SSH.

For more details, please see the [sshd_config man page](https://linux.die.net/man/5/sshd_config).

## OpenSSH: AllowAgentForwarding <a name="openssh-allowagentforwardng"></a>

AllowedAgentForwarding is convenient, as it allows you to use your local SSH keys on a remote host. This is useful when you want to use a host to jump to another host (e.g. a bastian/Jump server).

However, there is a known attack vector where another user on the jump box could intercept your key(s), which is why it is recommended to disable this feature unless you explicitly need it.

By changing "AllowAgentForwarding" to "no", you improve the security.

For more details, please see the [sshd_config man page](https://linux.die.net/man/5/sshd_config).

## OpenSSH: PasswordAuthentication <a name="openssh-passwordauthentication"></a>

PasswordAuthentication, as the name implies, allows you to authenticate using passwords. This should be avoided whenever possible, as it exposes your servers to brute-force attacks (i.e. if there is a user with a weak password on the system, the system is likely to be breached eventually).

To mitigate this, we recommend disabling password logins entirely. **Do however note** that before you do this, you need to generate and install your SSH key(s) on the remote system. If not, you will lock yourself out. For more information on how to get started with OpenSSH keys, please see [this article](https://help.ubuntu.com/community/SSH/OpenSSH/Keys).

For more details, please see the [sshd_config man page](https://linux.die.net/man/5/sshd_config).

# Agent FAQ

## What Operating Systems does the WoTT Agent support? <a name="wott-operating-system"></a>
See [this page](https://github.com/WoTTsecurity/agent#supported-operating-systems) for an up to date list.

## Do I need a WoTT Dashboard account to use the WoTT Agent? <a name="do-i-need-dashboard"></a>
Strictly speaking, no; you will still have access to the certificates. However, we *highly* recommend registering and using the Dashboard. The Dashboard provides a user friendly interface where you can easily visualize and monitor your nodes as well as seeing what security risks your nodes have and how to fix them. Additionally, the WoTT Dashboard is free to use, you just need to register with your email.

## I've installed the WoTT Agent, now what? <a name="steps-after-installation"></a>
Firstly, thank you for installing the Agent and welcome to the world of security conscious IoT developers! If you need some inspiration, head to our Use Cases page. You'll find a list of use cases and examples utilizing both our CA provided certificates and Dashboard managed credentials. We've included examples of some popular cloud services which you may already have projects on and how to secure them.

## Is WoTT Open Source? <a name="wott-open-source"></a>

Yes, the WoTT Agent is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## I'm a developer and want to modify your code/can't run virtualenv <a name="developing-for-wott-language)"></a>

The WoTT Agent is written in Python 3. You will need the relevant libraries to create virtual environments, in this case `venv` not `virtualenv`. Linux by default comes with Python 2.7 installed- install `pip3` using `apt-get` to get access to `venv` to create your own virtual environments; and when running applications that use WoTT Agent, use `python3`. Additionally any modifications you wish to make must also be in Python 3.
