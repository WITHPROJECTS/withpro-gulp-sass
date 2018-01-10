let _mainTaskID = '';    // メインのタスクID
let _isWatching = false; // 監視中か

let status = {}
Object.defineProperty(status, 'mainTaskID', {
    get        : () => _mainTaskID,
    set        : id => _mainTaskID = id,
    enumerable : true
});
Object.defineProperty(status, 'isWatching', {
    get        : () => _isWatching,
    set        : v  => _isWatching = v,
    enumerable : true
});

module.exports = status;
