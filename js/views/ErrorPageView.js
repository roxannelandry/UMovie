/**
 * Created by Usager on 4/4/2015.
 */

define([
    'jquery',
    'bootstrap',
    'underscore',
    'backbone',
    'text!templates/ErrorPage.html'

], function ($, _bootstrap, _, Backbone, ErrorPageTemplate) {
    var ErrorPageView = Backbone.View.extend({
        template: _.template(ErrorPageTemplate),
        el: $(".content"),
        render: function (code) {
            var message;
            switch (code) {
                case 0:
                    message = "Internal Server Error. <br> Please come back in a few minute.";
                    code = 503;
                    break;
                case 404:
                    message = "File Not Found";
                    break;
                case 400:
                    message = "Bad Request";
                    break;
                case 500:
                case 503:
                    message = "Internal Server Error. Please come back in a few minute.";
                    break;
                default:
                    message = "Something went wrong";
            }
            this.$el.html(this.template({Code: code, Message: message}));
            if (code == 500 || code == 503) {
                $('#buttonBackHome').hide();
            }
            $('.menuBar').hide();
        },
        cleanView: function () {
            this.undelegateEvents();
            return this;
        }
    });
    return ErrorPageView;
});