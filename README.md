The Sass compiling task runner.

| engines | version |
|---------|---------|
| node.js | ^8.9.3  |
| npm     | ^5.6.0  |

it is able to

- watch and compile Sass files(.s[ac]ss)
- it offer functions that get image width,height and url

# Install

```
$ npm i git+ssh://git@github.com:WITHPROJECTS/withpro-gulp-sass.git
```

# How to use

you write to your gulpfile.js that setting of input files and output files.

```js
let task = require('withpro-gulp-sass');

task
    /**
     * input path setting
     * task.setPath( 'input', path={} );
     *
     * @arg    {string}        inout
     * @arg    {Object}        [path={}]
     * @arg    {string}        [path.root=__dirname] root directory path of input files.
     * @arg    {string}        [path.sass='']        the Sass files directory. (it is relative path from path.root)
     * @arg    {Array<string>} [path.lib=['']]       includePaths of node-sass. (it is relative path from path.root)
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
     * @arg    {string}     [path.root=__dirname] root directory path of output files.
     * @arg    {string}     [path.css='']         the directory that css files is outputted. (it is relative path from path.root)
     * @arg    {string}     [path.image='']       the image files directory. (it is relative path from path.root)
     * @return {TaskAssist}
     */
    // 
    .setPath( 'output', {
        'root'  : `${__dirname}/src`,
        'css'   : 'css',
        'image' : 'img'
    } );
```

## Scripts

```bash
# watching Sass files
$ npm run watch:sass
```

```bash
# Compiling Sass files.
$ npm run build:sass
```

# Change setting

By using the setOption function, you can change to behavior of task.

```js
// gulpfile.js
let task = require('withpro-gulp-sass');

/**
 * set options
 * @arg    {string}     name        setting name
 * @arg    {Object}     option      setting value
 * @arg    {boolean}    [diff=true] true：diff　false：change
 * @return {TaskAssist}
 */
task.setOption( 'sass', {} );
```

the setting name(name) refers to the following packages.

| name     | package                                                      |
|----------|--------------------------------------------------------------|
| sass     | [gulp-sass](https://www.npmjs.com/package/gulp-sass)         |
| pleeease | [gulp-pleeease](https://www.npmjs.com/package/gulp-pleeease) |
| plumber  | [gulp-plumber](https://www.npmjs.com/package/gulp-plumber)   |

## gulp-sass

In addition to the package default setting items, the following items can be set.

### enqueueFunctions

it dynamically registers your Sass functions to a functions property.  
the register function is actioned when compiling sass file. this function must return object, and return value is registered to functions property.

if you omit 'this' property, the 'this' of func function is 'TaskAssist'.

```js
/**
 * @prop {Object}   enqueueFunctions
 * @prop {Object}   enqueueFunctions.xxx                  define Sass functions in the form of key/value.
 * @prop {function} enqueueFunctions.xxx.func
 * @prop {boolean}  [enqueueFunctions.xxx.this=undefined] 'this' of func function.
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

In addition to the package default setting items, the following items can be set.

### sound

change sound type when notify
