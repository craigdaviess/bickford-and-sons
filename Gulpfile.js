// define paths
var app             = new Array(), pub = new Array(); // app is source, pub is compiled
app['style']        = "./src/styles/**/*.scss";
app['script']       = "./src/scripts/**/*.js";
app['images']       = "./src/images/**/*";
app['bower']        = "./bower_components";
pub['style']        = "./www/css/";
pub['script']       = "./www/js/";
pub['images']       = "./www/images/";

// gulparoo
var gulp            = require('gulp'),
    plumber         = require('gulp-plumber'),
    sass            = require('gulp-sass'),
    concat          = require('gulp-concat'),
    autoprefixer    = require('gulp-autoprefixer'),
    uglify          = require('gulp-uglify'),
    minifyCSS       = require('gulp-minify-css'),
    cssGlobbing     = require('gulp-css-globbing'),
    sourcemaps      = require('gulp-sourcemaps'),
    imagemin        = require('gulp-imagemin'),
    pngquant        = require('imagemin-pngquant')
;

gulp.task('styles', function () {
    gulp.src([app['bower'] + '/animsition/dist/css/animsition.css', app['bower'] + '/perfect-scrollbar/css/perfect-scrollbar.css', app['bower'] + '/sweetalert2/dist/sweetalert2.css', app['style']])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(cssGlobbing( {  extensions: ['.scss']  } ))
    .pipe(sass(  { errLogToConsole: true, includePaths: [app['bower'] + '/foundation/scss'] }  ))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(minifyCSS({keepSpecialComments: 0}))
    .pipe(concat({ path: 'style.css', stat: { mode: 0666 }}))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(pub['style']))
    ;
});

gulp.task('scripts', function() {
    gulp.src([
        app['bower'] + '/jquery/dist/jquery.js',
        app['bower'] + '/slick.js/slick/slick.js',
        app['bower'] + '/wowjs/dist/wow.js',
        app['bower'] + '/sweetalert2/dist/sweetalert2.min.js',
        app['bower'] + '/masonry/dist/masonry.pkgd.js',
        app['bower'] + '/animsition/dist/js/jquery.animsition.js',
        app['bower'] + '/imagesloaded/imagesloaded.pkgd.js',
        app['bower'] + '/fastclick/lib/fastclick.js',
        app['bower'] + '/motio/motio.js',
        app['bower'] + '/animateCSS/dist/jquery.animatecss.js',
        app['bower'] + '/perfect-scrollbar/js/perfect-scrollbar.jquery.js',
        app['bower'] + '/foundation/js/foundation.js',
        app['bower'] + '/foundation-datepicker/js/foundation-datepicker.min.js',
        'node_modules/vue-youtube-embed/lib/vue-youtube-embed.js',
        app['script']
    ])
    .pipe(concat({ path: 'app.min.js', stat: { mode: 0666 }}))
    .pipe(uglify())
    .pipe(gulp.dest(pub['script']))

    return gulp.src(app['bower'] + '/modernizr/modernizr.js')
        .pipe(gulp.dest(pub['script']))
});

gulp.task('images', function () {
    return gulp.src(app['images'])
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(pub['images']));
});


gulp.task('watch', function() {
    gulp.watch(app['style'], ['styles']);
    gulp.watch(app['script'], ['scripts']);
});

gulp.task('default', ['styles', 'scripts', 'images']);
