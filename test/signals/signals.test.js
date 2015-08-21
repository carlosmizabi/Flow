var should      = require( 'chai' ).should();
var expect      = require( 'chai' ).expect;
var Flow        = require( '../../src/flow.js' );
var Stages      = Flow.Stages;
var Stage       = Flow.Stages.Stage;
var Signals     = Flow.Signals;
var Actions     = Flow.Actions;

describe( 'Signals Module =>', function (){

    describe( '@unit', function (){
        describe( '@identity', function (){
            it( '=> should be defined', function (){
                Signals.should.exist;
            });
            it( '=> should be an object', function (){
                Signals.should.be.an.instanceof( Object );
            });
        });
        describe('@property EmptySignal', function (){
            it('=> should exist', function (){
                Signals.should.have.property( 'EmptySignal' ).which.is.instanceof( Signals.Signal );
            });
        });
        describe('@property Message: Message', function (){
            it( '=> should exist and be a Message constructor', function (){
                Signals.should.have.property( 'Message' ).which.is.a( 'function' );
            });
        });
        describe('@property EmptyMessage: Message', function (){
            it('=> should exist and be a Message instance', function (){
                Signals.should.have.property( 'EmptyMessage' ).which.is.instanceof( Signals.Message );
            });
        });
        describe('@property Signaller: Signaller', function (){
            it('=> should exist and be a Signaller constructor', function (){
                Signals.should.have.property( 'Signaller' ).which.is.a( 'function' );
            });
        });
        describe('@property EmptySignaller: Signaller', function (){
            it('=> should exist and be a Signaller instance', function (){
                Signals.should.have.property( 'EmptySignaller' ).which.is.instanceof( Signals.Signaller );
            });
        });
        describe('@method createSignal(signaller: Object, action: Action, ?message: Object)', function (){
            it('=> should return the empty signal if there is no action and a signaller ', function (){
                Signals.createSignal().should.equal( Signals.EmptySignal );
                Signals.createSignal( null, null ).should.equal( Signals.EmptySignal );
                Signals.createSignal( {}, null ).should.equal( Signals.EmptySignal );
                Signals.createSignal( null, Actions.EmptyAction ).should.equal( Signals.EmptySignal );
            });
            it('=> should return the empty signal if an action is not valid', function (){
                var signaller = new Signals.Signaller( this, Stages.createStage() );
                Signals.createSignal( signaller, Actions.EmptyAction ).should.equal( Signals.EmptySignal );
            });
            it('=> should return a signal that is not empty if an action and signaller are provided', function (){
                var signaller = new Signals.Signaller( this, Stages.createStage() );
                Signals.createSignal( signaller, "NEW_ACTION_TYPE" ).should.not.equal( Signals.EmptySignal );
            });
        });
        describe('@method createSignaller(  owner: Object ): Signaller', function (){
            it('=> should return a new Signaller if an owner is provided', function (){
                var owner = {};
                var signaller = Signals.createSignaller( owner );
                expect( signaller ).not.to.equal( Signals.EmptySignaller );
                expect( signaller ).to.be.instanceof( Signals.Signaller );
            });
            it('=> should return the EmptySignaller if not owner is provided', function (){
                var signaller = Signals.createSignaller();
                expect( signaller === Signals.EmptySignaller ).to.be.true;
            });
        });
        describe('@method createMessage( ?body: Object, ?header: Header ): Message', function (){
            it('=> should return the EmptyMessage if no body or header are provided', function (){
                var message = Signals.createMessage();
                expect( message === Signals.EmptyMessage ).to.be.true;
            });
            it('=> should return a message with only a body and empty object', function (){
                var message = Signals.createMessage();
                expect( message === Signals.EmptyMessage ).to.be.true;
            });
        });
        describe('@method isEmptySignal(): Boolean', function (){
            it( '=> should return if the signal is the empty signal', function (){
                expect( Signals.isEmptySignal( Signals.createSignal() ) ).to.be.true;
            });
        });
        describe('@method isMessageEmptyBody(): Boolean', function (){
            it( '=> should return is the message body is the empty body', function (){
                var message = Signals.createMessage( null, {} );
                expect( Signals.isEmptyMessageBody( message.body ) ).to.be.true;
                // reverse
                message = Signals.createMessage( {}, null );
                expect( Signals.isEmptyMessageBody( message.body ) ).to.be.false;
            });
        });
        describe('@method isMessageEmptyHeader(): Boolean', function (){
            it('=> should return is the message body is the empty body', function (){
                var message = Signals.createMessage( null, {} );
                expect( Signals.isEmptyMessageHeader( message.header ) ).to.be.false;
                // reverse
                message = Signals.createMessage( {}, null );
                expect( Signals.isEmptyMessageHeader( message.header ) ).to.be.true;
            });
        });
    });
});













