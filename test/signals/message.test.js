var should  = require('chai').should();
var expect  = require('chai').expect;
var _       = require('../../src/lib.imports').lodash;
var Flow    = require('../../src/flow');
var Message = Flow.Signals.Message;

describe('Message =>', function(){
    describe('@unit', function() {
        describe('@type', function () {
            it('=> should exist', function () {
                Message.should.exist;
            });
            it('=> is a function', function () {
                Message.should.be.instanceof(Function);
            });
        });
        describe('@constructor( body: PlayObject, ?header: PlainObject )', function () {
            it('=> should create an message if a body is provided', function(){
                var message = new Message({});
                message.should.exist;
            });
            it('=> should create a message even if the body is not provided', function(){
                var message = new Message();
                message.should.exist;
            });
        });
        describe('@property body: PlainObject', function () {
            it('=> should be defined', function(){
                var message = new Message();
                message.should.have.property('body');
            });
            it('=> should be a plain Object', function(){
                var message = new Message();
                expect(_.isPlainObject( message.body )).to.be.true;
            });
        });
        describe('@property header: PlainObject || EmptyHeader', function () {
            it('=> should be defined and be a Plain Object or null', function(){
                var message = new Message();
                expect( message.header ).to.equal( message.EmptyHeader);
            });
        });
        describe('@method hasBody(): Boolean', function () {
            it('=> should return false if the body is not empty', function(){
                var message = new Message({});
                expect( message.hasBody() ).to.be.true;
            });
            it('=> should return false if the body is empty', function(){
                var message = new Message();
                expect( message.hasBody() ).to.be.false;
            });
        });
        describe('@method hasHeader(): Boolean', function () {
            it('=> should return true if the heady is not empty', function(){
                var message = new Message({},{});
                expect(message.hasHeader()).to.be.true;
            });
            it('=> should return false if the header is empty',function(){
                var message = new Message();
                expect(message.hasHeader()).to.be.false;
            });
        });
    });
});