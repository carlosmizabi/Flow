var should  = require('chai').should();
var expect  = require('chai').expect;
var Flow    = require('../../src/flow.js');
var Signal  = Flow.Signals.Signal;
var Actions = Flow.Actions;
var Action  = Flow.Actions.Action;

describe('Signal =>', function () {

    describe('(Identity)', function () {
        it('=> is defined ', function () {
            Signal.should.exist;
        });
        it('=> is a function', function () {
            Signal.should.be.instanceof( Function);
        });
        it('=> its prototype constructor should be {Function: Signal}', function () {
            Signal.prototype.constructor.should.be.equal( Signal );
        });
    });
    describe('@constructor( action: Action, message: Object, signaller: Object )', function () {
        it('=> ( null, null, null ): should throw an error', function () {
            var ERROR = Signal.prototype.ERRORS.SIGNAL_INVALID_CONTRUCTOR_PARAMETER;
            (function(){ new Signal(null,null,null); }).should.throw( ERROR );
        });
        it('=> ( {}, null, {} ): should throw an error', function () {
            var ERROR = Signal.prototype.ERRORS.SIGNAL_INVALID_CONTRUCTOR_PARAMETER_SIGNALLER;
            (function(){ new Signal({},null,{}); }).should.throw( ERROR );
        });
        it('=> ( {}, {}, null ): should throw an error', function () {
            var ERROR = Signal.prototype.ERRORS.SIGNAL_INVALID_CONTRUCTOR_PARAMETER_SIGNALLER;
            (function(){ new Signal({},{},null); }).should.throw( ERROR );
        });
        it('=> ( {}, {Action} , null ): should not throw an error', function () {
            var ERROR = Signal.prototype.ERRORS.SIGNAL_INVALID_CONTRUCTOR_PARAMETER_SIGNALLER;
            (function(){ new Signal({}, Actions.createAction('ACTION'),null); }).should.not.throw( ERROR );
        });

    });
    describe('@property signaller', function () {
        it('=> should exist and be an object', function(){
            new Signal({}, new Action('SOME_ACTION')).should.have.property('signaller').which.is.a('object');
        });
        it('=> should not be writable', function(){
            var signaller = { name: 'initial'};
            var empty = {};
            var signal = new Signal( signaller , new Action('SOME_ACTION') );
            signal.signaller = empty;
            signal.signaller.should.equals( signaller );
        });
    });
    describe('@property message', function () {
        it('=> should exist and if not set should be null', function(){
            new Signal({}, new Action('SOME_ACTION')).should.have.property('message').which.equals(null);
        });
        it('=> should not be writable', function(){
            var message = { data: 'initial'};
            var signal = new Signal( {} , new Action('SOME_ACTION'), message );
            signal.message = null;
            signal.message.should.equals( message );
        });
    });
    describe('@property action', function () {
        it('=> should exist and be an instance of Action', function(){
            new Signal({}, new Action('SOME_ACTION')).should.have.property('action').which.is.instanceof( Action );
        });
        it('=> should not be writable', function(){
            var action = new Action("SOME_ACTION");
            var empty = Actions.EmptyAction;
            var signal = new Signal( {} , action );
            signal.signaller = empty;
            signal.action.should.equals( action );
        });
    });

    describe('@method areValidConstructorParameters()', function () {
        it('(signaller: Object, action: Action, message: Object): should return TRUE', function () {
            var action = Actions.createAction('ACTION');
            var result = Signal.prototype.areValidConstructorParameters( {}, action, {} );
            result.should.be.true;
        });
        it('=> ( null, {Action}, {}): should return FALSE', function () {
            var action = Actions.createAction('ACTION');
            var result = Signal.prototype.areValidConstructorParameters( null, action, {} );
            result.should.be.false;
        });
        it('=> ( {}, null , {} ): should return FALSE', function () {
            var result = Signal.prototype.areValidConstructorParameters( {}, null, {} );
            result.should.be.false;
        });
        it('=> ( {}, {Action}, null): should return TRUE', function () {
            var action = Actions.createAction('ACTION');
            var result = Signal.prototype.areValidConstructorParameters( {}, action, null );
            result.should.be.true;
        });
        it('=> (signaller: Object, action: Action, undefined): should return TRUE', function () {
            var action = Actions.createAction('ACTION');
            var result = Signal.prototype.areValidConstructorParameters( {}, action, undefined );
            result.should.be.true;
        });
    });
    describe('@method hasMessage(): Boolean', function() {
        it('=> should exist and be a function', function(){
            Signal.prototype.should.have.property('hasMessage').which.is.a('function');
        });
        it('=> should return FALSE when the message is null', function(){
            new Signal( {}, new Action('SOME_ACTION') ).hasMessage().should.be.false;
        });
        it('=> should return TRUE when the message is NOT null', function(){
            new Signal( {}, new Action('SOME_ACTION'), {}).hasMessage().should.be.true;
        });
    });
    describe('@method toArray(): Array(*)', function() {
        it('=> should exits and be a function', function(){
            Signal.prototype.should.have.property('toArray').which.is.a('function');
        });
        it('=> it should return an array', function(){
            new Signal({}, new Action('ACTION')).toArray().should.be.an('array');
        });
        it('=> it should return all signal properties in array form', function(){
            var signal= new Signal({}, new Action('Action'));
            var signalArray = signal.toArray();
            var signalPropertyCount = function( signal ){
                var count = 0;
                for (var prop in signal) {
                    if ( signal.hasOwnProperty( prop )) {
                        count++;
                    }
                }
                return count;
            }( signal );
            signalArray.length.should.equal( signalPropertyCount );
        });
    });
    describe('@method toString(): String', function() {
        it('=> should exist and be a function', function () {
            Signal.prototype.should.have.property('toString').which.is.a('function');
        });
        it('=> should return a string', function () {
            console.log('POOOOOP', new Signal({}, new Action('SOME_ACTION')).toString());
            new Signal({}, new Action('SOME_ACTION')).toString().should.be.a('string');
        });
    });
    describe('@method asJSON(): String', function() {
        it('=> should exist and be a function', function(){
            new Signal({}, new Action('ACTION')).should.have.property('asJSON').which.is.instanceof( Function );
        });
        it('=> should return a JSON stringified version of the Action', function () {
            new Signal({}, new Action("ACTION_TYPE")).asJSON().should.be.a('string');
        });
    });
});
