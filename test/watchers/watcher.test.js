var should  = require('chai').should();
var expect  = require('chai').expect;
var Flow    = require('../../src/flow.js');
var Action  = Flow.Actions.Action;
var Watcher = Flow.Watchers.Watcher;
var Subject = Flow.Stages.Subject;
var Observer = Flow.Stages.Observer;

describe('Watcher =>', function(){

    describe('@behaviour', function(){
        it( '=> should by default simply return the signals it receives', function (){
            var signals = [];
            var subject = new Subject();
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
                expect( new Watcher() ).to.be.instanceof( Observer );
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
        describe('@method watch( ...observable: Observable ): Void', function(){
            it('=> should watch an observable', function(){
                var signals = [];
                var watcher = new Watcher({
                    onSignal: function ( signal ){
                        signals.push( signal )
                    }
                });
                var subject = new Subject();
                watcher.watch( subject );
                subject.onNext( "signal" );
                expect( signals.length ).to.equal( 1 );
            });
            it('=> should receive signals from all of its observed streams', function(){
                var signals = [];
                var watcher = new Watcher({
                    onSignal: function ( signal ){
                        signals.push( signal )
                    }
                });
                var subject1 = new Subject();
                var subject2 = new Subject();
                watcher.watch( subject1 );
                watcher.watch( subject2 );
                subject1.onNext( "signal1" );
                subject2.onNext( "signal2" );
                subject2.onNext( "signal2" );
                expect( signals.length ).to.equal( 3 );
            });
            it('=> should add each to its watch form a spread of observables', function(){
                var signals = [];
                var watcher = new Watcher({
                    onSignal: function ( signal ){
                        signals.push( signal )
                    }
                });
                var subject_1 = new Subject();
                var subject_2 = new Subject();
                var subject_3 = new Subject();
                watcher.watch( subject_1, subject_2, subject_3 );
                subject_1.onNext( "signal1" );
                subject_2.onNext( "signal2" );
                subject_3.onNext( "signal3" );
                expect( signals.length ).to.equal( 3 );
                expect( watcher.size ).to.equal( 3 );
            });
            it('=> should add each to its watch from an array of observables', function(){
                var signals = [];
                var watcher = new Watcher({
                    onSignal: function ( signal ){
                        signals.push( signal )
                    }
                });
                var subject_1 = new Subject();
                var subject_2 = new Subject();
                var subject_3 = new Subject();
                watcher.watch([subject_1, subject_2, subject_3]);
                subject_1.onNext( "signal1" );
                subject_2.onNext( "signal2" );
                subject_3.onNext( "signal3" );
                expect( signals.length ).to.equal( 3 );
                expect( watcher.size ).to.equal( 3 );
            });
        });
        describe('@method stopAll(): Void', function(){
            it('=> should unsubscribe from all its observed', function(){
                var signals = [];
                var watcher = new Watcher({
                    onSignal: function ( signal ){
                        signals.push( signal )
                    }
                });
                var subject_1 = new Subject();
                var subject_2 = new Subject();

                watcher.watch( subject_1 );
                watcher.watch( subject_2 );

                subject_1.onNext( "signal1" );
                subject_2.onNext( "signal2" );

                watcher.stopAll();

                subject_1.onNext( "signal1" );
                subject_2.onNext( "signal2" );

                expect( signals.length ).to.equal( 2 );
            });
        });
        describe('@method stop( ...observable: Observable ): Void', function(){
            var signals;
            var watcher;
            var subject_1;
            var subject_2;
            var subject_3;
            var subject_4;
            beforeEach(function(){
                signals = [];
                watcher = new Watcher({
                    onSignal: function ( signal ){
                        signals.push( signal )
                    }
                });
                subject_1 = new Subject();
                subject_2 = new Subject();
                subject_3 = new Subject();
                subject_4 = new Subject();
            })
            it('=> should stop observing the observable passed', function(){
                watcher.watch( subject_1 );
                watcher.watch( subject_2 );

                subject_1.onNext( "signal1" );
                subject_2.onNext( "signal2" );

                watcher.stop( subject_2 );

                subject_1.onNext( "signal1" );
                subject_2.onNext( "signal2" );

                expect( signals.length ).to.equal( 3 );
            });
            it('=> should stop observing the observables passed', function(){
                watcher.watch( subject_1 );
                watcher.watch( subject_2 );
                watcher.watch( subject_3 );

                subject_1.onNext( "signal1" );
                subject_2.onNext( "signal2" );
                subject_3.onNext( "signal3" );

                watcher.stop( subject_1, subject_2  );

                subject_1.onNext( "signal1" );
                subject_2.onNext( "signal2" );
                subject_3.onNext( "signal3" );

                expect( signals.length ).to.equal( 4 );
            });
            it('=> should stop observing the observables in the array passed', function(){
                watcher.watch( subject_1 );
                watcher.watch( subject_2 );
                watcher.watch( subject_3 );

                subject_1.onNext( "signal1" );
                subject_2.onNext( "signal2" );
                subject_3.onNext( "signal3" );

                watcher.stop([ subject_1, subject_2 ]);

                subject_1.onNext( "signal1" );
                subject_2.onNext( "signal2" );
                subject_3.onNext( "signal3" );

                expect( signals.length ).to.equal( 4 );
            });
        });
        describe('@method size(): Number', function(){
            it('=> should return current number of observed-subscriptions', function(){
                var signals = [];
                var watcher = new Watcher({
                    onSignal: function ( signal ){
                        signals.push( signal )
                    }
                });
                var subject_1 = new Subject();
                var subject_2 = new Subject();
                var subject_3 = new Subject();

                expect( watcher.size ).to.equal( 0 );

                watcher.watch( subject_1 );
                expect( watcher.size ).to.equal( 1 );

                watcher.watch( subject_2 );
                expect( watcher.size ).to.equal( 2 );

                watcher.watch( subject_2 );
                expect( watcher.size ).to.equal( 2 );

                watcher.watch( subject_3 );
                expect( watcher.size ).to.equal( 3 );

                watcher.stop( subject_3 );
                expect( watcher.size ).to.equal( 2 );

                watcher.stopAll();
                expect( watcher.size ).to.equal( 0 );
            });
        });
        describe('@method isWatching( observable: Observable ): Boolean', function(){
            it('=> should return current number of observed-subscriptions', function(){
                var signals = [];
                var watcher = new Watcher({
                    onSignal: function ( signal ){
                        signals.push( signal )
                    }
                });
                var subject_1 = new Subject();
                var subject_2 = new Subject();

                expect( watcher.size ).to.equal( 0 );

                watcher.watch( subject_1 );
                expect( watcher.isWatching( subject_1 )).to.be.true;

                watcher.watch( subject_2 );
                expect( watcher.isWatching( subject_2 ) ).to.be.true;

                watcher.stop( subject_2 );
                expect( watcher.isWatching( subject_2 ) ).to.be.false;

                expect( watcher.isWatching( undefined ) ).to.be.false;
                expect( watcher.isWatching( null ) ).to.be.false;
                expect( watcher.isWatching( {} ) ).to.be.false;

                watcher.stopAll();
                expect( watcher.isWatching( subject_1 ) ).to.be.false;
            });
        })
    });
});
