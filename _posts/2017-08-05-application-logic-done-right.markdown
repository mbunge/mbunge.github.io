---
layout:     post
title:      "Application logic done right"
subtitle:   "How to organize a clean, testable and reusable application logic"
date:       2017-08-05 02:14:00
published:  2017-08-05 02:14:00
author:     "Marco Bunge"
header-img: "img/code.jpg"
series:     "application development"
tags:
 - PHP
 - development
 - how-to
 - application
 - clean
 - application logic
---

<div class="callout callout-info">
  <h4>Update 2017/08/11</h4>
  <p>I've got confused by the term of domain logic and application logic. Therefore I quote the differences between application services and domain services by <a href="http://gorodinski.com/blog/2012/04/14/services-in-domain-driven-design-ddd/" target="_blank">Lev Gorodinski</a></p>
</div>

**A special thanks to <a href="http://paul-m-jones.com/" target="_blank">Paul M. Jones</a> for reviewing this post.**

Typically small http applications does only have to manage HTTP communication on top of a tiny MVC-Framework. A client performs a request, which is handled by a controller. The controller invoke the **model** and assigens the result data to a **view**. The **controller** converts the view into a response and delivers the response back to the client.

Web based enterprise applications are often accessible via different user interfaces through protocols like HTTP, Sockets, RPC, CLI. The Model-View-Controller is still present as a user-interface pattern. But requests and responses needs to be handled in the way of their interface requirements.

We don't want to write the same logic for each required interfaces. Furthermore we don't want to test and maintain code for each required interfaces. We want to write, test and maintain reusable source code at a central point of the application eco-system.

I show you how to organize a clean, testable and reusable application logic.


# An introduction

## Three-tier architecture

In a three-tier-architecture business logic performs operations between databases - **data tier** - and user interfaces - **presentation tier**. 

<figure>
 <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Overview_of_a_three-tier_application_vectorVersion.svg">
 <figcaption>
  <small><i>Public Domain, &copy; by <a href="https://commons.wikimedia.org/wiki/File:Overview_of_a_three-tier_application_vectorVersion.svg" target="_blank">Bartledan at Wikipedia English</a></i></small>
 </figcaption>
</figure>

## Domain-driven-design

Domain layer and application layer are very different in domain-driven-design. The application layer coordinates the domain layer with application services, where as domain services executing business logic on the domain layer.

<figure>
 <img src="http://dddsample.sourceforge.net/images/layers.jpg">
 <figcaption>
  <small><i><a href="http://dddsample.sourceforge.net/architecture.html" target="_blank">Domain-Driven-Design by Source Forge</a></i></small>
 </figcaption>
</figure>

### Application services vs. domain services

I recommend reading <a href="http://gorodinski.com/blog/2012/04/14/services-in-domain-driven-design-ddd/" target="_blank">Services in Domain-Driven Design (DDD) by Lev Gorodinski</a>. A short list of differences quoted by Lev's post:

> The differences between a domain service and an application services are subtle but critical:
> 
> - Domain services are very granular where as application services are a facade purposed with providing an API.
> - Domain services contain domain logic that can’t naturally be placed in an entity or value object whereas application services orchestrate the execution of domain logic and don’t themselves implement any domain logic.
> - Domain service methods can have other domain elements as operands and return values whereas application services operate upon trivial operands such as identity values and primitive data structures.
> - Application services declare dependencies on infrastructural services required to execute domain logic.
> - Command handlers are a flavor of application services which focus on handling a single command typically in a CQRS architecture.

## My thoughts for web related architecture

My understanding and implementation of business logic for the web separates operations on presentation and persistence. Application services process results for the presentation, e. g. HTTP-Response and repositories perform operations on persistence, e. g. database, filestorage. Source code needs to be framework-independent, reusable and furthermore easy to maintain. 

Furthermore most web applications are client-server applications and need to match client-side and server-side requirements. This worth a separate post, because REST-Apps does have a requirement on HTTP but not JavaScript and therefore no real requirements to the client.

## My meaning of the term _clean_

Clean business logic is unequal to clean architecture. I focus on a clean implemantation and separation of business logic based on principles of domain-driven-design.

# Implementation

Based on my expierience, I show you how to implement a business logic layer in conjunction with a presentation layer and combine them in a MVC-Controller. 

## Business logic

### Repositories

Each <a href="https://martinfowler.com/eaaCatalog/repository.html" target="_blank">repository</a> organize all kinds of data retrieval and data access from a data source, like entries of a database table. The repository converts data into domain model and vice versa.

<div class="callout callout-success">
  <h4>Definition by Martin Fowler</h4>
  <p>Mediates between the domain and data mapping layers using a collection-like interface for accessing domain objects.</p>
</div>

```php
<?php

namespace Application\Domain;

interface Repository
{

}
```

And the post repository could look like this

```php
<?php

namespace Application\Domain\User;

use Application\DataSource\DataSource;
use Application\Domain\Repository;

class PostRepository implements Repository
{
    /**
     * @var DataSource
     */
    private $dataSource;

    /**
     * Repository constructor.
     * @param DataSource $dataSource
     */
    public function __construct(DataSource $dataSource)
    {
        $this->dataSource = $dataSource;
    }

    /**
     * Find by slug
     *
     * @param $slug
     * @return PostModel|null
     */
    public function findBySlug($slug)
    {
        $record = $this->dataSource->newQuery()
            ->from('posts')
            ->where('slug', $slug)
            ->first();

        if (null === $record) {
            return null;
        }

        return $this->buildModel($record);
    }

    /**
     * Find by id
     *
     * @param int $id
     * @return PostModel|null
     */
    public function find(int $id)
    {
        $record = $this->dataSource->newQuery()
            ->from('posts')
            ->where('id', $id)
            ->first();

        if (null === $record) {
            return null;
        }

        return $this->buildModel($record);
    }

    /**
     * @param $record
     * @return PostModel
     */
    private function buildModel($record): PostModel
    {
        $model = new PostModel();
        $model->setTitle($record->title);
        $model->setContent($record->content);
        $model->setSlug($record->slug);
        return $model;
    }
    
}

```

### Domain Model

<a href="https://martinfowler.com/eaaCatalog/domainModel.html" target="_blank">Domain models</a> avoid operation from data source or data layer in general. They perform validation and decoration on data. For example it is able to validate and convert json into a PHP-Object and vice versa. The domain model is also able to decorate data, e. g. `PostPresentationModel::getKeywords`.

<div class="callout callout-success">
  <h4>Definition by Martin Fowler</h4>
  <p>An object model of the domain that incorporates both behavior and data.</p>
</div>

```php
<?php
namespace Application\Domain;

interface DomainModel
{

}
```

The Post model could look like this

```php
<?php

use Application\Domain\DomainModel;

class PostModel implements DomainModel
{
    /**
     * @var string
     */
    private $slug;

    /**
     * @var string
     */
    private $title;

    /**
     * @var string
     */
    private $content;

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @param string $title
     */
    public function setTitle(string $title)
    {
        $this->title = $title;
    }

    /**
     * @return string
     */
    public function getContent(): string
    {
        return $this->content;
    }

    /**
     * @param string $content
     */
    public function setContent(string $content)
    {
        $this->content = $content;
    }

    /**
     * Get keywords from kmeans clusterer
     * @return array
     */
    public function getKeywords(): array
    {
        $kMeans = new KMeans(2);
        $vectorizer = new StringVectorize();
        $samples = $vectorizer->vectorize($this->getContent());
        return $kMeans->cluster($samples);
    }

    /**
     * @return string
     */
    public function getSlug(): string
    {
        return $this->slug;
    }

    /**
     * @param string $slug
     */
    public function setSlug(string $slug)
    {
        $this->slug = $slug;
    }

}
```

### Application services

Application services are responsible for a single context of use cases, like handling and authentication of users. Application services process data represented by domain models and transfer them between presentation layer and repositories.

```php
<?php

namespace Application\Domain;

interface DomainService
{

}
```

And the post service looks like this

```php
<?php

namespace Application\Domain\User;

use Application\Domain\ApplicationService;

class PostService implements ApplicationService
{
    /**
     * @var PostRepository
     */
    private $repository;

    /**
     * BusinessService constructor.
     * @param PostRepository $repository
     */
    public function __construct(PostRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Load post by id or slug
     *
     * @param $identifier
     * @return PostModel
     */
    public function loadPost($identifier): PostModel
    {
        $model = null;

        if (is_numeric($identifier)) {
            $model = $this->repository->find($identifier);
        } elseif (is_string($identifier)) {
            $model = $this->repository->findBySlug($identifier);
        }

        if (null === $model) {
            throw new PostNotFoundException('Unable to find post');
        }

        return $model;

    }

}
```

## Presentation logic

Presenters and presenation models are separted from business logic. A presentation model takes a domain model and behavioral input data. The presentation model output gets decorated by a presenter based on behavioual data - input - and domain model.

### Presenter

The presenter consumes the presentation model and decorates it with output based on behavioral data from input and domain model.

```php
<?php

namespace Application\Presentation;

interface Presenter
{

    /**
     * Take domain model and calculate presentation
     *
     * @return PresentationModel
     */
    public function present(): PresentationModel;

}
```

The post presenter looks like this

```php
<?php


namespace Application\Presentation\Presenters;

use Application\Domain\User\PostModel;
use Application\Presentation\PresentationModel;
use Application\Presentation\Presenter;
use Application\Presentation\PostPresentationModel;

class PostPresenter implements Presenter
{
    /**
     * @var PostModel
     */
    private $model;

    /**
     * @param PostPresentationModel $model
     */
    public function __construct(PostPresentationModel $model)
    {
        $this->model = $model;
    }

    /**
     * Decorate presentation model
     *
     * @return PresentationModel
     */
    public function present(): PresentationModel
    {
        $model = $this->model;
        
        // we assign the presentation model,
        // for a better architecture we should assign a specific view model
        $view = new View('blog/post', $model);
        $this->model->setOutput($view->render());

        return $model;
    }
}
```

### Presentation Model

The <a href="https://martinfowler.com/eaaDev/PresentationModel.html" target="_blank">presentation model</a> is aware of input data / output data and behaviour of the presentation layer.

<div class="callout callout-success">
  <h4>Definition by Martin Fowler</h4>
  <p>Represent the state and behavior of the presentation independently of the GUI controls used in the interface</p>
</div>

```php
<?php
namespace Application\Presentation;

use Application\Domain\DomainModel;

interface PresentationModel
{
    /**
     * @return DomainModel
     */
    public function getDomainModel(): DomainModel;

    /**
     * @return mixed
     */
    public function getInput();

    /**
     * @return string
     */
    public function getOutput(): string;
}
```

The Post presentation model with a key word decorator `PostPresentationModel::getKeywords`

```php
<?php

namespace Application\Presentation;

use Application\Domain\DomainModel;

class PostPresentationModel implements PresentationModel
{
    /**
     * @var DomainModel
     */
    private $domainModel;
    /**
     * @var string
     */
    private $output;
    /**
     * @var
     */
    private $input;

    /**
     * PresentationModel constructor.
     * @param DomainModel $domainModel
     * @param $input
     */
    public function __construct(DomainModel $domainModel, $input)
    {
        $this->domainModel = $domainModel;
        $this->input = $input;
    }

    /**
     * @return DomainModel
     */
    public function getDomainModel(): DomainModel
    {
        return $this->domainModel;
    }

    /**
     * @return mixed
     */
    public function getInput()
    {
        return $this->input;
    }

    /**
     * @return string
     */
    public function getOutput(): string
    {
        return $this->output;
    }

    /**
     * @param string $output
     */
    public function setOutput(string $output)
    {
        $this->output = $output;
    }

}
```


## Usage

You could adapt the controller logic for other usages, like CLI, Socket Streams or anything else. Our BlogController acts as a HTTP-Controller of MVC.

```php
<?php

namespace Application\Http\Controllers;

use Application\Domain\User\PostRepository;
use Application\Domain\User\PostService;
use Application\Presentation;
use Application\Presentation\Presenters\PostPresenter;

class BlogController
{

    /**
     * @var PostService
     */
    private $postService;

    public function __construct()
    {
        $this->postService = new PostService(new PostRepository(new DataSource()));
    }

    /**
     * Perform simple logic
     *
     * @return Response
     */
    public function getPost(Request $request): Response
    {
        // get input data
        $data = $request->getInput();

        // recognize domain model
        $model = $this->postService->loadPost($data['identifier']);

        // build presentation
        $presenter = new PostPresenter(new Presentation\PostPresentationModel($model, $request));
        $presentationModel = $presenter->present();

        // build http response
        $response = new Response();
        $response->getBody()->write($presentationModel->getOutput());

        return $response;
    }

}
```

As you can see the application service performs logic where as the presenter processes the response. The next task could be to reduce the building of the response by using a HTTP-Based presenter.

# Further reading

## Command Bus

The design of a business service or repositories could be even cleaner by using a Command Bus like Tactician of <a href="https://tactician.thephpleague.com/" target="_blank">The PHP League</a>.

## Presenters

You could als dive deeper into presenters - a <a href="https://sourcemaking.com/design_patterns/decorator" target="_blank">decorator</a> for the presentation, e. g. the http response - and the <a href="https://martinfowler.com/eaaDev/PresentationModel.html" target="_blank">presentation model</a>

## ADR

Paul M. Jones described ADR - Action-Domain-Responder - as a web-specific refinement of Model-View-Controller. <a href="http://pmjones.io/adr" target="_blank">I recommend to getting know ADR</a> ;)

## Inversion of Control

The examples initiate classes directly. <a href="https://en.wikipedia.org/wiki/Inversion_of_control" target="_blank">Inversion of control</a> separates initialisation logic of classes from application logic. For a better and cleaner architecture I recommend IoC by using a <a href="http://container.thephpleague.com/">Dependecy injection containers</a>. These encapsulates initialization logic into separate providers.

## Implementing clean architecture

<figure>
 <img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Clean_Architecture_%2B_DDD%2C_full_application.svg">
 <figcaption>
  <h4><a href="https://www.entropywins.wtf/blog/2016/11/24/implementing-the-clean-architecture/" target="_blank">Implementing the Clean Architecture by Jereon De Dauw</a></h4>
  <small><i>CC0 1.0, &copy; by <a href="https://commons.wikimedia.org/wiki/File:Overview_of_a_three-tier_application_vectorVersion.svg" target="_blank">Jeroen De Dauw</a></i></small>
 </figcaption>
</figure>

## More stuff

I recomment to read following articles:

- <a href="https://en.wikipedia.org/wiki/SOLID_%28object-oriented_design%29" target="_blank">SOLID (object-oriented design)</a>
- <a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller" target="_blank">MVC Pattern</a>
- <a href="https://en.wikipedia.org/wiki/Multitier_architecture#Three-tier_architecture" target="_blank">Three tier architecture</a>
- <a href="https://de.slideshare.net/aaronsaray/midwest-php-2013" target="_blank">Enterprise PHP Architecture through Design Patterns and Modularization</a>
