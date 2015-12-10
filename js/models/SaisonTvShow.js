/**
 * Created by Eliane on 2015-11-02.
 */

define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    var SaisonTvShow = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/tvshows/season',
        parse: function (response) {
            var model = {};
            model.collectionName = response.results[0].collectionName;
            model.artistViewUrl = response.results[0].artistViewUrl
            model.artworkUrl350 = response.results[0].artworkUrl100.replace(/100/g, "350");
            model.contentAdvisoryRating = response.results[0].contentAdvisoryRating;
            model.primaryGenreName = response.results[0].primaryGenreName;
            model.releaseDate = response.results[0].releaseDate.substr(0, 10);
            model.longDescription = response.results[0].longDescription;
            return model;
        }
    });
    return SaisonTvShow;
});