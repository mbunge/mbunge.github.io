---
layout:     post
title:      "No Panic, undo changes with a breath"
subtitle:   "Undo merges, branch merges and restore files"
date:       2017-04-18 21:46:00
published:  2017-04-18 21:46:00
author:     "Marco Bunge"
header-img: "img/modern-work-de.jpeg"
series:     "git"
tags:
 - howto
 - git
 - vcs
---

# No Panic!

While working on source code with a few people you may run into you merge conflicts or merges results in strange missing code mess. 
Working a day and every thing is lost? No, it isn't ;)

## Be save with fast-forward merging nor rebase 

If you merge dev in your feature branch you should use 

```bash
$ git merge --no-ff <branch>
``` 

or even 

```bash
$ git rebase <branch>
``` 

Go to <a href="#links">Links for In-Depth information.</a> 

## Merging sources results in confilcts

In this case you may want to abort merging and wait until the author is able to help you.

```bash
$ git merge --abort
```

## Revert a single commit few days ago

If you need to revert a special change from a previous commit, use following line of code

```bash
$ git revert <commit-id>
```

## Restore files from previous commits

First of all we need to recognize the id of deleting commit.

```
$ git rev-list -n 1 HEAD -- <file path>
```

Now we take one step backwards this commit _- with ^ after commit id -_ and restore the target file

```
$ git checkout <deleting_commit>^ -- <file_path>
```

If you call 

```
$ git status
``` 

you should get a message like this

```
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        new file:   index.html
```

Now you are able to commit all restored files.

## Revert a merge commit few days ago

When merging branches together git creats a special commit called __Merge Commit__. The commit stores commit-id of 
source and merge branch. A merge commit looks like this:

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

## Links
<span name="links"></span>

- <a href="https://www.atlassian.com/git/tutorials/merging-vs-rebasing" target="_blank">Merge vs. Rebase by Atlassian</a>
