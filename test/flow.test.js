var should      = require('chai').should();
var Rx          = require('../src/lib.imports').Rx;
var _           = require('../src/lib.imports').lodash;
var Immutable   = require('../src/lib.imports').Immutable;
var Flow        = require('../src/flow.js');

describe('Flow =>', function(){

    describe('[0] Prequisites libraries :: ', function(){
        it('Rx.js should be exist', function (){
            should.exist( Rx );
        });
        it('lodash.js should be available', function (){
            should.exist( _ );
        });
        it('Immutable.js should be available', function (){
            should.exist( Immutable );
        });
    });

    describe('[1] Modules ::', function() {
        it('Flow should be defined', function () {
            should.exist(Flow.Stages);
        });
        it('Flow.Stages should be defined', function () {
            should.exist(Flow.Stages);
        });
        it('Flow.Actions should be defined', function () {
            should.exist(Flow.Actions);
        });
        it('Flow.Actions should be defined', function () {
            should.exist(Flow.Stages);
        });
        it('Flow.Actors should be defined', function () {
            should.exist(Flow.Stages);
        });
        it('Flow.Streams should be defined', function () {
            should.exist(Flow.Stages);
        });
        it('Flow.Watchers should be defined', function () {
            should.exist(Flow.Stages);
        });
        it('Flow.Utils should be defined', function () {
            should.exist(Flow.Stages);
        });
        //it('Flow.Signals should be defined', function () {
        //    should.exist(Flow.Signals);
        //});
    });
})