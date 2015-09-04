

/*
|
|
| REQURE TASK
|
| Load and set the gulp modules we need for our stack
|
|
*/
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var del = require('del');
var wrap = require('gulp-wrap'); 
var webserver = require('gulp-webserver');
var template = require('gulp-template');



/*
|
| BUILD
|
*/
var indexTemplateVars = {
  scriptFile: false,
  vendorFile: false,
  styleFile: false
};

var randomString = function(length){
  var result = '';
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (var i = length; i > 0; --i){
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  return result;
};
 


/*
|
|
| ENVIRONMENT
|
| When starting the server, define your environment in the command line like this:
|
| NODE_ENV=production gulp server
|
|
| 'production' - this will minify and remove src maps on css and js
| 'development' - this will concat but not minify files
|
|
*/
var env = process.env.NODE_ENV || 'development';
















/*
|
|
| STYLES TASK
|
| This task will load all our css from our main.scss file. This file should include all other .scss 
| files we need. Auto prefixer will be performed and depending on our current environment, a compressed
| and source map created output will be made
|
|
*/
gulp.task('styles', function() {
  var config = {};
  var buildId = randomString(6);
  var oldFileName = indexTemplateVars.styleFile;
  var newFileName = 'style-' + buildId + '.css';

  // delete old file
  del(['dist/css/' + oldFileName]);

  // store new file id
  indexTemplateVars.styleFile = newFileName;

  // re do html
  gulp.start(['html']);


  if(env === 'development')
  {
    config.sourceComments = 'map';
  }

  if(env === 'production')
  {
    config.outputStyle = 'compressed';
  }

  return gulp.src('app/css/main.scss')
    .pipe(sass(config))
    .pipe(concat(newFileName))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/css'));
});



/*
|
|
| VENDOR SCRIPTS TASK
|
| This will load all vendor scripts, minify them and create a single vendor.js file
|
|
*/
gulp.task('vendor-scripts', function() {
  var buildId = randomString(6);
  var oldFileName = indexTemplateVars.vendorFile;
  var newFileName = 'vendor-' + buildId + '.js';

  // delete old file
  del(['dist/js/' + oldFileName]);

  // store new file id
  indexTemplateVars.vendorFile = newFileName;

  // re do html
  gulp.start(['html']);

  return gulp.src('app/js/vendor/**')
  	.pipe(concat(newFileName))
  	.pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest('dist/js'));
});




/*
|
|
| SCRIPTS TASK
|
| This will load all js files inside our js folder that isn't a vendor script. Depending on our current environment
| this will minify for production and create a single main.js file 
|
|
*/
gulp.task('scripts', function() {
  var buildId = randomString(6);
  var oldFileName = indexTemplateVars.scriptFile;
  var newFileName = 'script-' + buildId + '.js';

  // delete old file
  del(['dist/js/' + oldFileName]);

  // store new file id
  indexTemplateVars.scriptFile = newFileName;

  // re do html
  gulp.start(['html']);

  return gulp.src(['app/js/**/*.js', '!app/js/vendor/**'])
    .pipe(concat(newFileName))
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest('dist/js'));
});




/*
|
|
| TEMPLATES TASK
|
| This will take all our template files and load them into a single js file with a command to add the template
| to our flour application like this.
|
| flour.addTemplate([file_name], [file_contents])
|
| This way all our templates are loaded and compiled ready for the app to use and will be referenced by their relative
| file name. A template that resides.
|
| /templates/modal/login.html
|
| Can be accessed by '/templates/modal/login' in our application.
|
|
*/
gulp.task('templates', function(){
  return gulp.src('app/templates/**/*.html')
		.pipe(wrap('flour.addTemplate(\'<%= parseName(file.relative) %>\', \'<%= parseContents(contents) %>\');', {}, {
			imports: {
				parseName: function(name){
          name = name.replace(/\\/g, '/');
					name = name.replace('.html', '');

          return name;
				},
				parseContents: function(contents){
					contents = contents.toString();
					contents = contents.replace(/\\/g,'\\\\');
					contents = contents.replace(/\'/g,'\\\'');
					contents = contents.replace(/\"/g,'\\"');
					contents = contents.replace(/\0/g,'\\0');
					contents = contents.replace(/(\r\n|\n|\r|\t)/g, '');
					
					return contents;
				}
			}
		}))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('app/js/'));
});



/*
|
|
| HTML TASK
|
| This will simple move the index.html file over to dist
|
|
*/
gulp.task('html', function() {
  return gulp.src(['app/*.html'])
    .pipe(template(indexTemplateVars))
    .pipe(gulp.dest('dist/'));
});



/*
|
|
| IMAGES TASK
|
| This task simply copies our images into the dist directory
|
|
*/
gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe(gulp.dest('dist/images'));
});



/*
|
|
| FONTS TASK
|
| This task simple copies our fonts into the dist directory
|
|
*/
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});



/*
|
|
| CLEANUP TASK
|
| Remove all contents of css, js, images and fonts
|
|
*/
gulp.task('clean', function(cb) {
  del(['dist/css', 'dist/js', 'dist/images', 'dist/fonts'], cb)
});























/*
|
|
| WATCH TASK
|
| This watches the globs for css, js, vendor js, templates and images and calls their respective
| tasks upon file changes
|
|
*/
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('app/css/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('app/js/**/*.js', ['scripts']);

  // Watch vendor .js files
  gulp.watch('app/js/vendor/**/*.js', ['vendor-scripts']);

  // Watch template .js files
  gulp.watch('app/templates/**/*.html', ['templates']);

  // Watch image files
  gulp.watch('app/images/**/*', ['images']);

  // Watch index
  gulp.watch('app/*.html', ['html']);

});




/*
|
|
| BUILD TASK
|
| Builds all the required files by running the tasks once
|
|
*/
gulp.task('build', ['clean', 'templates'], function() {

  gulp.start(['styles', 'vendor-scripts', 'scripts', 'images', 'fonts', 'html']);

});





/*
|
|
| SERVER TASK
|
| Our local server. Run this task from command line to start our server and run all our tasks.
|
|
*/
gulp.task('server', ['clean', 'templates'], function() {

	// Watch
  gulp.start(['styles', 'vendor-scripts', 'scripts', 'images', 'fonts', 'html', 'watch']);

	// Start server
  gulp.src('dist')
    .pipe(webserver({
    	fallback: 'index.html',
      livereload: false,
      directoryListing: false,
      open: true,
      port: 9000
    }));
});





