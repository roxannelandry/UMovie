/**
 * Created by RoxanneLandry on 15-12-03.
 */

define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    var MoviesByGender = Backbone.Collection.extend({
        url: 'https://umovie.herokuapp.com/search/',
        parse: function (response) {
            return response.results;
        }
    });
    return MoviesByGender;
});
