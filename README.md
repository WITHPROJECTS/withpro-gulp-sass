Gulpを使ったSassの開発環境です。  

| engines | version |
|---------|---------|
| node.js | ^8.9.3  |
| npm     | ^5.6.0  |

以下のことが出来ます

- Sassファイル(.s[ac]ss)の監視とビルド
- 画像の幅、高さ、パスを取得するSass関数の提供
- アイコンフォントの生成

# インストール

```
$ npm i git+ssh://git@github.com:WITHPROJECTS/withpro-gulp-sass.git\#v1
```

# 使い方

「gulpfile.js」に入力ファイルと出力ファイルの設定を記述します。

```js
let task = require('withpro-gulp-sass');

task
    /**
     * 入力パスの設定
     * task.setPath( 'input', path={} );
     *
     * @arg    {string}        inout
     * @arg    {Object}        [path={}]
     * @arg    {string}        [path.root=__dirname] 入力ファイル群のルートディレクトリパス
     * @arg    {string}        [path.sass='']        Sassファイルが入っているディレクトリのパス path.rootからの相対パス
     * @arg    {Array<string>} [path.lib=['']]       node-sassのincludePaths path.rootからの相対パス
     * @return {TaskAssist}
     */
    .setPath( 'input', {
        'root' : `${__dirname}/src`,
        'sass' : 'sass',
        'lib'  : ['../lib/sass']
    } )
    /**
     * 出力パスの設定
     * task.setPath( 'output', path={} );
     *
     * @arg    {string}     inout
     * @arg    {Object}     [path={}]
     * @arg    {string}     [path.root=__dirname] 出力ファイル群のルートディレクトリパス
     * @arg    {string}     [path.css='']         CSSファイルを出力するディレクトリのパス path.rootからの相対パス
     * @arg    {string}     [path.image='']       画像ファイルが入っているディレクトリのパス path.rootからの相対パス
     * @return {TaskAssist}
     */
    .setPath( 'output', {
        'root'  : `${__dirname}/src`,
        'css'   : 'css',
        'image' : 'img'
    } );
```

## 実行

```bash
# Sassファイルの監視
$ npm run watch:sass
```

```bash
# Sassファイルのコンパイル
$ npm run build:sass
```

# 設定変更

setOption関数を使うことでタスクの挙動を変更することが出来ます。

```js
// gulpfile.js
let task = require('withpro-gulp-sass');

/**
 * オプションをセットする
 * @arg    {string}     name        設定名
 * @arg    {Object}     option      設定する値
 * @arg    {boolean}    [diff=true] true：差分　false：差し替え
 * @return {TaskAssist}
 */
task.setOption( 'sass', {} );
```

設定名(name)は以下のパッケージを指します。

| name     | package                                                      |
|----------|--------------------------------------------------------------|
| sass     | [gulp-sass](https://www.npmjs.com/package/gulp-sass)         |
| pleeease | [gulp-pleeease](https://www.npmjs.com/package/gulp-pleeease) |
| plumber  | [gulp-plumber](https://www.npmjs.com/package/gulp-plumber)   |

## gulp-sass

パッケージ標準の設定項目の他に以下の項目を設定できます。

### enqueueFunctions

functionsを動的に追加します。  
enqueueFunctionsに登録された関数はSassコンパイル前に実行されfunctionsに登録されます。

プロパティ「this」を省略した場合はfuncのthisがTaskAssistになります。

```js
/**
 * @prop {Object}   enqueueFunctions
 * @prop {Object}   enqueueFunctions.xxx                  key/valueの形でSassのカスタム関数を定義する。
 * @prop {function} enqueueFunctions.xxx.func             Sassコンパイル処理時に実行され、返り値をfunctionsとして登録する
 * @prop {boolean}  [enqueueFunctions.xxx.this=undefined] funcを拘束するthis 省略した場合はTaskAssistのインスタンスがthisになる
 */
task.setOption( 'sass', {
    'enqueueFunctions' : {
        'myFunction' : {
            'func' : function(){
                ...
                return {
                    'double' : function(){...},
                    'add'    : function(){...},
                }
            },
            'this' : self
        }
    }
} );
```

## gulp-plumber

パッケージ標準の設定項目の他に以下の項目を設定できます。

### sound

通知時のサウンドを変更します。  
