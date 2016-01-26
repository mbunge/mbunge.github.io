---
layout:     post
title:      "Git remove ignored files"
subtitle:   "Remove files which are ignored in .gitignore"
date:       2015-10-12 16:59:47
published:  2015-10-12 16:59:47
author:     "Marco Bunge"
header-img: "img/modern-work-de.jpeg"
series:     "git"
tags:
 - how-to
 - git
---

Nobody is perfect and sometimes you need to add some folders or files to .gitignore, but they are already pushed to repo.
These lines will remove all files from cache and will only add valid files.

{% highlight text %}
git rm -r --cached . 
git add .
git commit -m "Removed all ignored folders and files"
git push origin master
{% endhighlight %}
