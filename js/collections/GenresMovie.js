/**
 * Created by  Marina on 2015-11-04.
 */
define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    var GenresMovie = Backbone.Collection.extend({
        url: 'https://umovie.herokuapp.com/genres/movies',
        parse: function (response) {
            return response;
        }
    });
    return GenresMovie;
});