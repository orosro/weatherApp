var gulp = require('gulp');
var sources = require('./gulp.config.json');
var plato = require('plato');
var browserSync = require('browser-sync');
var es = require('event-stream');
var plug = require('gulp-load-plugins')();
var express = require('express');
var path = require('path');


var log = plug.util.log;
var port = process.env.PORT || 3000;
var env = plug.util.env;


gulp.task('dev', function(){
    return gulp
        .src(source)
        .pipe(plug.ngAnnotate({add: true, single_quotes: true }))
        .pipe(plug.rename(function(path){
            path.extname = '.annotated.js';
        }))
        .pipe(plug.uglify({mangle:true}))
        .pipe(gulp.dest('./src/build'));
});



gulp.task('buildHtml', function(){
    return gulp.src(sources.client+'index.html')
        .pipe(plug.inject(sources.vendorjs))
        .pipe(gulp.dest(sources.build));
});


gulp.task('vendorjs', function(){
    log('Bundling, minifying, and copying the vendor Js files');
    return gulp.src(sources.vendorjs)
        .pipe(plug.concat('vendor.min.js'))
        .pipe(plug.uglify())
        .pipe(gulp.dest(sources.buildjs));
})

gulp.task('build', ['vendorjs'], function(){
    log('Building app')
})






gulp.task('hint', function(){
    return gulp
        .src(source)
        .pipe(plug.jshint('./.jshintrc'))
        .pipe(plug.jshint.reporter('jshint-stylish-ex'));
})

gulp.task('watch', function(){
    return gulp
        .watch(source, ['hint'])
        .on('change', function(event){
            console.log('***  File ' +event.path +  ' was' + event.type + ', running tasks...'   )
        })
})


/**
 * List the available gulp tasks
 */
gulp.task('help', plug.taskListing);


gulp.task('startServer', function(){
    var app = express();

    // var staticPath = path.join(__dirname, '/src/client');
    // app.use(express.static(staticPath));

    app.use('/', express.static('./src/client/'));
    app.use('/', express.static('./'));

    app.listen(3000, function() {
      console.log('listening to port 3000');
    });
});