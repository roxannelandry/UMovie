/**
 * Created by RoxanneLandry on 15-11-03.
 */
define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    var MovieWatchlist = Backbone.Model.extend({
        urlRoot: function () {
            return 'https://umovie.herokuapp.com/watchlists/' + this.watchlistId + "/movies/";
        },
        initialize: function (id) {
            this.set({id: id.trackId});
        },
        parse: function (response) {
            return response;
        }
    });
    return MovieWatchlist;
});

