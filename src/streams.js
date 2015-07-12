var Rx = require('./lib.imports').Rx;
var Streams, Stream, PRIVATE;

Stream = function(){
    Rx.Subject.call( this );
    Object.seal( this );
}

Stream.prototype = Object.create( Rx.Subject.prototype );
Stream.prototype.contructor = Stream;

Stream.prototype.dispatch = function( actionDataObject ){
    if( PRIVATE.isValidAction( actionDataObject )){
        actionDataObject.timestamp = new Date().toISOString();
        actionDataObject.emitter = this;
        Object.freeze( actionDataObject );
        this.onNext( actionDataObject );
    }
};

Stream.prototype.addWatcher = function( watcher ){
    return this.subscribe( watcher );
}

PRIVATE = {
    isValidAction: function( actionDataObject ){
        if( PRIVATE.isUseful( actionDataObject ) === false ){ return false; }
        if( 'action' in actionDataObject  === false   || Flow.Actions.isAction( actionDataObject.action ) === false ){ return false; }
        if( 'data' in actionDataObject    === false   || actionDataObject.data  === null ){ return false; }
        return true;
    },
    isUseful: function( object ){
        if( typeof object !== 'object' || object === null  ){
            return false;
        }
        else {
            return true;
        }
    }
}

Streams = {
    Stream: Stream
}
Object.freeze( Streams );
Object.freeze( Stream.prototype );

module.exports = Streams
