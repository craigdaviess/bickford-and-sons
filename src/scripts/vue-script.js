
if ($("#movers").length) {

  //Define some components

  var Root = Vue.extend({
    template: '#template-gallery',
    methods: {
      loadcontent: function(url){
        router.go('/'+url);
      },
    },
    ready: function(){
      if ($(window).width() > 720) {
        $('.recipe-teasers').perfectScrollbar();
      }
    },
  })

  var NedKelly = Vue.extend({
    template: '#template-nedkelly',
    methods: {
      stopVideo:function() {
        $('#video-nedkelly').get(0).pause();
        $('#video-nedkelly').removeClass('now-paused');
      },
      playControl:function() {
        if ($('#video-nedkelly').hasClass('now-paused')) {
          $('#video-nedkelly').get(0).play();
          $('.custom-pause').hide();
          $('#video-nedkelly').removeClass('now-paused');
          $('#video-nedkelly').addClass('now-playing');
          $('.custom-play').fadeIn();
          setTimeout(function() {
            $('.custom-play').fadeOut();
          }, 300);
        } else if ($('#video-nedkelly').hasClass('now-playing')) {
          $('#video-nedkelly').get(0).pause();
          $('.custom-play').hide();
          $('#video-nedkelly').removeClass('now-playing');
          $('#video-nedkelly').addClass('now-paused');
          $('.custom-pause').fadeIn();
          setTimeout(function() {
            $('.custom-pause').fadeOut();
          }, 300);
        }
      },
      scrollControl:function() {
        $('html, body').animate({scrollTop: $( $('#video-nedkelly') ).offset().top}, 500);
        this.playControl();
      },
    },
    ready: function(){
      $('#video-nedkelly').get(0).volume = 0.2;
    },
  })





  var App = Vue.extend({})
  var router = new VueRouter()

  router.map({
      '/the-ned-kelly-tango': {
          component: NedKelly
      },
      '/': {
          component: Root
      }
  })

  router.start(App, '#movers')



}
