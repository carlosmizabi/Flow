var Actor       = require('./actor');
var Receptor    = require('../watchers/receptor');
var _           = require('../lib.imports').lodash;
var Actors = {
    Actor: Actor,
    EmptyActor: Actor.prototype.EmptyActor,
    createActor: function( name, stage, actions ){
        if( _.isObject( stage ) && _.isArray( actions ) ){
            return new Actor( name , stage, actions );
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
