let _mainTaskID = '';

let status = {}
Object.defineProperty(status, 'mainTaskID', {
    get : ()=> _mainTaskID,
    set : ( id )=>{
        _mainTaskID = id;
    },
    enumerable : true
});

module.exports = status;
