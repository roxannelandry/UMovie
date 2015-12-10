/**
 * Created by RoxanneLandry on 15-10-30.
 */
define([
    'jquery',
    'bootstrap',
    'underscore',
    'backbone',
    'models/Watchlist',
    'views/ErrorPageView',
    'models/Session',
    'text!templates/WatchlistUser.html',
    'text!templates/Watchlist.html'

], function ($, _bootstrap, _, Backbone, Watchlist, ErrorPage, Session, WatchlistUserTemplate, WatchlistTemplate) {
    var WatchlistView = Backbone.View.extend({
        el: $(".content"),
        events: {
            "click .buttonSaveWatchlist": "saveWatchlist",
            "click .deleteButtonMovies": "deleteMovie",
            "click #buttonBackHome": "showHome"
        },
        initialize: function (options) {
            _.bindAll(this, 'render');
            var that = this;
            this.templateUser = _.template(WatchlistUserTemplate);
            this.template = _.template(WatchlistTemplate);
            if (options.id) {
                this.watchlist = new Watchlist({id: options.id});
                this.watchlist.fetch({
                    success: function () {
                        console.log('Watchlist fetched');

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
            } else {
                this.watchlist = null;
            }
            this.watchlist.bind('sync destroy remove save', function () {
                that.render();
            });
        },
        saveWatchlist: function () {
            var watchlistId = $('#watchlistId').val();

            var name = $('#titleWatchlist').val();

            if (inputIsValidWatchlist(name)) {
                this.watchlist.save({
                    id: watchlistId,
                    name: name,
                    movies: this.watchlist.attributes.moviesWatchList
                }, {
                    success: function () {
                        console.log('Watchlist fetched');
                        window.location.href = "#/watchlists";
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
            }
        },
        deleteMovie: function (e) {
            e.preventDefault();
            var that = this;
            var id = $(e.currentTarget).data("id");
            var modelToDelete = this.watchlist.attributes.moviesWatchList.get(id);
            modelToDelete.url = 'https://umovie.herokuapp.com/watchlists/' + this.watchlist.id + "/movies/" + id;
            modelToDelete.destroy({
                success: function () {
                    that.render();
                    console.log("destroyed");
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
            this.watchlist.attributes.moviesWatchList.bind('sync destroy remove save', function () {
                that.render();
            });
        },
        showHome: function () {
            window.location.href = "#/home";
        },
        render: function () {
            if(this.watchlist.attributes.owner.id == Session.attributes.user_id) {
                if (this.watchlist.attributes.moviesWatchList == undefined) {
                    this.$el.html(this.templateUser({Watchlist: this.watchlist.toJSON(), movies: null}))
                }
                else {
                    this.$el.html(this.templateUser({
                        Watchlist: this.watchlist.toJSON(),
                        Movies: this.watchlist.attributes.moviesWatchList.toJSON()
                    }));
                }

            }else{
                if (this.watchlist.attributes.moviesWatchList == undefined) {
                    this.$el.html(this.template({Watchlist: this.watchlist.toJSON(), movies: null}))
                }
                else {
                    this.$el.html(this.template({
                        Watchlist: this.watchlist.toJSON(),
                        Movies: this.watchlist.attributes.moviesWatchList.toJSON()
                    }));
                }
            }
        },
        cleanView: function () {
            this.undelegateEvents();
            return this;
        }
    });
    return WatchlistView;
});