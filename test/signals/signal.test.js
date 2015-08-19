var should  = require( 'chai' ).should();
var expect  = require( 'chai' ).expect;
var Flow    = require( '../../src/flow.js' );
var Signals = Flow.Signals;
var Signal  = Flow.Signals.Signal;
var Actions = Flow.Actions;
var Action  = Flow.Actions.Action;
var Stage   = Flow.Stages.Stage;

describe( 'Signal =>', function(){

    describe( '@unit', function(){
        describe( '(Identity)', function(){
            it( '=> should be defined ', function(){
                Signal.should.exist;
            });
            it( '=> should be a function', function(){
                Signal.should.be.instanceof( Function );
            });
            it( '=> should have {Function: Signal} as it prototype constructor', function(){
                Signal.prototype.constructor.should.be.equal( Signal );
            });
        });
        describe( '@constructor( signaller: Object, action: Action, message: Object  )', function(){
            it( '=> should throw an error if an action is not provided', function(){
                var ERROR = Signal.prototype.ERRORS.SIGNAL_INVALID_CONTRUCTOR_PARAMETER_SIGNALLER;
                var signaller = new Signals.Signaller( new Stage(), this);
                (function(){
                    new Signal( signaller, null, {} );
                }).should.throw( ERROR );
            } );
            it( '=> should throw an error is an action is not an instance of Action', function(){
                var ERROR = Signal.prototype.ERRORS.SIGNAL_INVALID_CONTRUCTOR_PARAMETER_SIGNALLER;
                var signaller = new Signals.Signaller( new Stage(), this);
                (function(){
                    new Signal( signaller, {}, null );
                }).should.throw( ERROR );
            } );
            it( '=> should not throw an error if its provided with a signaller and an action but no message', function(){
                var ERROR = Signal.prototype.ERRORS.SIGNAL_INVALID_CONTRUCTOR_PARAMETER_SIGNALLER;
                var signaller = new Signals.Signaller( new Stage(), this);
                var action = Actions.createAction( 'ACTION' );
                (function(){
                    new Signal( signaller, action );
                }).should.not.throw( ERROR );
            } );

        });
        describe( '@property signaller: Signaller', function(){
            it( '=> should exist and be an instanceof Signaller', function(){
                var signaller = new Signals.Signaller( new Stage(), this);
                var action = Actions.createAction( 'ACTION' );
                new Signal( signaller, action ).should.have.property( 'signaller' ).which.is.an.instanceof( Signals.Signaller );
            });
            it( '=> should not be writable', function(){
                var signaller = new Signals.Signaller( new Stage(), this );
                var action = Actions.createAction( 'ACTION' );
                var empty = {};
                var signal = new Signal( signaller, action );
                signal.signaller = empty;
                signal.signaller.should.equals( signaller );
            });
        });
        describe( '@property message: Message', function(){
            it( '=> should exist and if not set should be the EmptyMessage', function(){
                var signaller = new Signals.Signaller( new Stage(), this);
                var action = Actions.createAction( 'ACTION' );
                new Signal( signaller, action ).should.have.property( 'message' ).which.equals( Signals.EmptyMessage );
            });
            it( '=> should not be writable', function(){
                var body = header = {};
                var message = Signals.createMessage( body, header );
                var signaller = new Signals.Signaller( new Stage(), this);
                var action = Actions.createAction( 'ACTION' );
                var signal = new Signal( signaller, action, message );
                signal.message = null;
                signal.message.should.equals( message );
            });
        });
        describe( '@property action: Action', function(){
            it( '=> should exist and be an instance of Action', function(){
                var signaller = new Signals.Signaller( new Stage(), this);
                var action = Actions.createAction( 'ACTION' );
                new Signal( signaller, action )
                    .should.have.property( 'action' ).which.is.instanceof( Action );
            });
            it( '=> should not be writable', function(){
                var signaller = new Signals.Signaller( new Stage(), this);
                var action = Actions.createAction( 'ACTION' );
                var empty = Actions.EmptyAction;
                var signal = new Signal( signaller, action );
                signal.signaller = empty;
                signal.action.should.equals( action );
            });
        });

        describe( '@method areValidConstructorParameters( signaller: Object, action: Action, ?message: Object): Void ', function(){
            it( '=> should return false if the signaller is not an object', function(){
                var action = Actions.createAction( 'ACTION' );
                var result = Signal.prototype.areValidConstructorParameters( null, action, {} );
                result.should.be.false;
            });
            it( '=> should return false if an action is not provided', function(){
                var result = Signal.prototype.areValidConstructorParameters( {}, null, {} );
                result.should.be.false;
                var signaller = new Signals.Signaller( new Stage(), this);
                var action = Actions.createAction( 'ACTION' );
                var result = Signal.prototype.areValidConstructorParameters( signaller, action, null );
                result.should.be.true;
            });
            it( '=> should return true even if the message is undefined', function(){
                var signaller = new Signals.Signaller( new Stage(), this);
                var action = Actions.createAction( 'ACTION' );
                var result = Signal.prototype.areValidConstructorParameters( signaller, action, undefined );
                result.should.be.true;
            });
        });
        describe( '@method hasMessage(): Boolean', function(){
            it( '=> should exist and be a function', function(){
                Signal.prototype.should.have.property( 'hasMessage' ).which.is.a( 'function' );
            });
            it( '=> should return FALSE when the message is the EmptyMessage', function(){
                var signaller = new Signals.Signaller( new Stage(), this);
                var action = Actions.createAction( 'ACTION' );
                new Signal( signaller, action ).hasMessage().should.be.false;
            });
            it( '=> should return TRUE when the message is NOT the EmptyMessage', function(){
                var body = header = {};
                var message = new Signals.Message( body, header );
                var signaller = new Signals.Signaller( new Stage(), this);
                var action = new Action( 'SOME_ACTION' );
                new Signal( signaller, action, message ).hasMessage().should.be.true;
            });
        });
        describe('@method isEmptySigna(): Boolean', function(){
            it( '=> should return TRUE is it is the empty signal', function(){
                var signaller = new Signals.Signaller( new Stage(), this);
                var action = Actions.createAction( 'ACTION' );
                new Signal( signaller, action, {} ).isEmptySignal().should.be.false;
            });
            it( '=> should return FALSE is it is the empty signal', function(){
                var signaller = new Signals.Signaller( new Stage(), this);
                var action = Actions.createAction( 'ACTION' );
                var signal = new Signal( signaller, action, {} );
                signal.EmptySignal.isEmptySignal().should.be.true;
            });
        });
        describe( '@method toArray(): Array', function(){
            it( '=> should exits and be a function', function(){
                Signal.prototype.should.have.property( 'toArray' ).which.is.a( 'function' );
            });
            it( '=> it should return an array', function(){
                var signaller = new Signals.Signaller( new Stage(), this);
                var action = Actions.createAction( 'ACTION' );
                new Signal( signaller, action ).toArray().should.be.an( 'array' );
            });
            it( '=> it should return all signal properties in array form', function(){
                var signaller = new Signals.Signaller( new Stage(), this);
                var action = Actions.createAction( 'ACTION' );
                var signal = new Signal( signaller, action );
                var signalArray = signal.toArray();
                var signalPropertyCount = function( signal ){
                    var count = 0;
                    for( var prop in signal ) {
                        if( signal.hasOwnProperty( prop ) ){
                            count++;
                        }
                    }
                    return count;
                }( signal );
                signalArray.length.should.equal( signalPropertyCount );
            });
        });
        describe( '@method toString(): String', function(){
            it( '=> should exist and be a function', function(){
                Signal.prototype.should.have.property( 'toString' ).which.is.a( 'function' );
            });
            it( '=> should return a string', function(){
                var signaller = new Signals.Signaller( new Stage(), this);
                var action = Actions.createAction( 'ACTION' );
                new Signal( signaller, action ).toString().should.be.a( 'string' );
            });
        });
    });
});
