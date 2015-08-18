var _       =  require('../lib.imports').lodash;
var Action  = require('./action');
var Actions = {
    Action: Action,
    EmptyAction: Action.prototype.EmptyAction,
    createAction: function ( typeName ){
        if( _.isString( typeName ) )
            return new Action( typeName );
        else
            return Actions.EmptyAction;
    },
    isAction: function ( action ){
        if( action instanceof Action )
            return true;
        else
            return false;
    },
    isEmptyAction: function ( action ){
        return action === this.EmptyAction;
    },
    formatStringForActionType: Action.prototype.formatStringForActionType
}

Object.freeze( Actions );
module.exports = Actions;

