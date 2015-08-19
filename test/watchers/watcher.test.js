var should  = require('chai').should();
var expect  = require('chai').expect;
var Rx      = require('../../src/lib.imports').Rx;
var Flow    = require('../../src/flow.js');
var Action  = Flow.Actions.Action;
var Watcher = Flow.Watchers.Watcher;

describe('Watcher =>', function(){

    describe('@behaviour', function(){
        it( '=> should by default simply return the signals it receives', function (){
            var signals = [];
            var subject = new Rx.Subject();
            var watcher = new Watcher ({
                onSignal: function( signal ){
                    signals.push( signal );
                }
            });
            subject.subscribe( watcher );
            subject.onNext("something");
            expect( signals.length ).to.equal( 1 );
        });
    });

    describe('@unit', function(){
        describe('@type', function(){
            it('=> should be defined and have the correct type', function(){
                should.exist( Watcher );
            });
            it('=> should be an instace of Rx.Observer', function(){
                expect( new Watcher() ).to.be.instanceof( Rx.Observer );
            });
        });
        describe('@constructor ({ ?onSignal: Function, ?onDone: Function, ?onError: Function }): Watcher', function(){
            it( '=> should construct a Watcher if an initial object is passed an assign each argument accordingly', function(){
                var onSignal = function(){};
                var onDone = function(){};
                var onError = function(){};
                var watcher = new Watcher({
                    onSignal: onSignal,
                    onDone: onDone,
                    onError: onError
                });
                expect( watcher.onSignal === onSignal ).to.be.true;
                expect( watcher.onDone === onDone ).to.be.true;
                expect( watcher.onError === onError ).to.be.true;
            });
            it( '=> should allow the construction of a Watcher instance even if certain arguments ommited', function(){
                var onSignal = function(){};
                var onDone = function(){};
                var onError = function(){};

                var watcher1 = new Watcher({  onSignal: onSignal });
                expect( watcher1.onSignal === onSignal ).to.be.true;

                var watcher2 = new Watcher({  onDone: onDone });
                expect( watcher2.onDone === onDone ).to.be.true;

                var watcher3 = new Watcher({  onError: onError });
                expect( watcher3.onError === onError ).to.be.true;
            });
        });
        describe('@constructor ( ?onSignal: Function, ?onDone: Function, ?onError: Function ): Watcher', function(){
            it( '=> should construct a Watcher if arguments are a spread of functions', function(){
                var onSignal = function(){};
                var onDone = function(){};
                var onError = function(){};
                var watcher = new Watcher( onSignal, onDone, onError );
                expect( watcher.onSignal === onSignal ).to.be.true;
                expect( watcher.onDone === onDone ).to.be.true;
                expect( watcher.onError === onError ).to.be.true;
            });
        });
        describe('@method addStream( stream: Stream ): Void', function(){

        });
    });
});
