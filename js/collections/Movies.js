/**
 * Created by Maxime on 2015-11-01.
 */

define([
    'underscore',
    'backbone',
    'models/Movie'

], function (_, Backbone, Movie) {
    var Movies = Backbone.Collection.extend({
        model: Movie,
        url: 'https://umovie.herokuapp.com/movies/',
        parse: function (response) {
            var collection = [];
            _(response).each(function (movie) {
                collection.push({
                    artworkUrl350: movie.artworkUrl100.replace(/100/g, "350"),
                    trackCensoredName: movie.trackCensoredName,
                    contentAdvisoryRating: movie.contentAdvisoryRating,
                    primaryGenreName: movie.primaryGenreName,
                    trackTimeMillis: movie.trackTimeMillis,
                    releaseDate: movie.releaseDate.substr(0, 10),
                    longDescription: movie.longDescription,
                    trackViewUrl: movie.trackViewUrl,
                    artworkUrl100: movie.artworkUrl100
                });
            });
            return collection;
        }
    });
    return Movies;
});

