var should      = require('chai').should();
var expect      = require('chai').expect;
var _           = require('../../src/lib.imports').lodash;
var Rx          = require('../../src/lib.imports').Rx;
var Immutable   = require('../../src/lib.imports').Immutable;
var Flow        = require('../../src/flow');
var Stages      = Flow.Stages;
var Signals     = Flow.Signals;
var Actors      = Flow.Actors;
var Actor       = Actors.Actor;
var Actions     = Flow.Actions;
var Receptor    = Flow.Watchers.Receptor;

describe('Actor =>', function(){
    describe('@behaviour', function(){
        it('=> should publish signals with the actions it listens from the stage', function(){
            var stage = Stages.createStage();

            // ACTIONS ::::::::::::::::::::::::::::::::::::
            var actionKill = Actions.createAction('Kill');
            var actionSing = Actions.createAction('Sing');
            var actionDance = Actions.createAction('Dance');

            // ACTORS ::::::::::::::::::::::::::::::::::::
            var actorSean = new Actor( 'Sean Connery', stage, [actionKill, actionSing] );
            var actorLiz = new Actor( 'Elizabeth Taylor', stage, [actionDance] );

            // SIGNALS ::::::::::::::::::::::::::::::::::::
            var signaller = Signals.createSignaller( {}, stage );
            var signalKill = Signals.createSignal( signaller, actionKill, Signals.createMessage({ text: 'this is the body of the message'}));
            var signalSing = Signals.createSignal( signaller, actionSing, Signals.createMessage({ text: 'this is the body of the message'}));
            var signalDance = Signals.createSignal( signaller, actionDance, Signals.createMessage({ text: 'this is the body of the message'}));
            var actorSignals = [];
            var stageSignals = [];

            // WATCHERS ::::::::::::::::::::::::::::::::::::
            var actorsWatcher = actorSean.subscribe(
                function( signal ){
                    actorSignals.push( signal );
                }
            );
            var stageWatcher = stage.subscribe(
                function( signal ){
                    stageSignals.push( signal );
                }
            )

            // EMIT ::::::::::::::::::::::::::::::::::::
            signaller.emitSignal( signalKill );
            signaller.emitSignal( signalSing );
            signaller.emitSignal( signalDance );

            // EXPECTATIONS ::::::::::::::::::::::::::::::::::::
            expect( stageSignals.length ).to.equal( 3 );
            expect( actorSignals.length ).to.equal( 2 );
            expect( actorSignals[0].action.type ).to.equal( actionKill.type );
            expect( actorSignals[1].action.type ).to.equal( actionSing.type );
        });
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
            it('=> should throw and error the actions is not the correct type', function(){
                expect(function(){
                    new Actor( 'name', Stages.createStage(), null );
                }).to.throw(Actor.prototype.ERRORS.INCORRECT_CONSTRUCTOR_PARAMETER_AN_ARRAY_OF_ACTION_IS_REQUIRED);
            });
            it('=> should throw and error if any of the actions are invalid', function(){
                var actionsSet = [ new Actions.Action('FIRST'), null ];
                expect(function(){
                   new Actor( 'name', Stages.createStage(), actionsSet );
                }).to.throw( Actor.prototype.ERRORS.ACTOR_CANNOT_BE_INSTANTIATED_WITH_A_COLLECTION_WITH_NON_ACTIONS );
            });
            it('=> should throw an error if any of the constructor parameters is missing', function(){
                expect(function(){
                    new Actor();
                }).to.throw( Actor.prototype.ERRORS.ACTOR_CANNOT_BE_INSTANTIATED_WITHOUT_ALL_REQUIRED_PARAMETERS );
                expect(function(){
                    new Actor( '' );
                }).to.throw( Actor.prototype.ERRORS.ACTOR_CANNOT_BE_INSTANTIATED_WITHOUT_ALL_REQUIRED_PARAMETERS );
                expect(function(){
                    new Actor( Stages.createStage(), [] );
                }).to.throw( Actor.prototype.ERRORS.ACTOR_CANNOT_BE_INSTANTIATED_WITHOUT_ALL_REQUIRED_PARAMETERS );
            });
        });

        describe( 'property stage: Stage', function(){
            it( '=> should exist and be of Type of Stage', function(){
                var actor = new Actor( 'My Actor', Stages.createStage(), []);
                expect( actor.stage ).to.be.defined;
                expect( actor.stage ).to.be.instanceof( Rx.Subject );
            });
        });
        describe( '@property actions: Actions', function(){
            it( '=> should exist and be of Type of Immutable.Set<Action>', function(){
                var actor = new Actor( 'My Actor', Stages.createStage(), []);
                expect( actor.actions ).to.be.defined;
                expect( actor.actions ).to.be.instanceof( Immutable.Set );
            });
        });

        describe( '@property name: String', function(){
            var actor = new Actor( 'My Actor', Stages.createStage(), []);
            expect( actor.name ).to.be.defined;
            expect( _.isString( actor.name )).to.be.true;
        });

        describe( '@property EmptyActor: Actor', function(){
            it( '=> should be defined and be an instance of Actor', function(){
                expect( Actor.prototype.EmptyActor ).to.exist;
            });
        });

        describe( '@method createWatcher(): Watcher', function(){

        });
    });
});
