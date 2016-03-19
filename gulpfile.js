var gulp = require("gulp");
var babel = require("gulp-babel");
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var eslint = require('gulp-eslint');
var sourcemaps = require('gulp-sourcemaps');
var run = require('run-sequence');
var del = require('del');

var paths = {
  src: "src/**/*.js",
  dest: "dist"
};

gulp.task('babel', ['lint'], function() {
  return gulp.src(paths.src)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(changed(paths.dest))
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest));
});


gulp.task('lint', function() {
  return gulp.src(paths.src)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(changed(paths.dest))
    .pipe(eslint({useEslintrc: true}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task('clean', function(cb) {
  return del(paths.dest, cb);
});


gulp.task('watch', function() {
  gulp.watch(paths.src, ['babel']);
});


gulp.task('build', ['clean'], function() {
  return gulp.start('babel');
});


gulp.task('default', ['build'], function() {
  return gulp.start('watch');
});
