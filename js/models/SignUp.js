/**
 * Created by RoxanneLandry on 15-11-30.
 */
define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    var SignUp = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/signup',

        defaults: {
            name: '',
            email: '',
            password: ''
        }
    });
    return SignUp;
});