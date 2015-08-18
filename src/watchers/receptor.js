var _  = require('../lib.imports').lodash;
var Rx = require('../lib.imports').Rx;
var Noop = Rx.helpers.noop;

var Receptor = function( onSignal, onError, onEnd ){
    if( _.isObject( arguments[0] ) && _.isFunction( arguments[0] ) === false ){
        this.onSignal   = _.isFunction( arguments[0].onSignal ) ? arguments[0].onSignal : Noop;
        this.onError    = _.isFunction( arguments[0].onError )  ? arguments[0].onError  : Noop;
        this.onEnd      = _.isFunction( arguments[0].onEnd   )  ? arguments[0].onEnd    : Noop;
    }
    else {
        this.onSignal   = _.isFunction( onSignal )  ? onSignal  : Noop;
        this.onError    = _.isFunction( onError )   ? onError   : Noop;
        this.onEnd      = _.isFunction( onEnd )     ? onEnd     : Noop;
    }
    Object.freeze( this );
};

Receptor.prototype = _.create({
    constructor: Receptor
});
Receptor.prototype.EmptyReceptor = new Receptor();
Object.freeze( Receptor );
Object.freeze( Receptor.prototype );

module.exports = Receptor;
