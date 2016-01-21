---
layout:     post
title:      "Git remove ignored files"
subtitle:   "Remove files which are ignored in .gitignore"
date:       2015-10-12 16:59:47
published:  false
author:     "Marco Bunge"
header-img: "img/modern-work-de.jpeg"
series:     "git"
---

# Deployment

## Allgemeines

- Es dürfen nur auf Staging getestete Änderungen veröffentlicht werden!
- Es müssen Featurebranches geführt werden

## Alle Dateien für ein Update Auflisten

`git diff --name-status HEAD@{"2016-01-15 00:00:00"} --diff-filter=ACMRTUXB > updates-$(git rev-parse --abbrev-ref HEAD)-$(date +%Y%m%d-%H%M%S).txt`

## Major Deployments

Alle Zwei Wochen (Sprint Ende) aus Major Branch (sprint-{nummer}-major)

Major Deployments enthalten Integrationen und Anpassungen die das Verhalten und die Funktionalität der Software veränden. Hierzu wird ein update.zip erzeugt was alle Änderungen enthält.

`git archive -o update-$(git rev-parse --abbrev-ref HEAD)-$(date +%Y%m%d-%H%M%S).zip HEAD $(git diff --name-only HEAD@{"2016-01-15 00:00:00"} --diff-filter=ACMRTUXB)`

## Minor Deployments

Jeden Di, Mi, Do aus Minor Branch (sprint-{nummer}-minor)

Minor Deployments enthalten Fixes, Hotfixes und Designänderungen. Allgemein nehmen diese Änderungen keinen Einfluss auf die Funktionstüchtigkeit der Software.

`git archive -o update-$(git rev-parse --abbrev-ref HEAD)-$(date +%Y%m%d-%H%M%S).zip HEAD $(git diff --name-only HEAD@{"2016-01-15 00:00:00"} --diff-filter=ACMRTUXB)`

## Update auf Server

Einfach das Archiv in das Zielverzeichnis laden und folgende Commands ausführen:

`touch maintanace.flag; unzip update-<timestamp>.zip; cd magento/ tar -cf stashed.tar ./*; mv stashed.tar ../; cd ../; tar --overwrite -xf stashed.tar; rm -f stashed.tar; rm -rf magento/; rm -f maintanace.flag`

`<timestamp>` sollte durch den tatsächlichen Timestamp ersetzt werden (z.B. 20160205-123445).

Der Command versetzt das System in den Wartungsmodus entpackt das Archiv und verschiebt die Dateien ohne Systemfehler, durch erzeugen eines temporären TAR-Archivs an ihre richtigen Positionen. Anschließend werden alle temporären Dateien entfernt und der Wartungsmodus wird deaktiviert.

## Commands

- `date +%Y%m%d-%H%M%S` erzeugt eine Datemusausgabe z.B. wandelt `05.02.1996 12:34:45` in `19960205-123445` um
- `git archive -o update.zip HEAD` erzeugt ein zip archiv von der Referenz HEAD, wobei die Referenz auch eine Comit-ID, Branch und ähnliches sein kann.
- `git diff --name-only HEAD@{"2016-01-15 00:00:00"} --diff-filter=ACMRTUXB`erzeugt eine Ausgabe über alle geänderten Dateien

- `$()`erzeugt einen Subcommand und übermittelt die Ausgabe an den Eltern Command
