/**
 * Created by Maxime on 2015-10-30.
 */

define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    var Actor = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/actors',
        parse: function (response) {
            var model = {};
            model.artistId = response.results[0].artistId;
            model.artistLinkUrl = response.results[0].artistLinkUrl;
            model.artistName = response.results[0].artistName;
            model.artistType = response.results[0].artistType;
            model.primaryGenreId = response.results[0].primaryGenreId;
            model.primaryGenreName = response.results[0].primaryGenreName;
            model.radioStationUrl = response.results[0].radioStationUrl;
            model.wrapperType = response.results[0].wrapperType;
            return model;
        }
    });
    return Actor;
});