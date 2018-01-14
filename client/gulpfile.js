const gulp = require('gulp')
const path = require('path')
const nodemon = require('gulp-nodemon')

gulp.task('default', function () {
  nodemon({
    script: './server.js'
  })
})