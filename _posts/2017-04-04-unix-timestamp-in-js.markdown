---
layout:     post
title:      "UNIX timestamps in js"
subtitle:   "It is a matter of seconds"
date:       2017-04-04 17:10:00
published:  2017-04-04 17:10:00
author:     "Marco Bunge"
header-img: "img/code.jpg"
series:     "application development"
tags:
 - howto
 - javascript
---

I need a valid unix timestamp from javascript in a recent project. You just need to transform milliseconds to seconds with following call

```js
Math.round(new Date().getTime()/1000)
```

I recommend to create a prototype on the date object.

This piece of code is valid for __IE9+, Chrome, Firefox, Safari__.
