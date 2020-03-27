---
layout: post
current: post
cover: trail.jpg
title: Create audit trails with sudoreplay
date: 2020-03-27 12:00:00
category: tutorials
author: Viktor Petersson
tags: [tutorials]
class: post-template
---

`sudo` is a tool used by most Linux/UNIX users on a daily basis to escalate permission. If you're like me, you likely though that the features in `sudo` were "done" and final, just like you don't monitor the the changelog for new features in `tar` (or at least I'm not).

This is why I was so surprised when I saw [Peter Czanik](https://twitter.com/PCzanik)'s talk [
What you most likely did not know about sudo...](https://fosdem.org/2020/schedule/event/security_what_you_most_likely_did_not_know_about_sudo/) at FOSDEM '20. In the talk, Peter showed the new features in `sudo` 1.8, including the new `sudoreplay` feature. (Peter, if you're reading this, I'm still waiting for my sudo stickers :).

So what's `sudoreplay` and how can it help create an audit trail? Assuming you're using a distribution with `sudo` 1.8 or later (such as Ubuntu 18.04), you will already have `sudoreplay` installed. All you need is to configure it.

To do so, edit */etc/sudoers* by running `sudo visudo` and append the following two lines:

```
Defaults log_output
Defaults!/usr/bin/sudoreplay !log_output
```

With this done, you should be set. You can now verify that everything worked by first running a command with `sudo` (e.g. `sudo ls`), and then retrieve it from the audit trail using `sudoreplay`:

```
# sudoreplay -l
Mar 27 13:22:54 2020 : user : TTY=/dev/pts/0 ; CWD=/home/user ; USER=root ; TSID=000002 ; COMMAND=/bin/ls
```

That's it! You know have an audit trail.

Do however note that if you have not locked down your */etc/sudoers* file properly (e.g. if a user can run `sudo -` or `sudo rm [...]`), it is possible for a user to wipe the audit trail by simply deleting */var/log/sudo-io*. As such, you should not rely on this as your audit trail. To protect against this, it you should setup remote logging, such that your servers ship logs directly to a remote target (using rsyslog/syslog-ng or similar) in order to have untampered logs.

**References:**
* [Sudoreplay Manual](https://www.sudo.ws/man/1.8.13/sudoreplay.man.html)
