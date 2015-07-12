var Flow = {
    start: function(){
        this.checkForRx();
        Flow.Rx = Rx;
        if( 'Actions' in this && 'Streams' in this && 'Watchers' in this ){
            //console.log('All Swell');
        }
        else{
            console.log('Something is Not Quite Right!');
        }
        Object.freeze( this );
    },
    checkForRx: function(){
        if( typeof Rx === 'undefined' ){
            throw new Error('The Rx Global Module is not defined');
        }
        else{
            //console.log('Rx is defined');
        }
    }
};
