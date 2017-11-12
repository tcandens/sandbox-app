const gulp = require('gulp')
const path = require('path')

const { startServer } = require('./server')

gulp.task('default', function () {
  startServer()
})