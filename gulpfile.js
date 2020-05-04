const gulp = require("gulp");
const sass = require("gulp-sass");
sass.compiler = require("sass"); 
const htmlMin = require("gulp-htmlmin");
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync").create();

function minifyHTML() {
	return gulp
		.src("./src/*.html")
		.pipe(
			htmlMin({
				collapseWhitespace: true,
				removeComments: true
			})
		)
		.pipe(gulp.dest("./dist/"));
}

function style() {
	//TODO: Find my SCSS file in src folder
	return (
		gulp
			.src("./src/sass/**/*.scss")
			//TODO: Pass that file through Sass compiler - our gulp-sass package under the
			// name sass handles this.
			//TODO: Addition modify for better error output
			.pipe(sass().on("error", sass.logError))
			//TODO: Minify the newly transformed CSS
			.pipe(cleanCSS())
			//TODO: Output the transformed SCSS-come-minified CSS to our inside a CSS foler inside our dist folder
			.pipe(gulp.dest("./dist/css"))
			//QUESTION: What does this do again? watch Kevin Powell's gulp video to refresh
			.pipe(browserSync.stream())
	);
}

function configureJS() {
	return gulp.src("./src/js/*").pipe(gulp.dest("./dist/js/"));
}

function copyVendorCSSFiles() {
	return gulp.src("./src/css/*").pipe(gulp.dest("./dist/css/"));
}

function copyAssetsFile() {
	return gulp.src("./src/assets/**/*").pipe(gulp.dest("./dist/assets/"));
}

function copyFontsFile() {
	return gulp.src("./src/fonts/**/*").pipe(gulp.dest("./dist/fonts/"));
}

function copyWebfontsFile() {
	return gulp.src("./src/webfonts/*").pipe(gulp.dest("./dist/webfonts/"));
}

// async function runCore() {
//     return (
//         await gulp.series(minifyHTML, style)
//     );
// }

function watch() {
	browserSync.init({
		server: {
			baseDir: "./dist"
		},
		browser: "firefox"
	});

	gulp.watch("./src/*.html", minifyHTML);
	gulp.watch("./src/*.html").on("change", browserSync.reload);

	gulp.watch("./src/sass/**/*.scss", style);
	gulp.watch("./src/js/main.js", configureJS);
}

exports.minifyHTML = minifyHTML;
exports.style = style;
exports.configureJS = configureJS;
// exports.runCore = runCore;

exports.copyVendorCSSFiles = copyVendorCSSFiles;
exports.copyAssetsFile = copyAssetsFile;
exports.copyFontsFile = copyFontsFile;
exports.copyWebfontsFile = copyWebfontsFile;

exports.watch = watch;
