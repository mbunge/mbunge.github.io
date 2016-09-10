---
layout:     post
title:      "Ignore files without removing from git"
subtitle:   "Remove files from cache, without removing from project"
date:       2016-09-10 14:12:00
published:  2016-09-10 14:12:00
author:     "Marco Bunge"
header-img: "img/modern-work-de.jpg"
series:     "git"
tags:
 - howto
 - git
 - vcs
---

Sometimes you need to ignore files from repository afterwards. In this case you could use 
`git rm -r --cached .` to remove all cached files. This leads to removing files in repository 
and also when other people pull updates. In some cases you need to keep ignored files, like 
custom configuration. Instead of remove all files, git is also able to remove files from 
repository and keep ignored files in filesystem. Have a look at the following line of code:

```
git ls-files --ignored --exclude-standard | sed 's/.*/"&"/' | xargs git rm -r --cached
```

List all ignored files, including files and folders with whitespace and remove them from git index and keep ignored 
files in local filesystem.