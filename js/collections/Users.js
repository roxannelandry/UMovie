/**
 * Created by RoxanneLandry on 15-11-28.
 */
define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    var Users = Backbone.Collection.extend({
        url: 'https://umovie.herokuapp.com/users',
        parse: function (response) {
            var collection = [];
            _(response.attributes).each(function (user) {
                collection.push({
                    name: user.name,
                    email: user.email,
                    id: user.id
                });
            });
            return collection;
        }
    });
    return Users;
});