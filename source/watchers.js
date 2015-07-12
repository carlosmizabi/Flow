if( Flow && Rx ){
    Flow.Watchers = ( function( Flow, Rx ){

        var Watcher, Watchers;

        var Watcher  = function Watcher( params ){
            Rx.AnonymousObserver.call( this, params.next, params.error, params.done );
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

        return Watchers;
    }( Flow, Rx ));
}
