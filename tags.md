---
layout: page
title: Tags
permalink: /tags/
---

{% capture all_tags %}
{% for tag in site.tags %}{{ tag[0] }} {% endfor %}
{% endcapture %}
{% assign all_tags = all_tags | split: ' ' | sort %}

{% for tag in all_tags %}[#{{ tag }}](#{{ tag }}) / {% endfor %}

{% for tag in all_tags %}
## #{{ tag }}
  {% for post in site.posts %}{% if post.tags contains tag %}
 - [{{ post.title | escape}}]({{ post.url }}){% endif %}{% endfor %}
{% endfor %}