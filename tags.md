---
layout: page
title: Tags
permalink: /tags/
---

{% for tag in site.tags %}/ [{{ tag[0] }}](#{{ tag[0] | downcase }}) {% endfor %}

{% for tag in site.tags %}
## {{ tag[0] }}
  {% for post in tag[1] %}
 - [{{ post.title }}]({{ post.url }})
  {% endfor %}
{% endfor %}