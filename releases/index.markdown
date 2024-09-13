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
  {% assign releases = site.music_releases %}
  {% for release in releases %}
  <div>
    <img src="{{ release.cover_image }}" alt="{{ release.title }} cover">
    <p>{{ release.title }}</p>
  </div>
  {% endfor %}
</div>


<!-- <div id="music-releases">
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
</div> -->