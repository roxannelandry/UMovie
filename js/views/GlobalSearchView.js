/**
 * Created by Maxime on 2015-11-28.
 */
/**
 * Created by RoxanneLandry on 15-11-01.
 */

define([
    'jquery',
    'bootstrap',
    'presentation/Presentation',
    'underscore',
    'backbone',
    'models/Search',
    'collections/Watchlists',
    'collections/GenresMovie',
    'collections/GenresTvShow',
    'views/ErrorPageView',
    'models/Session',
    'models/User',
    'libs/AvailableTags',
    'text!templates/GlobalSearch.html'

], function ($, _bootstrap, presentation, _, Backbone, Search, Watchlists, GenresMovie, GenresTvShow, ErrorPageView, Session, User, AvailableTags, GlobalSearchTemplate) {
    var GlobalSearchView = Backbone.View.extend({
        template: _.template(GlobalSearchTemplate),
        el: $(".content"),
        events: {
            "click .followButton": "followUser",
            "click #searchButton": "searchButtonClicked",
            "click .blackBackgound li": "addToWatchlist",
            "click #advancedSearch": "showAdvanced",
            'click .filterButton': 'filterResult'
        },
        initialize: function (options) {
            var currentUserId = $.cookie('user_id');
            _.bindAll(this, 'render');
            var that = this;

            var user = "/users";
            this.searchUser = new Search(options, user);
            this.searchUser.fetch({
                success: function () {
                    that.render();
                    console.log('recherche fetched');
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
            var emptyString = "all";
            this.searchAll = new Search(options, emptyString);
            this.searchAll.fetch({
                success: function () {
                    that.render();
                    console.log('recherche fetched');
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
            this.watchlists = new Watchlists({id: currentUserId});
            this.watchlists.fetch({
                success: function () {
                    console.log('Watchlists fetched');
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
            var currentUser = Session.get('user_id');
            this.me = new User({id: currentUser});
            this.me.fetch({
                success: function () {
                    console.log('user for follow fetched');
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
            this.searchUser.bind('sync destroy save', function () {
                that.render();
            });
            this.searchAll.bind('sync destroy save', function () {
                that.render();
            });
            this.watchlists.bind('sync destroy save', function () {
                that.render();
            });
            this.me.bind('sync destroy save', function () {
                that.render();
            });
            this.genresTvShow.bind('sync destroy save', function () {
                that.render();
            });
            this.genresMovie.bind('sync destroy save', function () {
                that.render();
            });
        },
        followUser: function (e) {
            var that = this;
            var followExist = false;
            var userId = $(e.currentTarget).data("id");
            var id = {id: userId};
            this.user = new User(id);
            this.user.fetch({
                success: function () {
                    console.log('User fetched');
                    if(that.me.attributes.followingUser !== undefined) {
                        _.each(that.me.attributes.followingUser.models, function (followUser) {
                            if (followUser.attributes.email == that.user.attributes.email) {
                                followExist = true;
                            }
                        });
                    }
                    if(followExist == false){
                        that.me.attributes.followingUser.models.push(that.user);
                        that.me.addFollow(id);
                    }else{
                        $('#errorUserFollow').html(" You're already following this user.").fadeIn('fast').delay(3000).fadeOut('slow');
                    }
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
        },
        searchButtonClicked: function () {
            var choosedSearchOption = $(".dropdownSearch").val();
            var whatToSearh = $("#nameSearch").val();
            var stripped = choosedSearchOption.replace("-", "");
            var strippedToLower = stripped.toLowerCase();
            var dropDownChoice;
            if (strippedToLower === "tvshows seasons") {
                dropDownChoice = "/tvshows/seasons";
            } else if (strippedToLower === "tvshows episodes") {
                dropDownChoice = "/tvshows/episodes";
            } else {
                dropDownChoice = "/" + strippedToLower;
            }
            var toSearchNoSpace = whatToSearh.replace(" ", "%20");
            if (inputIsValidSearch(whatToSearh)) {
                window.location.href = "#/search" + dropDownChoice + "?q=" + toSearchNoSpace + '&limit=15';
            }
        },
        addToWatchlist: function (e) {

            e.preventDefault();
            var that = this;
            var isDuplicate = false;
            var id = $(e.currentTarget).data("id");
            var watchlistToAdd = this.watchlists.get(id);
            var movieToAdd = this.movie.attributes;
            watchlistToAdd.attributes.moviesWatchList.models.forEach(function(movie){
                if (movie !== undefined) {
                    if (movie.trackId == that.movie.attributes.trackId || movie.attributes.trackId == that.movie.attributes.trackId) {
                        isDuplicate = true;
                        $('#errorMovieInWatchlist').html(" This movie is already in that watchlist.").fadeIn('fast').delay(3000).fadeOut('slow');
                    }
                }
            });
            watchlistToAdd.attributes.moviesWatchList.models.push(movieToAdd);
            if (isDuplicate == false) {
                watchlistToAdd.addMovie(movieToAdd);
            }

            e.preventDefault();
            var that = this;
            var isDuplicate = false;
            var id = $(e.currentTarget).data("id");
            var watchlistToAdd = this.watchlists.get(id);
            var movieId = $(e.currentTarget.parentElement.parentElement.parentElement.parentElement).data("id");
            var movieToAdd = findMovie(this.searchAll.attributes, movieId);
            watchlistToAdd.attributes.moviesWatchList.models.forEach(function(movie){
                if (movie !== undefined) {
                    debugger;
                    if (movie.trackId == that.movie.attributes.trackId || movie.attributes.trackId == that.movie.attributes.trackId) {
                        isDuplicate = true;
                        $('#errorMovieInWatchlist').html(" This movie is already in that watchlist.").fadeIn('fast').delay(3000).fadeOut('slow');
                    }
                }
            });
            if (isDuplicate == false) {
                watchlistToAdd.attributes.moviesWatchList.models.push(movieToAdd);
                watchlistToAdd.addMovie(movieToAdd);
            }
        },
        showAdvanced: function () {
            var isShow = false;
            if($('#boxGender').is(":hidden")) {
                isShow = true;
            }
            else if($('#boxGender').is(":visible")){
                isShow = false;
            }
            if($(".dropdownSearch").val() == "Movies"){
                this.gender = this.genresMovie;
                this.render(isShow);
            }
            else if($(".dropdownSearch").val() == "Tv-Shows"){
                this.gender = this.genresTvShow
                this.render(isShow);
            }
        },

        filterResult : function(){
            checkedGenre = [];
            $('.genreCheckbox:checked').each(function(){
                checkedGenre.push($(this).val());
            });
            if($(".dropdownSearch").val() == "Movies"){
                filterListe(this.searchAll.attributes,checkedGenre);
                this.render();

            }else if($(".dropdownSearch").val() == "Tv-Shows"){
                filterListe(this.searchAll.attributes,checkedGenre);
                this.render();
            }else{
                $('#errorMovieInWatchlist').html("You can only filter Movies and Tv-Shows.").fadeIn('fast').delay(3000).fadeOut('slow');
            }

        },
        render: function (isShow) {

            if(this.gender !== undefined){
                setType(this.searchAll.attributes);
                this.$el.html(this.template({
                    searchAll: this.searchAll.attributes,
                    searchUser: this.searchUser.attributes,
                    watchlists: this.watchlists.toJSON(),
                    genders: this.gender.toJSON()
                }));
            }
            else if (this.searchAll.attributes !== null && this.watchlists !== null) {
                setType(this.searchAll.attributes);
                this.$el.html(this.template({
                    searchAll: this.searchAll.attributes,
                    searchUser: this.searchUser.attributes,
                    watchlists: this.watchlists.toJSON(),
                    genders: null
                }));
            }
            if(isShow == true){
                $('#boxGender').show();
            }else{
                $('#boxGender').hide();
            }
            this.$('#nameSearch').autocomplete({
                source: function (request, response) {
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
    return GlobalSearchView;
});
