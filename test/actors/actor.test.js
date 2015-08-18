var should      = require('chai').should();
var expect      = require('chai').expect;
var Rx          = require('../../src/lib.imports').Rx;
var Immutable   = require('../../src/lib.imports').Immutable;
var Flow        = require('../../src/flow');
var Stages      = Flow.Stages;
var Actors      = Flow.Actors;
var Actor       = Actors.Actor;
var Actions     = Flow.Actions;
var Receptor    = Flow.Watchers.Receptor;

describe('Actor =>', function(){
    describe('@behaviour', function(){
        it('=> should push all the actions it listens to on its main stream');
        it('=> should provide a stream for each of the actions it listens to for others to listen to');
    });
    describe('@unit', function() {
        describe('@type', function () {
            it('=> should exist', function () {
                Actor.should.exist;
            });
            it('=> is a function', function () {
                Actor.should.be.instanceof(Function);
            });
            it('@extends Rx.Subject ', function () {
                var actor = new Actor('ACTOR', Stages.createStage(), []);
                actor.should.be.instanceof(Rx.Subject);
            });
        });
        describe('@constructor( name: String, stage: Stage, actions: Immutable.Set<Action> ): Void', function () {
            it('=> should throw and error if a valid Stage is not provided', function(){
                expect(function(){
                    new Actor( 'name', null, null );
                }).to.throw(Actor.prototype.ERRORS.ACTOR_CANNOT_BE_INSTANTIATED_WITHOUT_A_VALID_STAGE);
            });
            it('=> should throw and error the action is not the correct type', function(){
                expect(function(){
                    new Actor( 'name', Stages.createStage(), null );
                }).to.throw(Actor.prototype.ERRORS.INCORRECT_CONSTRUCTOR_PARAMETER_AN_ARRAY_OF_ACTION_IS_REQUIRED);
            });
            it('=> should throw and error if any of the actions are invalid', function(){
                var actionsSet = [ new Actions.Action('FIRST'), null ];
                expect(function(){
                   new Actor( 'name', Stages.createStage(), actionsSet );
                }).to.throw(Actor.prototype.ERRORS.ACTOR_CANNOT_BE_INSTANTIATED_WITH_A_COLLECTION_WITH_NON_ACTIONS);
            });
            it('=> should create an Actor even if the name is completely ommitted', function(){
                //new Actor( new Receptor() ).should.exist;
            });
            it('=> should throw and error if a receptor is not provided');
            it('=> should not be finalized if a stage is not provided', function(){
                //var actor = new Actor( new Receptor );
            });
            it('=> should not be frozen if a stage is not provided');
        });

        describe( '@property EmptyActor: Actor', function(){
            it( '=> should be defined and be an instance of Actor', function(){
                expect( Actor.prototype.EmptyActor ).to.exist;
            });
        });

        describe('@method addAction( action: Action ): Void', function(){
            it('=> should add an action to its watched actions')
            it('=> should create an action stream that can be subscribed for that action');
            it('=> should not add actions without the permission of the Stage');
            it('=> should not added actions if the actor is not finalized');
        });
        describe('@method addActionWithoutStream( action: Action ): Boolean', function(){
            it('should add an action to its watched actions but not provide a uniques stream for it');
            it('should return if action was successfuly added');
        });
        describe('@method addActions( Array( Action ) ): Boolean', function(){
            it('should add an action to its watched actions but not provide a uniques stream for it');
            it('should return if action was successfuly added');
        });
        describe('@method createMultiActionsStream( Array( Action ) ): Actor', function(){
            it('should create a stream from multiple actions');
            it('should add actions to watched actions if they are not already observed');
            it('should return if actions was successfuly added');
        });
        describe('@method canActionBeAdded( Action ): Boolean', function(){
            it('should create a stream from multiple actions');
            it('should add actions to watched actions if they are not already observed');
            it('should return if actions was successfuly added');
        });
        describe('@method whichActionsCanBeAdded( Array( Action ) ): { all: Boolean, allowed: Array(Action), disallowed : Array( Action }', function(){
            it('should return and object with the Actions that can be added to the Actor');
            it('should return and object with the Actions that cannot be added to the Actor');
            it('should return and object with the a property indicating if all can be added');
        });
    });
});
