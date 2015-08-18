var Rx          = require('../lib.imports').Rx;
var _           = require('../lib.imports').lodash;
var Receptor    = require('../watchers/receptor');

var Actor, Private;

Actor = function( name, receptor, stage ){
    Rx.Subject.call( this );
    var Actor = this;
    var _private = {};
    var ARGUMENTS = arguments;

    Actor.finalized = false;

    Actor.addStageStream = function ( stageStream ){
        if( stageStream instanceof Stage ){
            // TODO
        }
    };
    Actor.addStream = function ( stream ) {
        if( stream instanceof Stream === false ){ return; }
        if( _private.stream === null ){
            _private.stream = stream;
            _private.subscription = _private.stream.subscribe( Actor );
        }
        else{
            _private.stream = _private.stream.merge( stream );
            _private.subscription.dispose();
            _private.subscription = _private.stream.subscribe( Actor );
        }
    };

    Actor.addStreams = function ( stream ){
        if( arguments.length > 0 ){
            for( arg in arguments ){
                Actor.addStream( arguments[arg] );
            }
        }
    };

    Actor.finalize = function( stage ){
        if( _.isObject( stage ) && 'addActorAction' in stage ){
            Actor.stage = stage;
            Actor.finalized = true;
            Object.freeze( Actor );
        }
    };

    _private.stream = null;
    _private.subscription = null;
    _private.constructorArgs = arguments;
    _private.init = function () {
        _private.initName();
        _private.initReceptor();
        _private.initStage();
    };
    _private.initName = function(){
        Actor.name =  _.isString( name ) ? Private.buildActorName( name ) : Private.anonymousName;
    };
    _private.initReceptor = function(){
        if( ARGUMENTS.length === 1 && ARGUMENTS[0] instanceof Receptor ){
            Actor.name = Private.anonymousName;
            Actor.receptor = ARGUMENTS[0];
            _private.setUpReceptorFunctions();
        }
        else if( ARGUMENTS.length >= 2 && ARGUMENTS[1] instanceof Receptor ){
            Actor.receptor = ARGUMENTS[1];
            _private.setUpReceptorFunctions();
        }
        else{
            throw Actor.ERRORS.ACTOR_INSTANTIATION_REQUIRES_A_RECEPTOR;
        }
    };

    _private.initStage = function (){
        if( ARGUMENTS.length === 2 && ARGUMENTS[0] instanceof Receptor ){
            Actor.finalize( ARGUMENTS[1] );
        }
        else if( ARGUMENTS.length === 3 && ARGUMENTS[1] instanceof Receptor ){
            Actor.finalize( ARGUMENTS[2] );
        }
    };

    _private.setUpReceptorFunctions = function (){
        Actor.onSignal      = Actor.receptor.onSignal;
        Actor.onNext        = Actor.onSignal;
        Actor.onEnd         = Actor.receptor.onEnd;
        Actor.onComplete    = Actor.onEnd;
        Actor.onError       = Actor.onError;
    };
    _private.init();
};

Actor.prototype = _.create( Rx.Subject.prototype, {
    constructor: Actor,
    ERRORS: {
        ACTOR_INSTANTIATION_REQUIRES_A_RECEPTOR: new Error('Actors needs a receptor at construction')
    },
    ACTOR_POSTFIX   : '_ACTOR',
    ANOMYMOUS_ACTOR_NAME  : 'ANONYMOUS' + '_ACTOR',
    isFinalized: function(){
        return this.finalized || false;
    },
    isEmptyActor: function(){
        return this === this.EmptyActor;
    }
});

Private = {
    anonymousName: Actor.prototype.ANOMYMOUS_ACTOR_NAME,
    buildActorName  : function( nameString ) {
        return nameString.toUpperCase().replace(/[\s*]/, '_') + Actor.prototype.ACTOR_POSTFIX;
    }
};

Actor.prototype.EmptyActor = new Actor( 'EMPTY', Receptor.prototype.EmptyReceptor );
Object.freeze( Actor.prototype );

module.exports = Actor;