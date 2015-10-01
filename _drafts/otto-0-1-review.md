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

Wir nutzen Vagrant 1.7.4 zusammen mit VirtualBox (ab Version 4.0).

### Umgebung unter Ubuntu 15.04 installieren

#### Vagrant installieren / auf neue Versionen patchen

Wir benötigen mindestens Vagrant in der Version 1.7.4 (July 17, 2015), unter Ubuntu ist nur Vagrant 1.6.5 verfügbar, daher können wir hier nicht mit APT arbeiten. Wir laden das Paket einfach via _wget_ und installieren es mit dpkg.

```
wget https://dl.bintray.com/mitchellh/vagrant/vagrant_1.7.4_x86_64.deb
dpkg -i vagrant_1.7.4_x86_64.deb
```

#### Virtualbox installieren

Virtualbox lässt sich einfach und schnell installieren. Wir führen einfach folgenden Befehl aus:

`sudo apt-get install virtualbox`

#### Otto installieren

Die Installation von Otto verläuft recht schnell und einfach. Wir laden uns das Zip, entpacken es und legen Otto unter `~/otto`ab. Zum Schluss fügen wir Otto zu unseren Umgebungsvariablen hinzu.

```
mkdir -P ~/otto
cd ~/otto
wget https://dl.bintray.com/mitchellh/otto/otto_0.1.1_linux_amd64.zip
sudo export PATH $PATH:~/otto
```

Nun führen wir `otto` aus und wenn alles geklappt hat bekommen wir folgenden Output

[BILD 1]

### Umgebung unter Windows installieren

#### Vagrant und VirtualBox installieren

Unter Windows benötigen wir ebenfalls Vagrant 1.7.4 und Virtualbox ab Version 4.0. Dazu laden wir uns einfach [Virtualbox](http://download.virtualbox.org/virtualbox/5.0.4/VirtualBox-5.0.4-102546-Win.exe) und [Vagrant](https://dl.bintray.com/mitchellh/vagrant/vagrant_1.7.4.msi) herunter und installieren beide, anschließend müssen wir Windows neu starten.

Anschließend laden wir Otto herunter und entpacken es uns optimalerweise unter `C:\HashiCorp\Otto`. Nun müssen wir Otto noch zu den Umgebungsvariablen hinzufügen. Dazu drücken wir einfach `Windowstaste + Pause > Erweiterte Systemeinstellungen > Umgebungsvariablen` und fügen am Ende `;C:\HashiCorp\Otto`. Wichtig ist, dass euer Eintrag mit einem Semikolon geprefixed ist!

