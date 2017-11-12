const gulp = require('gulp')
const ts = require('gulp-typescript')
const rename = require('gulp-rename')
const nodemon = require('gulp-nodemon')

const tsProject = ts.createProject('tsconfig.json')

gulp.task('build-ts', function() {
  gulp.src('src/**/*.ts')
    .pipe(tsProject())
    .pipe(rename({
      extname: '.mjs',
    }))
    .pipe(gulp.dest("build"))
})

gulp.task('default', ['build-ts'], function() {
  gulp.watch('src/**/*.ts', ['build-ts'])
  nodemon({
    script: 'build/index.mjs',
    ext: 'mjs',
    nodeArgs: ['--experimental-modules']
  })
})
