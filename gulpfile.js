const gulp = require("gulp");
const browsersync = require("browser-sync").create();
const sass = require("gulp-sass");

// compile task sass and inject into browser
gulp.task("sass", () => {
  return gulp
    .src(["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/*.scss"])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browsersync.stream());
});
// Move JS files to src/js
gulp.task("javascript", () => {
  return gulp
    .src([
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/popper.js/dist/umd/popper.min.js"
    ])
    .pipe(gulp.dest("src/js"))
    .pipe(browsersync.stream());
});

// Watch sass and server
gulp.task("serve", ["sass"], () => {
  browsersync.init({
    server: "./src",
    port: 3002
  });
  gulp.watch([
    "node_modules/bootstrap/scss/bootstrap.scss, src/scss/.*scss",
    ["scss"]
  ]);
  gulp.watch("src/*.html").on("change", browsersync.reload);
});

// Moving fonts folder to source
gulp.task("fonts", () => {
  return gulp
    .src("node_modules/font-awesome/fonts/*")
    .pipe(gulp.dest("src/fonts"));
});

// Moving Font awesome css to source
gulp.task("fa", () => {
  return gulp
    .src("node_modules/font-awesome/css/font-awesome.min.css")
    .pipe(gulp.dest("src/css"));
});

gulp.task("default", ["javascript", "serve", "fa", "fonts"]);
