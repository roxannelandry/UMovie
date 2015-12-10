/**
 * Created by RoxanneLandry on 15-12-02.
 */
define([
    'jquery',
    'bootstrap',
    'underscore',
    'backbone',
    'models/EpisodeTvShow',
    'text!templates/ModalTvShow.html'

], function ($, _bootstrap, _, Backbone, EpisodesTvShow, ModalTvShowTemplate) {
    var ModalTvShowView = Backbone.View.extend({
        template: _.template(ModalTvShowTemplate),
        className: "modal fade",
        attributes: {
            tabindex: "-1",
            role: "dialog"
        },
        events: {
            "click #closePopUp": "closePopUp"
        },
        initialize: function (option) {
            this.episode = option;
        },
        show: function () {
            $(document.body).append(this.render().el);
        },
        closePopUp: function () {
            var url = $('#ytplayer').attr('src');
            $('#ytplayerModal').attr('src', '').attr('src', 'url');
            this.remove();
        },
        render: function () {
            this.$el.html(this.template(this.episode)).modal({
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
    return ModalTvShowView;
});