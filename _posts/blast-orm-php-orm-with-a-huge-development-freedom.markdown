---
layout:     post
title:      "Blast ORM - PHP ORM with a huge development freedom"
subtitle:   "framework agnostic data access and persistence layer based on Doctrine 2"
date:       2016-02-05 23:54:47
published:  false
author:     "Marco Bunge"
header-img: "img/blogging-hands.jpg"
series:     "application development"
tags:
 - howto
 - github
 - jekyll
---

Two month ago I start to develop an ORM which is delivering a maximum of freedom to the developers. You just need to configure and use 
the query to talk to the database.

Blast orm is just released in version 0.1.2 and accessible via composer or github.

Blast orm is using a query object to manage access and persist data. An additonal repository is mediating between entities and query and 
is utilizing basic crud. Entities are representing database objects and don't need to follow a contract. 

I would like to show you how to use this orm with a simple user class.

## Install

``` bash
$ composer require blast/orm
$ composer require league/container
```

## Create user entity

```php
<?php

class User
{
    /**
     * @var int
     */
    private $id;

    /**
     * @var string
     */
    private $name;

    /**
    Primary key
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     * @return User
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }
}
```

## Configure Blast ORM

Pass database configuration and league container (you could any container which is compatible to container-interopt)

```php
<?php

use Blast\Orm\Manager;
use League\Container;

Manager::create(new Container(), 'mysql://root:root@localhost/user');

```

<div class="callout callout-success">
  <h4>Solution</h4>
  <p>Set <code>future: true</code> in <code>_config.yml</code> and your posts will be published asap.</p>
</div>

For more issues please read this <a href="" target="_blank">post on GitHub</a> and following Jekyll <a href="http://jekyllrb.com/docs/upgrading/2-to-3/" target="_blank">upgrade instructions</a>.
