---
layout:     post
title:      "PHPUnit setup in PHPStorm 10.x"
subtitle:   "Setup a project specific testing environment"
date:       2016-03-01 21:51:00
published:  2016-03-01 21:51:00
author:     "Marco Bunge"
header-img: "img/testing.jpg"
series:     "application development"
tags:
 - howto
 - php
 - phpunit
 - phpstorm
---

PHPUnit is a well-known unit testing framework based on xUnit architecture for PHP developed by <a href="https://sebastian-bergmann.de/" target="_blank">Sebastian Bergmann</a>.

I show you how to setup a project specific testing environment with PHPUnit in PhpStorm 10.x within five steps. This testing environment allows you to test http and console applications.

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

### 3. Create test folder

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

Run `composer dumpautoload` to avoid autoload conflicts.

### 4. Create a new test with PhpStorm

<video src="http://www.marco-bunge.com/img/new-phpunit-test.mp4" autobuffer controls style="width: 100%">
   <source src="http://www.marco-bunge.com/img/new-phpunit-test.mp4" type="video/mp4">
</video>

### 5. Setup PHPUnit in PHPStorm for your current project

<video src="http://www.marco-bunge.com/img/setup-phpunit-in-phpstorm.mp4" autobuffer controls style="width: 100%">
   <source src="http://www.marco-bunge.com/img/setup-phpunit-in-phpstorm.mp4" type="video/mp4">
</video>

<div class="callout callout-success">
  <h4>Remote PHP Intepreter</h4>
  <p><a href="https://confluence.jetbrains.com/display/PhpStorm/Working+with+Remote+PHP+Interpreters+in+PhpStorm" target ="_blank">Setup remote PHP interpreter</a></p>
</div>


