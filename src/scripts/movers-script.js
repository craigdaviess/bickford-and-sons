
var $grid = $('.grid').isotope({
    // options
    itemSelector: '.grid-item',
    layoutMode: 'fitRows'
});


// filter items on button click
$('.filter-button-group').on( 'click', 'li', function() {
    var filterValue;
    filterValue = $(this).attr('data-filter');

    if ($(this).hasClass("button-active")) {
        $('.button-active').removeClass('button-active');
        filterValue = "*";
        $('.clear-filter').hide();
    } else {
        $('.button-active').removeClass('button-active');
        $(this).addClass('button-active');
        $('.clear-filter').css('display','block');
    }

    $grid.isotope({ filter: filterValue });
});


$grid.imagesLoaded().progress( function() {
    $grid.isotope('layout').isotope({sortBy: 'random'});
});


if ($(window).width() < 719) { // mobile
    $(".mobile-filter, .filters li").on('click', function(){
        $(".text-filters").toggle();
        $(".button-group").toggle();
        $(".mobile-filter").toggleClass("active");
    });
    // $(".filters li").on('click', function(){
    //     $(".text-filters").toggle();
    // });
};


$('.clear-filter').on( 'click', function() {
    $('.button-active').removeClass('button-active');
    $('.clear-filter').hide();
    $grid.isotope({ filter: "*" });
});
