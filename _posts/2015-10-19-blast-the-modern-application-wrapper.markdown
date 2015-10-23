---
layout:     post
title:      "Reusing components to build scalable applications"
subtitle:   "A smart way to build modern applications"
author:     "Marco Bunge"
date:       2015-10-15 10:34:47
published:  false
header-img: "img/downloads-bg.jpg"
---

The requirements and types to modern applications are oftern very diffrent. Restful api
services, any kind of administration, form handlers, and much more.

I show you, how to build an application based on already existing and well tested 
components.

## The foundation

At the beginning, we need to plan our environment. Their are tons of useful tools and services to develope and provider php applications. We want to use following still improving and well tested services and tools.

- __GIT__ is helping us to keep track of each change and provide team based development workflow
- __composer__ is managing our packages and dependencies
- __Travis CI__ is our free continious integration tool. It is running 
- We want to provide a stable application, therefore we need to test it in our case with __PHPUnit__
- Our application is to the PSR standard, defined by __PHP-FIG__

### GIT and Github

It is crucial to use a versioning tool like <a href="https://git-scm.com/">GIT</a> while development. The advantage is to keep track of all changes, working on the source code with a hole team at the same time and you could easily add new features without touching the stable code base with branching.

We are also want to work with the <a href="https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows" target="_blank">git branching model</a> and <a href="http://semver.org/" target="_blank">semantic versioning</a>. 

Our code will be hosted on GitHub, a great social development host. GitHub is integrating many other services, and you managing projects is smart and easy.

Alternatives to Git: <a href="http://tortoisesvn.net/index.html" target="_blank">SVN</a>, <a href="https://www.mercurial-scm.org/" target="_blank">Mercurial (hg)</a>

### Composer and Bower

<a href="https://getcomposer.org/" target="_blank">Composer</a> is helping to manage our php dependecies to other packages and also delivering a smart commond bus to define convinience commands for e.g. testing. We will use composer also to provide autoloading out of the box. 

<a href="http://bower.io/" target="_blank">Bower</a> is a similar tool to composer but specialized in managing dependencies for JS (Client-side and NPM) and CSS. Therefore Bower will be our tool provide all client-side packages and as well all tools to automate building, preprocessing which is more comfortable with npm and JS.

### Vagrant

Our development environment won't be our own os environment. We also need to keep in mind that our team members could have a diffrent environment configuration. Therefore we will use <a href="https://www.vagrantup.com/" target="_blank">Vagrant</a>, a smart virtualizing tool. We also want use the well known dev LAMP stack <a href="https://box.scotch.io/" target="_blank">Scotch box</a> as a base environment.

### Travis CI and Coveralls

Continious integration with <a href="https://travis-ci.org/" target="_blank">Travis CI</a> is ensuring automated testing and building on each push and will raise our quality. Other developers also informed quickly when a build is not passing an integration.

<a href="https://coveralls.io/" target="_blank">Coveralls</a> is storing all test coverage history and statistics from travis ci.

### PHPUnit

All our source code needs to be tested. We are not able to ensure a correct functionality of our application. Therefore we are using <a href="https://phpunit.de/" target="_blank">PHPUnit 4.8</a>


### PHP Code Sniffer (phpcs), editorconfig.org and PHP-FIG PSR-2

PHP Code sniffer is checking our code against the <a href="http://www.php-fig.org/psr/psr-2/" target="_blank">PSR-2 standard</a>, defined by PHP-FIG

## What's next?

In the next post I will show you how to setup the project fpundation, with all tools mentioned above. Feel free to ask questions!
