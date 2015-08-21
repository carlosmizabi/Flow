var _           = require('../lib.imports').lodash;
var Rx           = require('../lib.imports').Rx;
var Immutable   = require('../lib.imports').Immutable;
var Signals     = require('../signals/signals');
var Signal      = require('../signals/signal');
var Actions     = require('../actions/actions');
var Subject     = require('../stages/subject');
var Observable  = require('../stages/observable');
var Observer    = require('../stages/observer');

var Watcher, Private;

Watcher = function( initials ){
    Observer.call( this );
    var Watcher = this;
    var _private = {};
    var ARGUMENTS = arguments;

    _private.theObserved = new Immutable.Map();

    Object.defineProperty( Watcher, 'size', {
        get: function(){
            return _private.theObserved.size;
        },
        configurable: false,
    })

    Watcher.onSignal = function ( signal ){
        if( signal instanceof Signal )
            return signal;
    };
    Watcher.onDone = function (){
        return this.StreamDoneSignal;
    };
    Watcher.onError = function (){
        return this.StreamErrorSignal;
    };
    Watcher.watch = function( observable ){
        var observables;
        if( arguments.length > 0 ){
            if( _.isArray( arguments[0] )){
                observables = arguments[0];
            } else {
                observables = _.toArray( arguments );
            }
            _private.theObserved = Private.subscribeAndAddObservablesEntries( Watcher, _private.theObserved, observables );
        }
    };
    Watcher.stopAll = function(){
        _private.theObserved = Private.stopWatchForAllSubscriptions( Watcher, _private.theObserved );
    }
    Watcher.stop = function(){
        var observables;
        if( arguments.length > 0 ){
            if( _.isArray( arguments[0] )){
                observables = arguments[0];
            } else {
                observables = _.toArray( arguments );
            }
            _private.theObserved = Private.stopAndRemoveObservablesEntries( Watcher, _private.theObserved, observables );
        }
    };

    Watcher.isWatching = function( observable ){
        return _private.theObserved.has( observable );
    };

    _private.init = function(){
        _private.initObserverFunctions();
        _private.assignObserverFunction();
    };
    _private.assignObserverFunction = function(){
        Watcher.onNext = Watcher.onSignal;
        Watcher.onCompleted = Watcher.onDone;
        Watcher.onError = Watcher.onError;
    }
    _private.initObserverFunctions = function (){
        if( ARGUMENTS.length === 1 &&  _.isFunction( ARGUMENTS[0] ) === false){
            _private.initArgumentsInitials();
        } else {
            _private.initArgumentsSpread();
        }
    }
    _private.initArgumentsInitials = function (){
        Watcher.onSignal = _.isFunction( initials.onSignal ) ? initials.onSignal : Watcher.onSignal;
        Watcher.onDone   = _.isFunction( initials.onDone ) ? initials.onDone : Watcher.onDone;
        Watcher.onError  = _.isFunction( initials.onError ) ? initials.onError : Watcher.onError;
    };
    _private.initArgumentsSpread = function (){
        Watcher.onSignal = _.isFunction( ARGUMENTS[0] ) ? ARGUMENTS[0] : Watcher.onSignal;
        Watcher.onDone   = _.isFunction( ARGUMENTS[1] ) ? ARGUMENTS[1] : Watcher.onDone;
        Watcher.onError  = _.isFunction( ARGUMENTS[2] ) ? ARGUMENTS[2] : Watcher.onError;
    }
    _private.init();
};

Watcher.prototype = _.create( Observer.prototype, {
    constructor: Watcher,
    StreamDoneSignal: Signals.createSignal( this, Actions.createAction('WATCHED_STREAM_DONE'), Signals.EmptyMessage),
    StreamErrorSignal: Signals.createSignal( this, Actions.createAction('WATCHED_STREAM_ERROR'), Signals.EmptyMessage)
});

Private = {};
Private.isValidObservable = function( observable ){
    if( observable instanceof Observable || observable instanceof Subject ){
        return true;
    } else {
        return false;
    }
};

Private.subscribeAndAddObservablesEntries = function ( Watcher, theObserved, newObservables ){
    var mutant = theObserved.asMutable();
    _.forEach( newObservables, function( obs ){
        if( obs instanceof Rx.Observable ){
            var subscription = obs.subscribe( Watcher );
            mutant.set( obs, subscription );
        }
    });
    return mutant.asImmutable();
}

Private.stopWatchForAllSubscriptions = function ( Watcher, theObserved ){
    theObserved.forEach( function( subs ){
        subs.dispose();
    });
    return theObserved.clear();
};
Private.stopAndRemoveObservablesEntries = function ( Watcher, theObserved, observables ){
    var mutant = theObserved.asMutable();
    mutant
        .filter( function( subs, observed ){
            return _.includes( observables, observed );
        })
        .forEach(function( subs, observed ){
            subs.dispose();
            mutant.delete( observed );
        });
    return mutant.asImmutable();
};


Object.freeze( Watcher.prototype );
module.exports = Watcher;