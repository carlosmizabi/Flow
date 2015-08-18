var _           = require('../lib.imports').lodash;
var Actions     = require('../actions/actions');
var Action      = require('../actions/action');
var Message     = require('./message');
var Signaller   = require('./signaller');

var Signal = function ( signaller, action, message ){
    if( this.areValidConstructorParameters( signaller, action, message ) ) {
        this.action = action;
        this.signaller = signaller;
        this.message = message instanceof Message ? message : Message.prototype.EmptyMessage;
        Object.freeze( this );
    } else {
        throw this.ERRORS.SIGNAL_INVALID_CONTRUCTOR_PARAMETERS;
    }
}

Signal.prototype = _.create({
    constructor: Signal,
    areValidConstructorParameters: function ( signaller, action){
        if( signaller instanceof Signaller && action instanceof Action )
            return true;
        else
            return false;
    },
    ERRORS: {
        SIGNAL_INVALID_CONTRUCTOR_PARAMETERS: new Error('tried to construct a Signal with invalid parameters')
    },
    hasMessage: function (){
        return ( this.message === Message.prototype.EmptyMessage ? false : true );
    },
    toString: function (){
        return 'Signal { ' +
            'signaller: ' + this.signaller.toString() + ', ' +
            'action: ' + this.action.toString() + ', ' +
            'message: ' + this.message.toString() +
            ' }';
    },
    isEmptySignal: function(){
        return this === this.EmptySignal;
    },
    toArray: function (){
        return _.toArray(this);
    }
});

Signal.prototype.EmptySignal = new Signal( Signaller.prototype.EmptySignaller, Actions.EmptyAction );

Object.freeze(Signal);
Object.freeze(Signal.prototype);

module.exports = Signal;
