/**
 * Created by RoxanneLandry on 15-10-30.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/MoviesWatchlist',
    'views/ErrorPageView'

], function ($, _, Backbone, MoviesWatchlist, ErrorPageView) {
    var Watchlist = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/watchlists',
        parse: function (response) {
            var moviesWatchlist = new MoviesWatchlist();
            moviesWatchlist.add(response.movies);
            response.moviesWatchList = moviesWatchlist;
            var model = {};
            model.id = response.id;
            model.moviesWatchList = response.moviesWatchList;
            model.name = response.name;
            model.owner = response.owner;
            return model;
        },
        addMovie: function (movie) {
            var token = $.cookie('token');
            $.ajax({
                type: "POST",
                url: this.url() + "/movies",
                data: movie,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', token);
                }
            }).done(function () {
                $('#succesMovieInWatchlist').html(" The movie as been added to the watchlist.").fadeIn('fast').delay(3000).fadeOut('slow');
                console.log("Movie added to watchlist");

            }).fail(function (model, response) {
                if (response.status === 401) {
                    window.location.href = "#/";
                }
                else {
                    var errorPage = new ErrorPageView();
                    errorPage.render(response.status);
                }
            });
        }
    });
    return Watchlist;
});
