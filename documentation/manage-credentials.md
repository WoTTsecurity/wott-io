---
layout: docs-cat
description: 'Manage credentials with WoTT'
title: 'Getting started with managing credentials with the WoTT Agent and Dashboard'
full_description: We'll show you how to manage credentials, and how to easily rotate credentials for your devices using the WoTT dashboard and agent.
title_content: 'Manage credentials with WoTT'
---

## Managing your credentials through the WoTT Dashboard

It is unfortunately common that developers "bake in" credentials to both 3rd party services as well as credentials to the actual device into the firmware or software. This is commonly done out of convenience, despite it contradicting best practices. The downside with this however is that it both makes it very easy for an attacker or malicious user to extract this data. What makes matters worse is that these credentials are often shared across the entire fleet of devices. Depending on what type of credentials these are, the attacker could do things such as:

 * Perform a simple rate limiting attack, meaning that they perform enough requests per minute or hour until the 3rd party service cuts off the access, which then means that none of your other devices can interact with the 3rd party service.
 * Inject bogus data or delete your data, which can significantly impact your business operation.
 * Use these credentials as a stepping stone as part of a more sophisticated attack, where the attacker can escalate further into your infrastructure.

Assuming you as the developer even detect that that these credentials leaked, your only remedy is to issue a firmware update to the entire fleet in order to rotate the credentials. However, even this is a somewhat pointless exercise, as it the attacker can easily repeat the attack to gain access to the new credentials.

Enter WoTT. As per industry best practice dictates, you should never include credentials as part of your code base or firmware. WoTT makes enables you to easily separate out your credentials from the software. In real simple terms, the way it works is that you read the credentials from a JSON file on disk. Because of this separation, WoTT makes it easy to manage the credentials independently from the firmware. Moreover, as part of this separation, WoTT makes it easy to rotate keys across the entire fleet, or to provide unique credentials for every single device.

## Example: A shared, but easily rotatable, API key across the fleet

In scenarios where you might require an API key to a 3rd party service for your applications. Let's assume this is a non-critical service, weather service that looks up the temperature for given location (that is compared to the temperature from a sensor to calculate the temperature delta).

To do this, we login to the WoTT Dashboard. On the left of WoTT Dashboard you can see a section called "Credentials". Click on it.

{% asset docs/sidebar.png srcset:width="1300 2x" srcset:width="650 1x" alt="WoTT Dashboard sidebar" class="img-fluid" %}

Select 'Add a credential'

{% asset docs/credentials.png srcset:width="1300 2x" srcset:width="650 1x" alt="WoTT Credentias menu" class="img-fluid" %}

Let's break down the fields:

* **Name:** name of credential file, for example `my_app`.
* **Key:** contents of credential, for example: `api_key`.
* **Value:** actual value of the login/key required for access (the bit that should be hidden).
* **Owner:** optional field, recommended for Raspberry Pis. The owner is the Linux user that will own the file on the system. On Raspberry Pi, the default user is `pi`.
* **Tags:** must match the tags on the device that you are downloading to, such as 'my-app'

This should now be accessible on any device with the tag that you added. The agent will periodically fetch these credentials. To speed things up, you can run the command `sudo wott-agent credentials` when you are testing this out.

With the credentials synced, you should be able to find all credentials in the folder `/opt/wott/credentials/$USERNAME/$NAME.json`. To reveal the API key we generated above, simply run:

```
$ cat /opt/wott/credentials/pi/my_app.json
{
    "api_key": "abc123"
}
```

All we now need to do in our application is to instead of hardcoding the credentials in our application, we read them from the above JSON file. In most programming languages, this would merely require a few lines of code.

## Example: Unique keys per devices

In the above example, we used tags to assign a shared key to one or more devices in a fleet. In a perfect world, you'd have individual credentials for each device. WoTT enables you to do this too. We call this "Device Metadata". You can find this configuration if you navigate to a device and select the "Metadata" tab. You can then create as many per-device keys as you want. These can be anything from configuration values, to credentials.

If we for instance create a new key-value pair "Hello: World", we can read this back much as we did above:

```
$ sudo cat /opt/wott/device_metadata.json
{
    "manufacturer": "Raspberry Pi",
    "Hello": "World",
    "model-decoded": "Zero v1.2",
    "device-name": "My Device",
    "model": "900092",
    "device_id": "x.d.wott.local"
}
```

As you can see above, we automatically populate this file with some handy meta data that you might want want to use as part of your application logic.

Please do note that if you want to speed up a sync, you need to use the command `sudo wott-agent device-metadata`.
