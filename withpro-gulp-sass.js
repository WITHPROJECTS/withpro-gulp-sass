let path            = require('path');
let gulp            = require('gulp');
let watch           = require('gulp-watch');
let gulpIf          = require('gulp-if');
let sass            = require('gulp-sass');
let sassTypes       = require('node-sass').types;
let grapher         = require('sass-graph');
let graph           = null;
let forEach         = require('gulp-foreach');
let sassImageHelper = require('./sass-functions/image-helper');
let notifier        = require('node-notifier');
let plumber         = require('gulp-plumber');
let pleeease        = require('gulp-pleeease');
let cached          = require('gulp-cached');
let sourcemaps      = require('gulp-sourcemaps');
let colors          = require('colors');
let sizeOf   = require('image-size');
let isWatching      = false;

// /////////////////////////////////////////////////////////////////////////////
//
// 設定
//
// /////////////////////////////////////////////////////////////////////////////
let conf = {
    'path' : {
        'project' : '/',
        'src' : {
            'sass' : 'src/sass',
            'font' : 'src/font',
            'lib'  : ['src/sass'],
        },
        'dest' : {
            'css'   : 'build/css',
            'image' : 'build/img',
            'font'  : 'build/font'
        }
    },
    'browsers' : ['last 3 version']
}


// /////////////////////////////////////////////////////////////////////////////
//
// オプション
//
// /////////////////////////////////////////////////////////////////////////////
conf.options = { first : true }
// =============================================================================
// オプションの初期設定
// =============================================================================
let optionInit = ()=>{
    let ops   = conf.options;
    ops.first = false;
    graph     = grapher.parseDir(conf.path.src.sass, {
        extensions : ['sass', 'scss']
    });
    // -------------------------------------------------------------------------
    // sass
    // -------------------------------------------------------------------------
    ops['sass'] = ops['sass'] || {};
    let sassOps = ops['sass'];
    sassOps['outputStyle']    = sassOps['outputStyle']  || 'compressed';
    sassOps['includePaths']   = sassOps['includePaths'] || conf.path.src.lib;
    sassOps['functions']      = sassOps['functions']    || sassImageHelper({
        'rtvPath' : {
            'css'   : conf.path.dest.css,
            'sass'  : conf.path.src.sass,
            'image' : conf.path.dest.image
        },
        'absPath' : {
            'css'   : path.join(process.cwd(), conf.path.dest.css),
            'sass'  : path.join(process.cwd(), conf.path.src.sass),
            'image' : path.join(process.cwd(), conf.path.dest.image)
        }
    });
    // -------------------------------------------------------------------------
    // pleeease
    // -------------------------------------------------------------------------
    ops['pleeease'] = ops['pleeease'] || {};
    let pleeeaseOps = ops['pleeease'];
    pleeeaseOps['minifier'] = pleeeaseOps['minifier'] || false;
    pleeeaseOps['rem']      = pleeeaseOps['rem']      || true;
    pleeeaseOps['opacity']  = pleeeaseOps['opacity']  || true;
    pleeeaseOps['autoprefixer'] = pleeeaseOps['autoprefixer'] || {};

    let autoprefixer = pleeeaseOps['autoprefixer'];
    autoprefixer['browsers'] = autoprefixer['browsers'] || conf.browsers;
    autoprefixer['cascade']  = autoprefixer['cascade']  || conf.browsers;
    // -------------------------------------------------------------------------
    // plumber
    // -------------------------------------------------------------------------
    ops['plumber'] = ops['plumber'] || {};
    let plumberOps = ops['plumber'];
    plumberOps['errorHandler'] = plumberOps['errorHandler'] || function(err){
        notifier.notify({
            'title'   : `Sass ${err.name}`,
            'message' : `${err.name} : ${err.relativePath}\n{ Line : ${err.line}, Column : ${err.column} }`,
            'sound'   : 'Pop'
        });
        console.log(`---------------------------------------------`.red.bold);
        console.log(`Line: ${err.line}, Column: ${err.column}`.red.bold);
        console.error(err.message.red.bold);
        console.log(`---------------------------------------------`.red.bold);
        delete cached.caches['sass'];
        gulp.emit('emit');
    };
}

conf.functions = {
    // =========================================================================
    'sass-build' : function(){
        if(conf.options.first) optionInit();
        let ops    = conf.options;
        let target = path.join(conf.path.src.sass, '**/*.s[ac]ss');
        let dest   = conf.path.dest.css;
        return gulp.src(target)
            .pipe(gulpIf(isWatching, cached('sass')))
            // -----------------------------------------------------------------
            // http://qiita.com/joe-re/items/542b3f6fdc577cf50509
            // -----------------------------------------------------------------
            .pipe(gulpIf(isWatching, forEach(function(currentStream, file){
                let files     = [file.path];
                let addParent = function(childPath){
                    // visits all files that are descendents of the provided file
                    graph.visitAncestors(childPath, function(parent){
                        if(files.indexOf(parent) === -1) files.push(parent);
                        addParent(parent);
                    });
                }
                addParent(file.path);
                return gulp.src(files, { base : conf.path.src.sass});
            })))
            .pipe(plumber(ops.plumber))
            .pipe(sass.sync(ops.sass))
            .pipe(pleeease(ops.pleeease))
            .pipe(plumber.stop())
            .pipe(gulp.dest(dest));
    },
    // =========================================================================
    'sass-watch' : function(){
        if(conf.options.first) optionInit();
        isWatching = true;
        let target = path.join(conf.path.src.sass, '**/*.s[ac]ss');
        gulp.watch(target, ['sass-build']);
    }
}

module.exports = conf;