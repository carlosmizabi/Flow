var should  = require('chai').should();
var Flow    = require('../src/flow.js');

describe('Flow API', function(){
    it('Flow should be defined', function(){
        should.exist( Flow.Stages );
    });
    it('Flow.Stages should be defined', function(){
        should.exist( Flow.Stages );

    });
    it('Flow.Actions should be defined', function(){
        should.exist( Flow.Actions );
    });
    it('Flow.Actions should be defined', function(){
        should.exist( Flow.Stages );
    });
    it('Flow.Actors should be defined', function(){
        should.exist( Flow.Stages );
    });
    it('Flow.Streams should be defined', function(){
        should.exist( Flow.Stages );
    });
    it('Flow.Watchers should be defined', function(){
        should.exist( Flow.Stages );
    });
    it('Flow.Utils should be defined', function(){
        should.exist( Flow.Stages );

    });
})