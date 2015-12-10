/**
 * Created by Eliane on 2015-11-02.
 */


define([
    'underscore',
    'backbone',
    'models/SaisonTvShow'

], function (_, Backbone, SaisonTvShow) {
    var SaisonsTvShow = Backbone.Collection.extend({
        model: SaisonTvShow,
        url: 'https://umovie.herokuapp.com/tvshows/season/',
        parse: function (response) {
            return response;
        }
    });
    return SaisonsTvShow;
});