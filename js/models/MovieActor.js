/**
 * Created by Maxime on 2015-10-30.
 */

define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    var MovieActor = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/actors/',
        parse: function (response) {
            this.set({id: response.trackId});
            return response;
        }
    });
    return MovieActor;
});