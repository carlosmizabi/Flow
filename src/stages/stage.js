var Immutable   = require('../lib.imports').Immutable;
var Map         = Immutable.Map;
var _           = require('../lib.imports').lodash;
var Rx          = require('../lib.imports').Rx;
var Actions     = require('../actions/actions');
var Action      = require('../actions/action');
var Actors      = require('../actors/actors');
var Actor       = require('../actors/actor');
var Utils       = require('../utils/utils');
var Signals      = require('../signals/signals');
var Private     = {};

var Stage = function(){
    Rx.Subject.call( this );
    var Stage = this;
    var _private = {};

    _private.init = function(){
        _private.actionRegistry = new Map().asMutable();
    };

    Stage.getActionRegistry = function(){
        return _private.actionRegistry;
    };

    Stage.addActorAction = function( actor, action ){
        var theActor    = Utils.getFirstObjectWithType( Actor, [ actor, action ] );
        var theAction   = Utils.getFirstObjectWithType( Action, [ actor, action ]);
        if( Private.isValidActionRegistryEntry( theAction, theActor ) &&  Stage.hasAction( theAction ) === false )
            _private.actionRegistry.set( theAction, theActor );
    };

    Stage.hasAction = function ( action ){
        return _private.actionRegistry.has( action );
    };

    Stage.getActionWithType = function ( typeName ){
        var result = _private.actionRegistry.keySeq().find( function( keyAction ){
            return keyAction.type === typeName;
        });
        return ( result instanceof Action )? result : Actions.EmptyAction ;
    };

    Stage.hasActionWithType = function ( name ){
        return Stage.getActionWithType( name ) === Actions.EmptyAction ? false : true;
    };

    Stage.getActorNamed = function ( name ){
        var result = _private.actionRegistry
            .filter(function( actor, action ){
                return actor.name === name;
            });
        return (result.first() instanceof Actor) ? result.first() : Actors.EmptyActor;
    };

    Stage.getActorForAction = function ( action ){
        var result = _private.actionRegistry.filter( function( valueActor, keyAction ){
                return keyAction === action;
        });
        return result.isEmpty() === false ? result.first() : Actors.EmptyActor;
    };

    Stage.getActorForActionWithType =  function( actionType ){
        var action;
        if( _.isString( actionType ) ){
            action = Stage.getActionWithType( actionType );
            return Stage.getActorForAction( action );
        } else {
            return Stage.EmptyActor;
        }
    };

    Stage.hasActor = function ( actor ){
        var result = _private.actionRegistry.filter( function( valueActor ){
            return valueActor === actor;
        });
        return result.isEmpty() ? false : true;
    };

    Stage.hasActorNamed = function ( actorName ){
        var result = _private.actionRegistry.filter( function( valueActor ){
            return valueActor.name === actorName;
        });
        return result.isEmpty() ? false : true;
    };

    Stage.whichActionsExist = function ( collectionOfActions ){
        if( arguments.length > 0 &&  _.isArray( collectionOfActions ) === false)
            collectionOfActions = _.toArray( arguments );
        return Private.extractActionsInRegistry( Stage, collectionOfActions );
    };
    Stage.whichActionsExistFromTypes = function ( collectionOfActionTypes ){
        if( arguments.length > 0 &&  _.isArray( collectionOfActionTypes ) === false)
            collectionOfActionTypes = _.toArray( arguments );
        return Private.extractActionsWithTypesInRegistry( Stage, collectionOfActionTypes );
    };

    Stage.whichActorsExist = function( actorsCollection ){
        if( arguments.length > 0 &&  _.isArray( actorsCollection ) === false)
            actorsCollection = _.toArray( arguments );
        return Private.extractActorsInRegistry( Stage, actorsCollection );
    };

    Stage.whichActorsExistFromNames = function( actorNamesCollection ){
        if( arguments.length > 0 &&  _.isArray( actorNamesCollection ) === false)
            actorNamesCollection = _.toArray( arguments );
        return Private.extractActorsWithNamesInRegistry( Stage, actorNamesCollection );
    };

    Stage.isEmittable = function( signal ){
        if( signal instanceof Signals.Signal && signal !== Signals.EmptySignal && Stage.hasAction( signal.action ) )
            return true;
        else
            return false;
    };

    Stage.assignEmittersTo = function( signaller ){
        if( _.isObject( signaller ) ){
            Private.createInTheSignallerAn_Emit_Function( Stage, signaller );
            Private.createInTheSignallerAn_EmitSignal_Function( Stage, signaller );
        }
    };

    Stage.finalize = function( object ){
        if( object instanceof Signals.Signaller ){
            Private.finalizeSignaller( Stage, object );
        } else if ( object instanceof Actors.Actor ){
            Private.finalizeActor( Stage, object );
        }
    };

    Stage.emit = function( signal ){
        if( Stage.isEmittable( signal ) ){
            Stage.onNext( signal );
        }
    };

    Stage.lockRegistry = function (){
        _private.actionRegistry = _private.actionRegistry.asImmutable();
    };

    _private.init();
    Object.freeze( this );
};

Stage.prototype = _.create( Rx.Subject.prototype, {
    constructor: Stage,
    createSignaller: function ( signallerOwner ){
        var signaller = Signals.EmptySignaller;
        if( _.isObject( signallerOwner) ){
            signaller = Signals.createSignaller( signallerOwner );
            signaller.finalize( this );
        }
        return signaller;
    }
});

Stage.prototype.EmptyStage = new Stage();

Private.createInTheSignallerAn_Emit_Function = function ( Stage, signaller ){
    if( 'emit' in signaller === false && Object.isFrozen( signaller ) === false ){
        signaller.emit = Private.createEmitFunction( Stage, signaller );
    }
};

Private.createEmitFunction = function( Stage, signaller ){
    return function( action, message ){
        if( action instanceof Action  ){
            var signal = Signals.createSignal( signaller, action, message );
            if( signal.isEmptySignal() === false )
                Stage.emit( signal );
        }
    }
};

Private.createInTheSignallerAn_EmitSignal_Function = function ( Stage, signaller ){
    if( 'emitSignal' in signaller === false && Object.isFrozen( signaller ) === false ){
        signaller.emitSignal = Private.createEmitSignalFunction( Stage, signaller );
    }
};

Private.createEmitSignalFunction= function( Stage, signaller ){
    return function( signal ){
        if( signal instanceof Signals.Signal && signal.signaller === signaller ){
            if( signal.isEmptySignal() === false )
                Stage.emit( signal );
        }
    }
};

Private.isValidActionRegistryEntry = function ( action, actor ){
    return action instanceof Action && actor instanceof Actor;
};

Private.extractActionsInRegistry = function ( Stage, collectionOfActions ){
    return _.filter( collectionOfActions, function( action ){
        return Stage.hasAction( action );
    });
};

Private.extractActionsWithTypesInRegistry = function ( Stage, collectionOfActionTypes ){
    return _.filter( collectionOfActionTypes, function( type ){
        return Stage.hasActionWithType( type );
    });
};

Private.extractActorsInRegistry = function ( Stage, actorsCollection ){
    return _.filter( actorsCollection, function( actor ){
        return Stage.hasActor( actor );
    });
};

Private.extractActorsWithNamesInRegistry = function ( Stage, actorNamesCollection ){
    return _.filter(  Stage.getActionRegistry().toArray() ,function ( actor ){
        return _.includes( actorNamesCollection, actor.name );
    });
};

Private.finalizeSignaller = function ( Stage, signaller ){
    signaller.finalize( Stage );
}

Private.finalizeActor = function ( Stage, actor ){
    actor.finalize( Stage );
}

Object.freeze( Stage );
Object.freeze( Stage.prototype );

module.exports = Stage;