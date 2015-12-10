/**
 * Created by RoxanneLandry on 15-11-01.
 */

define([
    'jquery',
    'bootstrap',
    'presentation/Presentation',
    'underscore',
    'backbone',
    'models/Movie',
    'collections/Watchlists',
    'views/ErrorPageView',
    'models/Session',
    'text!templates/Movie.html'

], function ($, _bootstrap, presentation, _, Backbone, Movie, Watchlists, ErrorPageView, Session, MovieTemplate) {
    var MovieView = Backbone.View.extend({
        template: _.template(MovieTemplate),
        events: {
            "click .watchlistDropdownMenu": "addToWatchlist"
        },
        el: $(".content"),
        initialize: function (options) {
            var currentUserId = Session.get('user_id');
            _.bindAll(this, 'render');
            var that = this;
            this.watchlists = new Watchlists({id: currentUserId});
            this.watchlists.fetch({
                success: function () {
                    console.log('Watchlists fetched');
                },
                error: function (model, response) {
                    if (response.status === 401) {
                        window.location.href = "#/";
                    }
                    else {
                        var errorPage = new ErrorPageView();
                        errorPage.render(response.status);
                    }
                }
            });
            this.movie = new Movie({id: options.id});
            this.movie.fetch({
                success: function () {
                    console.log('Movie fetched');
                },
                error: function (model, response) {
                    if (response.status === 401) {
                        window.location.href = "#/";
                    }
                    else {
                        var errorPage = new ErrorPageView();
                        errorPage.render(response.status);
                    }
                }
            });
            this.movie.bind('sync destroy save', function () {
                that.render();
            });
            this.watchlists.bind('sync destroy save', function () {
                that.render();
            });
        },
        addToWatchlist: function (e) {
            e.preventDefault();
            var that = this;
            var isDuplicate = false;
            var id = $(e.currentTarget).data("id");
            var watchlistToAdd = this.watchlists.get(id);
            var movieToAdd = this.movie.attributes;
            watchlistToAdd.attributes.moviesWatchList.models.forEach(function(movie){
                if (movie !== undefined) {
                    if (movie.trackId == that.movie.attributes.trackId || movie.attributes.trackId == that.movie.attributes.trackId) {
                        isDuplicate = true;
                        $('#errorMovieInWatchlist').html(" This movie is already in that watchlist.").fadeIn('fast').delay(3000).fadeOut('slow');
                    }
                }
            });
            watchlistToAdd.attributes.moviesWatchList.models.push(movieToAdd);
            if (isDuplicate == false) {
                watchlistToAdd.addMovie(movieToAdd);
            }
        },
        render: function () {
            if (this.movie !== null && this.watchlists !== null) {
                this.$el.html(this.template({
                    MovieInfo: this.movie.toJSON(),
                    Watchlists: this.watchlists.toJSON()
                }));
            }
        },
        cleanView: function () {
            this.undelegateEvents();
            return this;
        }
    });


    return MovieView;
});
