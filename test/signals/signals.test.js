var should  = require('chai').should();
var Flow    = require('../../src/flow.js');
var Signals = Flow.Signals;
var Signal  = Flow.Signals.Signal;
var Actions = Flow.Actions;
var Action  = Flow.Actions.Action;

describe('Signals =>', function() {
    describe('@identity', function () {
        it('=> is defined', function () {
            Signals.should.exist;
        });
        it('=> is an object', function () {
            Signals.should.be.an.instanceof(Object);
        });
    });
    describe('@property EmptySignal', function () {
        it('=> should exist', function () {
            Signals.should.have.property('EmptySignal').which.is.instanceof( Signal );
        });
        describe('@property action',function(){
            it('=> should exist and be of type {Action}', function () {
                Signals.EmptySignal.should.have.property('action').which.is.instanceof( Action );
            });
        });
    });
    describe('@method createSignal(signaller: Object, action: Action, ?message: Object)',function(){
        it('=> () should return the EmptySignal', function () {
            Signals.createSignal().should.equal( Signals.EmptySignal );
        });
        it('=> (null,null) should return the EmptySignal', function () {
            Signals.createSignal(null,null).should.equal( Signals.EmptySignal );
        });
        it('=> ({},null) should return the EmptySignal', function () {
            Signals.createSignal({},null).should.equal( Signals.EmptySignal );
        });
        it('=> (null, Action) should return the EmptySignal', function () {
            Signals.createSignal( null, Actions.EmptyAction ).should.equal( Signals.EmptySignal );
        });
        it('=> ({}, Action) should return a new Signal and not the EmptySignal', function () {
            Signals.createSignal( {}, Actions.EmptyAction ).should.not.equal( Signals.EmptySignal );
        });
    });

});













