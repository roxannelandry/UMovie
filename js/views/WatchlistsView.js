/**
 * Created by RoxanneLandry on 15-10-30.
 */
define([
    'jquery',
    'bootstrap',
    'underscore',
    'backbone',
    'collections/Watchlists',
    'jqueryUI',
    'views/ErrorPageView',
    'models/Session',
    'text!templates/Watchlists.html'

], function ($, _bootstrap, _, Backbone, Watchlist, jqueryUI, ErrorPage, Session, WatchlistsTemplate) {
    var WatchlistsView = Backbone.View.extend({
        template: _.template(WatchlistsTemplate),
        el: $(".content"),

        events: {
            "click .deleteButtonWatchlist": "deleteWatchlist",
            "click .buttonNewWatchlist": "addWatchlist"
        },
        initialize: function () {
            var currentUserId = Session.get('user_id');
            _.bindAll(this, 'render');
            var that = this;
            this.watchLists = new Watchlist({id: currentUserId});
            this.watchLists.fetch({
                success: function () {
                    console.log('Watchlists fetched');
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
            this.watchLists.bind('sync destroy save create', function () {
                that.render();
            });
        },
        deleteWatchlist: function (event) {
            var watchListId = $(event.target).data('id');
            var watchlistModel = this.watchLists.get(watchListId);
            watchlistModel.destroy();
            this.watchLists.remove();

        },
        addWatchlist: function () {
            var nameInput = $(".buttonInputWatchList").val();
            if (inputIsValidWatchlist(nameInput)) {
                debugger;
                if(this.watchLists.models[0] !== undefined){
                    _.each(this.watchLists.models, function (watchlist){
                        if(watchlist.attributes.name == nameInput){
                            debugger;
                            $('#errorDivEmptyWatchlist').html(" This watchlist name already exist.").fadeIn('fast').delay(3000).fadeOut('slow');
                        }else{
                            debugger;
                            this.watchLists.create({
                                name: nameInput
                            });
                        }
                    });
                }else{
                    this.watchLists.create({
                        name: nameInput
                    });
                }
            }
        },
        render: function () {
            this.$el.html(this.template({Watchlists: this.watchLists.toJSON()}));
        },
        cleanView: function () {
            this.undelegateEvents();
            return this;
        }
    });
    return WatchlistsView;
});