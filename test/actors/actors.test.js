var should      = require('chai').should();
var expect      = require('chai').expect;
var Flow        = require('../../src/flow.js');
var Actors      = require('../../src/actors/actors.js');
var Receptor    = require('../../src/watchers/receptor.js');

describe('Actors Module =>', function () {
    describe('@behaviour',function(){
        it('should provide a factory for creating Actors safely');
    });
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
        describe('@method createActor( name: String, receptor: Receptor ): Actor', function(){
            it('=> should return an actor', function(){
               var actor = Actors.createActor( 'Tom Hanks', new Receptor() );
                actor.should.exist.which.is.instanceof( Actors.Actor );
            });
            it('=> should return the EmptyActor is no receptor is provided', function(){
                var actor = Actors.createActor( 'Tom Hanks', null);
                actor.should.equal( Actors.EmptyActor );
            });
            it('=> should return an anonymous actor if no name is provided', function(){
                var actor = Actors.createActor( null, new Receptor());
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
                Actors.isEmptyActor( Actors.createActor("ACTOR", new Receptor() ) ).should.be.false;
            });
        });
    });
});