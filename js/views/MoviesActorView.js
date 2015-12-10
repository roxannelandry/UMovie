/**
 * Created by Maxime on 2015-10-30.
 */

define([
    'jquery',
    'bootstrap',
    'presentation/Presentation',
    'underscore',
    'backbone',
    'collections/MoviesActor',
    'views/ErrorPageView',
    'text!templates/MoviesActor.html'

], function ($, _bootstrap, presentation, _, Backbone, MoviesActor, ErrorPage, MoviesActorTemplate) {
    var MoviesActorView = Backbone.View.extend({
        template: _.template(MoviesActorTemplate),
        el: $(".listeFilm"),
        events: {
            "click .linkUnderline": "seeMovie"
        },
        initialize: function (options) {
            _.bindAll(this, 'render');
            var that = this;
            this.moviesActor = new MoviesActor({ids: options.id});
            this.moviesActor.fetch({
                success: function () {
                    console.log('List actor film fetched');
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
            this.moviesActor.bind('sync destroy save', function () {
                that.render();
            });
        },
        seeMovie: function (event) {
            var movieId = $(event.target).data('id');
            Backbone.history.navigate("#/movies/" + movieId, {trigger: true, replace: true})
        },
        render: function () {
            this.$el.html(this.template({ListeFilmActorInfo: this.moviesActor.toJSON()}));
        },
        cleanView: function () {
            this.undelegateEvents();
            return this;
        }
    });
    return MoviesActorView;
});