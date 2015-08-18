var should = require( 'chai' ).should();
var expect = require( 'chai' ).expect;
var Flow = require( '../../src/flow' );
var Signaller = Flow.Signals.Signaller;
var Stages = Flow.Stages;
var Stage = Stages.Stage;
var Actors = Flow.Actors;
var Actions = Flow.Actions;
var Signals = Flow.Signals;

describe( 'Signaller =>', function(){

    describe( '@unit', function(){
        var stage;
        var owner;

        beforeEach( function(){
            stage = Stages.createStage();
            owner = {};
        });
        afterEach( function(){
            stage = null;
            owner = null;
        })

        describe( '@type', function(){
            it( '=> should exist', function(){
                Signaller.should.exist;
            });
            it( '=> is a function', function(){
                Signaller.should.be.instanceof( Function );
            });
        });

        describe( '@constructor( owner: Object, ?stage: Stage  ): Signaller', function(){
            it( '=> should create an signaller if an owner is provided', function(){
                new Signaller( owner ).should.exist;
            });
            it( '=> should throw and error if the owner is not provided', function(){
                ( function(){
                    new Signaller( null );
                }).should.throw;
            });
            it( '=> should not be finalized if a stage is not provided', function(){
                var signaller = new Signaller( owner );
                expect( signaller.isFinalized() ).to.be.false;
            });
            it( '=> should finalize the Signaller if a stage is provided', function(){
                var stage = Stages.createStage();
                var signaller = new Signaller( owner, stage );
                expect( signaller.isFinalized() ).to.be.true;
            });
        });

        describe( '@property owner: Object', function(){
            it( '=> should have a property owner which an object', function(){
                var signaller = new Signaller( owner );
                expect( signaller.owner ).to.exist;
            });
        });

        describe( '@property stage: Stage', function(){
            it( '=> should be null until the signaller is properly finalized', function(){
                var signaller = new Signaller( owner );
                expect( signaller.stage ).to.be.null;
            });
            it( '=> should be defined once the signaller is properly finalized', function(){
                var signaller = new Signaller( owner );
                signaller.finalize( stage );
                expect( signaller.stage ).not.to.be.null;
            });
        });

        describe( '@property EmptySignaller: Signaller', function(){
            it( '=> should exits', function(){
                expect( Signaller.prototype.EmptySignaller ).to.be.exist;
            });
            it( '=> should never be finalizable', function(){
                Signaller.prototype.EmptySignaller.finalize();
                expect( Signaller.prototype.EmptySignaller.isFinalized() ).to.be.false;
            });
        });

        describe( '@method finalize( stage: Stage ): Void', function(){
            it( '=> should not finalize the signaller if a valid stage is not provided', function(){
                var signaller = new Signaller( owner );
                signaller.finalize();
                expect( signaller.isFinalized() ).to.be.false;
                signaller.finalize({});
                expect( signaller.isFinalized() ).to.be.false;
                signaller.finalize( null );
                expect( signaller.isFinalized() ).to.be.false;
            });
            it( '=> should add the emitter functions to the signaller provided a valid stage', function(){
                var signaller = new Signaller( owner );
                signaller.finalize( stage );
                expect( signaller.emit ).to.exist;
                expect( signaller.emitSignal ).to.exist;
            });
            it( '=> should freeze the signaller', function(){
                var signaller = new Signaller( owner );
                signaller.finalize( stage );
                expect( Object.isFrozen( signaller ) ).to.be.true;
            });
        });

        describe( '@method isFinalized(): Boolean', function(){
            it( '=> should return is the signaller is finalized', function(){
                var signaller = new Signaller( owner );
                expect( signaller.isFinalized() ).to.be.false;
                signaller.finalize( stage );
                expect( signaller.isFinalized() ).to.be.true;
            });
        });

        describe( '@method emit( action: Action, message: Message): Signal', function(){
            it( '=> should emit a Signal onto the stage');
            it( '=> should return the emitted signal' );
            it( '=> should return the EmptySignal if the action or messsage were not valid' );
            it( '=> should be noop when needed and the stage is no longer a valid stage' );
        });

        describe( '@method emitSimple( action: Action ): SimpleSignal', function(){
            it( '=> should return the simple signal' );
            it( '=> should emit on stage a simple signal that only requires and action' );
        });

        describe( '@method emitSignal( signal: Signal ): Void', function(){
            it( '=> should emit a signal on stage is provided with a valid signal only', function(){
                var stage = Stages.createStage();
                var action = Actions.createAction( 'SOME_TYPE' );
                var actor = Actors.createActor( 'SOME_NAME' );
                var owner = {};
                var signaller = new Signaller( owner, stage );
                var signal = Signals.createSignal( signaller, action );
                var signalsContainer = [];
                var subscriber = stage.subscribe(
                    function( signal ){
                        // onNext
                        signalsContainer.push( signal );
                    },
                    function(){}, // onComplete
                    function(){} // onError
                )
                stage.addActorAction( actor, action );
                signaller.emitSignal();
                expect( signalsContainer.length ).to.equal( 0 );
                signaller.emitSignal( signal );
                expect( signalsContainer.length ).to.equal( 1 );
                signaller.emitSignal( signal );
                expect( signalsContainer.length ).to.equal( 2 );
            });
        });

        describe( '@method emitSignals( ...signal: Signal ): Void', function(){
            it( '=> should emit onto the stage the spread of signals' );
            it( '=> should emit onto the stage the array of signals' );
        });

        describe( '@method isEmptySignaller(): Boolean', function(){
           it( '=> should return if it equal to the EmptySignaller', function(){
               var signaller = new Signaller( {} );
               expect( signaller.isEmptySignaller() ).to.be.false;
           });
            it( '=> should return true it is the EmptySignaller', function(){
                var signaller = Signaller.prototype.EmptySignaller;
                expect( signaller.isEmptySignaller() ).to.be.true;
            });
        });

        describe( '@method isStageAlive(): Boolean', function(){
            it( '=> should return false if the stage is not a valid stage or the signaller has yet no been finalized', function(){
                var signaller = new Signaller( stage, owner );
                expect( signaller.isStageALive() ).to.be.false;
            });
            it( '=> should return true if the stage is still a valid stage', function(){
                var signaller = new Signaller( owner );
                signaller.finalize( stage );
                expect( signaller.isStageALive() ).to.be.true;
            });
        });
    });
});