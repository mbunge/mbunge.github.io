---
layout:     post
title:      "Building Applications with existing Components"
subtitle:   "Modern Applications with PHP - Part 1"
author:     "Marco Bunge"
date:       2015-10-10 12:24:47
published:  2015-10-10 12:24:47
header-img: "img/downloads-bg.jpg"
series:     "application development"
tags:
 - PHP
 - development
 - application
 - how-to
---

<blockquote cite="https://groups.google.com/forum/?hl=en#!original/comp.infosystems.www.authoring.cgi/PyJ25gZ6z7A/M9FkTUVDfcwJ">
	<h2>Rasmus Lerdorf on June 8, 1995:</h2>
	<p>Announcing the Personal Home Page Tools (PHP Tools) version 1.0.</p>
	<p>These tools are a set of small tight cgi binaries written in C.</p>
</blockquote>

There are a lot of macro-frameworks, micro-frameworks, components. All these lines has to be written to solve a problem: __Building applications on top of PHP.__ We want to save time and work efficent, we want to use well tested and integrated components to create our applications. 
__We want to use the power of the open source community to be reach our goal faster and share our results and experience with the open source community.__

## The basic lifecycle

We want to build a basic application by using existing components, without a specific framework. All these 
frameworks do have advantages and disadvantages. We want to use only the best solutions, which fits our needs.

An application could be everything. A small RSS-Reader, a command-line-tool, cron-worker, Webshop, Blog, 
API-Service, common website and so on. All these types of application are subdivided into two runtime environments:

 - Web
 - CLI
 
A common lifecycle is to receive an request, route to any type of control and display a response. A Web application 
is receiving a request and returning a response as a HTTP message. A CLI application is receiving a request from STDIN 
and is returning a response to stdout or stderr when an error occurs.

## The world of components

There are many components in the PHP-Land. Symfony, Zend, Aura PHP, StackPHP, the PHP league are organizations which develop component based frameworks, and components for a special usage. There are also more special components like HybridAuth, Geocoder, Doctrine, Propel, PHPUnit or Behat for a specific use.

With <a href="https://getcomposer.org/" target="_blank">composer</a>, a dependency manager, we are able to bundle or components and get ready for use.

## The goal

Creating one or more applications from scratch which is fitting our needs.

## Roadmap, continues release snapshots and development

A roadmap is the foundation of development tasks. The roadmap defines rough milestones for a project.

This series of Modern Applications with PHP has a defined roadmap:

 - Initializing our dev environment
 - A basic web application with basic routing and hello world
 - A basic CLI wrapper
 - Database connector
 - Custom views
 - Introducing MVC with the basic Blog-Example
 - a CLI-Interface to manage our blog
 - to be continued...

We also follow a modern release cycle with <a href="https://semver.org/" target="_blank">semantic versioning</a>,
<a href="https://keepachangelog.com/" target="_blank">changelog</a> and 
<a href="https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows" target="_blank">a branching workflow</a>.

We will also comply with the PSR standards defined by <a href="https://www.php-fig.org/" target="_blank">PHP-FIG</a>

## Waht's next?

A new post regarding to this series will published every two weeks. If you would like to still informed or contribute, just follow me on <a href="https://twitter.com/intent/user?screen_name=makk_eightbit" target="_blank">twitter</a> or via 
<a href="mailto:mjls@web.de?subject=Modern Applications with PHP" target="_blank">email</a> for detailed information.
 
## Wishes and suggestions

Tell me your thoughts, wishes and suggestions via <a href="https://twitter.com/makk_eightbit" target="_blank">twitter</a>, 
<a href="https://www.facebook.com/marco.bunge.dev" target="_blank">facebook</a> or in the comments.
