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
    'views/ErrorPageView',
    'models/Session',
    'models/User',
    'models/MovieToAdd',
    'libs/AvailableTags',
    'collections/GenresMovie',
    'collections/GenresTvShow',
    'text!templates/SpecificSearch.html'

], function ($, _bootstrap, presentation, _, Backbone, Search, Watchlists, ErrorPageView, Session, User, Movie, AvailableTags,GenresMovie, GenresTvShow, SpecificSearchTemplate) {
    var GlobalSearchView = Backbone.View.extend({
        template: _.template(SpecificSearchTemplate),
        el: $(".content"),
        events: {
            "click .followButton": "followUser",
            "click #searchButton": "searchButtonClicked",
            "click .blackBackgound li": "addToWatchlist",
            "click #advancedSearch": "showAdvanced",
            "click .filterButton": "filterResult",
            "keydown": "searchButtonClicked"
        },
        initialize: function (options1, options2) {
            var currentUserId = $.cookie('user_id');
            _.bindAll(this, 'render');
            var that = this;
            this.specificSearchResult = null;
            var searchType = "/" + options1;
            var searchQuery = options2;
            this.specificSearchResult = new Search(searchQuery, searchType);
            this.specificSearchResult.fetch({
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
            this.specificSearchResult.type = searchType;
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
                    console.log('List genre film specific fetched');
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
                    console.log('List genre tvShow  specific fetched');
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
            this.watchlists.bind('sync destroy save', function () {
                that.render();
            });
            this.specificSearchResult.bind('sync destroy save', function () {
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
        addToWatchlist: function (e) {
            e.preventDefault();
            var that = this;
            var isDuplicate = false;
            var watchlistId = $(e.currentTarget).data("id");
            var watchlistToAdd = this.watchlists.get(watchlistId);
            var movieId = $(e.currentTarget.parentElement.parentElement).data("id");
            var movieToAdd = findMovie(this.specificSearchResult.attributes, movieId);
            watchlistToAdd.attributes.moviesWatchList.models.forEach(function(movie){
                if (movie !== undefined && movie.attributes !== undefined) {
                    if (movie.attributes.trackId == movieId) {
                        isDuplicate = true;
                    }
                } else{
                    if (movie.trackId == movieId) {
                        isDuplicate = true;
                    }
                }
            });
            watchlistToAdd.attributes.moviesWatchList.models.push(movieToAdd);
            if (isDuplicate == false) {
                watchlistToAdd.addMovie(movieToAdd);
            }else {
                $('#errorMovieInWatchlist').html(" This movie is already in that watchlist.").fadeIn('fast').delay(3000).fadeOut('slow');
            }
        },
        searchButtonClicked: function (ev) {
            this.isUser = false;
            var code = ev.keyCode || ev.which;
            if(code == 13 || ev.type == "click") {
                var choosedSearchOption = $(".dropdownSearch").val();
                var whatToSearh = $("#nameSearch").val();
                var stripped = choosedSearchOption.replace("-", "");
                var strippedToLower = stripped.toLowerCase();
                var dropDownChoice;
                if (strippedToLower === "tvshows") {
                    dropDownChoice = "/tvshows/seasons";
                } else {
                    dropDownChoice = "/" + strippedToLower;
                }
                var toSearchNoSpace = whatToSearh.replace(" ", "%20");
                if (inputIsValidSearch(whatToSearh)) {
                    window.location.href = "#/search" + dropDownChoice + "?q=" + toSearchNoSpace + '&limit=15';
                }
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
                filterListe(this.specificSearchResult.attributes,checkedGenre);
                this.render();

            }else if($(".dropdownSearch").val() == "Tv-Shows"){
                filterListe(this.specificSearchResult.attributes,checkedGenre);
                this.render();
            }else{
                $('#errorMovieInWatchlist').html("You can only filter Movies and Tv-Shows.").fadeIn('fast').delay(3000).fadeOut('slow');
            }
        },
        render: function (isShow) {
            if(this.gender !== undefined){
                this.$el.html(this.template({
                    type: this.specificSearchResult.type,
                    specificSearchResult: this.specificSearchResult.attributes,
                    Watchlists: this.watchlists.toJSON(),
                    genders: this.gender.toJSON()
                }));
            }
            else if (this.specificSearchResult.attributes !== null && this.watchlists !== null) {
                this.$el.html(this.template({
                    type: this.specificSearchResult.type,
                    specificSearchResult: this.specificSearchResult.attributes,
                    Watchlists: this.watchlists.toJSON(),
                    genders: null
                }));
            }
            if(this.specificSearchResult.type == "/users" || this.specificSearchResult.type == "/actors"){
                $("#advancedSearch").hide();
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
