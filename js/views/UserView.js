/**
 * Created by RoxanneLandry on 15-10-27.
 */

define([
    'jquery',
    'bootstrap',
    'underscore',
    'backbone',
    'models/User',
    'collections/Watchlists',
    'views/ErrorPageView',
    'models/Session',
    'text!templates/User.html',
    'models/Avatar'

], function ($, _bootstrap, _, Backbone, User, Watchlists, ErrorPageView, Session,UserTemplate, Avatar) {
    var UserView = Backbone.View.extend({
        template: _.template(UserTemplate),
        el: $(".content"),
        events: {
            "click #pencilAvatar": "modifyAvatar",
            "click .unfollow": "deleteFollow",
            "click .deleteButtonWatchlist": "deleteWatchlist",
            "click .followButton": "followUser",
            "click .followerShow": "followerShow"
        },
        avatar: new Avatar(),
        urlAvatar: '',
        initialize: function (options) {
            var that = this;
            var currentUser = Session.get('user_id');
            _.bindAll(this, 'render');
            this.isCurrentUser = false;
            if (options.id == currentUser) {
                this.isCurrentUser = true;
                this.urlAvatar = this.avatar.getUrlRoot();
            }
            this.user = new User({id: options.id});
            var that = this;
            that.urlAvatar = this.avatar.getUrlRoot();
            this.user.fetch({
                success: function (user, a) {
                    that.urlAvatar = that.avatar.urlRoot + that.avatar.hashEmail(a.email);
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
            this.me = new User({id: currentUser});
            this.me.fetch({
                error: function (model, response) {
                    if (response.status === 401) {
                        window.location.href = "#/";
                    } else {
                        var errorPage = new ErrorPageView();
                        errorPage.render(response.status);
                    }
                }
            });
            this.watchlistUser = new Watchlists({id: options.id});
            this.watchlistUser.fetch({
                success: function () {
                    console.log('Watchlist fetched');
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
            this.watchlistUser.bind('sync destroy save', function () {
                that.render();
            });
            this.user.bind('sync destroy save', function () {
                that.render();
            });
            this.me.bind('sync destroy save', function () {
                that.render();
            });
        },
        followUser: function () {
            var that = this;
            var followExist = false;
            var id = {id: this.user.id};
            if(this.me.attributes.followingUser !== undefined) {
                _.each(this.me.attributes.followingUser.models, function (followUser) {
                    if (followUser.attributes.email == that.user.attributes.email) {
                        followExist = true;
                    }
                });
            }
            if(followExist == false){
                this.me.attributes.followingUser.models.push(this.user);
                this.me.addFollow(id);
            }else{
                $('#errorUserFollow').html(" You're already following this user.").fadeIn('fast').delay(3000).fadeOut('slow');
            }
        },
        deleteFollow: function (e) {
            if (this.isCurrentUser == true) {
                e.preventDefault();
                var that = this;
                var id = $(e.currentTarget).data("id");
                var modelToDelete = this.user.attributes.followingUser.get(id);
                modelToDelete.url = 'https://umovie.herokuapp.com/follow/' + id;
                modelToDelete.destroy({
                    success: function () {
                        that.render();
                        console.log("destroyed");
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
            }
        },
        deleteWatchlist: function (event) {
            if (this.isCurrentUser == true) {
                var watchListId = $(event.target).data('id');
                var watchlistModel = this.watchlistUser.get(watchListId);
                watchlistModel.destroy();
                this.watchlistUser.remove();
            }
        },
        followerShow: function (event){
            var userId = $(event.target).data('id');
            window.location.href = "#/users/" + userId;
        },
        render: function () {
            console.log('print picture : ' + Session.get('email'));
            if (this.user.attributes.followingUser != null) {
                this.$el.html(this.template({
                    User: this.user.toJSON(),
                    Followers: this.user.attributes.followingUser.models,
                    WatchlistUser: this.watchlistUser.toJSON(),
                    avatarIcon: this.urlAvatar
                }));
            }
            if (this.isCurrentUser == true) {
                $(".followButton").hide();
                $(".unfollowButton").hide();
                $("#pencilAvatar").show();
            }
            if (this.isCurrentUser == false) {
                $(".deleteButtonFollow").hide();
                $(".deleteButtonWatchlist").hide();
                $("#pencilAvatar").hide();
                $(".unfollow").hide();
            }
        },
        cleanView: function () {
            this.undelegateEvents();
            return this;
        }
    });
    return UserView;
});