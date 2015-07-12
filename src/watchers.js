var Rx = require('./lib.imports').Rx;

var Watchers;

function Watcher( _initials_ ){
    Rx.AnonymousObserver.call( this, _initials_.next || Rx.noop , _initials_.error || Rx.noop, _initials_.done || Rx.noop );
    Object.seal( this );
}

Watcher.prototype = Object.create( Rx.AnonymousObserver.prototype );
Watcher.prototype.constructor = Watcher;

Watcher.prototype.addStream = function( stream ){
    if( 'subscribe' in stream ){
        return stream.subscribe( this );
    }
}

Watchers = {
    Watcher: Watcher
};

Object.freeze( Watchers );
Object.freeze( Watcher.prototype );

module.exports = Watchers;
