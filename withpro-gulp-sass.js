let async           = require('async');
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
let iconfont        = require('gulp-iconfont');
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
            'sass'       : 'src/sass',
            'sass-mixin' : 'src/sass/mixin',
            'font'       : 'src/font',
            'iconfont'   : 'src/font/icon',
            'lib'        : ['src/sass'],
        },
        'dest' : {
            'css'      : 'build/css',
            'image'    : 'build/img',
            'font'     : 'build/font',
            'iconfont' : 'build/font/icon'
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
    let _ops  = null;
    ops.first = false;
    graph     = grapher.parseDir(conf.path.src.sass, {
        extensions : ['sass', 'scss']
    });
    // -------------------------------------------------------------------------
    // sass
    // -------------------------------------------------------------------------
    ops['sass'] = ops['sass'] || {};
    _ops = ops['sass'];
    _ops['outputStyle']  = _ops['outputStyle']  || 'compressed';
    _ops['includePaths'] = _ops['includePaths'] || conf.path.src.lib;
    _ops['functions']    = _ops['functions']    || sassImageHelper({
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
    _ops = ops['pleeease'];
    _ops['minifier'] = _ops['minifier'] !== undefined ? _ops['minifier'] : false;
    _ops['rem']      = _ops['rem']      !== undefined ? _ops['rem']      : true;
    _ops['opacity']  = _ops['opacity']  !== undefined ? _ops['opacity']  : true;
    _ops['autoprefixer'] = _ops['autoprefixer'] || {};

    let autoprefixer = _ops['autoprefixer'];
    autoprefixer['browsers'] = autoprefixer['browsers'] || conf.browsers;
    autoprefixer['cascade']  = autoprefixer['cascade']  || conf.browsers;
    // -------------------------------------------------------------------------
    // plumber
    // -------------------------------------------------------------------------
    ops['plumber'] = ops['plumber'] || {};
    _ops = ops['plumber'];
    _ops['errorHandler'] = _ops['errorHandler'] || function(err){
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
        gulp.emit('end');
    };
    // -------------------------------------------------------------------------
    // iconfont
    // -------------------------------------------------------------------------
    // ops['iconfontCss'] = ops['iconfontCss'] || {};
    // let iconCssOps = ops['iconfontCss'];
    // iconCssOps['fontName']   = iconCssOps['fontName']   || 'icon';
    // iconCssOps['path']       = iconCssOps['path']       || 'iconfont-template/_icons.scss';
    // iconCssOps['targetPath'] = iconCssOps['targetPath'] || '../../../'+conf.path.src['sass-mixin'];
    // iconCssOps['fontPath']   = iconCssOps['fontPath']   || '../font';
    
    ops['iconfont'] = ops['iconfont'] || {};
    _ops = ops['iconfont'];
    _ops['fontName']           = _ops['fontName'] || 'icon';
    _ops['formats']            = _ops['formats']  || ['ttf', 'eot', 'woff'];
    _ops['descent']            = _ops['descent']  || 0;
    _ops['prependUnicode']     = _ops['prependUnicode']     !== undefined ? _ops['prependUnicode']     : true;
    _ops['autohint']           = _ops['autohint']           !== undefined ? _ops['autohint']           : false;
    _ops['fixedWidth']         = _ops['fixedWidth']         !== undefined ? _ops['fixedWidth']         : false;
    _ops['centerHorizontally'] = _ops['centerHorizontally'] !== undefined ? _ops['centerHorizontally'] : false;
    _ops['normalize']          = _ops['normalize']          !== undefined ? _ops['normalize']          : true;
}

conf.functions = {
    // =========================================================================
    // ビルドタスク
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
    // 監視タスク
    // =========================================================================
    'sass-watch' : function(){
        if(conf.options.first) optionInit();
        isWatching = true;
        let target = path.join(conf.path.src.sass, '**/*.s[ac]ss');
        gulp.watch(target, ['sass-build']);
    },
    // =========================================================================
    // アイコンフォント
    // =========================================================================
    'iconfont' : function(){
        if(conf.options.first) optionInit();
        let src  = path.join(conf.path.src.iconfont, '*.svg');
        let dest = conf.path.dest.iconfont;
        // console.log(dest);
        // conf.options.iconfontCss;
        return gulp.src(src)
            .pipe(iconfont(conf.options.iconfont))
            // .pipe(iconfont())
            .pipe(gulp.dest(dest))
        
        // let done = function(){
        //     console.log('done');
        // }
        
        // async.parallel(
        //     [
        //         function handleGlyphs (cb){
        //             console.log('glyphs');
        //             
        //             //   iconStream.on('glyphs', function(glyphs, options) {
        //             //     gulp.src('templates/myfont.css')
        //             //       .pipe(consolidate('lodash', {
        //             //         glyphs: glyphs,
        //             //         fontName: 'myfont',
        //             //         fontPath: '../fonts/',
        //             //         className: 's'
        //             //       }))
        //             //       .pipe(gulp.dest('www/css/'))
        //             //       .on('finish', cb);
        //             //   });
        //         },
        //         function handleFonts(cb){
        //             //   iconStream
        //             //     .pipe(gulp.dest('www/fonts/'))
        //             //     .on('finish', cb);
        //         }
        //     ],
        //     done
        // );
        // console.log(async);
        // return gulp.src(src)
        //     .pipe(iconfont(ops))
        //     .on('glyphs', function(glyphs, options){
        //         console.log(glyphs);
        //     });
    }
}

module.exports = conf;
