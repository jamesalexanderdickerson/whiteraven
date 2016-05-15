var gulp = require('gulp'),
    debug = require('gulp-debug'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade'),
    stylus = require('gulp-stylus'),
    minify = require('gulp-minify'),
    coffee = require('gulp-coffee'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    browserSync = require('browser-sync').create();
var MY_LOCALS = {};
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'markup', 'views', 'scripts', 'controllers', 'images', 'watch', 'serve');
});
gulp.task('serve', function() {
    browserSync.init({
        server: './public'
    });
    gulp.watch('public/stylesheets/*.css').on('change', browserSync.reload);
    gulp.watch('public/js/*.js').on('change', browserSync.reload);
    gulp.watch('public/js/*/*.js').on('change', browserSync.reload);
    gulp.watch('public/*.html').on('change', browserSync.reload);
    gulp.watch('public/*/*.html').on('change', browserSync.reload);
});
gulp.task('watch', function() {
    gulp.watch('src/js/*.coffee', ['scripts']);
    gulp.watch('src/js/controllers/*.coffee', ['controllers']);
    gulp.watch('src/views/*.jade', ['views']);
    gulp.watch('src/*.jade', ['markup']);
    gulp.watch('src/stylesheets/*.styl', ['styles']);
    gulp.watch('src/images/*', ['images']);
});
gulp.task('markup', function() {
    gulp.src('src/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream());
});
gulp.task('views', function() {
  gulp.src('./src/views/*.jade')
      .pipe(jade())
      .pipe(debug())
      .pipe(gulp.dest('public/views'))
      .pipe(browserSync.stream());
});
gulp.task('styles', function() {
    gulp.src('src/stylesheets/*.styl')
        .pipe(stylus({
            url: { name: 'url', limit: false }
        }))
        .pipe(autoprefixer())
        .pipe(minify())
        .pipe(gulp.dest('public/stylesheets'))
        .pipe(browserSync.stream());
});
gulp.task('scripts', function() {
    gulp.src('src/js/*.coffee')
        .pipe(coffee())
        .pipe(minify())
        .pipe(gulp.dest('public/js'))
        .pipe(browserSync.stream());

});
gulp.task('controllers', function() {
  gulp.src('src/js/controllers/*.coffee')
      .pipe(coffee())
      .pipe(minify())
      .pipe(gulp.dest('public/js/controllers'))
      .pipe(browserSync.stream())
});
gulp.task('images', function() {
    gulp.src('src/images/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('public/images'))
        .pipe(browserSync.stream());
});
gulp.task('clean', function() {
    return del(['public/js', 'public/stylesheets', 'index.html'])
});
