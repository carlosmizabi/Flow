var Rx = require('../lib.imports').Rx;
var _  = require('../lib.imports').lodash;

var Observable = function(){
    Rx.Observable.apply( this, _.toArray( arguments ));
}
Observable.prototype = _.create( Rx.Observable.prototype, {
    constructor: Observable
});
Object.freeze( Observable.prototype );
module.exports = Observable;
