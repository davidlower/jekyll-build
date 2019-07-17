/* jshint esversion: 6 */

const gulp = require('gulp');
// MINIFY PLUGINS
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const purge = require('gulp-css-purge');
const rename = require('gulp-rename');
// CONCAT PLUGIN
const concat = require('gulp-concat');
// STRIP JAVASCRIPT OF COMMENTS AND CONSOLE LOGS
const stripDebug = require('gulp-strip-debug');
// IMAGE COMPRESSION PLUGINS
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminWebp = require('imagemin-webp');
const newer = require('gulp-newer');
// BROWSER-SYNC PLUGIN
const browserSync = require('browser-sync').create();
// CSS & AUTOPREFIXER PLUGINS
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const globbing = require('gulp-css-globbing');
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
      .pipe(globbing({
         extensions: ['.scss']
      }))
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(autoprefixer({
         cascade: false
      }))
      .pipe(concat('bundle.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('_site/css'))
      .pipe(browserSync.reload({
         stream: true
      })); // may need to be deleted
   done();
}


// CSS AUTOPREFIXER, MINIFICATION, PURGING, MEDIA-QUERIES
function cssBuild(done) {
   gulp.src('_site/css/**/*.css')
      .pipe(purge({
         trim: true,
         shorten: true,
         verbose: true
      }))
      .pipe(cleanCSS({
         compatibility: 'ie8'
      }))
      .pipe(gulp.dest('_site/css'));
   done();
}

// JAVASCRIPT BUILD
function js(done) {
   gulp.src('_js/**/*.js')
      .pipe(concat('bundle.js'))
      .pipe(gulp.dest('_site/js/'))
      .pipe(browserSync.reload({
         stream: true
      }));
   done();
}

function jsBuild(done) {
   gulp.src('_site/js/**/*.js')
      .pipe(stripDebug())
      .pipe(uglify())
      .pipe(gulp.dest('_site/js/'));
   done();
}

// LAUNCH THIS AT THE BEGINNING OF ANY PROJECT - GRABS ALL VENDORS FROM NODE MODULES
// function launch(done) {
// LITY - LIGHTBOX MODULE FOR JQUERY
// gulp.src('node_modules/lity/dist/lity.min.js')
//    .pipe(gulp.dest('_js/vendor'));
// gulp.src('node_modules/lity/dist/lity.min.css')
//    .pipe(gulp.dest('_scss/vendor'));
// LITY - LIGHTBOX MODULE FOR JQUERY
// }

//IMAGE COMPRESSION
function imgCompress(done) {
   gulp.src('_img/**/*')
      .pipe(newer('_site/img'))
      .pipe(imagemin([
         //png
         imageminPngquant({
            speed: 1,
            Quality: '70-90',
            floyd: 1
         }),
         //jpg
         imageminJpegtran({
            progressive: true
         }),
         imageminMozjpeg({
            quality: 78
         }),
         //svg
         imageminSvgo({
            plugins: [{
                  removeViewBox: false
               }
               // {
               //    removeXMLNS: true
               // }
               // {
               //    convertPathData: true
               // }
            ]
         })
      ], {
         verbose: true
      }))
      .pipe(gulp.dest('_site/img'));
   done();
}

function imgWebp(done) {
   gulp.src('_img/**/*.{jpg,png}')
      .pipe(newer('_site/img'))
      .pipe(imagemin([
         //webp
         imageminWebp({
            method: 6,
            quality: 60
         })
      ]))
      .pipe(rename({
         extname: '.webp'
      }))
      .pipe(gulp.dest('_site/img'));
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
// function jekyllBuild() {
//    return cp.spawn(jekyll, ['build', '--incremental'], {
//       stdio: 'inherit'
//    });
// }

function jekyllBuild() {
   return cp.spawn(jekyll, ['build', 'exec', 'jekyll'], {
      stdio: 'inherit'
   })
}

function watchFiles(done) {
   gulp.watch('_scss/**/*.scss', css);
   gulp.watch('_js/**/*.js', js);
   gulp.watch('_img/**/*', gulp.series(imgCompress, imgWebp));
   gulp.watch(
      [
         '*.html',
         '*.md',
         '_data/*',
         '_clients/*',
         '_includes/**/*.html',
         '_layouts/*',
         '_posts/**/*',
         '_config-yml',
         'assets/**/*'
      ],
      gulp.series(jekyllBuild, browserSyncReload));
   done();
}

gulp.task('css', css);
gulp.task('js', js);
gulp.task('img', gulp.series(imgCompress, imgWebp));
gulp.task('webp', imgWebp);
gulp.task('cssBuild', cssBuild);
gulp.task('jsBuild', jsBuild);
gulp.task('build', gulp.parallel(cssBuild, jsBuild));
// gulp.task('launch', gulp.parallel(launch));
gulp.task('default', gulp.series(css, js, jekyllBuild, bs, watchFiles));