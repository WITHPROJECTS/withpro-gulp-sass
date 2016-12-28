Sass develop env with Gulp.

# What this can do

- Watching and building Sass, Scss files.
- Get image url, width and height.
- Build iconfonts.

# Install

```
$ npm i git+ssh://git@github.com:WITHPROJECTS/withpro-gulp-sass.git
```

# Usage

```js
// gulpfile.js
let gulp = require('gulp');
let conf = require('withpro-gulp-sass');
conf.init();
```

## Watcing
```bash
$ gulp sass-watch
```

## Building

```bash
$ gulp sass-build
```

## Build iconfont

```bash
$ gulp iconfont
```

# change configuration

For example, You want to change source files and destribution files path.
You can do it as follows.

```js
// gulpfile.js
let gulp = require('gulp');
let conf = require('./withpro-gulp-sass');

conf.path = {
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
}
conf.init();
```

Make sure to change the setting before "**init()**".

## conf.path

| Property      | Type          | Default         |
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

You can pass in task options to option objects.

### conf.options.sass

[gulp-sass](https://www.npmjs.com/package/gulp-sass) options. 
Default options as follows.

| Property     | Default           |
|--------------|-------------------|
| outputStyle  | compressed        |
| includePaths | conf.path.src.lib |
| functions    | sassImageHelper() |

### conf.options.pleeease

[gulp-pleeease](https://www.npmjs.com/package/gulp-pleeease) options.  
Default options as follows.

| Property              | Default       |
|-----------------------|---------------|
| minifier              | false         |
| rem                   | true          |
| opacity               | true          |
| autoprefixer          | Object        |
| autoprefixer.browsers | conf.browsers |
| autoprefixer.cascade  | conf.browsers |

### conf.options.iconfont

[gulp-iconfont](https://www.npmjs.com/package/gulp-iconfont) options.  
Default options as follows.

| Property           | Default                |
|--------------------|------------------------|
| formats            | ['ttf', 'eot', 'woff'] |
| descent            | 0                      |
| prependUnicode     | true                   |
| autohint           | false                  |
| fixedWidth         | false                  |
| centerHorizontally | false                  |
| normalize          | true                   |