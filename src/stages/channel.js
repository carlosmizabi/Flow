var Rx = require('../lib.imports').Rx;
var _  = require('../lib.imports').lodash;

var Channel = function(){
    Rx.Subject.apply( this, _.toArray( arguments ));
}
Channel.prototype = _.create( Rx.Subject.prototype, {
    constructor: Channel
});
Object.freeze( Channel.prototype );
module.exports = Channel;