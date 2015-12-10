/**
 * Created by RoxanneLandry on 15-10-30.
 */
define([
    'underscore',
    'backbone',
    'models/Watchlist'

], function (_, Backbone, Watchlist) {
    var Watchlists = Backbone.Collection.extend({
        url: 'https://umovie.herokuapp.com/watchlists',
        model: Watchlist,
        initialize: function (id) {
            this.userId = id.id;
        },
        parse: function (response) {
            var collection = [];
            var that = this;
            _(response).each(function (watchlist) {
                if (watchlist.owner != null) {
                    if (watchlist.owner.id == that.userId) {
                        collection.push({
                            id: watchlist.id,
                            name: watchlist.name,
                            movies: watchlist.movies,
                            owner: watchlist.owner
                        });
                    }
                }
            });
            return collection;
        }
    });
    return Watchlists;
});
