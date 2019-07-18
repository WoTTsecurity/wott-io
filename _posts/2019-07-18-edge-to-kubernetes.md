---
layout: post
current: post
cover: hacker-in-the-dark.jpg
title: Connecting Edge IoT devices with Kubernetes
date: 2019-07-18 08:00:00
category: tutorials
author: Viktor Petersson
tags: [Open Source]
class: post-template
---

# Bridging Edge IoT devices with Kubernetes

**Required Skill Level**: Medium to Expert

In my [last blog post]({{site.url}}/blog/tutorials/2019/07/15/mtls-with-nginx), we covered how to configure Nginx to use Mutual TLS (mTLS). This illustrated how mTLS can both simplify the back-end, while also make it more secure. In this article, we will take this one step further and integrate this with [Kubernetes](https://kubernetes.io/). If you haven't read the last blog post, that would be a good place to start.

Please note that this article assumes that you are familiar with Kubernetes and understands the fundamentals.

## Pre-requisites

Before we dive into the actual configuration, we will assume that you have the following already configured:

 * A Kubernetes cluster (d'oh!)
 * A valid SSL certificate for your domain
   * You can use [cert-manager](https://github.com/jetstack/cert-manager/) from our friends at [Jetstack](https://www.jetstack.io/) if you want to use Let's Encrypt
 * An [Nginx Ingress Controller](https://github.com/kubernetes/ingress-nginx) configured with the SSL certificate(s)
   * It is recommended that you use the [Nginx Helm Chart](https://github.com/helm/charts/tree/master/stable/nginx-ingress) for this
 * Familiarity with [Helm](https://helm.sh/)

## Getting started

With the cluster and ingress controller up and running, you should be able to route traffic to your services. If you're not familiar with this part, we recommend that you take a look at this Katacoda's [Kubernetes Ingress training scenario](https://www.katacoda.com/courses/kubernetes/create-kubernetes-ingress-routes).

Before proceeding further, we will assume that you now have an Nginx Ingress controller deployed, with some kind of service behind it that you can route traffic to in the 'foobar' namespace. In the example below, we will call this service 'foobar,' and it listens on port 80.

## Configuring mTLS for the Ingress Controller

Because the Nginx Ingress controller is already configured to support mTLS and subsequently does all the heavy-lifting, all we really need to do is to tell our Ingress object to use the built-in functionalities.

Before we do this however, we first need to download the WoTT CA and upload this to the cluster. Otherwise Nginx will not be able to verify the certificate.

To do this, let's assume that our application will run in the 'foobar' namespace within the cluster.


Create the namespace if it doesn't already exist:

```
$ kubectl create namespace foobar
```

Download the WoTT CA certificate bundle:
```
$ curl -s https://api.wott.io/v0.2/ca-bundle | \
  jq -r .ca_bundle > wott-ca.crt
```

Upload the CA certificate to the cluster:

```
$ kubectl create secret generic wott-ca \
  -n foobar \
  --from-file=ca.crt=wott-ca.crt
```

We can verify that we the secret was properly created by running:

```
$ kubectl get secrets -n foobar
NAME                  TYPE                                  DATA      AGE
[...]
wott-ca               Opaque                                1         4s
```

With CA in place, we can move on to configuring the [Ingress object](https://kubernetes.io/docs/concepts/services-networking/ingress/). The Ingress object is responsible for informing the Ingress Controller that it should route traffic addressed to a given hostname to a particular service.

Here's an example of the YAML file for such configuration (here we are using cert-manager for the SSL configuration):

```
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    certmanager.k8s.io/acme-challenge-type: http01
    certmanager.k8s.io/issuer: letsencrypt-prod
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/auth-tls-pass-certificate-to-upstream: "true"
    nginx.ingress.kubernetes.io/auth-tls-secret: foobar/wott-ca
    nginx.ingress.kubernetes.io/auth-tls-verify-client: "on"
    nginx.ingress.kubernetes.io/auth-tls-verify-depth: "2"
  name: mtls-test
  namespace: api
spec:
  rules:
  - host: mtls-test.example.com
    http:
      paths:
      - backend:
          serviceName: foobar
          servicePort: 80
        path: /?(.*)
  tls:
  - hosts:
    - mtls-test.example.com
    secretName: le-secret-mtls-test
```

The secret for mTLS lies in the varies 'auth-tls' annotations that we have above. These annotations tell Nginx to configure auth-tls (i.e. mTLS) for this endpoint.

We can now leverage the HTTP headers that Nginx is passing on to the appserver(s) just like we did in our [Nginx mTLS blog post]({{site.url}}/blog/tutorials/2019/07/15/mtls-with-nginx).

The two headers that you likely want to use are:

 * HTTP_SSL_CLIENT_VERIFY
 * HTTP_SSL_CLIENT_SUBJECT_DN

Once you have this all configured, you can now communicate directly from your IoT devices to your Kubernetes cluster using mTLS and the WoTT certificate as your identity:

```
$ sudo curl \
  --key /opt/wott/certs/client.key \
  --cert /opt/wott/certs/client.crt \
  https://mtls-test.example.com
```

Hopefully this all made sense. If not, feel free to reach out to use on Twitter at [@WoTTSecurity](https://twitter.com/wottsecurity).
