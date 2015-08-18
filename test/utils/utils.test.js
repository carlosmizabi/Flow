var should  = require('chai').should();
var expect  = require('chai').expect;
var Flow    = require('../../src/flow');
var Utils   = Flow.Utils;

describe('Utils Module =>', function(){
    describe('@type', function(){
        it('=> should be defined and be an object', function(){
            Utils.should.exist;
            Utils.should.be.an( 'object' );
        });
    });
    describe('@method getFirstObjectWithType( objectType: Function, Array<Object>): Object', function(){
        var array1 = new Array();
        var array2 = new Array();
        var string1 = new String();
        var string2 = new String();
        var boolean1 = new Boolean(false);
        var boolean2 = new Boolean(true);
        it('=> should return the first object that matches the type specified', function(){
            var paramArray = [ array1, string1, boolean2, boolean1, string2, array2 ];
            ( Utils.getFirstObjectWithType( Boolean,  paramArray ) === boolean2 ).should.be.truthy;
            ( Utils.getFirstObjectWithType( Array,    paramArray ) === array1   ).should.be.truthy;
            ( Utils.getFirstObjectWithType( String,   paramArray ) === string1  ).should.be.truthy;
            ( Utils.getFirstObjectWithType( Number,   paramArray ) === null     ).should.be.truthy;
        });
    });
});