let sassType = require('node-sass').types;
let path     = require('path');
let sizeOf   = require('image-size');

module.exports = (param)=>{
    let absPath = param['absPath'];
    let rtvPath = param['rtvPath'];
    // -------------------------------------------------------------------------
    return {
        'image-url($input: "")' : function(input){
            let getInputVal     = input.getValue();
            let thisDir         = path.dirname(this.options.file);
            let dirFromSassRoot = path.relative(absPath.sass, thisDir);
            let cssDir          = path.join(absPath.css, dirFromSassRoot);
            let fileName        = path.basename(getInputVal);
            let fileDir         = path.dirname(getInputVal);
            let imgDir          = path.join(absPath.image, fileDir);
            let rtnString       = path.join( path.relative(cssDir, imgDir), fileName);
            rtnString           = 'url(\''+rtnString+'\')';
            return new sassType.String(rtnString);
        },
        'image-width($input: "")' : (input)=>{
            let getInputVal = input.getValue();
            let filePath    = path.join(rtvPath.image, getInputVal);
            return new sassType.Number(sizeOf(filePath).width, 'px', 'px');
        },
        'image-height($input: "")' : (input)=>{
            let getInputVal = input.getValue();
            let filePath    = path.join(rtvPath.image, getInputVal);
            return new sassType.Number(sizeOf(filePath).height, 'px', 'px')
        }
    }
}
