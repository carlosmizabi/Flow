var _           = require('../lib.imports').lodash;
var Rx          = require('../lib.imports').Rx;
var Actor       = require('./actor');

var Actors = {
    Actor: Actor,
    EmptyActor: Actor.prototype.EmptyActor,
    createActor: function( name, stage, actions ){
        var theName;
        if( _.isObject( stage ) && stage instanceof Rx.Subject && _.isArray( actions ) ){
            theName = _.isString( name ) ? name : '';
            return new Actor( theName , stage, actions );
        } else {
            return this.EmptyActor;
        }
    },
    isEmptyActor: function( actor ){
        return Actors.isActor( actor ) && actor === Actors.EmptyActor;
    },
    isActor: function( actor ){
        return actor instanceof Actors.Actor
    }
}

Object.freeze( Actors );
module.exports =  Actors;
