/**
 * Created by RoxanneLandry on 15-11-28.
 */
define([
    'underscore',
    'backbone',
    'collections/Followers',
    'libs/jqueryCookies/jquery-cookie/src/jquery.cookie',
    'views/ErrorPageView',
    'models/Session'

], function (_, Backbone, Following, JQueryCookies, ErrorPageView, Session) {
    var User = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/users',
        parse: function (response) {
            var followingUser = new Following();
            followingUser.add(response.following);
            response.followingUser = followingUser;
            var model = {};
            model.id = response.id;
            model.email = response.email;
            model.name = response.name;
            model.followingUser = response.followingUser;
            return model;
        },
        addFollow: function (data) {
            var token = Session.get('access_token');
            $.ajax({
                type: "POST",
                contentType: "application/json",
                crossDomain: true,
                url: "https://umovie.herokuapp.com/follow",
                data: JSON.stringify(data),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', token);
                }
            }).done(function () {
                $('#succesUserFollow').html(" You are now following a new user.").fadeIn('fast').delay(3000).fadeOut('slow');
                console.log("You are now following a new person.");
            }).fail(function (model, response) {
                if (response.status === 401) {
                    window.location.href = "#/";
                }
                else {
                    var errorPage = new ErrorPageView();
                    errorPage.render(response.status);
                }
            })
        }
    });
    return User;
});
