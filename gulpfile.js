const path = require( 'path' );

let task = require( path.join( __dirname, 'withpro-gulp-sass' ) );

// let inputRoot  = `${__dirname}/src`; 
// let outputRoot = `${__dirname}/dest`;

task.setPath( 'input', {
    'root' : `${__dirname}/src`, // 入力ファイル群のルートディレクトリパス
    'sass' : 'sass',
});  
task.setPath( 'output', {
    'root' : `${__dirname}/dest` // 出力ファイル群のルートディレクトリパス
}); 


// console.log(task.inputRootPath);
// let task = new Task(inputRoot, outputRoot);

// task.setPath('input', {
//     'sass' : 1,
//     'font' : 2
// });
// console.log(task);

// TaskConf.setPath();


// gulp.task('watch', ()=>{
// 
// });
// require('');
// let conf = require('./withpro-gulp-sass');
// let gulp = require('gulp');
// 
// console.log(conf.options);
// 
// conf.init();
