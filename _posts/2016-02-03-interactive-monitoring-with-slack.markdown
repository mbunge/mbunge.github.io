---
layout:     post
title:      "Interactive monitoring with Slack"
subtitle:   "Slack for REST-API debugging and error monitoring "
date:       2016-01-26 08:16:47
published:  2016-01-26 08:16:47
author:     "Marco Bunge"
header-img: "img/modern-work-de.jpeg"
series:     "application development"
tags:
 - application
 - development
 - howto
 - php
 - slack
---

We developed a REST-API for a customer project and used slack for debugging and error monitoring to get immediate response what happends on production.

We realized this with a PHP, Symfony HTTP-Foundation and monolog PSR-3 logger.

Positive was the immediate feedback, logging and monitoring of errors. A negative point was the massive flood of messages. Therefore we create a cluster of channels one for errors one for interactive debugging.

A great way to use slack in combination with your team.
