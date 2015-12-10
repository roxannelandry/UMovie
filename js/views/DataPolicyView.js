/**
 * Created by RoxanneLandry on 15-10-27.
 */

define([
    'jquery',
    'bootstrap',
    'underscore',
    'backbone',
    'text!templates/DataPolicy.html'

], function ($, _bootstrap, _, Backbone, DataPolicyTemplate) {
    var DataPolicyView = Backbone.View.extend({
        template: _.template(DataPolicyTemplate),
        el: $(".content"),
        events: {
            "click #buttonBackSignUp": "goBackSignUp"
        },
        initialize: function () {
        },
        goBackSignUp: function () {
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
    return DataPolicyView;
});