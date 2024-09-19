---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: Releases
css: "/static/css/releases.css"
---
<!-- <div class="page-title">
  <div style="background-color:#7168d5" class="title-color"></div>
  <h2 class="tag-heading">Releases</h2>
</div> -->

<div class="main">
  {% assign releases = site.music_releases | sort: "release_date" | reverse %}
  {% for release in releases %}
  <div class="release-tile">
  <a href="{{ release.url }}">
    <img src="{{ release.cover_image }}" alt="{{ release.title }} cover">
    <p>{{ release.title }}</p>
  </a>
  </div>
  {% endfor %}
</div>