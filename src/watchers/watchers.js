var Watcher     = require('./watcher');

var Watchers = {
    Watcher: Watcher
};

Object.freeze( Watchers );
Object.freeze( Watcher.prototype );

module.exports = Watchers;
