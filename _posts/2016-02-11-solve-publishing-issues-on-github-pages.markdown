---
layout:     post
title:      "Solve publishing issues on GitHub pages"
subtitle:   "Issues occured due to update from Jekyll 2.x to 3.0"
date:       2016-02-05 23:54:47
published:  2016-02-05 23:54:47
author:     "Marco Bunge"
header-img: "img/blogging-hands.jpeg"
series:     "application development"
tags:
 - howto
 - github
 - jekyll
---

As mentioned in recent [post](/2016/02/05/prepare-rogue-for-github-update-on-jekyll-3-0/) GitHub updates from Jekyll 2.x to 3.0. For 
some reason new created posts will not automatically published when post has a valid `published` and / or `date` field.

<div class="callout callout-success">
  <h4>Solution</h4>
  <p>Set <code>future: true</code> in <code>_config.yml</code> and your posts will be published asap.</p>
</div>

For more issues please read this <a href="" target="_blank">post on GitHub</a> and following Jekyll upgrade instructions.
