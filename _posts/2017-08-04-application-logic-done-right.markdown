---
layout:     post
title:      "Application logic done right"
subtitle:   "How to organize code within MVC pattern"
date:       2017-08-04 21:46:00
published:  false
author:     "Marco Bunge"
header-img: "img/modern-work-de.jpeg"
series:     "git"
tags:
 - howto
 - git
 - vcs
---

Typically small http applications does only have to manage HTTP communication on top of a tiny MVC-Framework. A client performs a request, which is handled by a controller. The controller invoke the **model** and assigens the result data to a **view**. The **controller** converts the view into a response and delivers the response back to the client.

If you look at this <a href="https://github.com/mbunge/application-examples/tree/master/mvc" target="_blank">simple example</a> the controller seems to be responsible for application logic. This is still true for very small http applications. 

But enterprise applications are often accessible via HTTP, Sockets, RPC, CLI or any other interface. MVC is still present but requests and responses needs to be handled in the way of their interface requirements.

We don't want to write the same logic for each required interfaces. Furthermore we don't want to test and maintain code for each required interfaces. We want to write, test and maintain reusable source code at a central point of the application eco-system.

I show you how to organize your reusable, testable and maintainable source code with business logic.

# Business logic

Business logic performs operations between databases - **data layer** - and interfaces - **presentation layer**. A good implementation of business logic separates operations on presentation-layer with business-services and on data-layer with repositories.

## Repositories

Each repository organize all kinds of data retrieval and data access for a single entity, like entries of an database table. The repository converts data from data sources into a domain model.



## Domain Model

Domain models do not any kind of data source operations, they only validate and transfer data from data layer to presentation layer and vice versa. For example it is able to validate and convert json into an PHP-Object and vice versa.

## Business services

Business services are responsible for a single context of operations, like handling and authentication of users. Business service process data as domain models and transfer them between presentation layer and repositories.

<div class="callout callout-success">
  <h4>Get a list of all merge commits of current branch</h4>
  <p><pre><code class="language-text" data-lang="text">$ git log --merge</code></pre></p>
</div>

## Further reading
<span name="links"></span>

- <a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller" target="_blank">MVC Pattern</a>
