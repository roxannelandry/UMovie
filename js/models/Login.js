/**
 * Created by RoxanneLandry on 15-11-30.
 */
define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    var Login = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/login'
    });
    return Login;
});