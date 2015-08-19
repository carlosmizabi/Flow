var should  = require('chai').should();
var Flow    = require('../../src/flow.js');
var Action  = Flow.Actions.Action;

describe('Action =>', function(){
    describe('@unit', function(){
        describe('@type', function() {
            it('=> is defined', function () {
                Action.should.exist;
            });
            it('=> is a function ', function () {
                Action.should.be.instanceof(Function);
            });
        });
        describe('@constructor ( typeName: String )', function() {
            it('=> is a contructor function that takes a @param TypeName {String} and returns an instance', function(){
                new Action('ACTION_TYPE').should.be.instanceof( Action );
            });
            it('=> on construction if @param TypeName is not a String then return NULL', function(){
                Action.should.throw();
            });
        });
        describe('@property type: String', function() {
            var actionName = 'Action_TYPE';
            it('=> should be of @type {String}', function(){
                //console.log( new Action().type );
                new Action( actionName ).type.should.be.a( 'string' );
            });
            it('=> the string should be composed of alphanumeric or underscores in uppercase, snakecase and trimmed', function(){
                var wrongFormatName = ' _action $:@ type 1';
                new Action ( wrongFormatName ).type.should.equal('ACTION_TYPE_1');
            });
            it('=> it should not be allowed to change', function(){
                var actionName = 'ACTION_1';
                var action = new Action( actionName );
                action.type = '';
                action.type.should.equal( actionName );
            });
        });
        describe('@property EmptyAction: Action', function() {
            it('=> should exist and be an instance of an Action representing a useless action', function(){
                new Action('ACTION').should.have.property('EmptyAction').which.is.instanceof( Action );
            });
        });
        describe('@method isEmptyAction: Boolean', function(){
            it('=> should return false if it is not the EmptyAction', function(){
                new Action('ACTION').isEmptyAction().should.be.false;
            });
            it('=> should return true if it is the EmptyAction', function(){
                Action.prototype.EmptyAction.isEmptyAction().should.be.true;
            });
        });
        describe('@method getActionType(): String', function(){
            it('=> should @return {String} with which it was constructed', function(){
                var actionName = 'ACTION_TEXT';
                new Action(actionName).getActionType().should.equal( actionName );
            });
        });

        describe('@method toString(): String', function() {
            it('=> should return a string', function () {
                new Action("ACTION_TYPE").toString().should.equal('Action { type: "ACTION_TYPE" }');
            });
        });
        describe('@method asJSON(): String', function() {
            it('=> should return a JSON stringified version of the Action', function () {
                var expected = new Action("ACTION_TYPE").asJSON();
                expected.should.be.equal('{"type":"ACTION_TYPE"}');
            });
        });
    });
});
