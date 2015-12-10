/**
 * Created by RoxanneLandry on 15-11-03.
 */
define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    var Follower = Backbone.Model.extend({
        urlRoot: function () {
            return 'https://umovie.herokuapp.com/follow';
        },
        initialize: function (id) {
            this.set({id: id._id});
        }
    });
    return Follower;
});

