require.config({
    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
        'slick': {
            deps: ['jquery']
        },
        'jqueryUI': {
            deps: ['jquery']
        }
    },
    paths: {
        jquery: 'libs/jquery/jquery-2.1.4',
        bootstrap: 'libs/bootstrap/bootstrap',
        bootstrap_modal: 'libs/bootstrap/backbone.bootstrap-modal',
        underscore: 'libs/underscore/underscore',
        backbone: 'libs/backbone/backbone',
        presentation: 'presentation',
        text: 'libs/require/text',
        slick: 'libs/slick/slick/slick',
        jqueryUI: "libs/jquery-ui-1.11.4.custom/jquery-ui"
    }
});

require([
    'app'

], function (App) {

    App.initialize();
});