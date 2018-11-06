"use strict";

const gulp = require("gulp");
const less = require("gulp-less");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

gulp.task("html", function() {
    return gulp.src("src/**/*.html")
               .pipe(gulp.dest("dist"));
});

gulp.task("styles", function() {
    return gulp.src("src/styles/style.less")
               .pipe(sourcemaps.init())
               .pipe(less())
               .pipe(sourcemaps.write("./"))
               .pipe(gulp.dest("dist/css"));
});

gulp.task("assets", function() {
    return gulp.src("src/assets/**")
               .pipe(gulp.dest("dist/assets"));
});

gulp.task("fonts", function() {
    return gulp.src("src/fonts/**")
               .pipe(gulp.dest("dist/fonts"));
});
 
gulp.task("js", function() {
    return gulp.src("node_modules/@fortawesome/fontawesome-free/js/all.min.js")
               .pipe(gulp.dest("dist/js"));
});

gulp.task("watch", function() {
    gulp.watch("src/**/*.html", gulp.series("html"));
    gulp.watch("src/styles/**/*.less", gulp.series("styles"));
    gulp.watch("src/assets/**", gulp.series("assets"));
});

gulp.task("serve", function() {
    browserSync.init({
        server: "dist"
    });

    browserSync.watch("dist/**/*.*").on("change", browserSync.reload);
});

gulp.task("dev", gulp.series("html", "styles", "assets", "fonts", "js", gulp.parallel("watch", "serve"))); 