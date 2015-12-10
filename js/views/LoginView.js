/**
 * Created by RoxanneLandry on 15-10-27.
 */

define([
    'jquery',
    'bootstrap',
    'underscore',
    'backbone',
    'models/Login',
    'libs/jqueryCookies/jquery-cookie/src/jquery.cookie',
    'models/Session',
    'views/ErrorPageView',
    'text!templates/Login.html'

], function ($, _bootstrap, _, Backbone, Login, JQueryCookies, Session, ErrorPageView, LoginTemplate) {
    var LoginView = Backbone.View.extend({
        template:  _.template(LoginTemplate),
        el: $(".content"),
        events: {
            "click #loginButton": "sendRequestLogin",
            "click #signUp": "signUp"
        },
        initialize: function () {
        },
        sendRequestLogin: function (ev) {
            ev.preventDefault();

            var date = new Date();
            date.setTime(date.getTime() + (90 * 60 * 1000));

            var email = $('#emailInput').val();
            var password = $('#passwordInput').val();
            var rememberMeCheck = $('#rememberMeCheckbox').prop('checked');
            if(loginInformationValid(email) && loginInformationValid(password)) {
                var userInfo = {"email": email, "password": password};

                var login = new Login();
                login.save(userInfo, {
                    success: function (user) {
                        $.cookie('remember', rememberMeCheck, {expires: date});
                        $.cookie('logged_in', true, {expires: date});
                        $.cookie('user_id', user.id, {expires: date});
                        $.cookie('username', user.get("name"), {expires: date});
                        $.cookie('email', user.get("email"), {expires: date});
                        $.cookie('token', user.get("token"), {expires: date});
                        Session.login();
                    },
                    error: function (model, response) {
                        if (response.status == 400 || response.status == 401) {
                            $('#errorLogin').html(" Invalid username/password combination. Please try again").fadeIn('fast').delay(5000).fadeOut('slow');
                        }
                        else {
                            var errorPage = new ErrorPageView();
                            errorPage.render(response.status);
                        }
                    }
                });
            }
        },
        signUp: function () {
            window.location.href = "#/signup";
        },
        render: function () {
            this.$el.html(this.template);
        },
        cleanView: function () {
            this.undelegateEvents();
            return this;
        }
    });
    return LoginView;
});
