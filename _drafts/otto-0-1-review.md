# Otto 0.1 Review

Otto ist eine App-Lifecycle-Verwaltung. Damit lassen ganz einfach und schnell Entwicklungsumgebungen 
mit Hilfe von Vagrant (ab Version 1.7.4) und Virtualbox (oder vmWare) erzeugen und ganze Deployments (aktuell nur für AWS) 
einfach ausführen. Otto erkennt dabei die eingesetzten Sprache und wählt anhand derer die zu 
installierenden Komponenten. 

Zur Zeit wird Ruby, Go, PHP und NodeJS unterstützt. Abhängig von der Sprache wird alle nötigen Dateien 
erzeugt. Für PHP z.B. liefert Otto von Haus aus eine Vagrantfile unter anderem mit 
PHP 5.6, Composer und Git. Dazu aber später mehr.

Otto ist komplett in Go geschrieben und lässt sich komplett über eine sogenannte Appfile verwalten. 
Die Appfile-Syntax selber nutzt HCL als Konfigurationssprache.

## Lasst den Spaß beginnen

Wir nutzen Vagrant 1.7.4 zusammen mit VirtualBox 5.

### Umgebung unter Ubuntu 15.04 installieren

#### Vagrant installieren / auf neue Versionen patchen

Wir benötigen mindestens Vagrant in der Version 1.7.4 (July 17, 2015), unter Ubuntu ist nur Vagrant 1.6.5 verfügbar. 

#### Virtualbox auf die neuste Version upgraden

Wir wollen gerne mit der aktuellsten VirtualBox version arbeiten. Sollte auf unserer Maschine eine Alte Version vorliegen 
müssen wir diese zuvor deinstallieren und den Prozess beenden.

```
sudo apt-get purge virtualbox
pkill virtualbox
```

Anschließend erweitern wir unsere `/etc/apt/sources.list` mit folgendem Eintrag:

`deb http://download.virtualbox.org/virtualbox/debian precise contrib`

Und isntallieren den Dazugehörigen Key:

`wget -q http://download.virtualbox.org/virtualbox/debian/oracle_vbox.asc -O- | sudo apt-key add -`

