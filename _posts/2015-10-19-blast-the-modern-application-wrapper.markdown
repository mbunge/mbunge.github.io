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

At the beginning, we need to plan our environment. Their are a huge collection of useful
tools.

We will use the following tools:

- __composer__ is managing our packages and dependencies
- __PuliPHP__ will manage our non-php-files - like pictures, config files, html views
- Our application is to the PSR standard, defined by __PHP-FIG__
- We want to provide a stable application, there for we need to test it in our case with __PHPUnit__
- __GIT__ is helping us to keep track of each change and provide team based development workflow

## Let's get up and running

Here we go, we will now define a common application setup.