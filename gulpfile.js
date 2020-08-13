
let project_folder = "dist";
let source_folder = "#src";

let path = {
    build:{
        html: project_folder + "/",
        css: project_folder + "/css/",
        img: project_folder + "/img/"
    },
    src:{
        html: source_folder + "/*.html",
        css: source_folder + "/scss/style.scss",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}"
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}"
    },
    clean: "./" + project_folder + "/"
}
let { src, dest } = require("gulp"),
    gulp = require ("gulp")
    browsersync = require("browser-sync").create();
    scss = require("gulp-sass");
    imagemin = require("gulp-imagemin")

function browserSync (params) {
    browsersync.init ({
        server: {
            baseDir : "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    })
}

function html(){
    return src(path.src.html)
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css(){
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
        })
    )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function images(){
    return src(path.src.img)
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                iterplaced:true,
                optimizationLevel: 3
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function watchFiles(params) {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.img], images)

}

let build = gulp.series(html, css, images);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.images = images;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;

/*
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");

gulp.task("sass-compile", function(){
    return gulp.src("./scss/** ----*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("./css/"))
})
gulp.task("watch", function(){
    gulp.watch("./scss/**----*.scss", gulp.series("sass-compile"))
})
*/