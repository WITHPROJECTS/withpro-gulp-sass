const path        = require('path');
const gulp        = require('gulp');          //
const sass        = require('gulp-sass');     // Sass
const plumber     = require('gulp-plumber');  // 
const pleeease    = require('gulp-pleeease'); // 
const cached      = require('gulp-cached');   // キャッシュ
const gulpIf      = require('gulp-if');       // if文
const gulpForEach = require('gulp-foreach');  // forEach文
const grapher     = require('sass-graph');    // 

let graph      = null;
let taskStatus = require(`${__dirname}/task-status`);
let tasks      = {};

// =============================================================================
// Sassのコンパイル
// 
tasks['build:sass'] = {
    'task' : function( done ){
        taskStatus.mainTaskID = 'build:sass';

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
            .pipe( plumber( ops.plumber ) )
            .pipe( gulpIf( taskStatus.isWatching, cached('sass') ) )
            .pipe( gulpIf(
                taskStatus.isWatching,
                gulpForEach (
                    ( currentStream, file )=>{
                        let files     = [file.path];
                        let addParent = function ( childPath ) {
                            // visits all files that are descendents of the provided file
                            graph.visitAncestors( childPath, function ( parent ) {
                                if ( files.indexOf(parent) === -1 ) files.push(parent);
                                addParent(parent);
                            });
                        }
                        addParent(file.path);
                        return gulp.src( files, { base : this.getPath( 'input', 'sass' ) } );
                    }
                )
            ) )
            .pipe( sass.sync( ops.sass ) )
            .pipe( pleeease( ops.pleeease ) )
            .pipe( plumber.stop() )
            .pipe( gulp.dest( dest ) )
            .on('end', done);

    }
}

// =============================================================================
// Sassファイルの監視
// 
tasks['watch:sass'] = {
    'task' : function ( done ) {
        taskStatus.mainTaskID = 'watch:sass';
        taskStatus.isWatching = true;
        graph = grapher.parseDir( this.getPath( 'input', 'sass' ), {
            extensions : ['sass', 'scss']
        });
        
        let target = path.join( this.getPath( 'input', 'sass' ), `**/*.${this.ext.sass}` );
        gulp.watch( target, gulp.series('build:sass') );
        done();
    }
}

module.exports = tasks;
