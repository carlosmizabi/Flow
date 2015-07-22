var Rx = require('../lib.imports').Rx;

var Actors, Actor, PRIVATE, PROTO, INIT;

Actors    = {};
PRIVATE   = {};
PROTO = Object.create( Rx.Subject.prototype );
INIT  = function (){
  Actors.Actor = Actor;
  Object.freeze( Actor.prototype );
  return Actors;
};

/**
* Actor Instance
* -------------------------------------
*/
Actor = function( _initials_ ){
  Rx.Subject.call( this );
  var Actor = _public_ = this;
  var _private_  = {
      stream: null,
      subscription: null,
      init: function () {
          _private_.initAttributes();
      },
      initAttributes: function () {
          if (typeof _initials_ === 'object' && _initials_ !== null) {
              Actor.name = ( 'name' in _initials_ && typeof _initials_.name === 'string') ? PRIVATE.buildActorName( _initials_.name ) : PRIVATE.ANOMYMOUS_NAME;
              Actor.onNext = ( 'next'  in _initials_ && typeof _initials_.next === 'function') ? _initials_.next : Rx.noop;
              Actor.onError = ( 'error' in _initials_ && typeof _initials_.next === 'function') ? _initials_.error : Rx.noop;
              Actor.onCompleted = ( 'done'  in _initials_ && typeof _initials_.next === 'function') ? _initials_.done : Rx.noop;
          }
      }
  };

  _public_.addStageStream = function ( stageStream ){
      if( stageStream instanceof Stage ){

      }
  }

  _public_.addStream = function ( stream ) {
      if( stream instanceof Stream === false ){ return; }
       if( _private_.stream === null ){
           _private_.stream = stream;
           _private_subscription = _private_.stream.subscribe( Actor );
      }
      else{
          _private_.stream = _private_.stream.merge( stream );
           _private_subscription.dispose();
           _private_subscription = _private_.stream.subscribe( Actor );
      }
  };

  _public_.addStreams = function (){
      if( arguments.length > 0 ){
          for( arg in arguments ){
              Actor.addStream( arguments[arg] );
          }
      }
  }

  _private_.init();
  Object.freeze( Actor );
};

Actor.prototype = PROTO;
Actor.prototype.constructor = Actor;

PRIVATE.ANOMYMOUS_NAME = 'ANONYMOUS_ACTOR';
PRIVATE.ACTOR_POSTFIX = '_ACTOR';
PRIVATE.buildActorName = function( nameString ){
  return nameString.toUpperCase().replace(/[\s*]/, '_') + PRIVATE.ACTOR_POSTFIX;
};

module.exports =  INIT();
