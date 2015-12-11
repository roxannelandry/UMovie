/**
 * Created by RoxanneLandry on 15-10-26.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/MenuBarView',
    'views/MainPageView',
    'views/ActorView',
    'views/WatchlistsView',
    'views/WatchlistView',
    'views/MoviesActorView',
    'views/SaisonsTvShowView',
    'views/EpisodesTvShowView',
    'views/MovieView',
    'views/LoginView',
    'views/SignUpView',
    'views/UserView',
    'views/ErrorPageView',
    'views/GlobalSearchView',
    'views/DataPolicyView',
    'views/AboutView',
    'models/Session',
    'views/SpecificSearchView',
    'views/TvShowByGenderView',
    'views/MoviesByGender'

], function ($, _, Backbone, MenuBarView, MainPageView, ActorView, WatchlistsView, WatchlistView,
             MoviesActorView, SaisonsTvShowView, EpisodesTvShowView, MovieView, LoginView, SignUpView, UserView, ErrorPageView,GlobalSearchView, DataPolicyView, AboutView, Session, SpecificSearchView, TvShowByGenderView, MoviesByGender) {

    var AppRouter = Backbone.Router.extend({

        lastview:"",

        routes: {

            '':'login',
            'signup': 'signup',
            'users/:id': 'user',
            'home': 'home',
            'actor/:id': 'actor',
            'tvshow/:id': 'tvshow',
            'watchlists': 'watchlists',
            'newwatchlist': 'watchlist',
            'watchlist/:id': 'watchlist',
            'movies/:id': 'movies',
            'search?q=:id2':'globalsearch',
            'datapolicy': 'datapolicy',
            'about':'about',
            'search/:param1?q=:param2':'specificsearch',
            'search/:param1/seasons?q=:param2':'specificsearch',
            'search/:param1/episodes?q=:param2':'specificsearch',
            'tvshowbygenre/:id':'tvshowbygenre',
            'moviesbygenre/:id':'moviesbygenre',
            'search/:param1/seasons?q=:param2':'specificsearchseasons',
            'search/:param1/episodes?q=:param2':'specificsearchepisodes',
            '*notFound': 'notfound',

        },
        cleanUp:function(view){
            if(view && view.cleanView() ){
                view = "";
            };
        }
    });

    var initialize = function () {
        var router = new AppRouter;

        if(Session.get("remember") == "false"){
            Session.logout();
        }

        router.on('route:login', function () {
            if (Session.get("logged_in") === undefined) {
                $('.listeFilm').hide();
                $('.menuBar').hide();
                router.cleanUp(router.lastview);
                var loginView = new LoginView();
                loginView.render();
            } else {
                window.location.href = "#/home";
            }

        });

        router.on('route:signup', function () {
            $('.listeFilm').hide();
            $('.menuBar').hide();
            router.cleanUp(router.lastview);
            var signUpView = new SignUpView();
            signUpView.render();
        });

        router.on('route:datapolicy', function () {
            $('.listeFilm').hide();
            $('.menuBar').hide();
            router.cleanUp(router.lastview);
            var dataPolicyView = new DataPolicyView();
            dataPolicyView.render();
        });

        router.on('route:about', function () {
            if (Session.get("logged_in") === undefined) {
                window.location.href = "#/";
            } else {
                $('.listeFilm').hide();
                $('.menuBar').hide();
                router.cleanUp(router.lastview);
                var aboutView = new AboutView();
                aboutView.render();
            }
        });

        router.on('route:user', function (id) {
            if (Session.get("logged_in") === undefined) {
                window.location.href = "#/";
            } else {
                $('.listeFilm').hide();
                $('.menuBar').show();
                router.cleanUp(router.lastview);
                var userView = new UserView({id: id});
                router.lastview = userView;
            }
        });

        router.on('route:home', function () {
            if (Session.get("logged_in") === undefined) {
                window.location.href = "#/";
            } else {
                $('.listeFilm').hide();
                $('.menuBar').show();
                router.cleanUp(router.lastview);
                var mainPageView = new MainPageView();
                menuBarView = new MenuBarView(Session.attributes.user_id);
                mainPageView.render();
            }

        });

        router.on('route:actor', function (id) {
            if (Session.get("logged_in") === undefined) {
                window.location.href = "#/";
            } else {
                $('.listeFilm').show();
                $('.menuBar').show();
                router.cleanUp(router.lastview);
                var actorView = new ActorView({id: id});
                var listeFilmsActor = new MoviesActorView({id: id});
                router.lastview = listeFilmsActor;
            }
        });

        router.on('route:watchlists', function () {

            if (Session.get("logged_in") === undefined) {
                window.location.href = "#/";
            } else {
                $('.listeFilm').hide();
                $('.menuBar').show();
                router.cleanUp(router.lastview);
                var watchlistsView = new WatchlistsView();
                router.lastview = watchlistsView;
            }
        });

        router.on('route:watchlist', function (id) {
            if (Session.get("logged_in") === undefined) {
                window.location.href = "#/";
            } else {
                $('.listeFilm').hide();
                $('.menuBar').show();
                router.cleanUp(router.lastview);
                var watchlistView = new WatchlistView({id: id});
                router.lastview = watchlistView;
            }

        });

        router.on('route:tvshow', function (id) {
            if (Session.get("logged_in") === undefined) {
                window.location.href = "#/";
            } else {
                $('.listeFilm').show();
                $('.menuBar').show();
                router.cleanUp(router.lastview);
                var saisonView = new SaisonsTvShowView({id: id});
                var listeEpisodesView = new EpisodesTvShowView({id: id});
                router.lastview = listeEpisodesView;

            }
        });

        router.on('route:movies', function (id) {
            if (Session.get("logged_in") === undefined) {
                window.location.href = "#/";
            } else {
                $('.listeFilm').hide();
                $('.menuBar').show();
                router.cleanUp(router.lastview);
                var movieView = new MovieView({id: id});
                router.lastview = movieView;
            }
        });

        router.on('route:tvshowbygenre', function (id) {
            if (Session.get("logged_in") === undefined) {
                window.location.href = "#/";
            } else {
                $('.listeFilm').hide();
                $('.menuBar').show();
                router.cleanUp(router.lastview);
                var tvShowByGenderView = new TvShowByGenderView(id);
            }
        });
        router.on('route:moviesbygenre', function (id) {
            if (Session.get("logged_in") === undefined) {
                window.location.href = "#/";
            } else {
                $('.listeFilm').hide();
                $('.menuBar').show();
                router.cleanUp(router.lastview);
                var moviesByGender = new MoviesByGender(id);
            }
        });

        router.on('route:globalsearch',function(query){
            if (Session.get("logged_in") === undefined) {
                window.location.href = "#/";

            } else {
                $('.listeFilm').hide();
                $('.menuBar').show();
                router.cleanUp(router.lastview);
                var globalSearchView = new GlobalSearchView(query);
                router.lastview = globalSearchView;
            }
        });

        router.on('route:specificsearch', function (id1,id2) {
            if (Session.get("logged_in") === undefined) {
                $('.listeFilm').hide();
                $('.menuBar').hide();
                var loginView = new LoginView();
                loginView.render();
            } else {
                $('.listeFilm').hide();
                $('.menuBar').show();
                router.cleanUp(router.lastview);
                var specificSearchView = new SpecificSearchView(id1,id2);
                router.lastview = specificSearchView;
            }

        });

        router.on('route:specificsearchseasons', function (id1,id2) {
            if (Session.get("logged_in") === undefined) {
                $('.listeFilm').hide();
                $('.menuBar').hide();
                var loginView = new LoginView();
                loginView.render();
            } else {
                $('.listeFilm').hide();
                $('.menuBar').show();
                router.cleanUp(router.lastview);
                var seasons = id1+"/seasons";
                var specificSearchView = new SpecificSearchView(seasons,id2);
                router.lastview = specificSearchView;
            }

        });

        router.on('route:specificsearchepisodes', function (id1,id2) {
            if (Session.get("logged_in") === undefined) {
                $('.listeFilm').hide();
                $('.menuBar').hide();
                var loginView = new LoginView();
                loginView.render();
            } else {
                $('.listeFilm').hide();
                $('.menuBar').show();
                router.cleanUp(router.lastview);
                var episodes = id1+"/episodes";
                var specificSearchView = new SpecificSearchView(episodes,id2);
                router.lastview = specificSearchView;
            }

        });

        router.on('route:notfound', function() {
            if (Session.get("logged_in") === undefined) {
                window.location.href = "#/";
            } else {
                var errorPageView = new ErrorPageView();
                errorPageView.render(404);
            }
        });

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});
