---
layout:     post
subtitle:      "Git merge without branch checkout"
title:   "Easy merging without switching the branch"
date:       2015-09-30 18:27:47
published:  2015-09-30 18:27:47
author:     "Marco Bunge"
header-img: "img/modern-work-de.jpeg"
series:     "git"
tags: 
 - git
 - how-to
---
## TL;DR

__Replace example with your target branch!__

```
git fetch origin
git fetch origin example:example
git merge example
```

## Problem

Your team is using git and your team mate implemented a new method to a class. 
You need the current changes, which must not be published to master branch. Follow these steps:

## Solution

### Fetch all branches

`git fetch origin`

### Fetch changes from specific branch

`git fetch origin example:example`

### Merge changes from specific branch

`git merge example`

