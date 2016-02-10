---
layout:     post
title:      "Prepare rogue for GitHub update on Jekyll 3.0"
subtitle:   "Replace pygments with rogue and fix highlighting"
date:       2016-02-05 23:54:47
published:  2016-02-05 23:54:47
author:     "Marco Bunge"
header-img: "img/development.jpg"
series:     "application development"
tags:
 - howto
 - github
 - pages
---

Github updated to jekyll to version 3.0. Due to this update pygments is not longer supported. Therefore I need to update stylings and configuration.

## Styling 
I replace pygemnts styling with GitHub <a href="https://github.com/mojombo/tpw/blob/master/css/syntax.css">syntax.css</a> for rouge styling.

Unfortunately Bootstrap is breaking highlight usability due to defaults on `<pre>` and `<code>`. Furthermore I need to fix 
borders, margins and paddings to provide balanced highlighting. 

My solution:

```css
.highlight pre {
    padding: 0;
    background-color: transparent;
    border: 0;
    border-radius: 0;
}
.highlight .table-responsive,
.highlight pre,
.highlight .table>tbody>tr>td
{
  border: 0;
}
.highlight .table-responsive {
    margin-bottom: 0;
}
.highlight .table>tbody>tr>td {
    padding: 8px 8px 0 8px;
}
```

## Configuration

Pygemnts needs to be replaced by rogue. I also add support for kramdown. Additionally I use `input: GFM` to use the same syntax for code blocks 
on jekyll and GitHub.

```yml
markdown: kramdown

kramdown:
  input: GFM
  syntax_highlighter: rouge
```

Finally I need to replace all Pygments code block syntax with GitHub code block syntax.

## Reference

<a href="" target="_blank">Jekyll 3.0 post on GitHub</a>
