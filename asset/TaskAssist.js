const path = require('path');
const gulp = require('gulp');

/**
 * オブジェクトをマージする
 * 
 * @param  {Object} base ベースとなるオブジェクト
 * @param  {Object} add  追加するオブジェクト
 * @return {Object}
 */
let objectMerge = ( base, add )=>{
    for( let key in add ) {
        if(
            typeof base[key] === 'object' &&
            typeof add[key]  === 'object' &&
            !Array.isArray(base[key]) &&
            !Array.isArray(add[key])
        ){
            base[key] = objectMerge( base[key], add[key] );
        } else {
            base[key] = add[key];
        }
    }
    return base;
}

/** タスクの諸々の設定をサポートするクラス */
class TaskAssist {
    /**
     * コンストラクタ
     * =========================================================================
     * 
     * @param  {string}     [inputPath=__dirname]  root directory of input files.
     * @param  {string}     [outputPath=__dirname] root directory of output files.
     * @return {TaskAssist}
     */
    constructor ( inputPath = __dirname, outputPath = __dirname ) {
        let self = this;

        // パス
        this.path = { 'input' : {}, 'output' : {} };
        this.setPath('input', {
            'root' : inputPath,
            'lib'  : [''],
            'sass' : '',
        });
        this.setPath('output', {
            'root'  : outputPath,
            'css'   : '',
            'image' : ''
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

        // サポートする拡張子の設定
        Object.defineProperty( this, 'ext', {
            'value'      : {},
            'enumerable' : true
        });
        this.supportExt( 'sass', 's[ac]ss' );
        this.supportExt( 'font', '' );

        // オプション
        this.options = {};
    }
    /**
     * パスをセットする
     * =========================================================================
     * @param {string}     [inout='']   セットするパスの方向 in,inputかout,outputなど
     * @param {Object}     [newPath={}] 
     * @param {string}     newPath.sass Sassディレクトリの相対パス
     * @param {TaskAssist}
     */
    setPath ( inout = '', newPath = {} ) {
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
     * パスを返す
     * =========================================================================
     * 
     * @param  {string}               [inout='']    
     * @param  {string}               [typeName=''] 
     * @param  {Object}               [option={}]
     * @param  {boolean}              [option.raw=false] // 設定された値をそのまま返す
     * @return {string|Array<string>}
     */
    getPath ( inout = '', typeName = '', option = {} ) {
        option.raw = option.raw === undefined ? false : option.raw;
        let obj;
        if ( /^in/.test(inout) ) {
            obj = this.path.input;
        } else if ( /^out/.test(inout) ) {
            obj = this.path.output;
        } else {
            console.error('getPath : The inout argument is disability value.');
            return;
        }

        if ( Array.isArray(obj[typeName]) ) {
            if ( option.raw ) {
                return obj[typeName];
            } else {
                return obj[typeName].map( v => path.join( obj.root, v ) );
            }
        } else {
            if ( option.raw ) {
                return obj[typeName];
            } else {
                return path.join( obj.root, obj[typeName] );
            }
        }
    }
    
    /**
     * サポートする拡張子を設定する
     * =========================================================================
     * 
     * @param  {string}     [type=''] 拡張子のラベル
     * @param  {string}     ext       拡張子の値
     * @return {TaskAssist}
     */
    supportExt( type = '', ext ){
        this.ext[type] = ext;
        return this;
    }
    
    /**
     * タスクをセット
     * =========================================================================
     * 
     * @param  {string}     name
     * @return {TaskAssist}
     */
    setTask( name, obj, self ){
        self = self || this;
        gulp.task( name, obj.task.bind(self) );
        return this;
    }
    
    /**
     * オプションをセットする
     * =========================================================================
     * 
     * @param  {string}     [name='']   
     * @param  {Object}     [param={}]  
     * @param  {boolean}    [diff=true] true：差分　false：差し替え
     * @return {TaskAssist}
     */
    setOption( name = '', param = {}, diff = true ){
        let ops = this.options;

        // 初回か差し替えモードの場合
        if ( ops[name] === undefined || diff === false ) {
            ops[name] = param;
            return this;
        }
        // 差分だけ反映
        ops[name] = objectMerge( ops[name], param );
        
        return this;
    }
}

module.exports = TaskAssist;
