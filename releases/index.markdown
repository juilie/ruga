---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: releases
title: Releases
css: "/static/css/releases.css"
---

<div id="music-releases">
<div class="header">
Releases
</div>
      {% assign releases = site.music_releases %}
      <div class="releases-list">
      {% for release in releases %}
      <div class="release">
        <div>
          <a href="{{ release.url }}" class="album-cover-link"><img class="album-cover" src="{{ release.cover_image }}" alt="{{ release.title }} cover"></a>
        </div>
        <div>
          <a href="{{ release.url }}">{{ release.title }}</a>
        </div>
      </div>
      <div class="release">
        <div>
          <a href="{{ release.url }}" class="album-cover-link"><img class="album-cover" src="{{ release.cover_image }}" alt="{{ release.title }} cover"></a>
        </div>
        <div>
          <a href="{{ release.url }}">{{ release.title }}</a>
        </div>
      </div>
      <div class="release">
        <div>
          <a href="{{ release.url }}" class="album-cover-link"><img class="album-cover" src="{{ release.cover_image }}" alt="{{ release.title }} cover"></a>
        </div>
        <div>
          <a href="{{ release.url }}">{{ release.title }}</a>
        </div>
      </div>
      {% endfor %}
      </div>
</div>