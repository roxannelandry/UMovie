/**
 * Created by Maxime on 2015-11-01.
 */

define([
    'underscore',
    'backbone',
    'models/Actor'

], function (_, Backbone, Actor) {
    var Actors = Backbone.Collection.extend({
        model: Actor,
        url: 'https://umovie.herokuapp.com/actors',
        parse: function (response) {
            var collection = [];
            _(response).each(function (actor) {
                collection.push({
                    artistName: actor.artistName,
                    primaryGenreName: actor.primaryGenreName,
                    artistType: actor.artistType,
                    artistLinkUrl: actor.artistLinkUrl
                });
            });
            return collection;
        }
    });
    return Actors;
});