const path = require( 'path' );

let task = require( path.join( __dirname, 'withpro-gulp-sass' ) );

task
    .setPath( 'input', {
        'root' : `${__dirname}/src`,
    })
    .setPath( 'output', {
        'root'  : `${__dirname}/build`
    });
