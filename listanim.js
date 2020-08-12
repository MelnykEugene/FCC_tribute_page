var $list_items = $(".list-item");
var $window = $(window);
var $list_articles = $(".article-item");
$window.on("scroll resize", check_position);
$window.trigger("scroll");

function check_position() {
  var win_height = $window.height();
  var win_top_pos = $window.scrollTop();
  var win_bot_pos = win_top_pos + win_height;

  $.each($list_items, function () {
    var $list_item = $(this);
    var element_height = $list_item.innerHeight();
    var element_top_edge_pos = $list_item.offset().top;
    var element_bot_edge_pos = element_top_edge_pos + element_height;
    var article_number = parseInt($list_item.attr("data-number"));
    if (
      element_bot_edge_pos >= win_top_pos + win_height / 2 - 50 &&
      element_top_edge_pos <= win_top_pos + win_height / 2 + 50
    ) {
      $list_item.addClass("in-view");
      var $article = $($list_articles[article_number]);
      $article.addClass("visiblee");
    } else {
      $list_item.removeClass("in-view");
      var $article = $($list_articles[article_number]);
      $article.removeClass("visiblee");
    }
  });
}
