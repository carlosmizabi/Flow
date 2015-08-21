var Stage       = require('./stage');
var Observable  = require('./observable');
var Observer    = require('./observer');
var Subject     = require('./subject');

var Stages = {
    Stage       : Stage,
    Observer    : Observer,
    Observable  : Observable,
    Subject     : Subject,
    EmptyStage  : Stage.prototype.EmptyStage,
    createStage : function(){
        return new Stage();
    }
};

Object.freeze( Stages );
module.exports = Stages;