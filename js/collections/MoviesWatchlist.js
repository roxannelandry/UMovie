/**
 * Created by RoxanneLandry on 15-11-04.
 */
define([
    'underscore',
    'backbone',
    'models/MovieWatchlist'

], function (_, Backbone, MovieWatchlist) {
    var MoviesWatchlist = Backbone.Collection.extend({
        model: MovieWatchlist,
        url: function () {
            return 'https://umovie.herokuapp.com/watchlists/' + this.watchlistId + "/movies";
        },
        initialize: function (id) {
            this.watchlistId = id;
        },
        parse: function (response) {
            var collection = [];
            _(response.results).each(function (movie) {
                collection.push({
                    artworkUrl100: movie.artworkUrl100,
                    trackId: movie.trackId
                });
            });
            return collection;
        },
    });
    return MoviesWatchlist;
});
