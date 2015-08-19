var _           = require('../lib.imports').lodash;
var Rx          = require('../lib.imports').Rx;
var Signals     = require('../signals/signals');
var Actions     = require('../actions/actions');

var Watcher = function( initials ){
    Rx.Observer.call( this );
    var Watcher = this;
    var _private = {};
    var ARGUMENTS = arguments;

    Watcher.onSignal = function ( signal ){
        console.log('+++++++++++++++++++++', signal);
        if( signal instanceof Signals.Signal )
            return signal;
    };
    Watcher.onDone = function (){
        return this.StreamDoneSignal;
    };
    Watcher.onError = function (){
        return this.StreamErrorSignal;
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
        Watcher.onSignal = _.isFunction( initials.onSignal ) ? initials.onSignal : function(){ /* fuck you */ };
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

Watcher.prototype = _.create( Rx.Observer.prototype, {
    constructor: Watcher,
    StreamDoneSignal: Signals.createSignal( this, Actions.createAction('WATCHED_STREAM_DONE'), Signals.EmptyMessage),
    StreamErrorSignal: Signals.createSignal( this, Actions.createAction('WATCHED_STREAM_ERROR'), Signals.EmptyMessage)
});

Object.freeze( Watcher.prototype );
module.exports = Watcher;