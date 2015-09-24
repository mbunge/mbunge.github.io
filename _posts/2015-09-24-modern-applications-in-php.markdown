---
layout:     post
title:      "modern PHP application bootstraping"
subtitle:   "Dynamic bootstraping with middlewares"
date:       2015-09-19 09:44:00
author:     "Marco Bunge"
header-img: "img/modern-work-de.jpeg"
---

Modern Applications need a modern easy to use and extend worklflow with decoupled dependecies. A few framewroks like slim or StackPHP are using middlewares to deliver a extensible workflow on application level.

Since I'm working on an own collection of components to speed up my projects - private and @ work - to build a soultion on a resuable code base with in a short time.

## Setup with a Bootstrap

My first idea was to decouple any task of setup from my application in to an Bootstrap.

{% highlight php linenos %}
<?php

$application = new Furnace\Application\Application();
$bootstrap = new Furnace\Application\Bootstrap(__DIR__ . '/../app');

//start booting of my bootstrap
$application->boot($bootstrap);
$response = $application->run();
$response->send();
{% endhighlight %}

The idea is still good. My application is aware of all dependecies, the configuration and it's context while the bootstrap is setting my application up for it's runtime environment, like web, restApi or CLI.

Instead of using a monolitic Bootstrap, I want to be able to include all setups with a middleware dynamically. The middleware is running an instance of SetupInterface which is defind as follows:

{% highlight php linenos %}
<?php

namespace Furnace\Application;

interface MiddlewareInterface
{
    public function execute(ApplicationInterface $application);
}

{% endhighlight %}

A new Bootstrap definition would look like this:

{% highlight php linenos %}
<?php

use Furnace\Application;

$application = new Furnace\Application\Application();
$middleware = new Furnace\Application\MiddlewareCollection();
$middleware->middlewares(
  [
    /**
     * @param array $environemnts valid environments
     * @param bool  $autodetect 
     */
    new Setup\Environments(['development', 'staging', 'testing', 'production'], true),
    
    /**
     * @param array $configpath
     * @param bool  $environment aware 
     */
    new Setup\Configuration(__DIR__ . '/../config/', true),
    new Setup\ErrorHandling(),
    new Setup\Logging(),
    new Setup\Modules(),
    new Setup\ServiceProviders(),
    new \Custom\Setup\SilexServiceProviders(),
  ]
);

//or simple add
$middleware->addMiddleware(new \Custom\Setup\GeoCoder());

//or lamda stuff
$middleware->addMiddleware(function($application){
  $application->getContainer()->add('bar', new \Bar);
});

//boot application
$application->boot($middleware);

//you may want to do somthing fancy here!?

//dispatch and get the response
$response = $application->run();
$response->send();
{% endhighlight %}

Now we got a new decoupled, efficent way of application bootstraping.

> Inspired by https://mwop.net/blog/2015-01-08-on-http-middleware-and-psr-7.html
