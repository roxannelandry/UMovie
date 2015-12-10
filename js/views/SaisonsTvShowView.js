/**
 * Created by Eliane on 2015-11-02.
 */

define([
    'jquery',
    'bootstrap',
    'presentation/Presentation',
    'underscore',
    'backbone',
    'models/SaisonTvShow',
    'views/ErrorPageView',
    'text!templates/SaisonsTvShow.html'

], function ($, _bootstrap, presentation, _, Backbone, SaisonTvShow, ErrorPageView, SaisonTvShowTemplate) {
    var SaisonsTvShowView = Backbone.View.extend({
        template: _.template(SaisonTvShowTemplate),
        el: $(".content"),
        initialize: function (options) {
            _.bindAll(this, 'render');
            var that = this;
            this.saisonTvShow = new SaisonTvShow({id: options.id});
            this.saisonTvShow.fetch({
                success: function () {
                    console.log('List season fetched');
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
            this.saisonTvShow.bind('sync destroy save', function () {
                that.render();
            });
        },
        render: function () {
            this.$el.html(this.template({SaisonInfo: this.saisonTvShow.toJSON()}));
        },
        cleanView: function () {
            this.undelegateEvents();
            return this;
        }
    });
    return SaisonsTvShowView;
});