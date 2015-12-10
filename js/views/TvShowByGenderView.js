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
    'models/TvShowByGender',
    'collections/GenresTvShow',
    'text!templates/MoviesTvShowByGender.html'

], function ($, _bootstrap, slick, _, Backbone, ErrorPageView, TvShowByGender, GenresTvShow, MovieByGenderTemplate) {
    var TvShowByGenderView = Backbone.View.extend({
        template: _.template(MovieByGenderTemplate),
        el: $(".content"),
        events: {
            "click .imgTvShowByGender": "showTvShowPage"
        },
        initialize: function (options) {
            _.bindAll(this, 'render');
            var that = this;
            this.genresTvShow = new GenresTvShow();
            this.genresTvShow.fetch({
                success: function (data) {
                    console.log('List genre tv show fetched');
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
            this.genresTvShow.bind('sync destroy save', function () {
                that.render();
            });
        },
        fetchTvShow: function (that, gender) {
            var thathat = that;
            that.TvShowByGender = [];
            var alphabeth = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
            $.each(alphabeth, function (index, letter) {
                that.tvShowByGender = new TvShowByGender(letter);
                that.tvShowByGender.fetch({
                    success: function (data) {
                        console.log('tvShowByGender fetched');
                        _.each(data.attributes, function (tvShow) {
                            if (tvShow.collectionType === "TV Season" && tvShow.primaryGenreName === gender.attributes.name) {
                                thathat.TvShowByGender.push({
                                    artworkUrl100: tvShow.artworkUrl100,
                                    id: tvShow.collectionId
                                });
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
                that.tvShowByGender.bind('sync destroy save', function () {
                    that.render(thathat.TvShowByGender);
                });
            });
        },
        showTvShowPage: function () {
            window.location.href = "#/tvshow/" + $(event.target).data('id');
        },
        render: function (TvShowByGender) {
            this.$el.html(this.template({TvShowByGender: TvShowByGender, Gender: this.gender.attributes}));
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
