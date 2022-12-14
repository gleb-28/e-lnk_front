// import
const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const htmlmin = require('gulp-htmlmin')
const image = require('gulp-imagemin');
const webp = require('gulp-webp');
const size = require('gulp-size')
const gulpif = require('gulp-if');
const browserSync = require('browser-sync').create()
const del = require('del');
const webpackStream = require('webpack-stream');


let isProd = false; // dev by default

// paths
const paths = {
  html: {
    src: ['src/*.html'],
    dest: 'dist/'
  },
  emails: {
    src: ['src/emails/*.html'],
    dest: 'dist/emails'
  },
  styles: {
    src: ['src/scss/**/*'],
    dest: 'dist/css/'
  },
  scripts: {
    src: ['src/js/**/*.js'],
    dest: 'dist/js/'
  },
  images: {
    src: ['src/img/**/*'],
    dest: 'dist/img/'
  },
  fonts: {
    src: 'src/fonts/**',
    dest: 'dist/fonts/'
  }
}

// clean dist
function clean() {
  return del(['dist/*'])
}

function txtcopy() { 
  return gulp.src('src/*.txt')
    .pipe(size({ showFiles: true })) 
    .pipe(gulp.dest('dist/')) 
    .pipe(browserSync.stream())
}

// emails
function emails() { 
  return gulp.src(paths.emails.src)
    .pipe(size({ showFiles: true })) 
    .pipe(gulp.dest(paths.emails.dest)) 
    .pipe(browserSync.stream())
}

// html
function html() {
  return gulp.src(paths.html.src)
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream())
}

// fonts
function fonts() {
  return gulp.src(paths.fonts.src)
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest(paths.fonts.dest))
    .pipe(browserSync.stream())
}

// images
function img() {
  return gulp.src(paths.images.src)
    .pipe(gulpif(isProd, image([
      image.mozjpeg({
        quality: 80,
        progressive: true
      }),
      image.optipng({
        optimizationLevel: 2
      }),
    ])))
    .pipe(gulp.dest(paths.images.dest))
}

function webpImages() {
  return gulp.src('src/img/**/*.{jpg,jpeg,png}')
    .pipe(webp())
    .pipe(gulp.dest(paths.images.dest))
}

// styles
function styles() {
  return gulp.src(['src/scss/main.scss'], {
      sourcemaps: !isProd
    })
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest(paths.styles.dest, {
      sourcemaps: '.'
    }))
    .pipe(browserSync.stream())
}

// JavaScript
function scripts() {
  return webpackStream({
      mode: isProd ? 'production' : 'development',
      entry: {
        main: './src/js/main.js',
        'link-password-check': './src/js/buisness/link-password-check.js',
      },
      output: {
        filename: '[name].min.js',
      },
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: "defaults"
                }]
              ]
            }
          }
        }]
      },
      devtool: !isProd ? 'source-map' : false
    }).pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream())
}

// live server and "watch"
function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist",
      notify: false,
    }
  })
  gulp.watch(paths.html.dest).on('change', browserSync.reload)
  gulp.watch(paths.html.src, html)
  gulp.watch(paths.emails.src, emails)
  gulp.watch(paths.styles.src, styles)
  gulp.watch(paths.scripts.src, scripts)
  gulp.watch(paths.images.src, img)
  gulp.watch(paths.images.src, webpImages)
  gulp.watch(paths.fonts.src, fonts)
}

const toProd = (done) => {
  isProd = true;
  done();
};

// gulp commands
exports.dev = gulp.series(clean, html, emails, gulp.parallel(styles, scripts, img, webpImages, fonts), watch)
exports.build = gulp.series(toProd, clean, html, txtcopy, emails, gulp.parallel(styles, scripts, img, webpImages, fonts))