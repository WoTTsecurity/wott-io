[![Build Status](https://travis-ci.org/WoTTsecurity/wott-io.svg?branch=master)](https://travis-ci.org/WoTTsecurity/wott-io)

## Development environment

In order to pin the runtime environment, we are using Docker for both the development process, as well as for building the production site.

Requirements:

 * Docker
 * Docker-Compose

Build the development environment using:

```
$ docker-compose build
```

To setup the development environment, run:

```
$ docker-compose up
```

You can now navigate to the page on [127.0.0.1:4000](http://127.0.0.1:4000).

Development-specific overrides are configured in [_config_dev.yml](https://github.com/WoTTsecurity/wott-io/blob/master/_config_dev.yml).

## Production environment

The production environment is built using [Travis CI](https://github.com/WoTTsecurity/wott-io/blob/master/.travis.yml) and then published to Github Pages as a static page.
