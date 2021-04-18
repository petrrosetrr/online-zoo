const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const del = require("del");
const pug = require("gulp-pug");

const styles = () => {
  return gulp.src("srcs/styles/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}
exports.styles = styles;

// Server
const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    }
  });
  done();
}
exports.server = server;

// Watcher
const watcher = () => {
  gulp.watch("srcs/styles/**/*.scss", gulp.series(styles));
  gulp.watch("srcs/pug/**/*.pug", gulp.series(pugBuild)).on("change", sync.reload);
  gulp.watch("srcs/scripts/*.js", gulp.series(copy)).on("change", sync.reload);
  gulp.watch("srcs/images/*.{jpg,png,svg}", gulp.series(copy)).on("change", sync.reload);
}

//Images
const images = () => {
  return gulp.src("srcs/images/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({ progressive: true}),
      imagemin.svgo()
    ]))
}
exports.images = images;

//Copy
const copy = () => {
  return gulp.src([
    "srcs/images/**",
    "srcs/scripts/*.js"
  ],  { base: "srcs" })
      .pipe(gulp.dest("build"));
};
exports.copy = copy;

//Pug
const pugBuild = () => {
  return gulp.src('srcs/pug/*.pug')
      .pipe(pug({
        doctype: 'html',
        pretty: false,
        basedir: "."
      }))
      .pipe(gulp.dest('build/'));
};
exports.pugBuild = pugBuild;

//Clean
const clean = () => {
  return del("build");
};
exports.clean = clean;

const build = (done) => {
  gulp.series(
    clean,
    pugBuild,
    images,
    styles,
    copy
  )(done)
};
exports.build = build;

exports.default = gulp.series(
  build, server, watcher
);
