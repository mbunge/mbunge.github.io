---
layout:     post
title:      "phpunit setup in PHPStorm 10.x"
subtitle:   "project specific and convinient unit testing"
date:       2016-03-02 14:05:00
published:  false
author:     "Marco Bunge"
header-img: "img/code.jpg"
series:     "application development"
tags:
 - howto
 - php
 - phpunit
 - phpstorm
---

PHPUnit is a well-known unit testing framework based on xUnit architecture for PHP developed by ![Sebastian Bergmann](https://sebastian-bergmann.de/). It based on the 

I show you how to setup a project specific testing environment with PHPunit in PhpStorm 10.x within 3 steps. Within this testing environment allows you to test http and console applications.

### 1. Install PHPUnit with composer

<div class="callout callout-success">
  <h4>Execute composer command</h4>
  <p>If you use composer as phar archive, then use <code>php composer.phar</code>.</p>
  <p>If you use composer runtime, then use <code>composer</code></p>
</div>

Execute following command to install PHPUnit based in your PHP version.

<div class="callout callout-success">
  <h4>Check PHP Version</h4>
  <p>CLI: <code>php -v</code>.</p>
  <p>In browser: <code>phpinfo();</code></p>
</div>

#### PHP 5.6 and greater

```bash
$ composer require phpunit/phpunit
```

#### PHP 5.6 and lower

```bash
$ composer require phpunit/phpunit:~4.8
```

### 2. Create the PHPUnit config file

Create `phpunit.xml` in your project root folder.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit bootstrap="vendor/autoload.php">
    <testsuites>
        <testsuite name="Package Test Suite">
            <directory suffix=".php">./tests/</directory>
        </testsuite>
    </testsuites>
</phpunit>
```

### Create test folder and unit tests

Create the folder `tests` in your project root folder and register tests to autoloader in your `composer.json`.

```json
...
  "autoload-dev": {
    "psr-4": {
      "App\\Tests\\": "tests"
    }
  }
...
```

Create a new test with PhpStorm:

<video src="https://s3.amazonaws.com/img0.recordit.co/s8mGikqxkd.mp4?AWSAccessKeyId=AKIAINSRFOQXTN4DT46A&amp;Expires=1456866415&amp;Signature=k%2BVsQXwYriFAuObUVyd8djzBiXg%3D">
   <source src="https://s3.amazonaws.com/img0.recordit.co/s8mGikqxkd.mp4?AWSAccessKeyId=AKIAINSRFOQXTN4DT46A&amp;Expires=1456866415&amp;Signature=k%2BVsQXwYriFAuObUVyd8djzBiXg%3D" type="video/mp4">
</video>
