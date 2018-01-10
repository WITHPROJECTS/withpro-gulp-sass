const path       = require('path');
const TaskAssist = require('gulp-task-assist');

let taskAssist = new TaskAssist();

// 拡張子の設定
taskAssist.supportExt( 'sass', 's[ac]ss' );

// デフォルトのパス設定
taskAssist
    .setPath( 'input', {
        'sass' : '',
        'lib'  : ['']
    })
    .setPath( 'output', {
        'css'   : '',
        'image' : ''
    });

// オプションの設定
let ops = require( path.join( __dirname, 'asset/default-options' ) );
for(let key in ops) taskAssist.setOption( key, ops[key] );

// タスクの設定
let tasks = require( path.join( __dirname, 'asset/default-tasks' ) );
for(let key in tasks) taskAssist.setTask( key, tasks[key] );

module.exports = taskAssist;
