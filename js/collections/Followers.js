/**
 * Created by RoxanneLandry on 15-11-04.
 */
define([
    'underscore',
    'backbone',
    'models/Follower'

], function (_, Backbone, Follower) {
    var Followers = Backbone.Collection.extend({
        model: Follower,
        url: function () {
            return 'https://umovie.herokuapp.com/follow';
        }
    });
    return Followers;
});
