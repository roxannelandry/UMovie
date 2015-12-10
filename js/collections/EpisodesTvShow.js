/**
 * Created by Eliane on 2015-11-02.
 */


define([
    'underscore',
    'backbone',
    'models/EpisodeTvShow'

], function (_, Backbone, EpisodeTvShow) {
    var EpisodesTvShow = Backbone.Collection.extend({
        model: EpisodeTvShow,

        parse: function (response) {
            var collection = [];
            _(response.results).each(function (episode) {
                collection.push({
                    trackTimeMillis: Math.ceil(((episode.trackTimeMillis) / 1000) / 60) + " min",
                    collectionName: episode.collectionName,
                    longDescription: episode.longDescription,
                    artworkUrl100: episode.artworkUrl100,
                    artworkUrl350: episode.artworkUrl100.replace(/100/g, "350"),
                    artworkUrl250: episode.artworkUrl100.replace(/100/g, "250"),
                    trackNumber: episode.trackNumber,
                    trackName: episode.trackName,
                    releaseDate: episode.releaseDate.substr(0, 10),
                    id: episode.trackId
                });
            });
            return collection;
        },
        initialize: function (options) {
            this.url = 'https://umovie.herokuapp.com/tvshows/season/' + options.ids + '/episodes';
        }
    });
    return EpisodesTvShow;
});

