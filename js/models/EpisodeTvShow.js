/**
 * Created by Eliane on 2015-11-02.
 */

define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    var EpisodeTvShow = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/tvshows/season/',
        parse: function (response) {
            this.set({id: response.trackId});
            return response;
        }
    });
    return EpisodeTvShow;
});