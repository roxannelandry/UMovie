/**
 * Created by RoxanneLandry on 15-11-07.
 */
define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    var GenreTvShow = Backbone.Collection.extend({
        urlRoot: 'https://umovie.herokuapp.com/genres/tvshows',
        parse: function (response) {
            return response;
        }
    });
    return GenreTvShow;
});