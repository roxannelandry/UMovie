/**
 * Created by RoxanneLandry on 15-10-26.
 */

define([
    'jquery',
    'bootstrap',
    'underscore',
    'backbone',
    'collections/GenresMovie',
    'collections/GenresTvShow',
    'models/User',
    'views/ErrorPageView',
    'jqueryUI',
    'models/Session',
    'libs/AvailableTags',
    'text!templates/MenuBar.html'

], function ($, _bootstrap, _, Backbone, GenresMovie, GenresTvShow, User, ErrorPageView, jqueryUI, Session, AvailableTags,  MenuBarTemplate) {
    var MenuBarView = Backbone.View.extend({
        template: _.template(MenuBarTemplate),
        el: $(".menuBar"),
        events: {
            'click #userName': 'showUser',
            'click .buttonLogOut': 'logOut',
            'click .buttonAbout': 'showHelp',
            'click #avatarIconSmall': 'chooseAvatar',
            'click #avatarIcon': 'chooseAvatar'
        },
        initialize: function () {
            var currentUserId = Session.get('user_id');
            _.bindAll(this, 'render');
            var that = this;
            this.genresMovie = new GenresMovie();
            this.genresMovie.fetch({
                success: function () {
                    console.log('List genre film fetched');
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
            this.genresTvShow = new GenresTvShow();
            this.genresTvShow.fetch({
                success: function () {
                    console.log('List genre tvShow fetched');
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
            this.UserModel = new User({id: currentUserId});
            this.UserModel.fetch({
                success: function () {
                    console.log('User fetched');
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
            this.UserModel.bind('sync destroy save', function () {
                that.render();
            });
            this.genresTvShow.bind('sync destroy save', function () {
                that.render();
            });
            this.genresMovie.bind('sync destroy save', function () {
                that.render();
            });

        },
        logOut: function () {
            Session.logout();
        },
        showUser: function () {
            window.location.href = "#/user";
        },
        showHelp: function () {
            window.location.href = "#/about";
        },
        render: function () {
            this.$el.html(this.template({
                ListeGenreFilmInfo: this.genresMovie.toJSON(),
                ListeGenreTvShowInfo: this.genresTvShow.toJSON(),
                User: this.UserModel.toJSON()
            }));
            this.$('#inputSearch').autocomplete({
                source: function(request, response) {
                    var results = $.ui.autocomplete.filter(AvailableTags, request.term);
                    response(results.slice(0, 10));
                }
            });
        },
        cleanView: function () {
            this.undelegateEvents();
            return this;
        }
    });
    return MenuBarView;
});