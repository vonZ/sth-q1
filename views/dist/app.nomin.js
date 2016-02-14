/*! angular-grunt-foundation 2016-02-14 */
var app = angular.module("sthlmHar", [ "ui.router" ]);

app.controller("aboutUsPageController", [ "$scope", "$http", function(a, b) {
    console.log("Inne i aboutusPageController");
} ]);

app.controller("mainController", [ "$scope", "$http", function(a, b) {
    console.log("Inne i mainCtrl");
} ]);

app.controller("startPageController", [ "$scope", "$http", "instagram", function(a, b, c) {
    console.log("Inne i startPageController");
    a.data = {};
    a.pics = [];
    c.fetchPhotos(function(b) {
        a.pics = b;
        console.log("data: ", b);
    });
} ]);

app.directive("loading", function() {
    return {
        restrict: "E",
        replace: true,
        template: '<div class="respCenter loading"><span>Laddar</span><img src="images/ajax-loader.gif" class="respCenterIcon"/></div>',
        link: function(a, b, c) {
            a.$watch("loading", function(a) {
                if (a) $(b).show(); else $(b).hide();
            });
        }
    };
});

app.factory("posts", [ "$http", function(a) {
    var b = {
        posts: []
    };
    b.get = function(b) {
        console.log("get post");
        return a.get("/posts/" + b).then(function(a) {
            return a.data;
        });
    };
    b.getAll = function() {
        console.log("get all posts");
        return a.get("/posts/").success(function(a) {
            angular.copy(a, b.posts);
        });
    };
    b.create = function(c) {
        return a.post("/posts", c).success(function(a) {
            console.log("data: ", a);
            b.posts.push(a);
        });
    };
    b.upvote = function(b) {
        return a.put("/posts/" + b._id + "/upvote").success(function(a) {
            b.upvotes += 1;
        });
    };
    b.deleteItem = function(b) {
        return a.put("/posts/" + b._id + "/delete").success(function(a) {
            console.log("success!");
        });
    };
    b.addComment = function(b, c) {
        console.log("add comment");
        return a.post("/posts/" + b + "/comments", c);
    };
    b.upvoteComment = function(b, c) {
        return a.put("/posts/" + b._id + "/comments/" + c._id + "/upvote").success(function(a) {
            c.upvotes += 1;
        });
    };
    return b;
} ]);

app.factory("instagram", [ "$http", function(a) {
    return {
        fetchPhotos: function(b) {
            var c = "66bb9475b77d4f6e846384c2ea92179e";
            var d = "https://api.instagram.com/v1/users/20902211/media/recent/?";
            d += "?count=99";
            d += "&client_id=" + c;
            d += "&callback=JSON_CALLBACK";
            a.jsonp(d).success(function(a) {
                b(a.data);
            });
        }
    };
} ]);

app.config([ "$stateProvider", "$urlRouterProvider", function(a, b) {
    b.otherwise("/home");
    a.state("home", {
        url: "/home",
        templateUrl: "partials/startPage.html",
        controller: "startPageController"
    }).state("about", {
        url: "/om-oss",
        templateUrl: "partials/aboutUs.html",
        controller: "aboutUsPageController"
    }).state("findUs", {
        url: "/hitta-hit",
        templateUrl: "partials/findUs.html",
        controller: "aboutUsPageController"
    }).state("prices", {
        url: "/priser",
        templateUrl: "partials/prices.html",
        controller: "aboutUsPageController"
    });
} ]);