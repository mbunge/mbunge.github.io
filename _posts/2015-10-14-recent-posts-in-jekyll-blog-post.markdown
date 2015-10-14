---
layout:     post
title:      "Recent posts in Jekyll blog post"
subtitle:   "Cross referencing of latest blog posts"
author:     "Marco Bunge"
date:       2015-10-14 16:05:47
published:  2015-10-14 16:05:47
header-img: "img/download_bg.jpg"
---

When a user is entering your blog on a specific post, he is reading it and mostly he is leaving your page. The entry page is
the exit page at the same time.

## Advantages of cross referencing recent posts

Cross references providing additional targets for your users and minimize the chance to leave immidiatly. A user does not need 
to look for your blog index to get the recent posts. Your older posts will link to your latest too.

## Jekyll snippet

I created a simple but powerfull snippet for Jekyll:

{% highlight liquid %}
{% raw %}
{% assign counter = 0 %}
{% for post in site.posts | sort: "date" %}
    {% if counter < site.max_recent_posts %}
        {% if page.url != post.url %}
            <article class="col-xs-12 col-md-4">
                <h4><a href="{{post.url | prepend: site.baseurl}}">{{post.title}}</a></h4>
                {% if post.subtitle %}<h5>{{post.subtitle}}</h5>{% endif %}   
            </article>
            {% assign counter = counter | plus: 1 %}
        {% endif %}
    {% endif %}    
{% endfor %}
{% endraw %} 
{% endhighlight %}
