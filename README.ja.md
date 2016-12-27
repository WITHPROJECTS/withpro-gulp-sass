Gulpを使ったSassの開発環境です。  

## 出来ること

- Sass, Scssファイルのビルド
- Sass, Scssファイルの監視
- 画像の幅取得、高さ取得、パスの取得
- iconfontの生成

画像の幅、高さ、パスはCompass image helperと同様に
```sass
a
    background : image-url("hello.jpg")
    width      : image-width("hello.jpg")
    height     : image-height("hello.jpg")
```

## 使い方

```bash
$ gulp sass-watch # watching sass file.
$ gulp sass-build # building sass file.
$ gulp iconfont   # generate icon font.
```

## 設定変更

出力先の変更などは以下の様にします。

```js
let conf = require('./withpro-gulp-sass');
let gulp = require('gulp');

conf : {
    'path' : {
        'project' : '/', // project root from web root.
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

## conf.path オブジェクト

| プロパティ         | 型            | 初期値          | 説明 |
|--------------------|---------------|-----------------|--------|
| path.project       | String        | /               |  |
| path.src.sass      | String        | src/sass        |  |
| path.src.sassMixin | String        | src/sass/mixin  |  |
| path.src.font      | String        | src/font        |  |
| path.src.iconfont  | String        | src/font/icon   |  |
| path.src.lib       | String<Array> | [src/sass]      |  |
| path.dest.css      | String        | build/css       |  |
| path.dest.image    | String        | build/img       |  |
| path.dest.font     | String        | build/font      |  |
| path.dest.iconfont | String        | build/font/icon |  |

設定の変更はinit()の前に行ってください。

## 詳細な設定変更



モジュールとして利用する場合は

```js
let gulp   = require('gulp');
let wgsass = require('withpro-gulp-sass');

// -----------------------------------------------------------------------------
// 設定変更
// wgs.path.src.sass = 'assets/sass';
// wgs.path.src.font = 'assets/font';
// -----------------------------------------------------------------------------

wgsass.init();
```
