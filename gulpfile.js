const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano')
// const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
const { src, series, parallel, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

const jsPath = 'src/assets/js/**/*.js';
const cssPath = 'dist/assets/css/*.css';
const scssPath = 'src/assets/sass/**/*.scss';

/**
 * Compiler SCSS to CSS & autoprefixer
 */
// gulp.task('sass-compile', function () {
//     gulp.src('src/assets/sass/**/*.scss')
//         .pipe(sourcemaps.init())
//         .pipe(sass().on('error', sass.logError))
//         .pipe(autoprefixer({
//             cascade: false
//         }))
//         .pipe(sourcemaps.write('./'))
//         .pipe(gulp.dest('dist/assets/css/'));

// });

// gulp.task('watch', function () {
//     gulp.watch('src/assets/sass/**/*.scss', gulp.series('sass-compile'));
// });


/**
 * dist function - minify, sass-compile, autoprefixer
 */
// function copyHtml() {
//     return src('src/*.php').pipe(gulp.dest('dist'));
// }

function imgTask() {
    return src('src/images/*').pipe(imagemin()).pipe(gulp.dest('dist/images'));
}

function jsTask() {
    return src(jsPath)
        .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/assets/js'));
}

function jsMinTask() {
    return src(jsPath)
        .pipe(sourcemaps.init())
        .pipe(concat('script.min.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/assets/js'));
}

function scssTask() {
    return src(scssPath)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(dest('dist/assets/css'));
}

function cssTask() {
    return src(cssPath)
        .pipe(sourcemaps.init())
        .pipe(concat('style.min.css'))
        .pipe(postcss([cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/assets/css'));
}

function watchTask() {
    watch([scssPath, jsPath, 'src/images/*'], { interval: 1000 }, series(scssTask, parallel(imgTask, jsTask, jsMinTask, cssTask)));
}

exports.imgTask = imgTask;
exports.scssTask = scssTask;
exports.cssTask = cssTask;
exports.jsTask = jsTask;
exports.jsMinTask = jsMinTask;
exports.default = series(scssTask, parallel(imgTask, jsTask, jsMinTask, cssTask), watchTask);


/**
 * End dist function - minify, sass-compile, autoprefixer
 */