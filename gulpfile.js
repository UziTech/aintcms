
var gulp = require('gulp');
var gulpSwig = require('gulp-swig');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var swig = require('swig');
var del = require('del');

gulp.task('swig', function() {
  var swigOpts = {
    defaults: {
      loader: swig.loaders.fs(__dirname + '/src'),
      autoescape: false,
      cache: false
    }
  };
  return gulp.src('src/index.html')
    .pipe(gulpSwig(swigOpts))
    .pipe(gulp.dest('dist/'));
});

gulp.task('babel', function () {
  return gulp.src('src/js/*')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('sass', function () {
  return gulp.src('src/css/*')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('images', function() {
  return gulp.src('src/images/*')
    .pipe(gulp.dest('dist/images/'));
});

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('build', gulp.series('clean', 'swig', 'babel', 'sass', 'images'));
