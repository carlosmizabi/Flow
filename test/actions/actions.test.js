var should  = require('chai').should();
var expect  = require('chai').expect;
var Flow    = require('../../src/flow.js');
var Actions = Flow.Actions;
var Action  = Flow.Actions.Action;
describe('Actions Module =>', function() {

    describe('@behaviour', function(){
        it('=> should provide a factory for creating actions safely');
    });

    describe('@unit', function(){
        describe('@type', function(){
            it('is defined', function(){
                Actions.should.exist;
            });
            it('is an Object', function(){
                Actions.should.be.an.instanceof( Object );
            });
        });

        describe('@method formatStringForActionType({ String: string }): String', function(){
            it('=> should exist', function(){
                Actions.should.have.property( 'formatStringForActionType').which.is.instanceof(Function);
            });
            it('=> should return an uppercase, snakecase and trimmed string', function(){
                Actions.formatStringForActionType(' ActIon tYpe' ).should.be.equal('ACTION_TYPE');
            });
            it('=> should remove all characters that are not alphanumeric or an underscore', function(){
                Actions.formatStringForActionType('__ ActIon $ :tYpe ---' ).should.be.equal('ACTION_TYPE');
            });
            it('=> numbers should be separated from letters with an underscore', function(){
                Actions.formatStringForActionType('Action2' ).should.be.equal('ACTION_2');
            });
        });
        describe('@method createAction({String: typeName}): Action', function(){
            it('=> should exist and be a function', function(){
                Actions.should.have.property('createAction').which.is.instanceof( Function );
            });
            it('=> an invalid @param will return the EmptyAction', function(){
                Actions.createAction().should.equal( Actions.EmptyAction );
            });
        });
        describe('@method isEmptyAction(): Boolean', function(){
            it('=> should exist and be a function', function(){
                Actions.should.have.property('isEmptyAction').which.is.instanceof( Function );
            });
            it('=> should @return TRUE when the the action is the EmptyAction', function(){
                Actions.isEmptyAction( Actions.createAction() ).should.be.true;
            });
            it('=> should @return FALSE when the the action is the not the EmptyAction', function(){
                Actions.isEmptyAction( Actions.createAction("ACTION") ).should.be.false;
            });
        });
    });
});













