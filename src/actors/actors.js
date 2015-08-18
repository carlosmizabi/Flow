var Actor       = require('./actor');
var Receptor    = require('../watchers/receptor');
var _           = require('../lib.imports').lodash;
var Actors = {
    Actor: Actor,
    EmptyActor: new Actor("EMPTY", new Receptor() ),
    createActor: function( name, receptor ){
        if( receptor instanceof Receptor ){
            return new Actor( name , receptor );
        }
        else {
            return this.EmptyActor;
        }
    },
    isEmptyActor: function( actor ){
        return actor instanceof Actor && actor === Actors.EmptyActor;
    },
    isActor: function( actor ){
        // TODO:
    }
}

Object.freeze( Actors );

module.exports =  Actors;
