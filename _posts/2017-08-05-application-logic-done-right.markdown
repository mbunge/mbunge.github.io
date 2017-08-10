---
layout:     post
title:      "Application logic done right"
subtitle:   "How to organize source code with business logic"
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
---

Typically small http applications does only have to manage HTTP communication on top of a tiny MVC-Framework. A client performs a request, which is handled by a controller. The controller invoke the **model** and assigens the result data to a **view**. The **controller** converts the view into a response and delivers the response back to the client.

Enterprise applications are often accessible via HTTP, Sockets, RPC, CLI or any other interface. MVC is still present but requests and responses needs to be handled in the way of their interface requirements.

We don't want to write the same logic for each required interfaces. Furthermore we don't want to test and maintain code for each required interfaces. We want to write, test and maintain reusable source code at a central point of the application eco-system.

I show you how to organize reusable, testable and maintainable source code with business logic.

# Business logic

Business logic - aka Domain logic - performs operations between databases - **data tier** - and user interfaces - **presentation tier** and is part of a three-ier architecture. 

<figure>
 <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Overview_of_a_three-tier_application_vectorVersion.svg">
 <figcaption>
  <small><i>Public Domain, &copy; by <a href="https://commons.wikimedia.org/wiki/File:Overview_of_a_three-tier_application_vectorVersion.svg" target="_blank">Bartledan at Wikipedia English</a></i></small>
 </figcaption>
</figure>

A good implementation of business logic separates operations on presentation-layer with domain services and on data-layer with repositories. The resulting domain model gets consumed by a presenter which decorates output represented by a presentation model.  

The example code refers to the famous blog example.

## Repositories

Each repository organize all kinds of data retrieval and data access for a single entity, like entries of an database table. The repository converts data from data sources into a domain model and takes domain models and converts them to an entity.

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

## Domain Model

<a href="https://martinfowler.com/eaaCatalog/domainModel.html" target="_blank">Domain models</a> avoid operation from data source or data layer in general. They perform validation and decoration on data. For example it is able to validate and convert json into an PHP-Object and vice versa.

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

## Domain services

Domain services are responsible for a single context of use cases, like handling and authentication of users. Domain services process data represented by domain models and transfer them between presentation layer and repositories.

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

use Application\Domain\DomainService;

class PostService implements DomainService
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

### Presenter

The presenter uses the domain model for output decoration. The output is assigned to the presentation model which get returned by the presenter.

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
use Application\Presentation\StringPresentationModel;

class PostPresenter implements Presenter
{
    /**
     * @var PostModel
     */
    private $model;

    /**
     * @param PostModel $model
     */
    public function __construct(PostModel $model)
    {
        $this->model = $model;
    }

    /**
     * Take domain model and calculate presentation
     *
     * @return PresentationModel
     */
    public function present(): PresentationModel
    {
        $model = $this->model;
        $view = new View('blog/post', $model);

        return new StringPresentationModel($model, $view->render());
    }
}
```

### Presentation Model

The presentation model is aware of output and domain model. For simplicity the presentation model represents output as a string, but it could also a interface for output types.

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
     * @return string
     */
    public function getOutput(): string;
}
```

In our case we use the concrete string presentation model

```php
<?php
namespace Application\Presentation;

use Application\Domain\DomainModel;

class StringPresentationModel implements PresentationModel
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
     * PresentationModel constructor.
     * @param DomainModel $domainModel
     * @param string $output
     */
    public function __construct(DomainModel $domainModel, string $output)
    {
        $this->domainModel = $domainModel;
        $this->output = $output;
    }

    /**
     * @return DomainModel
     */
    public function getDomainModel(): DomainModel
    {
        return $this->domainModel;
    }

    /**
     * @return string
     */
    public function getOutput(): string
    {
        return $this->output;
    }

}
```


## Usage

Now you are able to use the domain service everywhere you need it. 

You could adapt the controller logic for other usages, like CLI, Socket Streams or anything else.

```php
<?php

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
        
        // build view for http model
        // domain model could also converted to a view model
        $view = new View('blog/default', $model);

        // build http response
        $response = new Response();
        $response->getBody()->write($view->render());

        return $response;
    }

}
```

# Further reading

### Command Bus

The design of a business service or repositories could be even cleaner by using a Command Bus like Tactician of <a href="https://tactician.thephpleague.com/" target="_blank">The PHP League</a>.

### Presenters

You could als dive deeper into presenters - a [decorator]() for the presentation, e. g. the http response - and the <a href="https://martinfowler.com/eaaDev/PresentationModel.html" target="_blank">presentation model</a>

### ADR

Paul M. Jones described ADR - Action-Domain-Responder - as a web-specific refinement of Model-View-Controller. <a href="" target="_blank">I recommend to getting know ADR</a> ;)

### More stuff

I recomment to read following articles:

- <a href="https://www.entropywins.wtf/blog/2016/11/24/implementing-the-clean-architecture/" target="_blank">Implementing the Clean Architecture</a>
- <a href="https://martinfowler.com/eaaCatalog/domainModel.html" target="_blank">Domain Models by Martin Fowler</a>
- <a href="https://martinfowler.com/eaaCatalog/repository.html" target="_blank">Repository by Martin Fowler</a>
- <a href="https://en.wikipedia.org/wiki/SOLID_%28object-oriented_design%29" target="_blank">SOLID (object-oriented design)</a>
- <a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller" target="_blank">MVC Pattern</a>
- <a href="https://en.wikipedia.org/wiki/Multitier_architecture#Three-tier_architecture" target="_blank">Three tier architecture</a>
- <a href="https://de.slideshare.net/aaronsaray/midwest-php-2013" target="_blank">Enterprise PHP Architecture through Design Patterns and Modularization</a>
