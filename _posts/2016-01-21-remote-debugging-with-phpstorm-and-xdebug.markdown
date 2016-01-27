---
layout:     post
title:      "Remote debugging with PHPStorm and Xdebug"
subtitle:   "Remote php application debugging, also works with vagrant!"
author:     "Marco Bunge"
date:       2016-01-21 16:44:53
published:  2016-01-21 16:44:53
header-img: "img/downloads-bg.jpg"
series:     "application development"
categories:
  - php
  - application
  - debugging
---

Nowadays we are working with virtual machines or remote environments by default. We have big development cycles, 
working with project teams on compley solutions. We are using versioning like git. We just need to fit these modern development 
standards. 

__One of these standards is remote debuging.__

Let's assume we have a development, staging and production environment. An error occurs on staging or production for any reasons. 
First of all, this error should not happend, but exists. The written code is still correct. And again the error should not exist. 
At this point, we want to debug and solve this problem. Smart as Sherlock Holmes - _with a minimum amount of time and a maximum of efficiency_.

Xdebug is perfectly good integrated in <a href="https://www.jetbrains.com/phpstorm/" target="_blank">PHPStorm</a>. Let's debug on any remote system, 
including <a href="https://www.vagrantup.com/" target="_blank">Vagrant</a> - __which is still remote on your local machine__.

I assume a Ubuntu / Debian os, but you could still adapt this how to for any OS. I use the vagrant <a href="https://box.scotch.io/">Scotch Box 2.5</a> as very good working a LAMP stack.

## prepare Xdebug on remote system

We need to install xdebug

`sudo apt-get install php-xdebug`

and configure it. 

`nano /etc/php5/apache2/conf.d/20-xdebug.ini`

Add following lines to configuration file (zend_extention should be already configured):

{% highlight ini %}
xdebug.remote_enable = on
xdebug.remote_connect_back = on
{% endhighlight %}

__Gratulations, we finish the easy part.__

## Get PHPStorm ready for Xdebug and remote debugging

### Deployment Server

We need to tell PHPStorm were our root location is and how to connect to this location.

- select `File | Settings > Build, Execution, Deployment | Deployment`
- click green '+' and choose Type 'SFTP' and a name associated with vhost ServerName 
- __choose `conection` settings as follows__

{% highlight text %}
SFTP Host: 127.0.0.1
Port: 2222
Root path: <click auto detect!!!>
User name: vagrant
Auth type: Password
Password: vagrant

---- some other configuration ----

Webserver url: <associated with vhost ServerName !!!!>
{% endhighlight %}

- choose __mappings__ tab
- Leave all options as is, expect the following `Deployment path on server '<given servername>': /var/www`

### Remote interpreter

PHPStorm needs to no 

- select `File | Settings > Language & Frameworks | PHP`
- click __[...]__ beside interpreter and after that green '+' and choose 'remote'
- choose SSH Credentials and configure as follows

{% highlight text %}
Host: 127.0.0.1 Port: 2222
User name: vagrant
Auth type: password
Password: vagrant

---- some other configuration ----

PHP executable: /usr/bin/php5
{% endhighlight %}

### Mappings

We need to configure mappings on remote server, to find sources and stop on breakpoints on our local system.

- select ```File | Settings > Language & Frameworks | PHP | Servers```
- click green '+' and add following:

{% highlight text %}
Name: any name associated with vhost ServerName 
Host: (configured ServerName in vhosts!): in my case scotch.box
Port: 80
Debugger: xdebug
{% endhighlight %}

__If you use Vagrant:__ root folder should be associated with mounted folder in Vagrantfile 
{% highlight text %}
config.vm.synced_folder ".", "/var/www", :mount_options => ["dmode=777", "fmode=666"]
{% endhighlight %}

- choose for root `/var/www`
__Optional:__ If you use an further folders folder like laravel public for index.php and assets, create an additonal mapping for this location: `/var/www/public`

### Debugger

- select `Run | Edit configurations`
- click green '+' and choose `PHP Web Application`

### Let's have fun

Create a breakpoint by click on any linenumber with a method or other control structure like `ìf`.

#### Default debugging

You are now debug with clicking on `Run > Debug`.

#### Smart debugging

In PHPStorm active rmote listening for debug connections by clicking `Run > Start listening for PHP debug connections`

Or you could use these convenience snippets to enable debugging directly within your application or as shortcut in your browser:

- <a href="javascript:(/** @version 0.5.2 */function() {document.cookie='XDEBUG_SESSION='+'PHPSTORM'+';path=/;';})()">Start debugger</a>
- <a href="javascript:(/** @version 0.5.2 */function() {document.cookie='XDEBUG_SESSION='+''+';expires=Mon, 05 Jul 2000 00:00:00 GMT;path=/;';})()">Stop debugger</a>

## Reference Links:

 - <a href="http://www.sitepoint.com/install-xdebug-phpstorm-vagrant/" target="_blank">How to Install Xdebug with PHPStorm and Vagrant</a>
 - <a href="https://confluence.jetbrains.com/display/PhpStorm/Working+with+Remote+PHP+Interpreters+in+PhpStorm" target="_blank">Adding a remote PHP interpreter over SSH</a>
 - <a href="https://www.jetbrains.com/phpstorm/help/debugging-php-applications.html" target="_blank">Debugging PHP Applications</a>
 - <a href="https://www.jetbrains.com/phpstorm/help/zero-configuration-debugging.html" target="_blank">Zero debugging configuration</a>
 
## Conclusion

It's a lot work, but it is a well proofed configuration. I used this for many projects in production and while develop software, websites with wordpress or shops with magento. It still works fine.

If you have questions, improvements or something else, just write a comment or tell me at <a href="https://twiiter.com/makk_eightbit" target="_blank">twitter</a>.
