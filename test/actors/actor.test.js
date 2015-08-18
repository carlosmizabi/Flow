var should  = require('chai').should();
var expect  = require('chai').expect;
var Rx      = require('../../src/lib.imports').Rx;
var Flow    = require('../../src/flow');
var Stages  = Flow.Stages;
var Actors  = Flow.Actors;
var Actor   = Actors.Actor;
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
                var actor = new Actor('ACTOR', new Receptor());
                actor.should.be.instanceof(Rx.Subject);
            });
        });
        describe('@constructor( name: String, receptor: Receptor, stage: Stage ): Void', function () {
            it('=> should throw and error if a receptor is not provided', function () {
                Actor.should.throw();
                (function () {
                    new Actor(null);
                }).should.throw(Actor.prototype.ERRORS.ACTOR_INSTANTIATION_REQUIRES_A_RECEPTOR);
            });
            it('=> should create an Actor even if the name is completely ommitted', function(){
                new Actor( new Receptor() ).should.exist;
            });
            it('=> should throw and error if a receptor is not provided');
            it('=> should not be finalized if a stage is not provided', function(){
                var actor = new Actor( new Receptor );
            });
            it('=> should not be frozen if a stage is not provided');
        });
        describe('@property receptor: Receptor', function () {
            it('=> should be defined', function(){
                new Actor( null, new Receptor() ).should.have.property('receptor');
            });
        });

        describe( '@property EmptyActor: Actor', function(){
            it( '=> should be defined and be an instance of Actor', function(){
                expect( Actor.prototype.EmptyActor ).to.exist;
            });
        });

        describe('@method isFinalized(): Boolean', function(){
            it('=> should return if the Actor has been finalized', function(){
                var actor = new Actor( 'FART', Receptor.prototype.EmptyReceptor, Stages.createStage() );
                expect( actor.isFinalized() ).to.be.true;
            });
        });

        describe( '@method finalize( stage: Stage ): Void', function(){
            it( '=> should not finalize the Actor if not provided with a valid stage', function(){
                var actor = new Actor( '', Receptor.prototype.EmptyReceptor );
                actor.finalize();
                expect( actor.isFinalized() ).to.be.false;
                actor.finalize( {} );
                expect( actor.isFinalized() ).to.be.false;
                actor.finalize( null );
                expect( actor.isFinalized() ).to.be.false;
            });
            it( '=> should finalize the Actor if provided with a valid stage', function(){
                var actor = new Actor( '', Receptor.prototype.EmptyReceptor );
                var stage = Stages.createStage();
                actor.finalize( stage );
            });
        });

        describe('@method onSignal(): Void', function () {
            it('=> should be defined', function(){
                var actor = new Actor( null, new Receptor() );
                actor.should.have.property('onSignal').which.equals( actor.onNext );
            });
        });
        describe('@method onNext(): Void', function () {
            it('=> should be defined', function(){
                var actor = new Actor( null, new Receptor() );
                actor.should.have.property('onNext').which.equals( actor.onComplete );
            });
        });
        describe('@method onError(): Void', function () {
            it('=> should be defined', function(){
                var actor = new Actor( null, new Receptor() );
                actor.should.have.property('onError');
            });
        });
        describe('@method onEnd(): Void', function () {
            it('=> should be defined', function(){
                var actor = new Actor( null, new Receptor() );
                actor.should.have.property('onEnd').which.equals( actor.onComplete );
            });
        });
        describe('@method onComplete(): Void', function () {
            it('=> should be defined', function(){
                var actor = new Actor( null, new Receptor() );
                actor.should.have.property('onComplete').which.equals( actor.onEnd );
            });
        });
        describe('@method addStage( Stage ): Actor', function(){
            it('should add ');
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
