// PACKAGES //
var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var exec = require('child_process').exec;


// MONGO //

// only kill mongo if it was used
var usedMongo = false;

// require only one ctrl+c to exit
process.once('SIGINT', function(){
    if (usedMongo) {
        console.log('\nshutting down mongod...');
        exec('pgrep mongod | xargs kill; kill ' + process.pid);
    } else {
        exec('kill ' + process.pid);
    }
});

// call mongod to start mongo database
var startMongo = function () {
    usedMongo = true;
    exec('mongod');
}



// APP SCRIPTS //

// start the database
gulp.task('startdb', function () {
    startMongo();
});

// run node on the server file
gulp.task('runserver', ['startdb'], function () {
    nodemon({script: 'bin/www'});
});



// UPDATING //

// install npm dependencies
gulp.task('install', function () {
    exec('npm install');
});

// run npm update and install
gulp.task('update', ['install']);



// DEV ENVIRONMENT //

// compile sass files into compressed css file
gulp.task('sass', function () {
    gulp.src('public/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('public/stylesheets'));
});

// watch for file changes while developing
gulp.task('watch', function () {
    gulp.watch('public/scss/**/*.scss', ['sass']);
});

// start watching for file changes and run server
gulp.task('dev', ['watch', 'runserver']);



// DEFAULT //

gulp.task('default', ['dev']);