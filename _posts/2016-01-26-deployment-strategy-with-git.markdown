---
layout:     post
title:      "Deployment strategy with git"
subtitle:   "Continious updates for a specific date or an interval of time"
date:       2016-01-26 08:16:47
published:  2016-01-26 08:16:47
author:     "Marco Bunge"
header-img: "img/modern-work-de.jpeg"
series:     "git"
tags:
 - deployment
 - git
 - software
---

Everyone knows the benefits of git. Many developers are using common commands like pull, push, commit, merge, fetch. But Git does also have tools for your deployment strategy.

<div class="callout callout-info">
  <h4>Deployment</h4>
  <p>Software deployment is all of the activities that make a software system available for use. <a href="https://en.wikipedia.org/wiki/Software_deployment" targte="_blank">(Wikipedia)</a></p>
</div>

In other words: we want to publish changes from our development server to our production or staging server.

## Strategy

We want to use git for our three step deployment strategy.

1. create an archive with all changes from a specific date
2. upload our archive to our production server
3. extract and publish our changes on production server

## Create update archive

```
git archive -o archive.zip
```

This command creates an archive containing all files from our current branch. But we want to get all latest changes from a specific date. 

### Get all changes of a commit, branch, or another reference

```
git diff --name-only HEAD
```

We get a lis of all changes of our last commit.

```
/.gitignore
/src/Application.php
/tests/ApplicationTest.php
```

But we need all changes since a specific date until now. Therefore we use git reference `HEAD` and passing a date `HEAD@{"2016-01-15 00:00:00"}`. 

<div class="callout callout-info">
    <h4>Tip</h4>
    <p>We could also pass a statement like for a specific moment:</p>
    <ul>
      <li>one day ago <code>HEAD@{"1 day ago"}</code></li>
      <li>eight days ago <code>HEAD@{"8 days ago"}</code></li>
      <li>one week ago <code>HEAD@{"1 week ago"}</code></li>
      <li>five weeks ago <code>HEAD@{"5 weeks ago"}</code></li>
      <li>one month ago <code>HEAD@{"1 month ago"}</code></li>
    </ul>
</div>

### Get a list of all changes from a specific date, related to head reference.

```
git diff --name-only HEAD@{"2016-01-15 00:00:00"}
```

We need a filtered list of all files except deleted file For our deployment. Adding `--diff-filter`:

```
git diff --name-only HEAD@{"2016-01-15 00:00:00"} --diff-filter=ACMRTUXB
```

<div class="callout callout-info">
    <h4><a href="https://git-scm.com/docs/git-diff" target="_blank">git diff</a></h4>
    <p><b>--diff-filter=[(A|C|D|M|R|T|U|X|B)…​[*]]</b><br>Select only files that are Added (A), Copied (C), Deleted (D), Modified (M), Renamed (R), have their type (i.e. regular file, symlink, submodule, …​) changed (T), are Unmerged (U), are Unknown (X), or have had their pairing Broken (B). Any combination of the filter characters (including none) can be used. When * (All-or-none) is added to the combination, all paths are selected if there is any file that matches other criteria in the comparison; if there is no file that matches other criteria, nothing is selected.</p>
</div>

### create an archive with changes from a specific date

Pass our change list as subcommand `$()`:

```
git archive -o update.zip HEAD $(git diff --name-only HEAD@{"2016-01-15 00:00:00"} --diff-filter=ACMRTUXB)
```

## Enhanced commands

### Archive with branch name and datetime

```
git archive -o update-$(git rev-parse --abbrev-ref HEAD)-$(date +%Y%m%d-%H%M%S).zip HEAD $(git diff --name-only HEAD@{"2016-01-15 00:00:00"} --diff-filter=ACMRTUXB)
```

### Archive with branch name and datetime for scrumteams (deployment every two weeks)

```
git archive -o update-$(git rev-parse --abbrev-ref HEAD)-$(date +%Y%m%d-%H%M%S).zip HEAD $(git diff --name-only HEAD@{"2 weeks ago"} --diff-filter=ACMRTUXB)
```

### txt file with all changes, including deleted

```
git diff --name-status HEAD@{"2016-01-15 00:00:00"} > updates-$(git rev-parse --abbrev-ref HEAD)-$(date +%Y%m%d-%H%M%S).txt
```

### txt file with all changes, excluding deleted

```
git diff --name-status HEAD@{"2016-01-15 00:00:00"} --diff-filter=ACMRTUXB > updates-$(git rev-parse --abbrev-ref HEAD)-$(date +%Y%m%d-%H%M%S).txt
```

### txt file with all deleted files

```
git diff --name-status HEAD@{"2016-01-15 00:00:00"} --diff-filter=D > deleted-$(git rev-parse --abbrev-ref HEAD)-$(date +%Y%m%d-%H%M%S).txt
```

## Conclusion

This small tool is helping small teams to provide a manual deployment strategy for bugfixes and hotfixes or sprint deployment. You could combine this commands with unit testing. This is very helpful for emergency deployments, especially when your ci is not available!

## Further links

<a href="http://www.binarytides.com/linux-scp-command/" target="_blank">Upload files with SCP</a>
