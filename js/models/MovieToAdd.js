/**
 * Created by Maxime on 2015-10-30.
 */

define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    var Movie = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/movies/',
        parse: function (response) {
            return response;
        }
    });
    return Movie;
});