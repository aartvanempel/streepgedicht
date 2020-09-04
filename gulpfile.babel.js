import gulp from 'gulp';
import nunjucksRender from 'gulp-nunjucks-render';
import browsersync from 'browser-sync';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import watchify from 'watchify';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';

// browsersync //
browsersync.create();
gulp.task('browsersync', () => {
    browsersync.init({
        server: {
            baseDir: './'
        },
        notify: true,
        open: false,
        port: 3000
    })
})

// sass //
gulp.task('sass', () => {
    return gulp.src('src/static/scss/all.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('docs/css'))
        .pipe(browsersync.reload({stream: true}));
});

// browserify //
const bundler = watchify(browserify({
    debug: true,
    entries: ['./src/static/js/main.js'],
    paths: ['./node_modules', './src/components/', './src/static/js/']
}));
bundler.transform('babelify');
bundler.on('update', bundle);
gulp.task('browserify', bundle);

function bundle() {
    const b = bundler.bundle()
        .on('error', err => console.log('!!!!!!ERROR!!!!!!', err))
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('docs/js/'))
        .pipe(browsersync.reload({stream: true}));

    return b;
}

// nunjucks //
gulp.task('nunjucks', () => {
    return gulp.src('src/pages/**/*.+(html|njk)')
        .pipe(nunjucksRender({
            path: ['src/layout/', 'src/components']
        }))
        .pipe(gulp.dest('./'))
        .pipe(gulp.dest('docs/'))
        .pipe(browsersync.reload({stream: true}));
});

// copy img to dist //
gulp.task('copy', () => {
    gulp.src(['src/static/img/*'])
        .pipe(gulp.dest('docs/img'))
});

gulp.task('copyIndex', () => {
    gulp.src(['./index.html'])
        .pipe(gulp.dest('docs/'))
});

// watch //
gulp.task('watch', () => {
    gulp.watch('src/**/*.+(html|njk)', ['nunjucks']);
    gulp.watch('src/static/img/*', ['copy']);
    gulp.watch('src/**/*.scss', ['sass']);
});

// default //
gulp.task('default', ['copy', 'copyIndex', 'browsersync', 'browserify', 'sass', 'watch']);
