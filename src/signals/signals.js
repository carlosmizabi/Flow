var _           = require( '../lib.imports' ).lodash;
var Actions     = require( '../actions/actions' );
var Action      = Actions.Action;
var Signal      = require( './signal' );
var Signaller   = require( './signaller' );
var Message     = require( './message' );

var Signals, Private;

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
        var _action, _message;
        if( _.isObject( signaller )){
            _action = Private.getValidAction( action );
            _message = Private.getValidMessage( message );
            if( _action.isEmptyAction() ){
                return this.EmptySignal;
            } else {
                return new Signal( signaller, _action, _message );
            }
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

    createSignaller: function( signallerOwner, stage ){
        if( _.isObject( signallerOwner )){
            return new Signaller( signallerOwner, stage );
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

Private = {};

Private.getValidAction = function( action ){
    var _action = Action.prototype.EmptyAction;
    if( action instanceof Action )
        _action = action;
    else if ( _.isString( action ))
        _action = new Action(action);
    return _action
};

Private.getValidMessage = function ( message ){
    var _message = Signal.prototype.EmptyMessage;
    if( message instanceof Message )
        _message = message;
    else if ( _.isObject( message ) || _.isString( message ) )
        _message = new Message({ content: message })
    return message;
};

Object.freeze( Signals );
module.exports = Signals;
