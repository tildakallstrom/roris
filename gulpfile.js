// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
const {src, dest, watch, series, parallel} = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const ts = require('gulp-typescript');

const babel = require('gulp-babel');
 
const files = {
    htmlPath: "src/**/*.html",
    cssPath: "src/**/*.css",
    scssPath: "src/**/*.scss",
    jsPath: "src/**/*.js",
    tsPath: "src/typescript/*.ts",
    imagePath: "src/bilder/*"
}

function copyHTML() {
    return src(files.htmlPath)
    .pipe(dest('pub'));
}

function jsTask() {
    return src(files.jsPath)
    .pipe(sourcemaps.init())
    .pipe(concat('script.js'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(terser())
    .pipe(sourcemaps.write('../maps'))
    .pipe(dest('pub/js'));
}

function typescriptTask() {
    return src(files.tsPath)
    .pipe(dest('pub/js'));
}

function sassTask() {
    return src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(cssnano())
    .pipe(sourcemaps.write('../maps'))
    .pipe(dest('pub/css'))
    .pipe(browserSync.stream());
}

function imageTask() {
    return src(files.imagePath)
    .pipe(imagemin())
    .pipe(dest('pub/bilder'));
}

function watchTask() {
    browserSync.init({
        server: "./pub"
    });
    watch([files.htmlPath, files.jsPath, files.scssPath, files.imagePath, files.tsPath], parallel(copyHTML, jsTask, imageTask, sassTask, typescriptTask)).on('change', browserSync.reload);
}

exports.default = series(
    parallel(copyHTML, jsTask, imageTask, sassTask, typescriptTask),
    watchTask
);