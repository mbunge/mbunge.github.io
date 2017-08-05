---
layout:     post
title:      "Application logic done right"
subtitle:   "How to organize code within MVC pattern"
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
---

Typically small http applications does only have to manage HTTP communication on top of a tiny MVC-Framework. A client performs a request, which is handled by a controller. The controller invoke the **model** and assigens the result data to a **view**. The **controller** converts the view into a response and delivers the response back to the client.

Enterprise applications are often accessible via HTTP, Sockets, RPC, CLI or any other interface. MVC is still present but requests and responses needs to be handled in the way of their interface requirements.

We don't want to write the same logic for each required interfaces. Furthermore we don't want to test and maintain code for each required interfaces. We want to write, test and maintain reusable source code at a central point of the application eco-system.

I show you how to organize your reusable, testable and maintainable source code with business logic.

# Business logic

Business logic performs operations between databases - **data tier** - and interfaces - **presentation tier** and is part of a three-ier architecture. A good implementation of business logic separates operations on presentation-layer with business-services and on data-layer with repositories.

<figure>
 <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Overview_of_a_three-tier_application_vectorVersion.svg">
 <figcaption>
  <i>Public Domain, &copy; by <a href="https://commons.wikimedia.org/wiki/File:Overview_of_a_three-tier_application_vectorVersion.svg" target="_blank">Bartledan at Wikipedia English</a></i>
 </figcaption>
</figure>

## Repositories

Each repository organize all kinds of data retrieval and data access for a single entity, like entries of an database table. The repository converts data from data sources into a domain model.

```php
<?php

class PostRepository
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

Domain models do not any kind of data source operations, they only validate and transfer data from data layer to presentation layer and vice versa. For example it is able to validate and convert json into an PHP-Object and vice versa.

```php
<?php

class PostModel
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

## Business services

Business services are responsible for a single context of operations, like handling and authentication of users. Business service process data as domain models and transfer them between presentation layer and repositories.

```php
<?php

class PostService
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

## Usage

Now you are able to use the business service everywhere you need it. 

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

I recomment to read following articles:

- <a href="https://martinfowler.com/eaaCatalog/domainModel.html" target="_blank">Domain Models by Martin Fowler</a>
- <a href="https://martinfowler.com/eaaCatalog/repository.html" target="_blank">Repository by Martin Fowler</a>
- <a href="https://en.wikipedia.org/wiki/SOLID_%28object-oriented_design%29" target="_blank">SOLID (object-oriented design)</a>
- <a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller" target="_blank">MVC Pattern</a>
- <a href="https://en.wikipedia.org/wiki/Multitier_architecture#Three-tier_architecture" target="_blank">Three tier architecture</a>
- <a href="https://de.slideshare.net/aaronsaray/midwest-php-2013" target="_blank">Enterprise PHP Architecture through Design Patterns and Modularization</a>
