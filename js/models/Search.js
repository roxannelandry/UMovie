/**
 * Created by Maxime on 2015-11-28.
 */
define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    var Search = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/search',
        initialize: function (options, type) {
            if (type == "all") {
                this.url = 'https://umovie.herokuapp.com/search?q=' + options;
            } else {
                this.url = 'https://umovie.herokuapp.com/search' + type + '?q=' + options;
            }
        },
        parse: function (response) {
            if (response.results === undefined) {
                return response;
            } else {
                return response.results;
            }
        }
    });
    return Search;
});