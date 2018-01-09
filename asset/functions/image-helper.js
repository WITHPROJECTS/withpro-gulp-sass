let sassType = require('node-sass').types;
let path     = require('path');
let sizeOf   = require('image-size');

module.exports = function(){
    let filePath = {
        'sass'  : this.getPath('input',  'sass',  { 'raw' : false } ),
        'css'   : this.getPath('output', 'css',   { 'raw' : false } ),
        'image' : this.getPath('output', 'image', { 'raw' : false } )
    }
    // -------------------------------------------------------------------------
    return {
        'image-url($input: "")' : function(input){
            let getInputVal     = input.getValue();
            let thisDir         = path.dirname(this.options.file);
            let dirFromSassRoot = path.relative(filePath.sass, thisDir);
            let cssDir          = path.join(filePath.css, dirFromSassRoot);
            let fileName        = path.basename(getInputVal);
            let fileDir         = path.dirname(getInputVal);
            let imgDir          = path.join(filePath.image, fileDir);
            let rtnString       = path.join(path.relative(cssDir, imgDir), fileName);
            rtnString           = 'url(\''+rtnString+'\')';
            return new sassType.String(rtnString);
        },
        'image-width($input: "")' : (input)=>{
            let getInputVal = input.getValue();
            let file        = path.join(filePath.image, getInputVal);
            return new sassType.Number(sizeOf(file).width, 'px', 'px');
        },
        'image-height($input: "")' : (input)=>{
            let getInputVal = input.getValue();
            let file        = path.join(filePath.image, getInputVal);
            return new sassType.Number(sizeOf(file).height, 'px', 'px')
        }
    }
}
