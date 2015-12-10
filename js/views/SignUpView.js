/**
 * Created by RoxanneLandry on 15-10-27.
 */

define([
    'jquery',
    'bootstrap',
    'underscore',
    'backbone',
    'models/SignUp',
    'views/ErrorPageView',
    'text!templates/SignUp.html'

], function ($, _bootstrap, _, Backbone, SignUp, ErrorPageView,  SignUpTemplate) {
    var SignUpView = Backbone.View.extend({
        template: _.template(SignUpTemplate) ,
        el: $(".content"),
        events: {
            "click .signUp": "signUp",
            "click #cancelButton": "cancel",
            "click .cookiesUse": "showCookiesPolicy"
        },
        initialize: function () {
        },
        signUp: function (ev) {
            ev.preventDefault();
            var name = $('#nameInput').val();
            var email = $('#emailInput').val();
            var password = $('#passwordInput').val();
            if(signUpInformationValid(name) && signUpInformationValid(email) && signUpInformationValid(password)){
                var userInfo = {"name": name, "email": email, "password": password};
                var signUp = new SignUp();
                signUp.save(userInfo, {
                    success: function () {
                        window.location.href = "#/";
                    },
                    error: function (model, response) {
                        if (response.status == 500) {
                            $('#errorSignUp').html(" This account already exist.").fadeIn('fast').delay(5000).fadeOut('slow');
                        }else{
                            var errorPage = new ErrorPageView();
                            errorPage.render(response.status);
                        }
                    }
                });
            }
        },
        cancel: function () {
            window.location.href = "#/";
        },
        showCookiesPolicy: function () {
            window.location.href = "#/datapolicy";
        },
        render: function () {
            this.$el.html(this.template);
        },
        cleanView: function () {
            this.undelegateEvents();
            return this;
        }
    });
    return SignUpView;
});