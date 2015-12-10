/**
 * Created by Maxime on 2015-11-01.
 */

define([
    'underscore',
    'backbone',
    'models/MovieActor'

], function (_, Backbone, MovieActor) {
    var MoviesActor = Backbone.Collection.extend({
        model: MovieActor,
        parse: function (response) {
            var collection = [];
            _(response.results).each(function (movie) {
                collection.push({
                    artworkUrl100: movie.artworkUrl100,
                    trackCensoredName: movie.trackCensoredName,
                    releaseDate: movie.releaseDate.substr(0, 10),
                    trackName: movie.trackName,
                    trackId: movie.trackId
                });
            });
            return collection;
        },

        initialize: function (options) {
            this.url = 'https://umovie.herokuapp.com/actors/' + options.ids + '/movies';
        }
    });
    return MoviesActor;
});