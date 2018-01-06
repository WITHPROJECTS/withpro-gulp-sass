const path = require('path');

let taskBox = {};

class TaskAssist {
    // /**
    //  * タスクを追加する
    //  *
    //  * @param {string}   name タスク名
    //  * @param {Function} task タスク処理
    //  */
    // static addTask( name, task ){
    //     console.log(this);
    //     taskBox[name] = task;
    // }
    /**
     * コンストラクタ
     * 
     * @param  {string}     [inputPath=__dirname]  root directory of input files.
     * @param  {string}     [outputPath=__dirname] root directory of output files.
     * @return {TaskAssist}
     */
    constructor( inputPath = __dirname, outputPath = __dirname ) {
        let self = this;
        // =====================================================================
        // パス
        // 
        this.path = { 'input' : {}, 'output' : {} };
        this.setPath('input', {
            'root' : inputPath,
            'lib'  : [''],
            'sass' : [''],
            'font' : [''],
        });
        this.setPath('output', {
            'root' : outputPath,
            'css'  : [''],
            'font' : [''],
        });
        Object.defineProperty(this, 'path', { enumerable : false });
        // ルートパスのエイリアス作成
        Object.defineProperties(this, {
            'inputRootPath' : {
                'enumerable' : true,
                'get'        : ()=> this.path.input.root,
                'set'        : ()=>{}
            },
            'outputRootPath' : {
                'enumerable' : true,
                'get'        : ()=> this.path.output.root,
                'set'        : ()=>{}
            }
        });
        // =====================================================================
        // サポートする拡張子の設定
        // 
        Object.defineProperty( this, 'ext', {
            'value'      : {},
            'enumerable' : true
        });

        this.supportExt( 'sass', 's[ac]ss' );
        this.supportExt( 'font', '' );

        // =====================================================================
        // 追加されたタスクのセット
        for ( let key in taskBox ) {
            gulp.task( key, taskBox[key] );
            // taskBox[key].bind(this)();
        }
        taskBox = {};
    }
    /**
     * パスをセットする
     * 
     * @param {string} [inout='']   セットするパスの方向 in,inputかout,outputなど
     * @param {Object} [newPath={}] 
     * @param {string} newPath.sass Sassディレクトリの相対パス
     * @param {TaskAssist}
     */
    setPath( inout = '', newPath = {} ){
        let pathObj;
        if ( /^in/.test(inout) ) {
            pathObj = this.path.input;
        } else if ( /^out/.test(inout) ) {
            pathObj = this.path.output;
        } else {
            console.error('setPath : The inout argument is disability value.');
            return;
        }
        Object.assign(pathObj, newPath);
        return this;
    }
    
    /**
     * サポートする拡張子を設定する
     * 
     * @param  {string} [type=''] 拡張子のラベル
     * @param  {string} ext       拡張子の値
     * @return {TaskAssist}
     */
    supportExt( type = '', ext ){
        this.ext[type] = ext;
        return this;
    }
}

module.exports = TaskAssist;
