/**
 * Created by RoxanneLandry on 15-12-02.
 */
define([
    'jquery',
    'bootstrap',
    'underscore',
    'backbone',
    'models/Avatar',
    'text!templates/ModalAvatar.html'

], function ($, _bootstrap, _, Backbone, Avatar, ModalAvatarTemplate) {
    var ModalAvatarView = Backbone.View.extend({
        template: _.template(ModalAvatarTemplate),
        className: "modal fade",
        attributes: {
            tabindex: "-1",
            role: "dialog"
        },
        events: {
            "click #closePopUp": "closePopUp"
        },
        initialize: function () {
            var appendApiKeyHeader = function (xhr) {
                xhr.setRequestHeader('Api-Key', 'fxs76mk9at7skhssmtz948gu');
            };
            var searchRequest = {"phrase": 'single icons'};
            $.ajax({
                    type: "GET",
                    beforeSend: appendApiKeyHeader,
                    url: "https://connect.gettyimages.com/v3/search/images",
                    data: searchRequest
                })
                .success(function (data) {
                    this.avatar = new Avatar(data.images);
                })
                .fail(function (data, err) {
                    /* handle errors */
                });
        },
        // WHAT THAT? IF NOT USEFUL REMOVE IT PLEASE!<-----------------------------------
        show: function () {
            $(document.body).append(this.render().el);
        },
        closePopUp: function () {
            this.remove();
        },
        render: function () {
            this.$el.html(this.template()).modal({
                backdrop: 'static',
                keyboard: false
            });
            return this
        },
        cleanView: function () {
            this.undelegateEvents();
            return this;
        }
    });
    return ModalAvatarView;
});