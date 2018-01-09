const path = require('path');

let TaskAssist = require( path.join( __dirname, 'asset/TaskAssist' ) );
let taskAssist = new TaskAssist();

// オプションの設定
let ops = require( path.join( __dirname, 'asset/default-options' ) );
for(let key in ops) taskAssist.setOption( key, ops[key] );

// タスクの設定
let tasks = require( path.join( __dirname, 'asset/default-tasks' ) );
for(let key in tasks) taskAssist.setTask( key, tasks[key] );

// let taskObj = require();

// =============================================================================
// TASK : Sass BUILD
// 
// task.setTask( 'sass-build', s );



// TaskAssist.addTask( 'sass-build', function(){
//     console.log("ok");
//     console.log(this);
// } );

// console.log(TaskConf);

// console.log();



// class Task {
//     constructor(){
//         console.log("new!");
//     }
// }
// 
// let a = new Test();
// const gulp = require('gulp');


// let async           = require('async');
// let path            = require('path');
// let gulp            = require('gulp');
// let watch           = require('gulp-watch');
// let gulpIf          = require('gulp-if');
// let sass            = require('gulp-sass');
// let sassTypes       = require('node-sass').types;
// let grapher         = require('sass-graph');
// let graph           = null;
// let forEach         = require('gulp-foreach');
// let sassImageHelper = require(path.join(__dirname, 'task-assets/sass/functions/image-helper'));
// let notifier        = require('node-notifier');
// let plumber         = require('gulp-plumber');
// let pleeease        = require('gulp-pleeease');
// let cached          = require('gulp-cached');
// let sourcemaps      = require('gulp-sourcemaps');
// let iconfont        = require('gulp-iconfont');
// let consolidate     = require('gulp-consolidate');
// let rename          = require('gulp-rename');
// let isWatching      = false;
// let hasError        = false;
// 
// //
// // The following contents is default config that path settings, setting tasks, and task options.
// // If you wanna change it. You shold override it using gulpfile.js.
// // 
// 
// // /////////////////////////////////////////////////////////////////////////////
// //
// // SETTING
// //
// // /////////////////////////////////////////////////////////////////////////////
// let conf = {
//     'path' : {
//         'project' : '/',
//         'src' : {
//             'sass'      : 'src/sass',
//             'sassMixin' : 'src/sass/mixin',
//             'font'      : 'src/font',
//             'iconfont'  : 'src/font/icon',
//             'lib'       : ['src/sass'],
//         },
//         'dest' : {
//             'css'      : 'build/css',
//             'image'    : 'build/img',
//             'font'     : 'build/font',
//             'iconfont' : 'build/font/icon'
//         }
//     },
//     'browsers' : ['last 3 version']
// }
// 
// // /////////////////////////////////////////////////////////////////////////////
// //
// // OPTION
// //
// // /////////////////////////////////////////////////////////////////////////////
// conf.options = { first : true }
// // =============================================================================
// // オプションの初期設定
// // =============================================================================
// let optionInit = ()=>{
//     let ops   = conf.options;
//     let _ops  = null;
//     ops.first = false;
//     graph     = grapher.parseDir(conf.path.src.sass, {
//         extensions : ['sass', 'scss']
//     });
//     // -------------------------------------------------------------------------
//     // sass
//     // -------------------------------------------------------------------------
//     ops['sass'] = ops['sass'] || {};
//     _ops = ops['sass'];
//     _ops['outputStyle']  = _ops['outputStyle']  || 'compressed';
//     _ops['includePaths'] = _ops['includePaths'] || conf.path.src.lib;
//     _ops['functions']    = _ops['functions']    || sassImageHelper({
//         'rtvPath' : {
//             'css'   : conf.path.dest.css,
//             'sass'  : conf.path.src.sass,
//             'image' : conf.path.dest.image
//         },
//         'absPath' : {
//             'css'   : path.join(process.cwd(), conf.path.dest.css),
//             'sass'  : path.join(process.cwd(), conf.path.src.sass),
//             'image' : path.join(process.cwd(), conf.path.dest.image)
//         }
//     });
//     // -------------------------------------------------------------------------
//     // pleeease
//     // -------------------------------------------------------------------------
//     ops['pleeease'] = ops['pleeease'] || {};
//     _ops = ops['pleeease'];
//     _ops['minifier'] = _ops['minifier'] !== undefined ? _ops['minifier'] : false;
//     _ops['rem']      = _ops['rem']      !== undefined ? _ops['rem']      : true;
//     _ops['opacity']  = _ops['opacity']  !== undefined ? _ops['opacity']  : true;
//     _ops['autoprefixer'] = _ops['autoprefixer'] || {};
// 
//     let autoprefixer = _ops['autoprefixer'];
//     autoprefixer['browsers'] = autoprefixer['browsers'] || conf.browsers;
//     autoprefixer['cascade']  = autoprefixer['cascade']  || conf.browsers;
//     // -------------------------------------------------------------------------
//     // plumber
//     // -------------------------------------------------------------------------
//     ops['plumber'] = ops['plumber'] || {};
//     _ops = ops['plumber'];
//     _ops['errorHandler'] = _ops['errorHandler'] || function(err){
//         if(hasError){
//             if(cached.caches['sass']) cached.caches['sass'] = {};
//             gulp.emit('end');
//         }else{
//             notifier.notify({
//                 'title'   : `Sass ${err.name}`,
//                 'message' : `${err.name} : ${err.relativePath}\n{ Line : ${err.line}, Column : ${err.column} }`,
//                 'sound'   : 'Pop'
//             });
//             console.log(`---------------------------------------------`.red.bold);
//             console.log(`Line: ${err.line}, Column: ${err.column}`.red.bold);
//             console.error(err.message.red.bold);
//             console.log(`---------------------------------------------`.red.bold);
//             if(cached.caches['sass']) cached.caches['sass'] = {};
//             // delete cached.caches['sass'];
//             gulp.emit('end');
//             hasError = true;
//         }
//     };
//     // -------------------------------------------------------------------------
//     // iconfont
//     // -------------------------------------------------------------------------
//     ops['iconfont'] = ops['iconfont'] || {};
//     _ops = ops['iconfont'];
//     _ops['fontName']           = _ops['fontName']        || 'icon';
//     _ops['formats']            = _ops['formats']         || ['ttf', 'eot', 'woff'];
//     _ops['descent']            = _ops['descent']         || 0;
//     _ops['ext2format']         = _ops['ext2format']      || { 'woff':'woff', 'ttf':'truetype', 'svg':'svg' }, // withpro-gulp-sass original
//     _ops['prependUnicode']     = _ops['prependUnicode']     !== undefined ? _ops['prependUnicode']     : true;
//     _ops['autohint']           = _ops['autohint']           !== undefined ? _ops['autohint']           : false;
//     _ops['fixedWidth']         = _ops['fixedWidth']         !== undefined ? _ops['fixedWidth']         : false;
//     _ops['centerHorizontally'] = _ops['centerHorizontally'] !== undefined ? _ops['centerHorizontally'] : false;
//     _ops['normalize']          = _ops['normalize']          !== undefined ? _ops['normalize']          : true;
// }
// 
// // /////////////////////////////////////////////////////////////////////////////
// // 
// // glyphs functions
// // 
// // /////////////////////////////////////////////////////////////////////////////
// let fontPath = function(fontName, changeExts = false, css = false){
//     let ext2format      = conf.options.iconfont.ext2format;
//     let exts            = changeExts || conf.options.iconfont.formats;
//     let fontPathFromCSS = path.relative(conf.path.dest.iconfont, conf.path.dest.font);
//     let cssPath         = null;
//     let result          = [];
//     let ext;
//     for(let i = 0; i < exts.length; i++){
//         ext = exts[i];
//         if(!ext2format[ext]) continue;
//         if(css){
//             cssPath = path.join(fontPathFromCSS, fontName+'.'+ext);
//             result.push(`url('${cssPath}') format('${ext2format[ext]}')`);
//         }else{
//             result.push(`url($path+'${fontName}.${ext}') format('${ext2format[ext]}')`);
//         }
//     }
//     result = result.join();
//     return result;
// }
// 
// // /////////////////////////////////////////////////////////////////////////////
// // 
// // TASK
// // 
// // /////////////////////////////////////////////////////////////////////////////
// conf.functions = {
//     // =========================================================================
//     // sass build
//     // =========================================================================
//     'sass-build' : function(){
//         if(conf.options.first) optionInit();
//         let ops    = conf.options;
//         let target = path.join(conf.path.src.sass, '**/*.s[ac]ss');
//         let dest   = conf.path.dest.css;
//         hasError   = false;
//         return gulp.src(target)
//             .pipe(plumber(ops.plumber))
//             .pipe(gulpIf(isWatching, cached('sass')))
//             // -----------------------------------------------------------------
//             // http://qiita.com/joe-re/items/542b3f6fdc577cf50509
//             // -----------------------------------------------------------------
//             .pipe(gulpIf(isWatching, forEach(function(currentStream, file){
//                 let files     = [file.path];
//                 let addParent = function(childPath){
//                     // visits all files that are descendents of the provided file
//                     graph.visitAncestors(childPath, function(parent){
//                         if(files.indexOf(parent) === -1) files.push(parent);
//                         addParent(parent);
//                     });
//                 }
//                 addParent(file.path);
//                 return gulp.src(files, { base : conf.path.src.sass});
//             })))
//             .pipe(sass.sync(ops.sass))
//             .pipe(pleeease(ops.pleeease))
//             .pipe(plumber.stop())
//             .pipe(gulp.dest(dest));
//     },
//     // =========================================================================
//     // sass file watching
//     // =========================================================================
//     'sass-watch' : function(){
//         if(conf.options.first) optionInit();
//         isWatching = true;
//         let target = path.join(conf.path.src.sass, '**/*.s[ac]ss');
//         gulp.watch(target, ['sass-build']);
//     },
//     // =========================================================================
//     // generate iconfonts
//     // =========================================================================
//     'iconfont' : function(){
//         if(conf.options.first) optionInit();
//         let src  = path.join(conf.path.src.iconfont, '*.svg');
//         let dest  = conf.path.dest.iconfont;
//         return gulp.src(src)
//             .pipe(iconfont(conf.options.iconfont))
//             .on('glyphs', function(glyphs, options){
//                 let name     = conf.options.iconfont.fontName;
//                 let dest     = path.join(conf.path.dest.iconfont, 'sample');
//                 let sassDest = conf.path.src.sassMixin;
//                 let param    = {
//                     'fontName'     : name,
//                     'className'    : 'iconfont',
//                     'sassFontPath' : fontPath,
//                     'glyphs'       : glyphs.map(function(glyph){
//                         return {
//                             'name'      : glyph.name,
//                             'codepoint' : glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase()
//                         }
//                     })
//                 };
//                 // CSS
//                 gulp.src(path.join(__dirname, 'task-assets/iconfont/template/fontawesome.css'))
//                    .pipe(consolidate('swig', param))
//                    .pipe(rename({ basename : name }))
//                    .pipe(gulp.dest(dest))
//                 // Sass
//                 gulp.src(path.join(__dirname, 'task-assets/iconfont/template/fontawesome.sass'))
//                    .pipe(consolidate('swig', param))
//                    .pipe(rename({ basename : '_'+name }))
//                    .pipe(gulp.dest(sassDest))
//                 // HTML
//                 gulp.src(path.join(__dirname, 'task-assets/iconfont/template/fontawesome.html'))
//                    .pipe(consolidate('swig', param))
//                    .pipe(rename({ basename : name }))
//                    .pipe(gulp.dest(dest))
//                 return this
//             })
//             .pipe(gulp.dest(dest));
//     }
// }
// 
// // /////////////////////////////////////////////////////////////////////////////
// // 
// // INITIALIZE
// // 
// // /////////////////////////////////////////////////////////////////////////////
// conf.init = ()=>{
//     let keys = Object.keys(conf.functions);
//     keys.forEach((key)=>{
//         let f = conf.functions;
//         if(Array.isArray(f[key])){
//             if(typeof f[key] === 'function'){
//                 gulp.task(key, f[key][0]);
//             }else{
//                 gulp.task(key, f[key][0], f[key][1]);
//             }
//         }else{
//             gulp.task(key, f[key]);
//         }
//     });
// }
// 
// // /////////////////////////////////////////////////////////////////////////////
// // 
// // UTILITY
// // 
// // /////////////////////////////////////////////////////////////////////////////
// 
// 
// 
// module.exports = conf;

module.exports = taskAssist;
