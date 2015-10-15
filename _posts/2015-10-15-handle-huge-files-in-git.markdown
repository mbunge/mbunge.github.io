---
layout:     post
title:      "Handle huge files in git"
subtitle:   "Fix <code>fatal: Out of memory, malloc failed</code>"
author:     "Marco Bunge"
date:       2015-10-15 10:34:47
published:  2015-10-15 10:34:47
header-img: "img/downloads-bg.jpg"
---

Sometimes you could get issues with allocated memory while commiting any huge file in your git repository. 
Following error message will printed:

```
fatal: Out of memory, malloc failed (tried to allocate 1476237742 bytes)
```

<div class="callout callout-info">
    <h4>Reason</h4>
    <p>This means that the delta compression needs more than the allocated memory.</p>
</div>

## Solution

You could solve this issue with following settings in your local `.git/config`:

{% highlight ini %}
[core]
  packedGitLimit = 128m
  packedGitWindowSize = 128m
  
[pack]
  deltaCacheSize = 128m
  packSizeLimit = 128m
  windowMemory = 128m
{% endhighlight %}

<div class="callout callout-warning">
    <h4>Note</h4>
    <p>Please exetend the `[core]` section in your config instead of duplicate or replace it.</p>
</div>
