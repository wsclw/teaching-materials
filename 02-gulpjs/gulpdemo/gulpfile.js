const {src, dest, watch, series} = require('gulp')

const htmlmin = require('gulp-htmlmin')
const connect = require('gulp-connect')

const babel  = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const less     = require('gulp-less');
const rename   = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');


const paths = {
    scripts: {
        src: 'src/scripts/**/*.js',
        dist: 'dist/scripts/'
    },
    styles: {
        src: 'src/styles/**/*.less',
        dist: 'dist/styles/'
    }
}

// 处理html文件的任务
function html() {
    return src('src/*.html')
           .pipe(htmlmin({collapseWhitespace: true}))
           .pipe(dest('dist/'))
           .pipe(connect.reload())
}





// 监听文件的改变
function watch() {
    watch(paths.styles.src, styles)
    watch(paths.scripts.src, scripts)
}


// 处理JS文件的任务
function scripts() {
    return src(paths.scripts.src, {sourcemaps: true})
        .pipe(babel())                    // 转译代码
        .pipe(uglify())                   // 压缩混淆
        .pipe(concat('main.min.js'))      // 合并文件
        .pipe(dest(paths.scripts.dist));  // 写入指定目录
    }
    
// 处理CSS文件的任务
function styles() {
    return src(paths.styles.src)
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(rename({basename: 'main', suffix: '.min'}))
        .pipe(dest(paths.styles.dist));
}

function clean() {
    return del(['dest']);
}


// 创建服务器
function serve(cb) {
    connect.server({
        root: 'dist',
        port: 8080,
        livereload: true
    });
    cb()
}


exports.html = html
exports.scripts = scripts;
exports.styles = styles;

exports.clean = clean;
exports.watch = watch;

exports.build = series(clean, gulp.parallel(styles, scripts));

exports.default = build;



