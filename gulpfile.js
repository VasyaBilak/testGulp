import { src, dest, watch, series, parallel } from 'gulp';
import less from 'gulp-less';
import {deleteAsync} from 'del';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';

const paths = {
    styles: {
      src: 'src/styles/**/*.less',
      dest: 'dist/css'
    },
    scripts: {
      src: 'src/scripts/**/*.js',
      dest: 'dist/js'
    }
}

export function styles() {
  return src(paths.styles.src)
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(dest(paths.styles.dest)) 
}

export function scripts() {
  return src(paths.scripts.src, {
    sourcemaps: true
  }) 
  .pipe(babel())
  .pipe(uglify())
  .pipe(concat('main.min.js'))
  .pipe(dest(paths.scripts.dest)) 
}

export function watchTask() {
  watch(paths.styles.src, styles)
  watch(paths.scripts.src, scripts)
}

export const build = series(clean, parallel(styles, scripts), watchTask);

export function clean() {
  return deleteAsync(['dist']);
}


