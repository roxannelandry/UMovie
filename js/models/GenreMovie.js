/**
 * Created by RoxanneLandry on 15-11-07.
 */
define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    var GenreMovie = Backbone.Collection.extend({
        urlRoot: 'https://umovie.herokuapp.com/genres/movies',
        parse: function (response) {
            return response;
        }
    });
    return GenreMovie;
});