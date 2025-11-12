import gulp from 'gulp';
import prefix from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import cache from 'gulp-cache';
import { spawn } from 'child_process';
import browserSync from 'browser-sync';

import gulpSass from 'gulp-sass';
import dartSass from 'sass';

const sass = gulpSass(dartSass);

const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

// Build the Jekyll Site
export function jekyllBuild(done) {
    return spawn(jekyll, ['build'], { stdio: 'inherit' })
        .on('close', done);
}

// Rebuild Jekyll and page reload
export function jekyllRebuild(done) {
    browserSync.reload();
    done();
}

// Wait for jekyll-build, then launch the Server
export function browserSyncServe(done) {
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: false
    });
    done();
}

// Compile files
export function sassTask(done) {
    return gulp.src('assets/css/scss/main.scss')
        .pipe(sass({
            style: 'expanded' /*'compressed'*/,
            outputStyle: 'expanded',
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/css'));

    done();
}

// Compress images
export function imgTask() {
    return gulp.src('assets/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('_site/assets/img'))
        .pipe(browserSync.reload({stream:true}));
}

// Copy vendor assets (Font Awesome) from node_modules into assets/vendor
export function vendorTask() {
    // copy css and webfonts
    const faCss = gulp.src('node_modules/@fortawesome/fontawesome-free/css/all.min.css')
        .pipe(gulp.dest('assets/vendor/fontawesome/css'));

    const faFonts = gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest('assets/vendor/fontawesome/webfonts'));

    return Promise.all([faCss, faFonts]);
}

// Watch scss, html, img files
export function watchFiles() {
    gulp.watch('assets/css/scss/**/*.scss', sassTask);
    gulp.watch('assets/js/**/*.js', jekyllRebuild);
    gulp.watch('assets/img/**/*', imgTask);
    gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html', '_pages/*.html', '_posts/*'], jekyllRebuild);
}

//  Default task
const build = gulp.series(vendorTask, jekyllBuild, sassTask, imgTask);
const serve = gulp.series(build, browserSyncServe, watchFiles);
export default serve;
