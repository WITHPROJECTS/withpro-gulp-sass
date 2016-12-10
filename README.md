Sass develop env.

## Usage

```bash
$ npm run sass-watch # watching sass file.
$ npm run sass-build # building sass file.
$ npm run iconfont   # generate icon font.
```

## change configuration

if only use it. you will change code on withpro-gulp-sass.js.

```js
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
```

Not so, when you wanna use it as local module.

```js
let gulp   = require('gulp');
let wgsass = require('withpro-gulp-sass');

// -----------------------------------------------------------------------------
// change configuration.
// wgs.path.src.sass = 'assets/sass';
// wgs.path.src.font = 'assets/font';
// -----------------------------------------------------------------------------

let keys = Object.keys(wgsass.functions);
keys.forEach((key)=>{
    let f = withproGulpSass.functions;
    if(Array.isArray(f[key])){
        if(typeof f[key] === 'function'){
            gulp.task(key, f[key][0]);
        }else{
            gulp.task(key, f[key][0], f[key][1]);
        }
    }else{
        gulp.task(key, f[key]);
    }
});
```
