---
layout:     post
title:      "Enhance your website for social platforms"
subtitle:   "social media optimization"
author:     "Marco Bunge"
date:       2015-10-02 19:41:47
published:  2015-10-02 19:41:47
header-img: "img/modern-work-de.jpeg"
tags:
 - marketing
 - seo
 - social media
---

Facebook and Twitter are well known and still growing social platforms with a huge range. If you
want to improve your website, you need to add improvements for these platforms too. 

## Open Graph Protocol is the key

Both of them are supporting the Open Graph Protocol, which are very fast to implement. This is the 
easiest way to optimize and controll your presenation on Facebook and Twitter. Other platforms like  

<div class="callout callout-info">
  <h4>Tip</h4>
  <p><a href="https://developer.linkedin.com/docs/share-on-linkedin" target="_blank">LinkedIn</a>, <a href="https://developers.pinterest.com/docs/rich-pins/overview/" target="_blank">Pinterest</a>, <a href="https://developers.google.com/+/web/snippet/" target="_blank">Google&plus;</a> and <a href="https://dev.xing.com/plugins/share_button/docs" target="_blank">Xing</a> are also supporting Open Graph Protocol.</p>
</div>

Twitter Cards is basing on the Open Graph Protocol and give you some more options to control your
presenation on twitter.

Here are two examples for <a target="_blank" href="https://www.facebook.com/marco.bunge.dev/posts/981850491866979">Facebook</a> 
and <a target="_blank" href="https://twitter.com/makk_eightbit/status/650003842491371521">Twitter</a>

### Let's get the sources

I use Open Graph Protocol for my blog overview and each single post. We just need to implement 
the markup into our html `<head>` section. The markup for my overview:

```html
<meta name="twitter:card" content="summary"/>
<meta name="twitter:site" content="@makk_eightbit"/>
<meta name="twitter:creator" content="@makk_eightbit"/>
<meta property="og:locale" content="en_US" />
<meta property="og:type" content="website" />
<meta property="og:title" content="Marco Bunge" />
<meta property="og:description" content="Blogging about open-source, PHP and webtechnologies" />
<meta property="og:url" content="http://www.marco-bunge.com/" />
<meta property="og:site_name" content="Marco Bunge" />
<meta property="og:image" content="http://www.marco-bunge.com/img/default.jpg" />

<title>Marco Bunge</title>
```

## Facebook

Facebook needs basically four options to display your presantion correctly:

 - og:type (e. g. website, article)
 - og:title (could be same as your `<title></title>` section)
 - og:image (e. g. product picture, logo, title image)
 - og:description (a short description of the containing content)

You find detailed information about Open Graph Protocol on <a href="http://ogp.me" target="_blank">ogp.me</a>.
And you could also test your Open Graph Protocol definitions with 
<a href="https://developers.facebook.com/tools/debug/" target="_blank">Facebook's OpenGraph Debugger tool</a>. 
 
## Twitter
 
For a better presenation of our content page we need two additional options.

 - twitter:card (type description e.g. summery for content, player for streams, music or video)
 - twitter:site (Twitter username)
 
For the card type `summery` twitter:title and twitter:description are also required. But we are using
Open Graph Protocol definitions and og:title and og:description is compatible to the twitter:* options, but not 
vice versa.

You find a detailed documentation about Twitter Cards <a href="https://dev.twitter.com/cards/getting-started" target="_blank">here</a>.
And you could also test your Twitter card definitions with the <a href="https://cards-dev.twitter.com/validator" target="_blank">Twitter Card Tool</a>.

## Conclusion

The implementation of Open Graph Protocol and Twitter Card definitions is very simple, but still have a very powerfull effect. 
Someone is sharing your page and you have a presenation in social media with these additions.
