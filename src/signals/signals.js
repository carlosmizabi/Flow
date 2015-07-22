var _       = require('../lib.imports').lodash;
var Actions = require('../actions/actions');
var Action  = Actions.Action;
var Signal  = require('./signal');

var Signals = {
    Signal: Signal,
    EmptySignal: new Signal({}, Actions.EmptyAction ),
    createSignal: function( signaller, action, message ){
        if( Signal.prototype.areValidConstructorParameters(signaller, action, message) ){
            return new Signal(signaller, action, message);
        }
        else{
            return this.EmptySignal;
        }
    }
};


function Signal( action, message, signaller){
    this.action = new Action();
    if( Private.areConstructorParameterValid( action, message, signaller) ){

    }
    //else{
    //    return Signals.EmptySignal || null;
    //}

}

Signal.prototype = _.create({
    constructor: Signal
});

Object.freeze( Signals );
module.exports = Signals;
