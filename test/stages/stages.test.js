var chai        = require('chai');
chai.config.includeStack = true;
var should      = chai.should();
var expect      = chai.expect;
var Flow        = require('../../src/flow.js');
var Stages      = Flow.Stages;

describe('Stages Module =>', function() {
    describe('@unit', function() {
        describe('@type Object', function () {
            it('=> should exist and be an object', function () {
                Stages.should.exist.which.is.a('object');
            });
        });
        describe('@property Stage: Stage', function () {
            it('=> should exist and be a constructor function', function () {
                Stages.should.have.property('Stage').which.is.a('function');
            });
        });
        describe('@property Observer: Observer', function () {
            it('=> should exist and be a constructor function', function () {
                Stages.should.have.property('Observer').which.is.a('function');
            });
        });
        describe('@property Observable: Observable', function () {
            it('=> should exist and be a constructor function', function () {
                Stages.should.have.property('Observable').which.is.a('function');
            });
        });
        describe('@property Subject: Subject', function () {
            it('=> should exist and be a constructor function', function () {
                Stages.should.have.property('Observer').which.is.a('function');
            });
        });
        describe('@property EmptyStage: Stage', function () {
            it('=> should exist and be a Stage', function () {
                Stages.should.have.property('EmptyStage').which.is.instanceof(Stages.Stage);
            });
        });
        describe('@method createStage(): Stage', function () {
            it('=> should return a new stage object', function () {
                Stages.createStage().should.exist;
            });
        });
    });
});
