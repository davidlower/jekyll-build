/* jshint esversion: 6 */

const gulp = require('gulp');
// MINIFY PLUGINS
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const purge = require('gulp-css-purge');
const rename = require('gulp-rename');
// CONCAT PLUGIN
const concat = require('gulp-concat');
// IMAGE COMPRESSION PLUGINS
const imagemin = require('gulp-imagemin');
const imageminOptipng = require('imagemin-optipng');
const imageminSvgo = require('imagemin-svgo');
const imageminMozjpeg = require('imagemin-mozjpeg');
const newer = require('gulp-newer');
// BROWSER-SYNC PLUGIN
const browserSync = require('browser-sync').create();
// CSS & AUTOPREFIXER PLUGINS
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
// SOURCEMAPS
const sourcemaps = require('gulp-sourcemaps');
// Jekyll build
const cp = require('child_process');
const gutil = require('gulp-util');
const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

//CSS BUILD
function css(done) {
   gulp.src('_scss/**/*.scss', '_scss/**/*.css')
      .pipe(sourcemaps.init())
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(concat('index.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('assets/css'));
   done();
}

// CSS AUTOPREFIXER, MINIFICATION, PURGING, MEDIA-QUERIES
function cssBuild(done) {
   gulp.src('assets/css/**/*.css')
      .pipe(purge({
         trim: true,
         shorten: true,
         verbose: true
      }))
      .pipe(autoprefixer({
         browsers: ['last 2 versions'],
         cascade: false
      }))
      .pipe(cleanCSS({
         compatibility: 'ie8'
      }))
      .pipe(gulp.dest('assets/css'));
   done();
}

// JAVASCRIPT BUILD
function js(done) {
   gulp.src('_js/**/*.js')
      .pipe(concat('index.js'))
      .pipe(gulp.dest('assets/js/'));
   done();
}

function jsBuild(done) {
   gulp.src('assets/js/**/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('assets/js/'));
   done();
}

// LAUNCH THIS AT THE BEGINNING OF ANY PROJECT - GRABS ALL VENDORS FROM NODE MODULES
function launchProject(done) {
   // LITY - LIGHTBOX MODULE FOR JQUERY
   // https://sorgalla.com/lity/
   // gulp.src('node_modules/lity/dist/lity.min.js')
   //    .pipe(gulp.dest('_js'));
   // gulp.src('node_modules/lity/dist/lity.min.css')
   //    .pipe(gulp.dest('_scss'));

   // JQUERY
   gulp.src('node_modules/jquery/dist/jquery.min.js')
      .pipe(rename('/0-jquery.min.js'))
      .pipe(gulp.dest('_js/'));

   // SIMPLE GRID - GRID SYSTEM LIKE BOOTSTRAP
   // gulp.src('node_modules/simplegrid/simple-grid.scss')
   //    .pipe(gulp.dest('_scss'));

   // SLICK CAROUSEL - SLIDER MODULE FOR JQUERY
   // http://kenwheeler.github.io/slick/
   // gulp.src('node_modules/slick-carousel/slick/slick.min.js')
   //    .pipe(gulp.dest('_js'));
   // gulp.src('node_modules/slick-carousel/slick/slick.scss')
   //    .pipe(gulp.dest('_scss'));
   done();
}

//IMAGE COMPRESSION
function imgCompression(done) {
   gulp.src('_img/**/*')
      .pipe(newer('assets/img'))
      .pipe(imagemin([
         //png
         imageminOptipng({
            optimizationLevel: 5
         }), // 0-7 low-high.
         //svg
         imageminSvgo({
            plugins: [{
               removeViewBox: false
            }]
         }),
         //jpg
         imageminMozjpeg({
            quality: 79
         }), // highest quality 100
      ], {
         verbose: true
      }))
      .pipe(gulp.dest('assets/img'));
   done();
}

// BROWSERSYNC BUILD
function bs(done) {
   browserSync.init({
      injectChanges: true,
      files: ['_site' + '/**/'],
      open: false,
      port: 4000,
      server: {
         baseDir: '_site'
      }
   });
   done();
}

function browserSyncReload(done) {
   browserSync.reload();
   done();
}

// JEKYLL BUILD
function jekyllBuild() {
   return cp.spawn(jekyll, ['build'], {
      stdio: 'inherit'
   });
}

function watchFiles(done) {
   gulp.watch('_scss/**/*.scss', css);
   gulp.watch('_js/**/*.js', js);
   gulp.watch('_img/**/*', imgCompression);
   gulp.watch(
      [
         '*.html',
         '*.md',
         '_data/*',
         '_includes/*',
         '_layouts/*',
         '_posts/**/*',
         '_img/*',
         '_js/*',
         '_scss/*'
      ],
      gulp.series(jekyllBuild, browserSyncReload));
   done();
}


gulp.task('css', css);
gulp.task('js', js);
gulp.task('img', imgCompression);
gulp.task('cssBuild', cssBuild);
gulp.task('build', gulp.parallel(cssBuild, js, jsBuild));
gulp.task('launch', gulp.series(launchProject));
gulp.task('default', gulp.series(css, js, bs, jekyllBuild, watchFiles));