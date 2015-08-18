var gulp        = require('gulp');
var rename      = require('gulp-rename')
var browserify  = require('gulp-browserify');
var mocha       = require('gulp-mocha');

// CONFIGS
var tests_path  = './test/**/*.js';
var current_tests_path = './test/current/*.js';
var src_path    = './src/flow.js';
var build_path  = './build';
var dist_path   = './dist';

function handleError( err ){
    console.log( err.message );
    this.emit('end');
}

// Mocha Test Runner
//
gulp.task('mocha', function(){
    gulp.src( tests_path )
        .pipe(mocha({
            reporter: ''
        }))
        .on('error', handleError)
});

// Mocha Test Runner for current working tests
//
gulp.task('mocha-current', function(){
    gulp.src( current_tests_path )
        .pipe(mocha({
            reporter: ''
        }))
        .on('error', handleError)
});


gulp.task('watch', function(){
    gulp.watch([ tests_path, build_path ], ['mocha']);
});

gulp.task('watch-current', function(){
    gulp.watch([ tests_path, build_path ], ['mocha-current']);
});


gulp.task('build', function(){
    gulp.src( src_path )
        .pipe( browserify() )
        .on('error', handleError )
        .pipe( gulp.dest( build_path ))
        .pipe( gulp.dest( dist_path ));
});
gulp.task('build', function(){
    gulp.src( src_path )
        .pipe( browserify() )
        .on('error', handleError )
        .pipe( gulp.dest( dist_path ));
});
gulp.task('test-build', function(){
    gulp.src( src_path )
        .pipe( browserify() )
        .on('error', handleError )
        .pipe( gulp.dest( './test-build' ));
});

gulp.task( 'watch', function() {
    gulp.watch(['./src/**/*.js', './test/**/*.js'], ['test']);
});
gulp.task( 'test', [ 'mocha' ] );
gulp.task( 'test-watch', ['test', 'watch']);
gulp.task( 'test-current', ['mocha-current', 'watch-current']);
gulp.task( 'default', [ 'build', 'mocha'  ] );