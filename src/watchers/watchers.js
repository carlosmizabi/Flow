var Rx          = require('../lib.imports').Rx;
var Receptor    = require('./receptor');
var Watcher     = require('./watcher');

var Watchers = {
    Watcher: Watcher,
    Receptor: Receptor
};

Object.freeze( Watchers );
Object.freeze( Watcher.prototype );

module.exports = Watchers;
