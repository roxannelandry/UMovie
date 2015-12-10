/**
 * Created by RoxanneLandry on 15-11-01.
 */
/**
 * Created by Maxime on 2015-10-30.
 */
/**
 * Created by Maxime on 2015-10-30.
 */
define([
    'jquery',
    'bootstrap',
    'presentation/Presentation',
    'underscore',
    'backbone',
    'models/Actor',
    'views/ErrorPageView',
    'text!templates/Actor.html'

], function ($, _bootstrap, presentation, _, Backbone, Actor, ErrorPage, ActorTemplate) {
    var ActorView = Backbone.View.extend({
        template: _.template(ActorTemplate),
        el: $(".content"),
        initialize: function (options) {
            _.bindAll(this, 'render');
            var that = this;
            this.actor = new Actor({id: options.id});

            this.actor.fetch({
                success: function (data) {
                    var appendApiKeyHeader = function (xhr) {
                        xhr.setRequestHeader('Api-Key', 'fxs76mk9at7skhssmtz948gu');
                    };

                    var nom = data.attributes.artistName;
                    var searchRequest = {"phrase": nom};
                    $.ajax({
                            type: "GET",
                            beforeSend: appendApiKeyHeader,
                            url: "https://connect.gettyimages.com/v3/search/images",
                            data: searchRequest
                        })
                        .success(function (data) {
                            that.actor.attributes.imageUrl = data.images[0].display_sizes[0].uri;
                            that.render();
                        })
                        .fail(function (data, err) { /* handle errors */
                        });

                    console.log('Actor fetched');
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
            this.actor.bind('sync destroy save', function () {
                that.render();
            });
        },
        render: function () {
            this.$el.html(this.template({ActorInfo: this.actor.toJSON()}));
        },
        cleanView: function () {
            this.undelegateEvents();
            return this;
        }
    });


    return ActorView;
});