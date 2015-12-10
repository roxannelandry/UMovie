/**
 * Created by RoxanneLandry on 15-12-01.
 */
define([
    'jquery',
    'bootstrap',
    'backbone',
    'libs/jqueryCookies/jquery-cookie/src/jquery.cookie'

], function ($, _bootstrap, Backbone, JQueryCookies) {
    var Session = Backbone.Model.extend({
        defaults: {
            remember: "true",
            logged_in: "false",
            user_id: '',
            username: '',
            email: '',
            access_token: ''
        },
        initialize: function () {
            var logged_in = $.cookie('logged_in');
            if (typeof(logged_in) != false) {
                this.login();
            }
        },
        login: function () {
            this.set({
                remember: $.cookie('remember'),
                logged_in: $.cookie('logged_in'),
                user_id: $.cookie('user_id'),
                username: $.cookie('username'),
                email: $.cookie('email'),
                access_token: $.cookie('token')
            });

            var that = this;
            setTimeout(function () {
                that.logout();
            }, 90 * 60 * 1000);

            var sync = Backbone.sync;
            Backbone.sync = function (method, model, options) {
                options.beforeSend = function (xhr) {
                    xhr.setRequestHeader('Authorization', that.attributes.access_token);
                };
                sync(method, model, options);
            };
            window.location.href = "#/home";
        },
        logout: function () {
            $.removeCookie('remember');
            $.removeCookie('logged_in');
            $.removeCookie('user_id');
            $.removeCookie('username');
            $.removeCookie('email');
            $.removeCookie('token');


            this.attributes.logged_in = undefined;
            this.attributes.user_id = undefined;
            this.attributes.username = undefined;
            this.attributes.email = undefined;
            this.attributes.token = undefined;

            var sync = Backbone.sync;
            Backbone.sync = function (method, model, options) {
                options.beforeSend = function (xhr) {
                    xhr.setRequestHeader('Authorization', undefined);
                };
                sync(method, model, options);
            };

            window.location.href = "#/";
        }
    });
    return new Session;
});