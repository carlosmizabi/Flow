var _   = require('../lib.imports').lodash;

var Private = {};

var Message = function(body, header){
    Private.initBody(this, body);
    Private.initHeader(this, header);
    Object.freeze(this);
};

Message.prototype = _.create({
    constructor: Message,
    EmptyBody: {},
    EmptyHeader: {},
    hasHeader: function(){
        return this.header !== this.EmptyHeader;
    },
    hasBody: function(){
        return this.body !== this.EmptyBody;
    },
    ERRORS: {
        MESSAGE_MUST_BE_INSTANTIATED_WITH_A_BODY_THAT_IS_A_PLAIN_OBJECT: new Error('Message instance must be provided with a body argument at construction that is a plain object'),
    }
});

Private.initBody = function(Message, body){
    if(_.isPlainObject(body))
        Message.body = body;
    else if(typeof body !== 'undefined')
        throw Message.ERRORS.MESSAGE_MUST_BE_INSTANTIATED_WITH_A_BODY_THAT_IS_A_PLAIN_OBJECT;
    else
        Message.body = Message.EmptyBody;
};

Private.initHeader = function(Message, header){
    if(_.isPlainObject(header))
        Message.header = header;
    else if( typeof header !== 'undefined')
        throw Message.ERRORS.MESSAGE_MUST_BE_INSTANTIATED_WITH_A_HEADER_THAT_IS_A_PLAIN_OBJECT;
    else
        Message.header = Message.EmptyHeader;
};

Message.prototype.EmptyMessage = new Message();
Object.freeze(Message.prototype);

module.exports = Message;