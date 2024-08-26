---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: releases
title: Releases
css: "/static/css/releases.css"
---

<div id="music-releases">
  {% assign categories = site.categories %}
  {% for category in categories %}
    <div class="category-section">
      <button class="category-header">{{ category.title }}</button>
      <div class="category-content">
        {% assign releases = site.music_releases | where: "category", category.title | sort: "order" %}
        {% for release in releases %}
          <div class="release">
          <div>
            <img class="album-cover" src="{{ release.cover_image }}" alt="{{ release.title }} cover">
          </div>
          <div>
            <a href="{{ release.url }}">{{ release.title }}</a>
          </div>
            <!-- <p>{{ release.description }}</p> -->
            <!-- <ul>
              {% for track in release.tracks %}
                <li>{{ track.title }} - {{ track.duration }}</li>
              {% endfor %}
            </ul> -->
          </div>
        {% endfor %}
      </div>
    </div>
  {% endfor %}
</div>