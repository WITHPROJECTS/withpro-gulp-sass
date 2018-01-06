Gulpを使ったSassの開発環境です。  

# 出来ること

- Sass, Scssファイルの監視とビルド
- 画像の幅取得、高さ取得、パスの取得
- iconfontの生成

RubyのSass、Compassは使用していません。

# インストール

```
$ npm i git+ssh://git@github.com:WITHPROJECTS/withpro-gulp-sass.git
```

# 使い方

```js
// gulpfile.js
let gulp = require('gulp');
let Task = require('withpro-gulp-sass');

let inputRoot  = `${__dirname}/src`;  // 入力ファイル群のルートディレクトリパス
let outputRoot = `${__dirname}/dest`; // 出力ファイル群のルートディレクトリパス

let task = new Task( inputRoot, outputRoot );
task.setPath('input', {
    
});
```

## 監視
```bash
$ gulp sass-watch
```

## ビルド

```bash
$ gulp sass-build
```

## iconfont

```bash
$ gulp iconfont
```

# 設定変更

出力先の変更などは以下の様にします。

```js
// gulpfile.js
let gulp = require('gulp');
let conf = require('./withpro-gulp-sass');

conf : {
    'path' : {
        'project' : '/',
        'src' : {
            'sass'      : 'src/sass',
            'sassMixin' : 'src/sass/mixin',
            'font'      : 'src/font',
            'iconfont'  : 'src/font/icon',
            'lib'       : ['src/sass']
        },
        'dest' : {
            'css'      : 'build/css',
            'image'    : 'build/img',
            'font'     : 'build/font',
            'iconfont' : 'build/font/icon'
        }
    },
    'browsers' : ['last 3 version'] // gulp-pleeeease support level.
}

conf.init();
```

設定の変更は必ず"**init()**"の前に行ってください。

## conf.path

| プロパティ    | 型            | 初期値          |
|---------------|---------------|-----------------|
| project       | String        | /               |
| src.sass      | String        | src/sass        |
| src.sassMixin | String        | src/sass/mixin  |
| src.font      | String        | src/font        |
| src.iconfont  | String        | src/font/icon   |
| src.lib       | String<Array> | [src/sass]      |
| dest.css      | String        | build/css       |
| dest.image    | String        | build/img       |
| dest.font     | String        | build/font      |
| dest.iconfont | String        | build/font/icon |

## conf.options 

options オブジェクトにはタスクのオプションを渡すことができます。

### conf.options.sass

[gulp-sass](https://www.npmjs.com/package/gulp-sass)のオプション  
以下のオプションがデフォルトで設定されています。

| プロパティ   | 初期値            |
|--------------|-------------------|
| outputStyle  | compressed        |
| includePaths | conf.path.src.lib |
| functions    | sassImageHelper() |

### conf.options.pleeease

[gulp-pleeease](https://www.npmjs.com/package/gulp-pleeease)のオプション  
以下のオプションがデフォルトで設定されています。

| プロパティ            | 初期値        |
|-----------------------|---------------|
| minifier              | false         |
| rem                   | true          |
| opacity               | true          |
| autoprefixer          | Object        |
| autoprefixer.browsers | conf.browsers |
| autoprefixer.cascade  | conf.browsers |

### conf.options.iconfont

[gulp-iconfont](https://www.npmjs.com/package/gulp-iconfont)のオプション  
以下のオプションがデフォルトで設定されています。

| プロパティ         | 初期値                 |
|--------------------|------------------------|
| formats            | ['ttf', 'eot', 'woff'] |
| descent            | 0                      |
| prependUnicode     | true                   |
| autohint           | false                  |
| fixedWidth         | false                  |
| centerHorizontally | false                  |
| normalize          | true                   |
