/**
 * Created by marin_000 on 2015-11-05.
 */

define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    var GenresTvShow = Backbone.Collection.extend({
        url: 'https://umovie.herokuapp.com/genres/tvshows',
        parse: function (response) {
            return response;
        }
    });
    return GenresTvShow;
});