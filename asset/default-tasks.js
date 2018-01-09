const path     = require('path');
const gulp     = require('gulp');
const sass     = require('gulp-sass');
const grapher  = require('sass-graph');
const plumber  = require('gulp-plumber');
const pleeease = require('gulp-pleeease');
let sassTypes  = require('node-sass').types;
let graph      = null;

let taskStatus = require(`${__dirname}/task-status`);
console.log(taskStatus.mainTaskID);
// let test = require('./task-status');
// test = require('./task-status');



let tasks = {};

// =============================================================================
// Sassのコンパイル
// 
tasks['sass-build'] = {
    'task' : function( done ){

        let _root  = this.getPath( 'input', 'sass' );
        let target = path.join( _root, `**/*.${this.ext.sass}`);
        let dest   = this.getPath( 'output', 'css' );
        let ops    = this.options;

        // includePathsの設定
        let _libPath = this.getPath( 'input', 'lib' );
        _libPath.push(_root);
        ops.sass.includePaths = _libPath;
        
        // functionsの設定
        if ( ops.sass.enqueueFunctions ) {
            let addFunctions = ops.sass.enqueueFunctions;
            for ( let key in addFunctions ) {
                let _this = addFunctions.this ? addFunctions.this : this;
                ops.sass.functions = Object.assign( ops.sass.functions, addFunctions[key].func.bind(_this)() );
            }
        }

        gulp.src(target)
            .pipe(plumber(ops.plumber))
            .pipe(sass.sync(ops.sass))
            .pipe(pleeease(ops.pleeease))
            .pipe(plumber.stop())
            .pipe(gulp.dest(dest));

        done();
    }
}

// =============================================================================
// Sassファイルの監視
// 
tasks['sass-watch'] = {
    'task' : function ( done ) {
        taskStatus.mainTaskID = 'sass-watch';
        let target = path.join( this.getPath( 'input', 'sass' ), `**/*.${this.ext.sass}`);
        gulp.watch( target, gulp.series('sass-build') );
        done();
    }
}


module.exports = tasks;
