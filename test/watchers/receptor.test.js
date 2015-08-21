//var should      = require('chai').should();
//var expect      = require('chai').expect;
//var Rx          = require('../../src/lib.imports').Rx;
//var Noop        = Rx.helpers.noop;
//var Flow        = require('../../src/flow.js');
//var Receptor    = Flow.Watchers.Receptor;
//
//describe( 'Receptor =>', function(){
//    describe('@behaviour', function() {
//        it('=> should not, per se, have any behavior but model an observer/receptor watching behaviour');
//    });
//    describe('@unit', function() {
//        describe('@type', function(){
//            it('=> should be defined and be a function', function(){
//                Receptor.should.exist;
//                Receptor.should.be.instanceof(Function);
//            });
//            it('=> should have Receptor as its prototype constructor', function(){
//                var constructor = Receptor.prototype.constructor;
//                constructor.should.equal( Receptor );
//            });
//        });
//        describe('@constructor( ?onSignal: Function, ?onError: Function, ?onEnd: Function )', function(){
//            it('=> should return a new Receptor and not need any parameters to be created', function(){
//                new Receptor().should.be.instanceof( Receptor );
//            });
//            it('=> should allow an object with named parameters to be used to instantiate a custom receptor', function(){
//                var paramObject = {
//                    onSignal: function(){},
//                    onError: function(){},
//                    onEnd: function(){}
//                };
//                new Receptor( paramObject ).should.be.instanceof( Receptor );
//            });
//            it('=> it should allow parameters to be provided optionally and instead be replaced with null on construction', function(){
//                var receptor;
//                var onSignalMessage = 'onSignal';
//                var onErrorMessage = 'onError';
//                var onEndMessage = 'onMessage';
//                var onSignal = function(){ return onSignalMessage };
//                var onError = function(){ return onErrorMessage };
//                var onEnd = function(){ return onEndMessage };
//                // onSignal
//                receptor = new Receptor( onSignal, null, null );
//                receptor.should.be.instanceof( Receptor );
//                expect( receptor.onSignal() ).to.equal( onSignalMessage );
//                receptor.onSignal.should.equal( onSignal );
//                // onError
//                receptor = new Receptor( null, onError, null );
//                receptor.should.be.instanceof( Receptor );
//                expect( receptor.onError() ).to.equal( onErrorMessage );
//                receptor.onError.should.equal( onError );
//                //// onEnd
//                receptor = new Receptor( null, null, onEnd );
//                receptor.should.be.instanceof( Receptor );
//                expect( receptor.onEnd() ).to.equal( onEndMessage );
//                receptor.onEnd.should.equal( onEnd );
//            });
//            it('=> should have Rx\s noop for non defined construction parameters', function(){
//                var receptor = new Receptor();
//                receptor.onSignal.should.equal( Noop );
//                receptor.onError.should.equal( Noop );
//                receptor.onError.should.equal( Noop );
//            })
//        });
//
//        describe( '@property EmptyReceptor: Receptor', function(){
//            it( '=> should be defined and be an instance of Receptor', function (){
//                var receptor = new Receptor();
//                expect( receptor.EmptyReceptor ).to.exist;
//            });
//        });
//        describe('@method onSignal(): Void =>', function(){
//            it('should be defined and be a function', function(){
//                new Receptor().should.have.property( 'onSignal' ).which.is.a( 'function' );
//            });
//            it('should not be writable', function(){
//                var receptor = new Receptor();
//                receptor.onSignal = null;
//                receptor.onSignal.should.not.equal( null );
//            });
//        });
//        describe('@method onError(): Void =>', function(){
//            it('should be defined and be a function', function(){
//                new Receptor().should.have.property( 'onError' ).which.is.a( 'function' );
//            });
//            it('should be not be writable', function(){
//                var receptor = new Receptor();
//                receptor.onError = null;
//                receptor.onError.should.not.equal( null );
//            });
//        });
//        describe('@methods onEnd:(): Void', function(){
//            it('should be defined and be a function', function(){
//                new Receptor().should.have.property( 'onEnd' ).which.is.a( 'function' );
//            });
//            it('should be not be writable', function(){
//                var receptor = new Receptor();
//                receptor.onEnd = null;
//                receptor.onEnd.should.not.equal( null );
//            });
//        });
//    });
//});