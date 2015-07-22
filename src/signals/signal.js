var _       =  require('../lib.imports').lodash;
var Action  = require('../actions/action');

var Signal = function( signaller, action, message ){
    if( this.areValidConstructorParameters( signaller, action, message ) ){
        this.action = action;
        this.signaller = signaller;
        this.message = message || null;
        Object.freeze( this );
    }
    else{
        throw this.ERRORS.SIGNAL_INVALID_CONTRUCTOR_PARAMETERS;
        ;
    }
}

Signal.prototype = _.create({
    constructor: Signal,
    areValidConstructorParameters: function ( signaller, action, message ){
        if( _.isObject( signaller ) && action instanceof Action ){
            return true;
        }
        else{
            return false;
        }
    },
    ERRORS: {
        SIGNAL_INVALID_CONTRUCTOR_PARAMETERS: new Error('tried to construct a Signal with invalid parameters')
    },
    hasMessage: function (){
        return ( this.message === null ? false : true );
    },
    toString: function(){
        return 'Signal { '+
                        'signaller: '   + this.signaller.toString() + ', ' +
                        'action: '      + this.action.toString()    + ', ' +
                        'message: '     + ( this.message === null ? null : typeof this.message ) +
                ' }';
    },
    asJSON: function(){
        return JSON.stringify( this );
    },
    toArray: function (){
        return _.toArray( this );
    }
});

Object.freeze( Signal );
Object.freeze( Signal.prototype );

module.exports = Signal;
