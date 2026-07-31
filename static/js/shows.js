// The Upcoming/Past split is rendered at build time, so it goes stale between
// deploys. Re-sort the tiles against the visitor's own date on page load.
(function () {
  function todayLocal() {
    var now = new Date();
    var month = String(now.getMonth() + 1).padStart(2, "0");
    var day = String(now.getDate()).padStart(2, "0");
    return now.getFullYear() + "-" + month + "-" + day;
  }

  function sortShows() {
    var upcoming = document.getElementById("upcoming-shows");
    var past = document.getElementById("past-shows");
    if (!upcoming || !past) return;

    var today = todayLocal();
    var tiles = Array.prototype.slice.call(
      document.querySelectorAll(".show-tile[data-show-date]")
    );

    // Dates are YYYY-MM-DD, so string comparison is date comparison — and it
    // avoids the timezone shift Date parsing would introduce. A show stays
    // upcoming through the whole day it happens on.
    function date(tile) {
      return tile.dataset.showDate;
    }

    tiles
      .filter(function (tile) { return date(tile) >= today; })
      .sort(function (a, b) { return date(a).localeCompare(date(b)); })
      .forEach(function (tile) { upcoming.appendChild(tile); });

    tiles
      .filter(function (tile) { return date(tile) < today; })
      .sort(function (a, b) { return date(b).localeCompare(date(a)); })
      .forEach(function (tile) { past.appendChild(tile); });
  }

  sortShows();

  // Catch a tab that was left open across midnight, or restored from bfcache.
  window.addEventListener("pageshow", sortShows);
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) sortShows();
  });
})();
