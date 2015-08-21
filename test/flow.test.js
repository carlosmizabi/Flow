var should      = require('chai').should();
var expect      = require('chai').expect;
var Rx          = require('../src/lib.imports').Rx;
var _           = require('../src/lib.imports').lodash;
var Immutable   = require('../src/lib.imports').Immutable;
var Flow        = require('../src/flow.js');
var Stage       = Flow.Stages.Stage;
var Actions     = Flow.Actions;
var Actors      = Flow.Actors;
var Signals     = Flow.Signals;
var Watcher     = Flow.Watchers.Watcher;

describe('Flow =>', function(){

    describe('[0] Prequisites libraries :: ', function(){
        it('Rx.js should be exist', function (){
            should.exist( Rx );
        });
        it('lodash.js should be available', function (){
            should.exist( _ );
        });
        it('Immutable.js should be available', function (){
            should.exist( Immutable );
        });
    });

    describe('[1] Modules ::', function() {
        it('Flow.Stages should be defined', function () {
            should.exist(Flow.Stages);
        });
        it('Flow.Actions should be defined', function () {
            should.exist(Flow.Actions);
        });
        it('Flow.Actions should be defined', function () {
            should.exist(Flow.Stages);
        });
        it('Flow.Actors should be defined', function () {
            should.exist(Flow.Stages);
        });
        it('Flow.Streams should be defined', function () {
            should.exist(Flow.Stages);
        });
        it('Flow.Watchers should be defined', function () {
            should.exist(Flow.Stages);
        });
        it('Flow.Utils should be defined', function () {
            should.exist(Flow.Stages);
        });
        //it('Flow.Signals should be defined', function () {
        //    should.exist(Flow.Signals);
        //});
    });

    describe('@behaviour', function(){
        var stage = new Stage();
        // Actions :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        var smileAction = Actions.createAction( 'SMILE' );
        var cryAction = Actions.createAction( 'CRY' );
        var killAction = Actions.createAction( 'KILL' );
        var danceAction = Actions.createAction( 'DANCE' );
        // Actors :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        var tomHanks = Actors.createActor( 'TOM', stage, [ smileAction, cryAction ]);
        var jodieFoster = Actors.createActor( 'JODIE', stage, [ killAction ]);
        var fredAstaire = Actors.createActor( 'FRED', stage, [ danceAction ]);
        // Signallers ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        var signallers = {
            spielberg: Signals.createSignaller( this, stage ),
            hitchcock: Signals.createSignaller( this, stage ),
        };
        // Watchers ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        var watchers = {
            cinemaSignals: [],
            tvSignals: [],
            tvChannel: new Watcher({
                onSignal: function( signal ){
                    watchers.tvSignals.push( signal );
                }
            }),
            cinemaChain: new Watcher({
                onSignal: function( signal ){
                    watchers.cinemaSignals.push( signal );
                }
            })
        };
        watchers.tvChannel.watch( tomHanks, jodieFoster );
        watchers.cinemaChain.watch( fredAstaire );

        it('=> should have actors registered on stage', function(){
            expect( stage.whichActorsExist([ tomHanks, fredAstaire, jodieFoster] ).length ).to.equal( 3 );
            expect( stage.whichActionsExist([ smileAction, cryAction, killAction, danceAction ] ).length ).to.equal( 4 );
        })

        it('=> should have actions uniquely assigned to a unique actor and this cannot be changed', function(){
            expect( stage.getActorForAction( smileAction ) ).to.equal( tomHanks );
            stage.addActorAction( fredAstaire, smileAction );
            expect( stage.getActorForAction( smileAction ) ).to.equal( tomHanks );
        });

        it('=> should have an actor pick up signals with its actions and relay these to its watchers', function(){
            signallers.spielberg.emit( smileAction ); // tom hanks
            signallers.spielberg.emit( cryAction ); // tom hanks
            expect( watchers.tvSignals.length ).to.equal( 2 );
            signallers.spielberg.emit( killAction ); // jodieFoster
            expect( watchers.tvSignals.length ).to.equal( 3 );
            expect( watchers.cinemaSignals.length ).to.equal( 0 );
            signallers.spielberg.emit( danceAction ); // fredAstaire
            expect( watchers.cinemaSignals.length ).to.equal( 1 );
        });
        it('=>  watchers should be able to stop watching actors', function(){
            var tvSignalsSize = watchers.tvSignals.length;
            watchers.tvChannel.stop( tomHanks )
            signallers.spielberg.emit( smileAction ); // tom hanks
            expect( watchers.tvSignals.length ).to.equal( tvSignalsSize );
        });
        it('=>  watchers should be able to start watching an actor again', function(){
            var tvSignalsSize = watchers.tvSignals.length;
            watchers.tvChannel.watch( tomHanks )
            signallers.hitchcock.emit( smileAction ); // tom hanks
            expect( watchers.tvSignals.length ).to.equal( tvSignalsSize + 1 );
        });
    });
});