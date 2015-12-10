/**
 * Created by RoxanneLandry on 15-10-26.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'jqueryUI'

], function ($, _, Backbone, Router, jqueryUI) {

    $.ajaxPrefilter(function (options) {
        options.crossDomain = true;
        options.url = options.url;
    });

    var initialize = function () {
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});