var should      = require('chai').should();
var expect      = require('chai').expect;
var Watchers    = require('../../src/watchers/watchers.js');
var Rx          = require('../../src/lib.imports').Rx;

describe( 'Watchers Module =>', function(){

    describe('@behaviour', function(){
        it('=> should provide a factory for creating watchers safely');
    });

    describe('@unit', function(){
        describe('@type', function(){
            it('=> should should be defined', function(){
                should.exist( Watchers );
            });
        });

        describe('@property Watcher', function(){
            it('=> should be defined', function(){
                should.exist( Watchers.Watcher );
            });
            it('=> should be an instance of Rx.AnonymousObserver', function(){
                var watcher = new Watchers.Watcher({
                    next: function(){},
                });
                expect( watcher ).to.be.instanceof( Rx.AnonymousObserver );
            });
        });

    });


});