var should      = require('chai').should();
var expect      = require('chai').expect;
var Flow        = require('../../src/flow.js');
var Stages      = Flow.Stages;
var Actors      = Flow.Actors;
var Receptor    = Flow.Watchers.Receptor;

describe('Actors Module =>', function () {

    describe('@unit', function(){
        describe( '@type Object', function(){
            it('=> should exist and be an object', function(){
                Actors.should.exist.which.is.a('object');
            });
        });
        describe( '@property Actor: Actor', function(){
            it('=> should exist an constructor function', function(){
                Actors.should.have.property('Actor').which.is.a('function');
            });
        });
        describe( '@property EmptyActor: Actor', function(){
            it('=> should exist and be an Actor', function(){
                Actors.should.have.property('EmptyActor').which.is.instanceof( Actors.Actor );
            });
        });
        describe('@method createActor( name: String, stage: Stage, actions: Array<Action> ): Actor', function(){
            it('=> should return an actor', function(){
               var actor = Actors.createActor( 'Tom Hanks', Stages.createStage(), [] );
                actor.should.exist.which.is.instanceof( Actors.Actor );
            });
            it('=> should return an anonymous actor if no name is provided', function(){
                var actor = Actors.createActor( null, Stages.createStage(), []);
                actor.name.should.equal( actor.ANOMYMOUS_ACTOR_NAME );
            });
        });
        describe('@method isEmptyActor(): Boolean', function(){
            it('=> should exist and be a function', function(){
                Actors.should.have.property('isEmptyActor').which.is.instanceof( Function );
            });
            it('=> should @return TRUE when the the action is the EmptyAction', function(){
                Actors.isEmptyActor( Actors.createActor() ).should.be.true;
            });
            it('=> should @return FALSE when the the action is the not the EmptyAction', function(){
                Actors.isEmptyActor( Actors.createActor("ACTOR", Stages.createStage(), [] ) ).should.be.false;
            });
        });
    });
});