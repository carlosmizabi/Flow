var chai        = require('chai');
chai.config.includeStack = true;
var should      = chai.should();
var expect      = chai.expect;
// utils  ----------------------------------------------
var _           = require('../../src/lib.imports').lodash;
var Immutable   = require('../../src/lib.imports').Immutable;
// Library ----------------------------------------------
var Flow        = require('../../src/flow');
var Stages      = Flow.Stages;
var Stage       = Flow.Stages.Stage;
var Actors      = Flow.Actors;
var Actions     = Flow.Actions;
var Action      = Flow.Actions.Action;
var Signals     = Flow.Signals;
var Signaller   = Flow.Signals.Signaller;
var Subject     = Flow.Stages.Subject;
var Watcher     = Flow.Watchers.Watcher;

describe('Stage =>', function(){
    describe('@unit', function(){
        describe('@type', function(){
            it('=> should be an instance of Subject', function(){
                var stage = new Stage();
                stage.should.exist;
                stage.should.be.instanceof( Subject );
            });
        });
        describe('@method getActionRegistry(): ImmutableMap<Action, Actor>', function(){
            it('=> should be defined and is a function', function(){
                new Stage().should.have.property( 'getActionRegistry' ).which.is.instanceof( Function );
            });
            it('=> should return an map of action and actors', function(){
                var stage = new Stage();
                var registry = stage.getActionRegistry();
                registry.should.exist.and.be.instanceof( Immutable.Map );
            });
        });
        describe('@method addActorAction( actor: Actor, action: Action ): Boolean', function(){
            it('=> should add an actor-action registry entry to the stage', function(){
                var stage = new Stage();
                var actor = Actors.createActor('Tom_Hanks', stage, []);
                var action = Actions.createAction('Smile');
                stage.addActorAction( actor, action );
                stage.getActionRegistry().size.should.equal( 1 );
            });
            it('=> should not add an actor-action for an action already registered', function(){
                var stage = new Stage();
                var actor = Actors.createActor('Tom_Hanks', stage, []);
                var action = Actions.createAction('Smile');
                stage.addActorAction( actor, action );
                stage.addActorAction( actor, action );
                stage.getActionRegistry().size.should.equal( 1 );
            });
            it('=> should allow the parameters to be inserted out of order', function(){
                var stage = new Stage();
                var actor = Actors.createActor('Tom_Hanks', stage);
                var action = Actions.createAction('Smile');
                var success = stage.addActorAction( action, actor );
                stage.getActionRegistry().size.should.equal( 1 );
                expect( stage.getActionWithType( action.type ) === action ).to.be.true;
            });
        });

        describe('@method getActionNamed( name: String ): Action', function(){
            it('=> should return an action from string name if on stage', function(){
                var stage = new Stage();
                var actor = Actors.createActor('Tom_Hanks', stage);
                var action = Actions.createAction('Smile');
                stage.addActorAction( action, actor );
                expect( stage.getActionWithType( 'SHOULD_NOT_EXIST' ) === Actions.EmptyAction ).to.be.true;
            });
        });

        describe('@method getActorNamed( name: String ): Actor', function(){
            it('=> should return an actor from string name if on stage', function(){
                var stage = new Stage();
                var action = Actions.createAction( 'ACTION' );
                var actor = Actors.createActor('Tom_Hanks', stage, [ action ]);
                var extractedActor = stage.getActorNamed( 'TOM_HANKS_ACTOR' );
                expect( extractedActor.isEmptyActor()  ).to.be.false;
                expect( extractedActor === actor ).to.be.true;
            });
            it('=> should return the empty actor if actor with name string is not found on stage', function(){
                var stage = new Stage();
                expect( stage.getActorNamed( 'NO_ACTOR' ).isEmptyActor() ).to.be.true;
            });
        });
        describe('@method getActorForAction( action: Action ): Actor', function(){
            var stage, actor, addedAction, notAddedAction;
            beforeEach( function(){
                stage           = new Stage();
                addedAction     = Actions.createAction('Smile');
                notAddedAction  = Actions.createAction('Cry');
                actor           = Actors.createActor('Tom_Hanks', stage, [addedAction]);
            });
            afterEach( function(){
                stage = actor = addedAction = notAddedAction = null;
            });
            it('=> should return a actor if the action is registered on stage', function(){
                var output = stage.getActorForAction( addedAction );
                expect( output === actor ).to.be.true;
            });
            it('=> should return the empty actor if the action is not on stage', function(){
                var output = stage.getActorForAction( notAddedAction );
                expect( output === actor ).to.be.false;
                expect( output === Actors.EmptyActor ).to.be.true;
            });
        });
        describe('@method getActorForActionNamed( name: String ): Actor', function(){
            var stage, actor, actorName, actionName, addedAction, notAddedAction;
            beforeEach( function(){
                stage           = new Stage();
                actorName       = 'Tom_Hanks';
                actionName      = 'SMILE';
                actor           = Actors.createActor( actorName , stage );
                addedAction     = Actions.createAction( actionName );
                notAddedAction  = Actions.createAction('Cry');
                stage.addActorAction( actor, addedAction );
            });
            afterEach( function(){
                stage = actor = actorName = addedAction = notAddedAction = null;
            });
            it('=> should return an actor on the stage given a type of action on stage', function(){
                var outputActor = stage.getActorForActionWithType( addedAction.type );
                expect( outputActor ).to.instanceof( Actors.Actor );
                expect( outputActor.name ).to.equal( actor.name );
            });
            it('=> should return an the empty actor if actor not found', function(){
                var actor = stage.getActorForActionWithType( '' );
                expect( actor ).to.instanceof( Actors.Actor );
                expect( actor ).to.equal( Actors.EmptyActor );
            });
        });
        describe('@method hasAction( action: Action ): Boolean', function(){
            it('=> should take an action and return if the action is registered on the stage', function(){
                var stage = new Stage();
                var actor = Actors.createActor('Tom_Hanks', stage);
                var smileAction = Actions.createAction('Smile');
                var cryAction = Actions.createAction('Cry');
                stage.addActorAction( actor, smileAction );
                expect( stage.hasAction( smileAction ) ).to.be.true;
                expect( stage.hasAction( cryAction ) ).to.be.false;
                expect( stage.hasAction( undefined ) ).to.be.false;
                expect( stage.hasAction( null ) ).to.be.false;
            });
        });
        describe('@method hasActionWithType( name: Action ): Boolean', function(){
            var stage = new Stage();
            var actor = Actors.createActor('Tom_Hanks', stage);
            var smileAction = Actions.createAction('Smile');
            var cryAction = Actions.createAction('Cry');
            stage.addActorAction( actor, smileAction );
            it('=> should take a string and return true if the action is registered on the stage', function (){
                expect( stage.hasActionWithType( 'SMILE' )  ).to.be.true;
                expect( stage.hasActionWithType( 'Cry' )    ).to.be.false;
                expect( stage.hasActionWithType( ' ' )      ).to.be.false;
                expect( stage.hasActionWithType( '' )       ).to.be.false;
            });
            it('=> should take a non string and return false', function () {
                expect( stage.hasActionWithType( undefined ) ).to.be.false;
                expect( stage.hasActionWithType( 5 )        ).to.be.false;
                expect( stage.hasActionWithType( null )     ).to.be.false;
                expect( stage.hasActionWithType( {} )       ).to.be.false;
            });
        });
        describe('@method hasActor( actor: Actor ): Boolean', function(){
            it('=> should take an actor and return true if the actor is registered on the stage', function(){
                var stage = new Stage();
                var actor1 = Actors.createActor('Tom_Hanks', stage);
                var actor2 = Actors.createActor('Angelina_Jolie', stage);
                var actor3 = Actors.createActor('Emily_Blunt', stage);
                var actor1Action = Actions.createAction('Smile');
                var actor2Action = Actions.createAction('Kill');
                var actor3Action = Actions.createAction('Dance');
                stage.addActorAction( actor1, actor1Action );
                stage.addActorAction( actor2, actor2Action );
                stage.addActorAction( actor3, actor3Action );
                expect( stage.hasActor( actor1 ) ).to.be.true;
                expect( stage.hasActor( actor2 ) ).to.be.true;
                expect( stage.hasActor( actor3 ) ).to.be.true;
            });
            it('=> should take an actor and return false if the actor is not registered on the stage', function(){
                var stage = new Stage();
                var actorInStage = Actors.createActor('Tom_Hanks', stage);
                var smileAction = Actions.createAction('Smile');
                var actorNotInStage = Actors.EmptyActor;
                expect( stage.hasActor( actorNotInStage ) ).to.be.false;
            });
        });
        describe('@method hasActorNamed( name: String ): Boolean', function(){
            it('=> should take a string and return true if the actor is registered on the stage', function(){
                var stage = new Stage();
                var actor1Action = Actions.createAction('Smile');
                var actor2Action = Actions.createAction('Kill');
                var actor3Action = Actions.createAction('Dance');
                var actor1 = Actors.createActor('Tom_Hanks', stage, [ actor1Action ]);
                var actor2 = Actors.createActor('Angelina_Jolie', stage, [ actor2Action ]);
                var actor3 = Actors.createActor('Emily_Blunt', stage, [ actor3Action ]);
                expect( stage.hasActorNamed( 'TOM_HANKS_ACTOR' ) ).to.be.true;
                expect( stage.hasActorNamed( 'ANGELINA_JOLIE_ACTOR' ) ).to.be.true;
                expect( stage.hasActorNamed( 'EMILY_BLUNT_ACTOR' ) ).to.be.true;
            });
            it('=> should take a string and return false if the actor is not registered on the stage',function(){
                var stage = new Stage();
                var actor1 = Actors.createActor('Tom_Hanks', stage);
                var actor2 = Actors.createActor('Angelina_Jolie', stage);
                var actor3 = Actors.createActor('Emily_Blunt', stage);
                var actor1Action = Actions.createAction('Smile');
                var actor2Action = Actions.createAction('Kill');
                stage.addActorAction( actor1, actor1Action );
                stage.addActorAction( actor2, actor2Action );

                expect( stage.hasActorNamed( 'EMILY_BLUNT_ACTOR' ) ).to.be.false;
            });
        });

        describe('@method whichActionsExist( ...action: Action ): Array<Action>', function(){
            var actor1;
            var actor2;
            var actor3;
            var actor1Action;
            var actor2Action;
            var actor3Action;
            var notAddedAction;
            beforeEach(function(){
                var stage = new Stage();
                actor1  = Actors.createActor('Tom_Hanks', stage);
                actor2  = Actors.createActor('Angelina_Jolie', stage);
                actor3  = Actors.createActor('Emily_Blunt', stage);
                actor1Action    = Actions.createAction('Smile');
                actor2Action    = Actions.createAction('Kill');
                actor3Action    = Actions.createAction('Dance');
                notAddedAction  = Actions.EmptyAction;
            });
            it('=> should return an array of actions from a spread or array of actions', function(){
                var arrayFrom_ArgumentSpread;
                var arrayFrom_ArgumentArray;
                var arrayFrom_ArgumentSingle;
                var stage = new Stage();
                stage.addActorAction( actor1, actor1Action );
                stage.addActorAction( actor2, actor2Action );
                stage.addActorAction( actor3, actor3Action );

                // Given a Argument Spread ------------------------------------------------------------
                arrayFrom_ArgumentSpread = stage.whichActionsExist( actor1Action, actor2Action, actor3Action, notAddedAction );
                expect(_.isArray( arrayFrom_ArgumentSpread ) && arrayFrom_ArgumentSpread.length === 3 ).to.be.true;
            });
            it('=> should return an array of actions from array of actions', function(){
                var arrayFrom_ArgumentSpread;
                var arrayFrom_ArgumentArray;
                var arrayFrom_ArgumentSingle;
                var stage = new Stage();
                stage.addActorAction( actor1, actor1Action );
                stage.addActorAction( actor2, actor2Action );
                stage.addActorAction( actor3, actor3Action );

                // Given an Array  --------------------------------------------------------------------
                arrayFrom_ArgumentArray = stage.whichActionsExist( [actor1Action, actor2Action, notAddedAction] );
                expect(_.isArray( arrayFrom_ArgumentArray ) && arrayFrom_ArgumentArray.length === 2 ).to.be.true;
            });
            it('=> should return an array with one action given one action on stage', function(){
                var arrayFrom_ArgumentSpread;
                var arrayFrom_ArgumentArray;
                var arrayFrom_ArgumentSingle;
                var stage = new Stage();
                stage.addActorAction( actor1, actor1Action );
                stage.addActorAction( actor2, actor2Action );
                stage.addActorAction( actor3, actor3Action );

                // Given a single action --------------------------------------------------------------
                arrayFrom_ArgumentSingle = stage.whichActionsExist( actor1Action );
                expect(_.isArray( arrayFrom_ArgumentSingle ) && arrayFrom_ArgumentSingle.length === 1 ).to.be.true;
            });
            it('=> should return an array of actions which are registered in the stage only', function(){
                var arrayOfActionsInStage;
                var stage = new Stage();
                stage.addActorAction( actor1, actor1Action );
                stage.addActorAction( actor2, actor2Action );
                stage.addActorAction( actor3, actor3Action );
                arrayOfActionsInStage = stage.whichActionsExist( actor1Action, actor2Action, actor3Action, notAddedAction );
                expect( arrayOfActionsInStage.length ).to.equal( 3 );
                expect(_.includes( arrayOfActionsInStage, actor1Action, actor2Action, actor3Action )).to.be.true;
            });
            it('=> should return an empty array if not provided with valid actions or nothing', function(){
                var stage = new Stage();
                stage.addActorAction( actor1, actor1Action );
                stage.addActorAction( actor2, actor2Action );
                stage.addActorAction( actor3, actor3Action );

                returnArray = stage.whichActionsExist();
                expect( _.isArray( returnArray ) && returnArray.length === 0  ).to.be.true;

                returnArray = stage.whichActionsExist( [] );
                expect( _.isArray( returnArray ) && returnArray.length === 0  ).to.be.true;

                returnArray = stage.whichActionsExist( {} );
                expect( _.isArray( returnArray ) && returnArray.length === 0  ).to.be.true;

                returnArray = stage.whichActionsExist( null );
                expect( _.isArray( returnArray ) && returnArray.length === 0  ).to.be.true;
            });
        });
        describe('@method whichActionsExistFromTypes( ...type: String ): Array<Action>', function(){
            var actor1, actor2, actor3;
            var typeAction1, typeAction2, typeAction3;
            var actor1Action, actor2Action, actor3Action;
            var notAddedAction;
            var stage;
            beforeEach(function(){
                typeAction1 = 'SMILE';
                typeAction2 = 'KILL';
                typeAction3 = 'DANCE';
                actor1Action    = Actions.createAction( typeAction1 );
                actor2Action    = Actions.createAction( typeAction2 );
                actor3Action    = Actions.createAction( typeAction3 );
                stage = new Stage();
                actor1  = Actors.createActor('Tom_Hanks',  stage, [actor1Action] );
                actor2  = Actors.createActor('Angelina_Jolie',  stage, [actor2Action]);
                actor3  = Actors.createActor('Emily_Blunt',  stage, [actor3Action]);
                notAddedAction  = Actions.EmptyAction;
            });
            it('=> should return an array of actions from a spread strings of actions types', function(){
                var arrayFrom_ArgumentSpread;
                arrayFrom_ArgumentSpread = stage.whichActionsExistFromTypes( typeAction1, typeAction2, typeAction3, notAddedAction );
                expect(_.isArray( arrayFrom_ArgumentSpread )).to.be.true;
                expect( arrayFrom_ArgumentSpread.length ).to.equal( 3 );
            });
            it('=> should return an array of actions from array of actions', function(){
                var arrayFrom_ArgumentArray;
                arrayFrom_ArgumentArray = stage.whichActionsExistFromTypes( [typeAction1, typeAction2, notAddedAction] );
                expect(_.isArray( arrayFrom_ArgumentArray )).to.be.true;
                expect( arrayFrom_ArgumentArray.length ).to.equal( 2 );
            });
            it('=> should return an array with one action given one type of a valid action on stage', function(){
                var arrayFrom_ArgumentSingle;

                // Given a single action --------------------------------------------------------------
                arrayFrom_ArgumentSingle = stage.whichActionsExistFromTypes( typeAction1 );
                expect(_.isArray( arrayFrom_ArgumentSingle ) ).to.be.true;
                expect( arrayFrom_ArgumentSingle.length ).to.equal( 1 );
            });
            it('=> should return an array of actions which are registered in the stage only', function(){
                var arrayOfActionsInStage;
                arrayOfActionsInStage = stage.whichActionsExist( actor1Action, actor2Action, actor3Action, notAddedAction );
                expect( arrayOfActionsInStage.length ).to.equal( 3 );
                expect(_.includes( arrayOfActionsInStage, actor1Action, actor2Action, actor3Action )).to.be.true;
            });
            it('=> should return an empty array if not provided with valid actions or nothing', function(){

                returnArray = stage.whichActionsExist();
                expect( _.isArray( returnArray ) && returnArray.length === 0  ).to.be.true;

                returnArray = stage.whichActionsExist( [] );
                expect( _.isArray( returnArray ) && returnArray.length === 0  ).to.be.true;

                returnArray = stage.whichActionsExist( {} );
                expect( _.isArray( returnArray ) && returnArray.length === 0  ).to.be.true;

                returnArray = stage.whichActionsExist( null );
                expect( _.isArray( returnArray ) && returnArray.length === 0  ).to.be.true;
            });
        });
        describe('@method whichActorsExist( ...actor: Actor ): Array<Actor>', function(){
            var actor1;
            var actor2;
            var actor3;
            var actor1Action;
            var actor2Action;
            var actor3Action;
            var notAddedActor;
            var stage;
            beforeEach(function(){
                actor1Action    = Actions.createAction('Smile');
                actor2Action    = Actions.createAction('Kill');
                actor3Action    = Actions.createAction('Dance');
                notAddedActor  = Actors.EmptyActor;
                stage = new Stage();
                actor1  = Actors.createActor('Tom_Hanks',  stage, [actor1Action] );
                actor2  = Actors.createActor('Angelina_Jolie',  stage, [actor2Action]);
                actor3  = Actors.createActor('Emily_Blunt',  stage, [actor3Action]);
            });
            it('=> should return an array of actions from a spread or array of actions', function(){
                var arrayFrom_ArgumentSpread;
                var arrayFrom_ArgumentArray;
                var arrayFrom_ArgumentSingle;

                // Given a Argument Spread ------------------------------------------------------------
                arrayFrom_ArgumentSpread = stage.whichActorsExist( actor1, actor2, actor3, notAddedActor );
                expect(_.isArray( arrayFrom_ArgumentSpread ) && arrayFrom_ArgumentSpread.length === 3 ).to.be.true;
            });
            it('=> should return an array of actions from array of actions', function(){
                var arrayFrom_ArgumentSpread;
                var arrayFrom_ArgumentArray;
                var arrayFrom_ArgumentSingle;

                // Given an Array  --------------------------------------------------------------------
                arrayFrom_ArgumentArray = stage.whichActorsExist( [actor1, actor2, notAddedActor] );
                expect(_.isArray( arrayFrom_ArgumentArray )).to.be.true
                expect( arrayFrom_ArgumentArray.length ).to.be.equal( 2 );
            });
            it('=> should return an array with one action given one action on stage', function(){
                var arrayFrom_ArgumentSpread;
                var arrayFrom_ArgumentArray;
                var arrayFrom_ArgumentSingle;

                // Given a single action --------------------------------------------------------------
                arrayFrom_ArgumentSingle = stage.whichActorsExist( actor1 );
                expect(_.isArray( arrayFrom_ArgumentSingle ) && arrayFrom_ArgumentSingle.length === 1 ).to.be.true;
            });
            it('=> should return an array of actions which are registered in the stage only', function(){
                var arrayOfActionsInStage;
                arrayOfActionsInStage = stage.whichActorsExist( actor1, actor2, actor3, notAddedActor );
                expect( arrayOfActionsInStage.length ).to.equal( 3 );
                expect(_.includes( arrayOfActionsInStage, actor1, actor2, actor3 )).to.be.true;
            });
            it('=> should return an empty array if not provided with valid actions or nothing', function(){

                returnArray = stage.whichActorsExist();
                expect( _.isArray( returnArray ) && returnArray.length === 0  ).to.be.true;

                returnArray = stage.whichActorsExist( [] );
                expect( _.isArray( returnArray ) && returnArray.length === 0  ).to.be.true;

                returnArray = stage.whichActorsExist( {} );
                expect( _.isArray( returnArray ) && returnArray.length === 0  ).to.be.true;

                returnArray = stage.whichActorsExist( null );
                expect( _.isArray( returnArray ) && returnArray.length === 0  ).to.be.true;
            });
        });
        describe('@method whichActorsExistFromNames( ...name: String ): Array<Actor>', function(){
            var actorNames;
            var actionTypes;
            var actors;
            var actions;
            var notAddedAction;
            var stage;
            function getStageWithActorsAndActions (){
                var stage = new Stage();
                _.forEach(_.range(3), function( i ){
                    var key = '_' + ( i + 1 );
                    stage.addActorAction( actors[key], actions[key] );
                });
                return stage;
            };
            beforeEach(function(){
                stage = new Stage();
                actorNames = {
                    _1: '1', _2: '2', _3: '3',
                };
                actionTypes = {
                    _1: 'ACTION_1', _2: 'ACTION_2', _3: 'ACTION_3',
                };
                actors = _.chain([ actorNames._1, actorNames._2, actorNames._3])
                            .map(function( actorName, i ){
                                return {
                                    key: '_' + ( i + 1 ),
                                    value: Actors.createActor( actorName, stage, [] )
                                };
                            })
                            .indexBy('key')
                            .mapValues('value')
                            .value();
                actions = _.chain([ actionTypes._1, actionTypes._2, actionTypes._3])
                            .map(function( actionType, i ){
                                return {
                                    key: '_' + ( i + 1 ),
                                    value: Actions.createAction( actionType )
                                };
                            })
                            .indexBy('key')
                            .mapValues('value')
                            .value();
                notAddedActor = Actors.EmptyActor;
            });
            it('=> should return an array empyt or not', function() {
                var arrayFrom_noArgs = stage.whichActorsExistFromNames();
                expect(_.isArray( arrayFrom_noArgs ) ).to.be.true;
            });
            it('=> should return an array of actors from a spread of actor names', function(){
                var stage = getStageWithActorsAndActions();
                var arrayFrom_ArgumentSpread = stage.whichActorsExistFromNames( actors._1.name, actors._2.name, actors._3.name, notAddedActor.name );
                expect( arrayFrom_ArgumentSpread.length ).to.equal( 3 );
            });
            it('=> should return an array of actors from array of actors', function(){
                var stage = getStageWithActorsAndActions();
                var arrayFrom_ArgumentArray = stage.whichActorsExistFromNames( [ actors._1.name, actors._2.name, actors._3.name, notAddedActor.name ] );
                expect(_.isArray( arrayFrom_ArgumentArray ) ).to.be.true;
            });
            it('=> should return an array with one actor given one type of a valid actor on stage', function(){
                var stage = getStageWithActorsAndActions();
                var arrayFrom_ArgumentSingle = stage.whichActorsExistFromNames( actors._1.name );
                expect( arrayFrom_ArgumentSingle.length ).to.equal( 1 );
            });
            it('=> should return an array of actors which are registered in the stage only', function(){
                var stage = getStageWithActorsAndActions();
                var arrayOfActorsInStage = stage.whichActorsExistFromNames( actors._1.name, actors._2.name, actors._3.name, notAddedActor.name );
                expect( arrayOfActorsInStage.length ).to.equal( 3 );
                expect( _.includes( arrayOfActorsInStage, actors._1, actors._2, actors._3 ) ).to.be.true;
            });
            it('=> should return an empty array if not provided with valid actors or nothing', function(){
                var stage = getStageWithActorsAndActions();
                returnArray = stage.whichActorsExistFromNames();
                expect( _.isArray( returnArray )).to.be.true;
                expect( returnArray.length ).to.equal( 0 );

                returnArray = stage.whichActorsExistFromNames( [] );
                expect( _.isArray( returnArray )).to.be.true;
                expect( returnArray.length ).to.equal( 0 );

                returnArray = stage.whichActorsExistFromNames( {} );
                expect( _.isArray( returnArray )).to.be.true;
                expect( returnArray.length ).to.equal( 0 );

                returnArray = stage.whichActorsExistFromNames( null );
                expect( _.isArray( returnArray )).to.be.true;
                expect( returnArray.length ).to.equal( 0 );
            });
        });

        describe( '@method finalize( signaller: Signaller ): Void ', function(){
            it( '=> should take a signaller and finalize it', function(){
                var stage = Stages.createStage();
                var owner = {};
                var signaller = Signals.createSignaller( owner );
                stage.finalize( signaller );
                expect( signaller.isFinalized() ).to.be.true;
            });
        });

        describe( '@method createSignaller( owner: Signaller ): Signaller', function(){
            it( '=> should return a finalized signaller', function(){
                var stage = Stages.createStage();
                var signaller = stage.createSignaller( {} );
                expect( signaller.isFinalized() ).to.be.true;
            });
            it( '=> should return a Signaller instance', function(){
                var stage = Stages.createStage();
                var signaller = stage.createSignaller( {} );
                expect( signaller instanceof Signals.Signaller ).to.be.true;
            });
            it( '=> should return the EmptySignaller if the owner is not valid', function(){
                var stage = Stages.createStage();
                var signaller = stage.createSignaller();
                expect( signaller.isEmptySignaller() ).to.be.true;
            });
        });

        describe('@method assignAnEmittersTo( signaller: Object ): Function', function(){
            it('=> should assign an "emit" function to the signaller object', function(){
                var stage = Stages.createStage();
                var signallerOwner = {};
                var signallerObject = {};
                stage.assignEmittersTo( signallerObject );
                expect( signallerObject ).to.have.property('emit');
            });
            it('=> should assign an "emitSignal" function to the signaller object', function(){
                var stage = new Stage();
                var signallerOwner = {};
                var signallerObject = {};
                stage.assignEmittersTo( signallerObject );
                signallerObject.should.have.a.property('emitSignal');
            });
        });

        describe('@method isEmittable( signal: Signal ): Boolean', function(){
            it('=> should check if a signal is not the empty signal', function(){
                var stage = new Stage();
                var signal = Signals.createSignal();
                expect( stage.isEmittable( signal ) ).to.be.false;
            });
            it('=> should return true if the action of the signal is registered in on stage', function (){
                var stage = new Stage();
                var action = Actions.createAction('Smile');
                var actor  = Actors.createActor('Tom_Hanks', stage, [action]);
                var signaller = stage.createSignaller( {} );
                var signal = Signals.createSignal( signaller, action );
                expect( stage.isEmittable( signal ) ).to.be.true;
            });
            it('=> should return false if the action of the signal is not registered on stage', function (){
                var stage = new Stage();
                var action = Actions.createAction('Smile');
                var signaller = stage.createSignaller( {} );
                var signal = Signals.createSignal( signaller, action );
                expect( stage.isEmittable( signal ) ).to.be.false;
            });
        });

        describe('@method emit( signal: Signal ): Boolean', function(){
            var stage,
                signallerOwner,
                signaller,
                action,
                actor,
                message,
                signal,
                observer;

            beforeEach( function(){
                stage = Stages.createStage();
                signallerOwner = {};
                signaller = stage.createSignaller( signallerOwner );
                action = Actions.createAction('PRIMER');
                actor = Actors.createActor('PRIMERS');
                message = Signals.createMessage({ text: 'this is the message body' });
                signal = Signals.createSignal( signaller, action, message );
                observer = {
                    signals: [],
                    onNext: function( signal ){
                        this.signals.push( signal );
                    },
                    onComplete: function(){},
                    onError: function(){
                        console.log('Subject instance error in test => should emit a message given a valid signal');
                    }
                };
            });
            it( '=> should not emit a signal if its action is not registered in the stage', function(){
                var subscription = stage.subscribe( observer.onNext.bind(observer), observer.onComplete, observer.onError );
                stage.emit( signal );
                expect( observer.signals.length ).to.equal( 0 );
            });
            it('=> should emit a message given a valid signal', function (){
                var subscription = stage.subscribe( observer.onNext.bind(observer), observer.onComplete, observer.onError );
                stage.addActorAction( actor, action );
                stage.emit( signal );
                expect( observer.signals.length ).to.equal( 1 );
            });
            it('=> should not emit a message if the signal is the empty signal', function(){
                var subscription = stage.subscribe( observer.onNext.bind(observer), observer.onComplete, observer.onError );
                stage.addActorAction( actor, action );
                stage.emit( Signals.EmptySignal );
                expect( observer.signals.length ).to.equal( 0 );
            });
        });
    });
});