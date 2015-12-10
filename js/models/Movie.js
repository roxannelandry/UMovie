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
            var model = {};
            model.time = Math.ceil((((response.results[0].trackTimeMillis) / 1000) / 60)) + " min";
            model.artworkUrl350 = response.results[0].artworkUrl100.replace(/100/g, "350");
            model.trackCensoredName = response.results[0].trackCensoredName;
            model.contentAdvisoryRating = response.results[0].contentAdvisoryRating;
            model.primaryGenreName = response.results[0].primaryGenreName;
            model.trackId = response.results[0].trackId;
            model.longDescription = response.results[0].longDescription;
            model.releaseDate = response.results[0].releaseDate.substr(0, 10);
            model.trackViewUrl = response.results[0].trackViewUrl;
            model.wrapperType = response.results[0].wrapperType;
            model.artworkUrl100 = response.results[0].artworkUrl100;
            return model;
        }
    });
    return Movie;
});