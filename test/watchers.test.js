var should      = require('chai').should();
var expect      = require('chai').expect;
var Watchers    = require('../src/watchers.js');
var Rx          = require('../src/lib.imports').Rx;

describe( 'Watchers =>', function(){

    describe('DEFINITION ::', function(){
        it('Watchers should be defined', function(){
            should.exist( Watchers );
        });
        it('Watchers.Watcher should be defined', function(){
            should.exist( Watchers.Watcher );
        });
        it('Watcher.Watcher should be an instance of Rx.AnonymousObserver', function(){
            var watcher = new Watchers.Watcher({
                next: function(){},
            });
            expect( watcher ).to.be.instanceof( Rx.AnonymousObserver );
        });

    })
});