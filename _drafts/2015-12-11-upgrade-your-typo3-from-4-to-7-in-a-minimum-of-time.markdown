---
layout:     post
title:      "Upgrade your typo3 in a minimum of time"
subtitle:   "Upgrade typo3 4.5+ to latest 7.6 lts within two major steps"
author:     "Marco Bunge"
date:       2015-12-11 10:18:53
published:  2015-12-11 10:18:53
header-img: "img/downloads-bg.jpg"
categories:
  - upgrade
  - typo3
  - development
  - cms
  - lts
---

Typo3 is providing a very nice upgrade documentation. We want to upgrade a Typo3 4.5 LTS (or greater) to Typo3 7.2 LTS within major steps. 
Basically we need to carry out three steps.

### Upgrade from 4.5 (or greater) to 6.2

1. Backup your sourcefiles and Database!
2. We need to deactivate all custom extensions to proceed a clean upgrade.
3. <a href="https://docs.typo3.org/typo3cms/InstallationGuide/UpgradeLTS/Preparation/Index.html" target="blank">Following further instructions of preparing your Typo3 4.x</a>
4. <a href="https://docs.typo3.org/typo3cms/InstallationGuide/UpgradeLTS/UpgradeProcess/Index.html" tragte="_blank">carry out all upgrade instructions <b>(Ignore `typo3_src` symlink upgrade!)</b>.</a>
5. <a href="https://prdownloads.sourceforge.net/typo3/typo3_src-6.2.15.zip?download" target="_blank">Download</a> the latest Version of 6.2
6. Archive your current `index.php` and `typo3/`
7. Extract `index.php` and `typo3/` from 6.2 archive into your current version.
8. Execute installtool and proceed all steps `<your_url>/typo3/sysext/install/Start/Install.php`
9. Setup a locale as `en_US.UTF8`
10. You should now have a clean 6.2 Version.

### Upgrade from 6.2 to 7.6

1. Backup your sourcefiles and Database (again)!
2. <a href="https://prdownloads.sourceforge.net/typo3/typo3_src-7.6.0.zip?download" target="_blank">Download</a> the latest Version of 7.6
3. Archive your current `index.php` and `typo3/`
4. Extract `index.php`, `vendor/` and `typo3/` folder from 7.6 archive into your current version.
5. Execute installtool and proceed all steps `<your_url>/typo3/sysext/install/Start/Install.php`
6. You should now have a clean 7.6 Version.

### Conclusion

Typo3 dev team does a heck of a job. The upgrade process was really easy in a minimum of time. 

### You do have problems? Ask me in comments!

