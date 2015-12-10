/**
 * Created by RoxanneLandry on 15-10-27.
 */

define([
    'jquery',
    'bootstrap',
    'slick',
    'underscore',
    'backbone',
    'views/ErrorPageView',
    'models/MoviesByGender',
    'collections/GenresMovie',
    'text!templates/MoviesTvShowByGender.html'

], function ($, _bootstrap, slick, _, Backbone, ErrorPageView, MoviesByGender, GenresMovie, MovieByGenderTemplate) {
    var TvShowByGenderView = Backbone.View.extend({
        template: _.template(MovieByGenderTemplate),
        el: $(".content"),
        events: {
            "click .imgTvShowByGender": "showTvShowPage"
        },
        initialize: function (options) {
            _.bindAll(this, 'render');
            var that = this;
            this.genresMovies = new GenresMovie();
            this.genresMovies.fetch({
                success: function (data) {
                    console.log('List genre movies fetched');
                    _.each(data.models, function (gender) {
                        if (gender.id == options) {
                            that.gender = gender;
                        }
                    });
                    that.fetchTvShow(that, that.gender);
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
            this.genresMovies.bind('sync destroy save', function () {
                that.render();
            });
        },
        fetchTvShow: function (that, gender) {
            var thathat = that;
            var alreadyShow = false;
            that.MoviesByGender = [];
            var alphabeth = ["sa", "ba", "ca", "da", "as", "fa", "ga", "ha", "ka", "la", "ma", "na", "pa", "ra", "se", "be", "ce", "de", "es", "fe", "ge", "he", "im", "je", "ke", "le", "me", "ne", "pe", "qe", "re", "te", "ve", "ye"];
            $.each(alphabeth, function (index, letter) {
                that.moviesByGender = new MoviesByGender(letter);
                that.moviesByGender.fetch({
                    success: function (data) {
                        console.log('moviesByGender fetched');
                        _.each(data.attributes, function (movie) {
                            if (movie.kind === "feature-movie" && movie.primaryGenreName === gender.attributes.name) {
                                if (thathat.MoviesByGender[0] !== undefined) {
                                    _.each(thathat.MoviesByGender, function (movieInCollection) {
                                        if (movieInCollection.id == movie.trackId) {
                                            alreadyShow = true;
                                        }
                                    });
                                    if (alreadyShow == false) {
                                        thathat.MoviesByGender.push({
                                            artworkUrl100: movie.artworkUrl100,
                                            id: movie.trackId
                                        });
                                        thathat.render();
                                    }
                                    alreadyShow = false;
                                } else {
                                    thathat.MoviesByGender.push({
                                        artworkUrl100: movie.artworkUrl100,
                                        id: movie.trackId
                                    });
                                    thathat.render();
                                }
                            }
                        });
                    },
                    error: function (model, response) {
                        if (response.status === 401) {
                            window.location.href = "#/";
                        } else {
                            var errorPage = new ErrorPageView();
                            errorPage.render(response.status);
                        }
                    }
                });
                that.moviesByGender.bind('sync destroy save', function () {
                    that.render(thathat.MoviesByGender);
                });
            });
        },
        showTvShowPage: function () {
            window.location.href = "#/movies/" + $(event.target).data('id');
        },
        render: function (MoviesByGender) {
            this.$el.html(this.template({TvShowByGender: MoviesByGender, Gender: this.gender.attributes}));
            this.$el.find(".carouselMultiple").slick({
                infinite: true,
                adaptiveWidth: true,
                slidesToShow: 9,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 1194,
                        settings: {
                            slidesToShow: 8,
                            slidesToScroll: 1

                        }
                    },
                    {
                        breakpoint: 1029,
                        settings: {
                            slidesToShow: 7,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 999,
                        settings: {
                            slidesToShow: 6,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 969,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 500,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 400,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 320,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        },
        cleanView: function () {
            this.undelegateEvents();
            return this;
        }
    });
    return TvShowByGenderView;
});
