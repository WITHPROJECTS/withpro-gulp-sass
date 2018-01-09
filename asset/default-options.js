const notifier = require('node-notifier');
const path     = require('path');


let options = {};

/**
 * Sassの設定
 * 
 * オプションはnode-sassに従う
 * 以下専用のプロパティ
 * 
 * @prop {Object}   enqueueFunctions
 * @prop {Object}   enqueueFunctions.xxx                  key/valueの形でSassのカスタム関数を定義する。
 * @prop {function} enqueueFunctions.xxx.func             Sassコンパイル処理時に実行され、返り値をfunctionsとして登録する
 * @prop {boolean}  [enqueueFunctions.xxx.this=undefined] funcを拘束するthis 省略した場合はTaskAssistのインスタンスがthisになる
 */
options['sass'] = {
    'outputStyle'      : 'compressed',
    'functions'        : {},
    'enqueueFunctions' : {
        'image-helper' : {
            'func' : require( path.join( __dirname, 'functions/image-helper' ) ) 
        }
    }
};

/**
 * pleeeaseの設定
 *
 */
options['pleeease'] = {
    'minifier'     : false,
    'rem'          : true,
    'opacity'      : true,
    'autoprefixer' : {
        'browsers' : ['last 3 version'],
        'cascade'  : ['last 3 version']
    }
};

/**
 * plumberの設定
 *
 */
options['plumber'] = {
    'sound'        : 'Pop',
    'errorHandler' : function(err) {
        if ( err ) {
            console.error(err.message);
            notifier.notify({
                'title'   : `Sass ${err.name}`,
                'message' : `${err.name} : ${err.relativePath}\n{ Line : ${err.line}, Column : ${err.column} }`,
                'sound'   : options['plumber']['sound']
            });
        }
    }
};

module.exports = options;
