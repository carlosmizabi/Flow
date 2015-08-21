var Rx = require('../lib.imports').Rx;
var _  = require('../lib.imports').lodash;
var Observer = require('./observer');

var Subject = function(){
    Rx.Subject.apply( this, _.toArray( arguments ));
}
Subject.prototype = _.create( Rx.Subject.prototype, {
    constructor: Subject,
    addWatcher: function ( watcher ){
        if( watcher instanceof Observer ){
            this.subscribe( watcher );
        }
    }
});
Object.freeze( Subject.prototype );
module.exports = Subject;