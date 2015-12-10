/**
 * Created by RoxanneLandry on 15-10-27.
 */

define([
    'jquery',
    'bootstrap',
    'slick',
    'underscore',
    'backbone',
    'text!templates/MainPage.html'

], function ($, _bootstrap, slick, _, Backbone, MainPageTemplate) {
    var MainPageView = Backbone.View.extend({
        el: $(".content"),
        initialize: function () {
            var compiledTemplate = _.template(MainPageTemplate);
            this.$el.html(compiledTemplate);
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
    return MainPageView;
});