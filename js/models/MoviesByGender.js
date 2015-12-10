/**
 * Created by RoxanneLandry on 15-12-03.
 */
define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    var MoviesByGender = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/search',
        initialize: function (lettre) {
            this.url = 'https://umovie.herokuapp.com/search?q=' + lettre + '&limit=200';
        },
        parse: function (response) {
            return response.results;
        }
    });
    return MoviesByGender;
});