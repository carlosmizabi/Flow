var _           = require( '../lib.imports' ).lodash;
var Actions     = require( '../actions/actions' );
var Action      = Actions.Action;
var Signal      = require( './signal' );
var Signaller   = require( './signaller' );
var Message     = require( './message' );

var Signals = {
    Signal: Signal,
    EmptySignal: Signal.prototype.EmptySignal,
    Signaller: Signaller,
    EmptySignaller: Signaller.prototype.EmptySignaller,
    Message: Message,
    EmptyMessage: Message.prototype.EmptyMessage,
    EmptyMessageBody: {},
    EmptyMessageHeader: {},

    createSignal: function( signaller, action, message ){
        if( Signal.prototype.areValidConstructorParameters( signaller, action, message ) ){
            return new Signal( signaller, action, message );
        } else {
            return this.EmptySignal;
        }
    },

    createMessage: function( body, header ){
        var _body = _.isPlainObject( body ) ? body : null;
        var _header = _.isPlainObject( header ) ? header : null;
        if( _body && _header ){
            return new Message( _body, _header );
        } else if( _body || _header ){
            return new Message(( _body || Signals.EmptyMessageBody ), ( _header || Signals.EmptyMessageHeader ));
        } else {
            return Signals.EmptyMessage;
        }
    },

    createSignaller: function( signallerOwner ){
        if(  _.isObject( signallerOwner )){
            return new Signaller( signallerOwner );
        } else {
            return Signals.EmptySignaller;
        }
    },

    isEmptySignal: function( signal ){
        return signal instanceof Signal && signal === Signals.EmptySignal;
    },
    isEmptyMessageBody: function( body ){
        return _.isPlainObject( body ) && body === Signals.EmptyMessageBody;
    },
    isEmptyMessageHeader: function( header ){
        return _.isPlainObject( header ) && header === Signals.EmptyMessageHeader;
    }
};

Object.freeze( Signals );
module.exports = Signals;
