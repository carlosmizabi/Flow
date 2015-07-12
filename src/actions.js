var  Actions, Action, Proto;

var Action = function( type ){
    if( typeof type === 'string' ){
        this.type = type.toUpperCase();
        Object.freeze( this );
    }
    else{
        return null;
    }
};

Action.prototype = Object.create({});
Action.prototype.constructor = Action;

Action.prototype.isAction = function ( action ){
    if( action instanceof Action ){
        return true;
    }
    else{
        return false;
    }
};

Actions = {
    Action: Action,
    isAction: function ( action ){
        if( action instanceof Action ){
            return true;
        }
        else{
            return false;
        }
    }
}

Object.freeze( Actions );
Object.freeze( Action.prototype );

module.exports = Actions;

