import gulp from 'gulp';
import sass from 'gulp-sass';
import prefix from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import cache from 'gulp-cache';
import { spawn } from 'child_process';
import browserSync from 'browser-sync';

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
export function sassTask() {
    return gulp.src('assets/css/scss/main.scss')
        .pipe(sass({
            outputStyle: 'expanded',
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/css'));
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

// Watch scss, html, img files
export function watchFiles() {
    gulp.watch('assets/css/scss/**/*.scss', sassTask);
    gulp.watch('assets/js/**/*.js', jekyllRebuild);
    gulp.watch('assets/img/**/*', imgTask);
    gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html', '_pages/*.html', '_posts/*'], jekyllRebuild);
}

//  Default task
const build = gulp.series(jekyllBuild, sassTask, imgTask);
const serve = gulp.series(build, browserSyncServe, watchFiles);
export default serve;
