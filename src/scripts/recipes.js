

// $(".all-brands").imagesLoaded( function(){
//   $('.masonry-container').masonry({
//     itemSelector: '.teaser-container'
//   });
// });



// $(window).load(function(){
// if($(window).width() > 719) {
//   $('.recipe-teasers').perfectScrollbar();
// }
// });
// $(window).resize(function() {
//   if($(window).width() > 719) {
//     $('.recipe-teasers').perfectScrollbar();
//   }
// });


// var gallery = 1;

// var recIn = function(){
//   if (gallery == 1) {
//     gallery = 0;
//     var key = $(this).attr('id').replace('key-','');;
//     var hole = $("#hole-"+key);

//     //$("#video-"+key).css("display","block");

//     hole.addClass("activeRecipe");
//     hole.animateCSS("fadeInRight");
//     $(".recipe-teasers, #movers h1").animateCSS('fadeOutLeft', {
//       callback: function(){
//         $(".recipe-teasers, #movers h1").hide();
//         $(".recipe-teasers, #movers h1").removeClass('fadeOutLeft animated'); // not getting removed in IE
//         gallery = 2;
//       }
//     });
//   }
// };



// var tag = document.createElement('script');
// tag.src = "//www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// // Create YouTube player(s) after the API code downloads.
// var nedkelly;

// function onYouTubeIframeAPIReady() {
//     nedkelly = new YT.Player('video-nedkelly');
// }



// var recOut = function(){
//   if (gallery == 2) {
//     gallery = 0;
//     $(".recipe-video").hide();
//     nedkelly.stopVideo();

//     $(".recipe-teasers, #movers h1").animateCSS("fadeInLeft");

//     $(".recipe.activeRecipe").animateCSS('fadeOutRight', {
//       callback: function(){
//         $(".recipe.activeRecipe").hide();
//         $(".activeRecipe").removeClass("activeRecipe");
//         $(".teaser-container").on("click", recIn);
//         $(".recipe-teasers, #movers h1").show(); // other callback calling in IE, need to make sure we show
//         $(".recipe-teasers, #movers h1").removeClass('fadeInLeft animated'); // not getting removed in IE
//         gallery = 1;

//         $('.masonry-container').masonry('layout');// just in case of height issues - mobile fix
//       }
//     });
//   }
// };


// $("body").on("click", ".teaser-container", function(){
//   recIn();
// });
// $("body").on("click", ".recipe-back", function(){
//   recOut();
// });


// $(".watch-film").on("click", function(){
//   var key = $(this).attr('id').replace('watch-','');;
//   var hole = $("#video-"+key);

//   if (key == "nedkelly") {
//     nedkelly.playVideo();
//   }

// });
