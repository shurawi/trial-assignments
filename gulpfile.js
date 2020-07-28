// Include gulp
var gulp = require('gulp');
  // Include Our Plugins
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var autoprefixer = require('autoprefixer');
var csso = require("gulp-csso");
var server = require("browser-sync").create();

gulp.task("csssource", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({ browsers: ['> 1%', 'IE 9', 'IE 10']})
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("serversource", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("csssource"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("startsource", gulp.series("csssource", "serversource"));
