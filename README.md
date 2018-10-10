# OffiX

"Who is in the office?"

This documentation is decent, but it isn't super detailed, at least not yet. If
you're trying to set this up and have any questions, feel free to [open an
issue][issue] or send me an email (me@anishathalye.com). Check out the [blog post] (https://www.anishathalye.com/2016/06/03/whos-in-the-office/).

## Hardware Setup

* Raspberry Pi
    * Ralink RT5370
        * Works out of the box with Raspbian Jessie, supports monitor mode

## Software Setup

There are three main components in OffiX: a [WiFi sniffer](offix-sniffer/), a
[web interface](offix-web/), and the [Hubot](https://hubot.github.com/)
[plugin](hubot-offix/). Information about each component is in its own
directory.

### System Setup

To configure a static IP address, edit `/etc/network/interfaces` and add the
following:

```
auto eth0
iface eth0 inet static
	address x.x.x.x
	netmask x.x.x.x
	gateway x.x.x.x
```

To put the wifi card in monitor mode, run the following:

```bash
sudo ifconfig wlan0 down
sudo iwconfig wlan0 mode monitor
sudo ifconfig wlan0 up
```

**Note: This needs to be run on every reboot!**

To install node/npm on the Raspberry Pi, run:

```bash
wget http://nodejs.org/dist/v4.2.4/node-v4.2.4-linux-armv6l.tar.gz
cd /usr/local
sudo tar xzvf ~/node-v4.2.4-linux-armv6l.tar.gz --strip=1
```

To install RabbitMQ on the Raspberry Pi, run:

```bash
sudo apt-get update
sudo apt-get install rabbitmq-server
```

To install MongoDB on the Raspberry Pi, run:

```bash
sudo apt-get update
sudo apt-get install mongodb
```

## Architecture

The WiFi sniffer and web interface are meant to run on the Raspberry Pi. The
two communicate via a [RabbitMQ](https://www.rabbitmq.com/) instance running on
the Raspberry Pi.

## Development Tips

* This project uses [EditorConfig](http://editorconfig.org/)

## Contributing

Contributions in the form of bug reports/feature requests as well as pull
requests are much appreciated!

## License

Copyright (c) 2016 by the authors (see [AUTHORS.txt][authors]). Released under
GPLv3. See [LICENSE.txt][license] for details.

[issue]: https://github.com/anishathalye/offix/issues/new
[license]: LICENSE.txt
[authors]: AUTHORS.txt
