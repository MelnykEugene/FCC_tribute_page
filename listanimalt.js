var $list_items = $(".list-item");
var $window = $(window);
var $list_articles = $(".article-item");
var $list_bars = $(".bar");
var $list_years = $(".year");
var $list_texts = $(".item-text");
$window.on("scroll", check_position);
$window.trigger("scroll");

var threshold_distance = 300;
var max_scale = 1.3;

var win_height = $window.height();
var element_height = $($list_items[0]).innerHeight();

function check_position() {
  var win_top_pos = $window.scrollTop();
  $.each($list_items, function () {
    var $list_item = $(this);
    var element_top_edge_pos = $list_item.offset().top;
    var element_number = parseInt($list_item.attr("data-number"));
    var distance = Math.abs(
      element_top_edge_pos + element_height / 2 - (win_top_pos + win_height / 2)
    );
    var scaling_factor =
      max_scale - (max_scale - 1) * (distance / threshold_distance);
    var $bar = $($list_bars[element_number]);
    var $year = $($list_years[element_number]);
    var $text = $($list_texts[element_number]);

    if (distance < threshold_distance) {
      $bar.css("transform", "scaleY(" + scaling_factor + ")");
      $year.css("transform", "scale(" + scaling_factor + ")");
      $text.css("transform", "scale(" + scaling_factor + ")");
    } else {
      $bar.css("transform", "scaleY(1)");
      $year.css("transform", "scale(1)");
      $text.css("transform", "scale(1)");
    }
    var $article = $($list_articles[element_number]);

    if (distance < 100) {
      $bar.addClass("bar_highlight");
      $article.addClass("visiblee");
    } else {
      $bar.removeClass("bar_highlight");
      $article.removeClass("visiblee");
    }
  });
}
