/**
 * Created by Maxime on 2015-10-30.
 */

define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    var Avatar = Backbone.Model.extend({
        parse: function (response) {
            var model = [];
            return model;
        }
    });
    return Avatar;
});