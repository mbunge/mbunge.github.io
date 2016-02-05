---
layout:     post
title:      "Otto with PHP on Windows 7"
subtitle:   "Development environment for PHP applications"
author:     "Marco Bunge"
date:       2015-10-01 13:27:47
published:  2015-10-01 13:27:47
header-img: "img/modern-work-de.jpeg"
series:     "application development"
tags:
 - otto
 - development
 - environment
---

Otto has been created by the developers of vagrant. Otto has been developed with new gotten knowledge while vagrant development. 
Otto will developed simultaneously to Vagrant.

All code and files are stored to Github Repo <a href="https://github.com/mbunge/ottoPhpExample" target="_blank">OttoPhpExample</a>

## Prepare Otto

First of all we need to <a href="https://ottoproject.io/downloads.html" target="_blank">download</a> the latest version of otto. 
Unzip the binary to any folder and add the containing folder to your PATH.

If you typing `otto` in you cli you should get similar output.

```text
$ otto
usage: otto [--version] [--help] <command> [<args>]

Available commands are:
    build      Build the deployable artifact for the app
    compile    Prepares your project for being run.
    deploy     Deploy the application
    dev        Start and manage a development environment
    infra      Builds the infrastructure for the Appfile
    status     Status of the stages of this application
    version    Prints the Otto version
```

## Create development environment

### Init a new project with composer

If you already have a composer project you can skip this step.

Initialize a new project with `php composer.phar init` and follow the instructions. We won't install any dependencies.
After our project has been initalized we execute `composer install`.

<div class="callout callout-info">
    <h4>Download composer</h4>
    <p>Get the latest composer version: <code>curl -sS https://getcomposer.org/installer | php</code></p>
</div>

### Install vagrant and VirtualBox

Otto is using Vagrant for our deelopment environment. We need to <a href="https://www.vagrantup.com/downloads.html">download and install</a> Vagrant and <a href="https://www.virtualbox.org/wiki/Downloads" target="_blank">VirtualBox</a> first.

### Initialize Otto

First of all we need to create a custom Appfile which is looking like this:

```text
application {
    name = "otto-php-example"
    type = "php"
}

customization "php" {
    php_version = "5.6"
}
```

<div class="callout callout-info">
<h4>Appfile syntax is HCL</h4>
    <p>Getting more information about HCL syntax <a href="https://ottoproject.io/docs/appfile/syntax.html" target="_blank">here</a></p>
</div>

Simply execute `otto compile`. Otto is automatically detect your project type and prepares Otto to managae our app lifecycle. All needed files such as Vagrantfile has been created in will be saved in folder _.otto_.

You should get an output similar to the following:

```text
←[0m←[1m==> Loading Appfile...←[0m
←[0m←[1m==> Fetching all Appfile dependencies...←[0m
←[0m←[1m==> Compiling...←[0m
←[0m    Application:    ottoPhpExample (php)←[0m
←[0m    Project:        ottoPhpExample←[0m
←[0m    Infrastructure: aws (simple)←[0m
←[0m←[0m
←[0m    Compiling infra...←[0m
←[0m    Compiling foundation: consul←[0m
←[0m←[1m==> Compiling main application...←[0m
←[0m←[32m←[1m==> ←[32mCompilation success!←[0m
←[0m←[32m    ←[32mThis means that Otto is now ready to start a development environment,
    deploy this application, build the supporting infastructure, and
    more. See the help for more information.

    Supporting files to enable Otto to manage your application from
    development to deployment have been placed in the output directory.
    These files can be manually inspected to determine what Otto will do.←[0m
```

### Kickstart development environment

Execute `otto dev` and vagrant will be initalized and started.

<div class="callout callout-info">
<h4>Tip!</h4>
    <p>If Vagrant is throwing an error, simply restart your cli.</p>
</div>
<div class="callout callout-warning">
    <h4>Conclusion</h4>
    <p>Unforunatly it was not possible to create a stable dev environment with otto 0.1 for PHP on Windows 7. Please write a comment if you have some addtions. I'll keep track and add all improvements in this post or in linked posts. A new coming feature for otto 0.2 are apps which are interessting to test in combination with PHP.</p>
</div>
