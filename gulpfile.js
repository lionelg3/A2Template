// add this line after the initial gulp require statement
var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    shell = require('gulp-shell');

var TARGET = 'target/web';
var SOURCES = 'src/ts';
var HTML = 'src/html';
var CSS = 'src/css';
var JS = 'src/js';

// Copy files
gulp.task('copy', function() {
    gulp.src(CSS+'/*.{ttf,woff,eof,svg,css}')
        .pipe(gulp.dest(TARGET+'/css')); 
    gulp.src(HTML+'/*.{html,htm}')
        .pipe(gulp.dest(TARGET));
    gulp.src(JS+'/*.js')
        .pipe(gulp.dest(TARGET+'/js'));
});

// Dev mode
gulp.task('compile-dev', [], function () {
    var tsProject = ts.createProject({
        target: 'ES5',
        declarationFiles: true,
        noExternalResolve: false,
        experimentalDecorators: true,
        removeComments: true,
        module: 'commonjs'
    });
    var tsResult = gulp.src(SOURCES + '/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));
    tsResult.dts.pipe(gulp.dest(TARGET + '/js'));

    tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(TARGET + '/js'));
});

// Release mode
gulp.task('compile-prod', [], function () {
    var tsProject = ts.createProject({
        target: 'ES5',
        declarationFiles: true,
        noExternalResolve: false,
        experimentalDecorators: true,
        removeComments: true,
        module: 'commonjs'
    });
    var tsResult = gulp.src(SOURCES + '/*.ts')
        .pipe(ts(tsProject));

    tsResult.js
        .pipe(gulp.dest(TARGET + '/js'));
});

// Cleanup
gulp.task('clean', function() {
    del([TARGET], function (err, deletedFiles) {
        console.log('Files deleted:', deletedFiles.join(', '));
    });
});

gulp.task('release', ['clean', 'compile-prod', 'copy']);
gulp.task('dev', ['compile-dev', 'copy']);