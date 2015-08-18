var _       = require('../lib.imports').lodash;

var Signaller = function( owner, stage ){
    var Signaller = this;
    var _init = function() {
        if( _.isObject(owner) ){
            Signaller.owner = owner;
            Signaller.finalize( stage );
        } else {
            throw Signaller.ERRORS.SIGNALLER_INSTANTIATION_REQUIRES_AN_OWNER;
        }
    }
    Signaller.finalize = function( stage ){
        if( _.isObject(stage) && 'assignEmittersTo' in stage ){
            Signaller.stage = stage;
            stage.assignEmittersTo( Signaller );
            if( 'emit' in Signaller && 'emitSignal' in Signaller ){
                Signaller.finalized = true;
                Object.freeze( Signaller );
            }
        }
    };

    Signaller.emitSignals =  function( spreadOfSignals ){
        var signals = _.isArray( spreadOfSignals ) ? spreadOfSignals : arguments;
        if( Signaller.isFinalized() ){
            _.forEach( signals, function( signal ){
                Signaller.emitSignal( signal );
            });
        }
    };
    _init();
};

Signaller.prototype = _.create({
    constructor: Signaller,
    finalized: false,
    stage: null,
    ERRORS: {
        SIGNALLER_INSTANTIATION_REQUIRES_AN_OWNER: new Error('ERROR: A signaller instantiation requires a stage and an owner')
    },
    isStageALive: function(){
        return typeof this.stage !== 'undefined' && this.stage !== null;
    },
    isFinalized: function (){
        return this.finalized;
    },
    isEmptySignaller: function(){
        return this === this.EmptySignaller;
    }
});

Signaller.prototype.EmptySignaller =  new Signaller( {} );
Signaller.prototype.EmptySignaller.finalize = function(){};
Object.freeze( Signaller.prototype );

module.exports = Signaller;



