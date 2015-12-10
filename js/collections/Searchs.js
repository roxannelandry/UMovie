/**
 * Created by Maxime on 2015-11-28.
 */
/**
 * Created by Maxime on 2015-11-01.
 */

define([
    'underscore',
    'backbone',
    'models/Search'

], function (_, Backbone, Search) {
    var Searchs = Backbone.Collection.extend({
        url: 'https://umovie.herokuapp.com/search/',
        parse: function (response) {
            return response.results;
        }

    });
    return Searchs;
});