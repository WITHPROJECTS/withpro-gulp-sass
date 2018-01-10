const path = require( 'path' );
let task = require( path.join( __dirname, 'withpro-gulp-sass' ) );

task
    .setPath( 'input', {
        'root' : `${__dirname}/src`,
        'lib'  : ['../lib/sass'],
        'sass' : 'sass',
        'font' : 'font'
    })
    .setPath( 'output', {
        'root'  : `${__dirname}/dest`,
        'css'   : 'css',
        'font'  : 'font',
        'image' : 'img'
    });
