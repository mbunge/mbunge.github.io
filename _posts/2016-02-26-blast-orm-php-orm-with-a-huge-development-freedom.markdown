---
layout:     post
title:      "Blast ORM - PHP ORM with a huge development freedom"
subtitle:   "framework agnostic data access and persistence layer based on Doctrine 2"
date:       2016-02-26 23:54:47
published:  false
author:     "Marco Bunge"
header-img: "img/code.jpg"
series:     "application development"
tags:
 - howto
 - php
 - orm
 - database
---

Two month ago I start to develop an ORM which is delivering a maximum of freedom to the developers. My goal is easy configuration, a minimum of dependencies and performance while accessing data and independent entities.

Blast orm is just released in version 0.1.2 and accessible via composer or <a href="" target="_blank">github</a>.

Blast orm is using a query object to manage access and persist data. An additonal repository is mediating between entities and query and is utilizing basic CRUD. Entities are representing database objects and don't need to follow a contract. 

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
     * Primary key
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

## Create user table

The user table schema:

```sql
CREATE TABLE `user` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NULL,
	PRIMARY KEY (`id`)
)
```

Add the table programatically:

```php
<?php

Manager::getInstance()->exec('
CREATE TABLE IF NOT EXISTS user (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NULL,
	PRIMARY KEY (id)
)');
```

## Manage users

We use the repository to access and persist user data.

```php
<?php

use Blast\Orm\Repository;

$user = new User();
$userRepo = new Repository($user);

```

### create a new user

Before accessing users we need to create one:

```
<?php

$user->setName('Bob');
$userRepo->save($user);

```

### access and update user

```
<?php

//find bob by id
$user = $userRepo->find(1);
$user->setName($user->getName() . ' Jonson');

$userRepo->save($user);

```

### delete user

```
<?php

//delete user bob with id 1
$userRepo->delete(1);

```

## Upcoming v0.3 features

Relations and performance features will be relaesd in version 0.3.

