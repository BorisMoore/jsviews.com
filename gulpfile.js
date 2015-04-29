/// <vs AfterBuild='browser-sync' />
var noop = function () {},
	gulp = require('gulp'),
	browserSync = require('browser-sync'),
	qunit = require('node-qunit-phantomjs'),
	plugins = require('gulp-load-plugins')(),
	DEST = 'download/',
	DEST_JSR = 'D:/Google Drive/GitHub/jsrender/',
	DEST_JSV = 'D:/Google Drive/GitHub/jsviews/',
	SRC = '_src/',
	packageJSON  = require('./package'),
	jshintConfig = packageJSON.jshintConfig,
	jscsConfig = packageJSON.jscsConfig;
	jshintConfig.lookup = false;

function buildTemplate(template, minify) {
	 var stream = gulp.src([SRC + 'templates/' + template + '*.js'])
		.pipe(plugins.fileInclude({								// Compose js files from src templates
			basepath: SRC
		}))
		.pipe(plugins.jshint(jshintConfig))						// Run JsHint
		.pipe(plugins.jscs(jscsConfig))							// Enforce JsCS dode style 
		.on('error', noop)										// Don't stop on error
		.pipe(plugins.jscsStylish.combineWithHintResults())		// Combine with JsHint and JsCS results 
		.pipe(plugins.jshint.reporter('jshint-summary', {
			reasonCol: 'blue,bold',
			errorsCol: 'black,bold'
			//statistics: true
		}))
		//.pipe(plugins.jshint.reporter('fail'))
		.pipe(gulp.dest(DEST))									// Output js file
		.pipe(plugins.debug());
	if (minify) {
		stream = stream.pipe(plugins.sourcemaps.init())			// Prepare sourcemap
		.pipe(plugins.uglify({									// Minify
			preserveComments: 'some'
		}))
		.pipe(plugins.rename(function (path) {					// Rename minified file to min.js
			path.basename += '.min';
		}))
		.pipe(plugins.sourcemaps.write('./'))					// Output sourcemap file
		.pipe(plugins.debug())
		.pipe(gulp.dest(DEST))									// Output min.js file
	}
	return stream;
}

//================================= DEFAULT - Build and test =================================//

gulp.task('default', ['test']);

//================================= COPY - Copy to jsrender and jsviews projects =================================//

gulp.task('copy', function() {
	gulp.src([DEST + 'jsrender.*js*'])
		.pipe(gulp.dest(DEST_JSR));

	gulp.src([DEST + 'jsrender.*js*', DEST + 'jsviews.*js*', DEST + 'jquery.observable.*js*', DEST + 'jquery.views.*js*'])
		.pipe(gulp.dest(DEST_JSV));

	gulp.src(['test/unit-tests/tests-jsrender*.js'])
		.pipe(gulp.dest(DEST_JSR + 'test/unit-tests/'));

	gulp.src(['test/unit-tests/tests-js*.js'])
		.pipe(gulp.dest(DEST_JSV + 'test/unit-tests/'));
});

//================================= MINIFY - Build and minify =================================//

gulp.task('minify', function() {
	return buildTemplate('*', true);
});

//================================= ALL - Build, minify, copy to projects and test =================================//

gulp.task('all', ['minify', 'copy'], function() {
//	qunit('./test/UNIT-TESTS-ALL-JSVIEWS.html');
//	qunit('./test/unit-tests-all-observable-render-views.html');
//	qunit('./test/unit-tests-all-render-observable-views.html');
	qunit('./test/unit-tests-jsobservable-no-jsrender.html');
});

//================================= TEST - Build and test =================================//

gulp.task('test', ['build'], function() {
	qunit('./test/UNIT-TESTS-ALL-JSVIEWS.html');
});

//================================= BUILD - Build =================================//

gulp.task('build', function() {
	return buildTemplate('*');
});

//================================= JSVIEWS - Build jsviews.js only =================================//

gulp.task('jsviews', function() {
	return buildTemplate('jsviews');
});

//================================= WATCH - Build jsviews.js and load browser. Watch for changes =================================//

// Task that ensures the 'jsviews' task is complete before reloading browsers
gulp.task('build-browse', ['jsviews'], browserSync.reload);

// Task to launch BrowserSync and watch JS files
gulp.task('watch', function () {
	// Serve files from the root of this project
	browserSync({
		server: {
			baseDir: "./"
		}
	});

	// add browserSync.reload to the tasks array to make
	// all browsers reload after tasks are complete.
	gulp.watch([SRC + '*.js', 'INDEX.html'], ['build-browse']);
});
