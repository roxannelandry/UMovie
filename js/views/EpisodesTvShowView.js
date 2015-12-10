/**
 * Created by Eliane on 2015-11-02.
 */

define([
    'jquery',
    'bootstrap',
    'bootstrap_modal',
    'presentation/Presentation',
    'underscore',
    'backbone',
    'collections/EpisodesTvShow',
    'views/ErrorPageView',
    'views/ModalTvShowView',
    'text!templates/EpisodesTvShow.html'

], function ($, _bootstrap, bootstrap_modal, presentation, _, Backbone, EpisodesTvShow, ErrorPage, ModalTvShowView, EpisodesTvShowTemplate) {
    var EpisodesTvShowView = Backbone.View.extend({
        template: _.template(EpisodesTvShowTemplate),
        el: $(".listeFilm"),
        events: {
            "click .linkUnderline": "showModal"
        },
        initialize: function (options) {
            _.bindAll(this, 'render');
            var that = this;
            this.episodesTvShow = new EpisodesTvShow({ids: options.id});
            this.episodesTvShow.fetch({
                success: function () {
                    console.log('List episode fetched');
                },
                error: function (model, response) {
                    if (response.status === 401) {
                        window.location.href = "#/";
                    }
                    else {
                        var errorPage = new ErrorPage();
                        errorPage.render(response.status);
                    }
                }
            });
            this.episodesTvShow.bind('sync destroy save', function () {
                that.render();
            });
        },
        showModal: function (event) {
            var index = $(event.target).data('id');
            new ModalTvShowView({EpisodeTvShow: this.episodesTvShow.models[index - 1].attributes}).show();
        },
        render: function () {
            this.$el.html(this.template({ListeEpisodesInfo: this.episodesTvShow.toJSON()}));
        },
        cleanView: function () {
            this.undelegateEvents();
            return this;
        }
    });
    return EpisodesTvShowView;
});
