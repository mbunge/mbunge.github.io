---
layout:     post
title:      "Tools and services for modern applications"
subtitle:   "Modern Applications with PHP - Part 2"
author:     "Marco Bunge"
date:       2015-10-23 10:34:47
published:  false
header-img: "img/downloads-bg.jpg"
---

It's Friday, and as promised I will post every two weeks an article of my series "Modern Applications with PHP".

In the previous article a introduced this series and talked about the application development with components and it's benefits.

The requirements and types to modern applications are oftern very diffrent. Restful api
services, any kind of administration, form handlers, and much more.

For a modern application development process we need to ensure to work together in a team on the same sourcecode base, build, test, deliver changes and fixes as fast as possibile. We also need to ensure a stable and documented sourcecode base.

## The development environment

Their are tons of useful tools, services and standards to develop and provide php applications. We want to use still improving and well tested services and tools, like the following.

### GIT and Github

It is crucial to use a versioning tool like <a href="https://git-scm.com/">GIT</a> while development. Their are many advantages. Keeping track of all changes. Working on one sourcecode base with a hole team at the same time. Add new features or fixes without touching the stable sourcecode base with branching.

We want to use the <a href="https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows" target="_blank">git branching model</a> and <a href="http://semver.org/" target="_blank">semantic versioning</a> by default..

Our sourcecode will be hosted on <a href="https://github.com">GitHub</a>. We will be able to get access to many service integrations. Managing teams, projects and as well sourcecode is also smart and easy.

### Composer and Bower

<a href="https://getcomposer.org/" target="_blank">Composer</a> is helping to manage our php dependencies to other packages and also delivering a smart commond bus to define convinience commands for e.g. testing. Furthermore we will use composer to provide autoloading out of the box. 

<a href="http://bower.io/" target="_blank">Bower</a> is a similar tool to composer but specialized in managing dependencies for JS (Client-side and NPM) and CSS. Therefore Bower will be our tool provide all client-side packages and as well all tools to automate building, preprocessing which is more comfortable with npm and JS.

### Vagrant

Our development environment won't be our own os environment. We also need to keep in mind that our team members could have a diffrent environment configuration. Therefore we will use <a href="https://www.vagrantup.com/" target="_blank">Vagrant</a>, a smart virtualizing tool. We also want use the well-known dev LAMP stack <a href="https://box.scotch.io/" target="_blank">Scotch box</a> as our development environment.

### Travis CI and Coveralls

Continious integration with <a href="https://travis-ci.org/" target="_blank">Travis CI</a> is ensuring automated testing and building on each push and will raise our quality. Other developers also informed quickly when a build is not passing an integration.

<a href="https://coveralls.io/" target="_blank">Coveralls</a> is storing all test coverage history and statistics from travis ci.

### PHPUnit

All our sourcecode needs to be tested. We are not able to ensure a correct functionality of our application without any tests. Therefore we are using <a href="https://phpunit.de/" target="_blank">PHPUnit 4.8</a>


### PHP Code Sniffer (phpcs), editorconfig.org and PHP-FIG PSR-2

PHP Code sniffer is checking our sourcecode against the <a href="http://www.php-fig.org/psr/psr-2/" target="_blank">PSR-2 standard</a>, defined by PHP-FIG.

<a href="http://editorconfig.org/">Editorconfig</a> is using one file to specify your editorconfig. This is usefull, to work in teams and ensure the same config for the hole team. Editorconfig is providing a plugin for all known IDE's like NetBeans, SublimeText, VIM, PhpStorm, textmate <a href="http://editorconfig.org/#download" target="_blank">and many more</a>.

## What's next?

In the next post I will show you how to setup the project foundation, with all tools and services mentioned above. We will also create our first class, test it build it and will explore the magic CI process.  Feel free to ask questions! I would also be happy if you share this post.

## Roadmap

 - __Initializing our dev environment*__
 - A basic web application with basic routing and hello world
 - A basic CLI wrapper
 - Database connector
 - Custom views
 - Introducing MVC with the basic Blog-Example
 - a CLI-Interface to manage our blog
 - to be continued...

*in progress
