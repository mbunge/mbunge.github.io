# Otto 0.1.1 Review

Otto ist eine App-Lifecycle-Verwaltung. Damit lassen ganz einfach und schnell Entwicklungsumgebungen 
mit Hilfe von Vagrant (ab Version 1.7.4) und Virtualbox (oder vmWare) erzeugen und ganze Deployments (aktuell nur für AWS) 
einfach ausführen. Otto erkennt dabei die eingesetzten Sprache und wählt anhand derer die zu 
installierenden Komponenten. 

Zur Zeit wird Ruby, Go, PHP und NodeJS unterstützt. Abhängig von der Sprache wird alle nötigen Dateien 
erzeugt. Für PHP z.B. liefert Otto von Haus aus eine Vagrantfile unter anderem mit 
PHP 5.6, Composer und Git. Dazu aber später mehr.

Otto ist komplett in Go geschrieben und lässt sich komplett über eine sogenannte Appfile verwalten. 
Die Appfile-Syntax selber nutzt HCL als Konfigurationssprache.

## Alles Vorbereiten - Los geht's!

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

[otto-bild-1.jpg]

### Umgebung unter Windows installieren

#### Vagrant und VirtualBox installieren

Unter Windows benötigen wir ebenfalls Vagrant 1.7.4 und Virtualbox ab Version 4.0. Dazu laden wir uns einfach [Virtualbox](http://download.virtualbox.org/virtualbox/5.0.4/VirtualBox-5.0.4-102546-Win.exe) und [Vagrant](https://dl.bintray.com/mitchellh/vagrant/vagrant_1.7.4.msi) herunter und installieren beide, anschließend müssen wir Windows neu starten.

#### Otto installieren

Anschließend laden wir Otto herunter und entpacken es uns optimalerweise unter `C:\HashiCorp\Otto`. Nun müssen wir Otto noch zu den Umgebungsvariablen hinzufügen. Dazu drücken wir einfach `Windowstaste + Pause > Erweiterte Systemeinstellungen > Umgebungsvariablen` und fügen am zu PATH Variable `;C:\HashiCorp\Otto` am Ende hinzu. Wichtig ist, dass euer Eintrag mit einem Semikolon geprefixed ist!

## Lasst den Spaß beginnen

Wie schon eingangs erwähnt ist Otto recht intelligent und weiß automatisch welche Umgebung er für welche Sprache installieren muss.

In unserem Beispiel erstellen wir uns einfach einen neuen Ordner `~/otto-php-test` und erzeugen darin eine index.php, die uns _Hello World_ ausgibt.

```
mkdir ~/otto-php-test
cd ~/otto-php-test
echo "<?php echo 'Hello World';" > index.php
```

Wir wollen die Kontrolle über unser Projekt behalten. Darum sagen wir Otto, dass er uns ein PHP 5.6 Projekt mit dem Namen `otto-php-test` erzeugen soll. Hierfür legen wir eine Appfile mit folgendem Inhalt an:

```hcl
application {
    name = "otto-php-example"
    type = "php"
}

customization "php" {
    php_version = "5.6"
}
```

Dies ist übrigens die standardkonfiguration für PHP wenn keine Appfile angegeben wurde. _name_ und _type_ sind Pflichtfelder für die _application_ Sektion!

Nun können müssen wir mit `otto compile` einmal alle Dateien im warsten Sinne des Wortes komplieren. 

[otto-bild-2.jpg]

Otto legt uns einen `.otto` ornder an in dem unter anderem unsere Vagrantfile abliegt. Zudem wird eine `.ottoid` Datei angelegt die nicht bearbeitet werden darf. Darüber führt Otto Rückschlüsse zur aktuellen Umgebung.

Nun ist es soweit! Wir können unsere Umgebung zum ersten Mal mit `otto dev` starten. Initial lädt uns Otto nun die Standart vagrant box `hashicorp/precise64` und fügt alle Abhängikeiten hinzu. Und leider bricht Otto hier unter 'Ubuntu und Windows auch ab.

## Probleme

Leider war es uns nicht möglich mit otto 0.1.1 unter Ubuntu und Window über den Compile-Step hinaus zu kommen. 
Zudem hängt hat otto aktuell noch Probleme mit Dateien größer als 2GB umzugehen.

[otto-bild-3.jpg]

## Fazit

Otto ist noch in der Entwicklung und das merkt man auch. Das Kopilieren und automatische erkennen funktionert in der Praxis recht super, doch leider kommt man nicht darüber hinaus. Auch schade ist, dass es noch keinen Deploymentprozess für FTP, SFTP / SCP gibt, aber hier soll auf jedenfall noch nachgebessert werden. Mit der Version 0.2 wurden schon neue Features angekündigt. Zum Beispiel wird es möglich sein eigene Apps / Plugins in Otto zu integrieren.
