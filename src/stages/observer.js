var Rx = require('../lib.imports').Rx;
var _  = require('../lib.imports').lodash;

var Observer = function(){
    Rx.Observer.apply( this, _.toArray( arguments ));
}
Observer.prototype = _.create( Rx.Observer.prototype, {
    constructor: Observer
});
Object.freeze( Observer.prototype );
module.exports = Observer;