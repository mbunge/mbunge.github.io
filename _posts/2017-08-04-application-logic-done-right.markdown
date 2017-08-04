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

A client performs a request, which is handled by a controller. The controller invoke the **model** and assigens the result data to a **view**. The **controller** converts the view into a response and delivers the response back to the client.

If you look at this <a href="https://github.com/mbunge/application-examples/tree/master/mvc" target="_blank">simple example</a> the controller seems to be responsible for application logic. This is still true for very small approaches. But in huge systems, code needs to be reusable. It is even better to separate complex application logic from a controller. The **model** is responsible for complex application logic - or even better **business logic** or domain logic.

**Controllers** should only responsible 
 1. for invoking business logic on a specific request
 2. and return a response, which is processed with data from business logic
 
The **Model** is responsible for receive data from any datasource and process data.  
 
I show you how to organize business logic for your example.

# Business logic



## Repositories

Repositories organisieren alle möglichen Datenbank abfragen für eine Entität. Der Vorteil ist die 
Abstraktion komplexer Datenbankabfragen und die grunsätzliche Wiederverwendbarkeit von Datenbankabfragen.

Einige Systeme liefern von Haus aus Methodiken um Abfragen zu organisieren, an der Stelle is abzuwägen ob
ein repository noch als weitere Abtraktionsschicht der Wartbarkeit dienlich ist. 

## Controller und Services

Im MVC-Pattern ist die Verwendung einer Controller-Action zum Ausführen von Business logik gängig.

Grundsätzlich sollte der Code eine Action stets schlank gehalten werden. Dies kann erreicht werden 
indem Services für die Businesslogik verwendet werden. An den Service Übergeben werden alle die 
Akteure der Domainschicht (Model) und das Ergebnis wird an die Viewschicht übermittelt.

### Bespiel

_Folgendes Beispiel ist nur als Schema zu verstehen!_

```php
<?php

class IndexController {

    public function index(Request $request, Response $response, $args)
    {
        $service = new DashboardService();
        $service->setProjectRepository(new ProjectRepository());
        $service->setUserRepository(new UserRepository());
        $service->setEventHandler(new EventHandler());

        $response = $service->buildDashboard($request);

        return $response;
    }

    
    public function currentProjects(Request $request, Response $response, $args)
    {
        $service = new DashboardService();
        $service->setProjectRepository(new ProjectRepository());
        $service->setUserRepository(new UserRepository());
        $service->setEventHandler(new EventHandler());

        $response = $service->loadCurrentProjects($request);

        return $response;
    }

}

```

Obriges Beispiel lagert die den Action-Call in den Service aus. Dies hat den Vorteil, 
dass Wiederverwendbarkeit und auch wartbarkeit erhöht wird.

## Verantwortung (Single Point of Responsibility)

In obrigen Beispiel wird der Request an eine Service Methode übergeben und eine Response 
zurückgegeben. Dies ist anschaulich jedoc in großen System wird an dieser Stelle mehr Dynamik 
benötigt. Ziel ist es, dass Rohdaten ermittelt werden und die Rückgabe an den Response manuell 
erfolgt. Zudem müssen die Daten manuell aus dem Request an den Service übergeben werden.

### Beispiel

```php
<?php

class IndexController {

    public function index(Request $request, Response $response, $args)
    {
        // load dashboard service
        $service = new DashboardService();
        $service->setProjectRepository(new ProjectRepository());
        $service->setUserRepository(new UserRepository());
        $service->setEventHandler(new EventHandler());

        // load input service
        $inputService = new HttpInputService($request);

        // get data for view
        $data = [
            'dashboard' => $service->buildDashboard($inputService->all());
        ];

        // load view and attach data
        $view = new View('dashboard');

        // render response
        $response = $view->render($data);

        return $response;
    }

    
    public function currentProjects(Request $request, Response $response, $args)
    {
        
        // load dashboard service
        $service = new DashboardService();
        $service->setProjectRepository(new ProjectRepository());
        $service->setUserRepository(new UserRepository());
        $service->setEventHandler(new EventHandler());

        // load input service
        $inputService = new HttpInputService($request);

        // get data for view
        $data = [

            // service recognizes projects from input
            'projects' => $service->projects($inputService->all());
        ];

        // load view and attach data
        $view = new View('projects');

        // render response
        $response = $view->render($data);

        return $response;
    }

}

```

Obriges Beispiel macht den Service nun Absolut Wiederverwendbar. So kann der Service auch in 
einem Command und an anderen Stellen genutzt werden. Komplexe Logik wird innerhalb des Services 
weiter delegiert oder wiederverwendet.

## Inversion of Control (IoC)

Alle Service Klassen werden in den Beispielen noch manuell initiert. Dies hat zur Folge das bei 
einer Änderung viele Stellen im Code angepasst werden müssen. IoC befähigt uns die Initialisierung 
von Klassen zentralisiert auszulagern. Zur Minimierung der Wartung übergeben 
wir die Initialisierung an einen IoC Container.

### Beispiel

```php
<?php

class ApplicationServiceProvider
{
    public function register(IoCContainer $container){
        // domain
        // register Repositories
        $container->add(ProjectRepository::class, new ProjectRepository());
        $container->add(UserRepository::class, new UserRepository());

        // register event handler
        $container->add(EventHandler::class, new EventHandler());

        // register Services
        $container->add(HttpInputService::class, function(IoCConainer $container)
            {
                return new HttpInputService($container->get(Application::class)->getRequest())
            }
        );
        $container->add(DashboardService::class, function(IoCConainer $container){
            $service = new DashboardService();
            $service->setProjectRepository($container->get(ProjectRepository::class));
            $service->setUserRepository($container->get(UserRepository::class));
            $service->setEventHandler($container->get(EventHandler::class));
            return $service;
        });

    }
}

```

Obengezeigtes Beispiel lagert die Initialisierungslogik unserer Klassen in einen sogenannten 
ServiceProvider aus. Dieser wiederum erwartet einen IoCContainer. Ein Serviceprovider organisiert 
die Initialisieurngslogik in logische Module. In einem Bootstrap (index.php) muss eben dieser nur noch 
ausgeführt werden.

## IoC und Businesslayer kombinieren mit Dependency Injection (DI)

Dependecy Injection bedeutet lediglich, dass initialisierte Klassen an eine andere Klasse übergeben werden 
und in dieser verwendet werden können. Der Sinn dahinter ist, dass die Initialisierung von Klassen 
kontrollierbar bleibt und nicht in Klassen eingebettet werden. Letzteres für zu einem hohen Aufwand bei 
Wartungsarbeiten und erschwert auch die Testbarkeit.

In einer Architektur mit IoC sind die Controller in der Lage entsprechende Klassen direkt und automatisiert 
mit Hilfe von Dependency Injection über den Konstruktor zu beziehen.

### Beispiel

```php
<?php

class IndexController {

    /**
     * @var DashboardService
     */
    private $dashboardService = null;

    /**
     * @var HttpInputService
     */
    private $inputService = null;

    /**
     * @var HttpInputService
     */
    private $response = null;

    public function __construct(DashboardService $dashboardService, HttpInputService $inputService, Response $response)
    {
        $this->dashboardService = $dashboardService;
        $this->inputService = $inputService;
        $this->response = $response;
    }

    public function index($args)
    {
        // load dashboard service
        $service = $this->dashboardService;

        // load input service
        $inputService = $this->inputService;

        // get data for view
        $data = [
            'dashboard' => $service->buildDashboard($inputService->all());
        ];

        // load view and attach data
        $view = new View('dashboard');

        // render response
        $response = $view->render($data);

        return $response;
    }

    
    public function currentProjects($args)
    {
        
        // load dashboard service
        $service = $this->dashboardService;

        // load input service
        $inputService = $this->inputService;

        // get data for view
        $data = [
            'projects' => $service->projects($inputService->all());
        ];

        // load view and attach data
        $view = new View('projects');

        // render response
        $response = $view->render($data);

        return $response;
    }

}

```

Obriges Beispiel lädt alle benötigeten Abhängigkeiten (Dependencies) im Konstruktor. 
Auch wird der Respons enun über den Kontruktor geladen nicht mehr über die Action, 
da dieser nun bedingt durch die IoC-Architektur bekannt sein muss.

<div class="callout callout-success">
  <h4>Get a list of all merge commits of current branch</h4>
  <p><pre><code class="language-text" data-lang="text">$ git log --merge</code></pre></p>
</div>

## Further reading
<span name="links"></span>

- <a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller" target="_blank">MVC Pattern</a>
