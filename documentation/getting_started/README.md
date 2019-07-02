# Getting Started

Welcome to WoTT - the first step to securing your IoT devices.

## A brief overview of WoTT's services

WoTT's primary goal is to simplify and manage end-to-end security for IoT developers. 
We provide this in a number of ways:

- Simplified encryption of device communication
- Cryptographic identity (verification of access)
- Enabling the removal of hard coded credentials from web applications and firmware

You can access all these features by installing the [WoTT Agent](https://github.com/WoTTsecurity/agent) and using the [WoTT IO dash](https://dash.wott.io) to manage your devices through a simple and user-friendly interface. We'll walk you through step-by-step in setting up and installing the WoTT agent so you can start to implement hassle-free security on your IoT devices. 

Ultimately we want to give you the developers the safety of secure devices on the internet so you can integrate your projects on a multitude of platforms without the complexity of managing individual certificates or authenitication. WoTT secures your projects so that you don't have to.

## A little more on 'cryptographic' identity

Our lightweight agent handles identifying your device as well as verifying inter-device communication cryptographically [1]. What this essentially means is that the agent assigns a certificate from WoTT's own certificate authority (CA) to your device to secure it [2]. This is the cryptographic aspect of WoTT's security provisions. The agent does this based on a unique value assigned to your device which acts as an identifier to other devices. 
The purpose of this is to restrict access to trusted devices - WoTT secured devices - preventing fraudlent access and attacks. 

* [1] Done through mutual TLS (mTLS)
* [2] WoTT does this using an x509 security certificate. These certificates refresh every 7 days.

The certificates are managed entirely by WoTT - the only thing you need to do to obtain a WoTT certificate and begin securing your device is the WoTT Agent itself.

## Credentials and WoTT IO Dash

In an ideal world, we would do away with the need for usernames and passwords entirely and rely on cryptographic identity alone. However, servers cannot verify identity in browsers via cryptographic identity (yet). There is no way for example for Google to verify who you are which is why you are required to login in order to access your email or other Google account services. The same applies to Web Applications that you may develop as an IoT developer that can be accessed by any browser.

As a developer, you will likely be accessing a large range of internet/cloud services that require basic HTTP authentication; or MQTT services that are accessed via an API key. In most instances, such credentials are hard coded into applications and can be easily read with access to said application. WoTT introduces credential management in such a way you can remotely download the necessary credentials onto your device as a JSON file and remove the need for hard coded keys and logins from your application. This is done via our Dasboard which you can use to both view and monitor your devices. The Dash gives your device a trust score (based on how secure it is) as well as giving you the means to add and manage credentials for whatever purpose you need them for.

## Installing the WoTT agent and claiming your device

We will now run you through the process of setting up the WoTT agent on your device and claiming it on the WoTT IO Dashboard where you can begin managing it. 
First, create an account for the [WoTT IO dashboard](https://dash.wott.io) and login - you will need this to claim your device later.

Currently, the Agent is only available to Debian package distributions. You will need either Raspbian for Pi or Debian on a desktop machine. You will also need to have `curl` installed.

To install the agent, run the following in terminal:

```
$ curl -s https://packagecloud.io/install/repositories/wott/agent/script.deb.sh | sudo bash
$ sudo apt install wott-agent
```
With the WoTT Agent successfully installed, your terminal will output your WoTT Device ID, claim token, and a link to claim the device. Copy and paste this link into your browser. If you are logged in from earlier, the fields may already have autofilled. Otherwise fill in the details in the relevant fields.

![claim device](https://github.com/WoTTsecurity/wott-io/blob/master/documentation/getting_started/images/claim-device.png)

You can view your Device ID and claim token using the following commands as well:

```
$ wott-agent whoami
$ wott-agent claim-token
```
Your device will now be registered on the WoTT Dash and viewable in the main dashboard. 
Through the dashboard you will be able to see the relative trust scores of your WoTT devices. You can also see device specific information by selecting them and adding tags to these devices (this is relevant for credential management) as well as what you can do to improve the trust score. 

The below image shows an example of a Raspberry Pi with its WoTT meta tags (automatically assigned based on hardware) and the user's personal tags for the Pi's purpose.

![raspberry pi profoile](https://github.com/WoTTsecurity/wott-io/blob/master/documentation/getting_started/images/rasbpi-profile.png)

## Managing your own credentials through the Dash

Earlier we touched upon scenarios where you might require API keys or logins for your applications. You will notice on the left hand side of the WoTT Dash a sidebar containing a few options. 

![sidebar](https://github.com/WoTTsecurity/wott-io/blob/master/documentation/getting_started/images/sidebar.png)

One of these options is 'Credentials.' WoTT provides a means to manage and use credentials so you can download these onto your devices for your applications or hardware. Navigate to the 'Credentials' page and you will be able to add a new credential. You'll see the following form

![credentials](https://github.com/WoTTsecurity/wott-io/blob/master/documentation/getting_started/images/credentials.png)

Let's break down the fields:

- **Name:** refers to the name of the credential file. We reccommend you name it something relevant to your application/hardware; for example `my_app`. 
- **Key:** this is the credential's contents. For example, an `api_key`, `login_details`, or simply `credentials`.
- **Value:** the value of the login/key required for access (the bit that should be hidden). This should be done in `username:password` format for a login.
- **Owner:** optional field, reccommended for Raspberry Pis. The owner refers to Linux user that will own the file on the system. On Raspberry Pi, the default user is `pi`.
- **Tags:** assign tags to your credentials to match the tags on the device that you are downloading to. This way only the credentials you need are downloaded.

Once you've added a credential, you can check for it on your device by running:

```
cat /opt/wott/credentials/NAME.json
```
Note that you will either have to wait 15 minutes for the WoTT agent to refresh or restart it immediately with:
```
sudo service wott-agent restart
```
Additionally, older Pi hardware may take longer to load these certificates, so do wait a few minutes if the file has not downloaded yet. 

## Finishing notes

You're now set up with both the WoTT Agent and Dash and have taken the first steps in securing your IoT hardware and applications. 

WoTT certificates refresh every 7 days, so you will need to account for that in your applications.
Credentials are downloaded either when WoTT fetches data or when restarted. 

These certificates and credentials can now be used to secure end-to-end device communication and web applications, check out some of the use cases and examples on the [WoTT Agent Github](https://github.com/WoTTsecurity/agent) for inspiration and ideas on how to use WoTT for your own projects.