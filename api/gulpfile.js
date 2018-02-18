const gulp = require('gulp')
const ts = require('gulp-typescript')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const nodemon = require('gulp-nodemon')

const tsProject = ts.createProject('tsconfig.json')

gulp.task('build-ts', function() {
  return gulp.src('src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("build"))
})

gulp.task('default', ['build-ts'], function() {
  return nodemon({
    script: 'build/index.js',
    ext: 'js jsx ts tsx',
    exec: "node --inspect=0.0.0.0:9229",
    watch: 'src',
    tasks: ['build-ts'],
  })
})
