var Stage = require('./stage');
var Stages = {
    Stage       : Stage,
    EmptyStage  : Stage.prototype.EmptyStage,
    createStage : function(){
        return new Stage();
    }
};

Object.freeze( Stages );
module.exports = Stages;