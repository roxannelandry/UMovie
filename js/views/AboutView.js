/**
 * Created by RoxanneLandry on 15-10-27.
 */

define([
    'jquery',
    'bootstrap',
    'underscore',
    'backbone',
    'text!templates/About.html'

], function ($, _bootstrap, _, Backbone, AboutTemplate) {
    var AboutView = Backbone.View.extend({
        template: _.template(AboutTemplate),
        el: $(".content"),
        events: {
            "click #buttonBackHome": "showHome"
        },
        initialize: function () {
        },
        showHome: function () {
            window.location.href = "#/home";
        },
        render: function () {
            this.$el.html(this.template);
        },
        cleanView: function () {
            this.undelegateEvents();
            return this;
        }
    });
    return AboutView;
});