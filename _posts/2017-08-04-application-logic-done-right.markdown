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
# Logic within MVC

> Model–view–controller (MVC) is a software architectural pattern for implementing user interfaces on computers. It divides a given application into three interconnected parts in order to separate internal representations of information from the ways that information is presented to and accepted from the user.[1][2] The MVC design pattern decouples these major components allowing for efficient code reuse and parallel development.
Traditionally used for desktop graphical user interfaces (GUIs), this architecture has become popular for designing web applications and even mobile, desktop and other clients.[3] Popular programming languages like Java, C#, Ruby, PHP and others have popular MVC frameworks that are currently being used in web application development straight out of the box.

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

```
commit 49dd2fe95c288e9ed5cfe9ebdf4ad0d10238a946
Merge: fd137992a ccbfb730c
Author: mbunge <m@b.g>
Date:   Tue Apr 11 22:26:51 2017 +0200

    Merge branch 'master' into dev

    # Conflicts:
    #       app/views/projectx/index.php
```

Have a look at __Merge__. You see two commit id's. The first represents the source branch, the second the merged branch.

```bash
$ git revert <commit-id> -m 1
```

The option `-m 1` means to use commit id of source branch, `-m 2` means to use commit id of merged branch.

## Further reading
<span name="links"></span>

- <a href="https://www.atlassian.com/git/tutorials/merging-vs-rebasing" target="_blank">Merge vs. Rebase by Atlassian</a>
- <a href="https://www.atlassian.com/git/tutorials/undoing-changes" target="_blank">Undo changes by Atlassian</a>
- <a href="https://www.reddit.com/r/git/comments/660ohx/how_to_be_a_good_merge_master/" target="_blank">Merge master role on reddit</a>
