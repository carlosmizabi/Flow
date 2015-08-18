var _ = require('../lib.imports').lodash;
var Utils = {
    start: function () {
    },
    checkForRx: function () {

    },
    getFirstObjectWithType: function( type, objectsArray ){
        var result = null
        if(_.isObject( type ) && _.isArray( objectsArray )) {
            result = _.find( objectsArray, function( object ){
                return object instanceof type;
            });
        }
        return result;
    }
};

Object.freeze( Utils );

module.exports = Utils;