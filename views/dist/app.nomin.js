/*! angular-grunt-foundation 2016-02-16 */
var app = angular.module("sthlmHar", [ "ui.router" ]);

app.controller("aboutUsPageController", [ "$scope", "$http", function(a, b) {
    console.log("Inne i aboutusPageController");
} ]);

app.controller("mainController", [ "$scope", "$http", "$state", function(a, b, c) {
    console.log("Inne i mainCtrl");
} ]);

app.controller("startPageController", [ "$scope", "$http", "instagram", function(a, b, c) {
    console.log("Inne i startPageController");
    a.instaUsrVvZ = "20902211";
    a.instaUsrSth = "406306036";
    a.instaUsrNN = "6847274";
    a.initInsta = function() {
        console.log("initInsta");
        $("#InstaContainer").instastream({
            instaToken: "20902211.1677ed0.328409468c4b440d87971179adb2e4dd",
            instaUser: a.instaUsrVvZ,
            instaResults: 10,
            instaMenu: "yes"
        });
    };
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
    b.otherwise("/hem");
    a.state("home", {
        url: "/hem",
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

var initSlider = function() {
    console.log("initSlider");
    var a = $("#owl-demo");
    a.owlCarousel({
        autoPlay: false,
        items: 4,
        itemsDesktop: [ 1199, 3 ],
        itemsDesktopSmall: [ 979, 3 ]
    });
    $(".next").click(function() {
        a.trigger("owl.next");
    });
    $(".prev").click(function() {
        a.trigger("owl.prev");
    });
};

$(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
        $("header").addClass("sticky");
    } else {
        $("header").removeClass("sticky");
    }
    $(".card").each(function(a) {
        var b = $(this).offset().top + $(this).outerHeight();
        var c = $(window).scrollTop() + $(window).height();
        if (c > b) {
            $(this).animate({
                opacity: "1"
            }, 500);
        }
    });
});

(function(a, b, c) {
    var d = "instastream", e = b.document, f = {
        instaUser: "1011689",
        instaResults: 3,
        instaMenu: "yes"
    };
    var g;
    var h;
    var i = 0;
    function j(b, c) {
        this.element = b;
        this.options = a.extend({}, f, c);
        this._defaults = f;
        this._name = d;
        this.init();
    }
    String.prototype.timeconverter = function() {
        var a = new Date(this * 1e3);
        var b = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
        var c = a.getFullYear();
        var d = b[a.getMonth()];
        var e = a.getDate();
        var f = e + " " + d + " " + c;
        return f;
    };
    a.fn.createStream = function(b, c) {
        var d = b;
        var f;
        var j;
        var l;
        a(c).addClass("slider-wrapper").append("<div class='loading'></div>");
        a("div").remove(".slider-content");
        a("div").remove(".slider-menu");
        a.ajax({
            type: "GET",
            dataType: "jsonp",
            cache: false,
            url: h,
            success: function(b) {
                console.log("data: ", b);
                a(c).append("<div id='owl-demo' ng-init='initSlider()'></div>");
                for (var e = 0; e < g; e++) {
                    if (d < 20) {
                        if (b.data[d].caption === null) {
                            f = "";
                        } else {
                            f = b.data[d].caption.text;
                        }
                        if (b.data[d].comments.count < 2) {
                            j = " kommentar";
                        } else {
                            j = " kommentarer";
                        }
                        if (b.data[d].likes.count < 2) {
                            l = " like";
                        } else {
                            l = " likes";
                        }
                        a("#owl-demo").append("<div class='item'><a href='" + b.data[d].link + "'target='_blank'><img class='img-responsive' src='" + b.data[d].images.standard_resolution.url + "' alt='" + f + "'><div class='reactionContainer'><span><p><i class='fa fa-heart '></i>" + b.data[d].likes.count + l + "</p><p><i class='fa fa-comments-o'></i>" + b.data[d].comments.count + "</i>" + j + "</p><p><i class='fa fa-clock-o'></i>" + b.data[d].created_time.timeconverter() + "</i></p></span></div></a></div>");
                        d++;
                        i = d;
                    }
                }
                a(".prevInsta").on("click", function(b) {
                    b.preventDefault();
                    var d = i - g * 2;
                    a().createStream(d, c);
                });
                a(".nextInsta").on("click", function(b) {
                    b.preventDefault();
                    var d = i;
                    a().createStream(d, c);
                });
            }
        }).done(function() {
            a(".slider-item").hide();
            a(".frame").find("span.frame-more").hide();
            a(".frame").find("span.frame-title").hide();
            a(".frame").hover(function() {
                a(this).find("span.frame-more").show().animate({
                    top: -5
                }, {
                    queue: false,
                    duration: 200
                });
                a(this).find("span.frame-title").show().animate({
                    bottom: 0
                }, {
                    queue: false,
                    duration: 200
                });
            }, function() {
                a(this).find("span.frame-more").show().animate({
                    top: -38
                }, {
                    queue: false,
                    duration: 200
                });
                a(this).find("span.frame-title").show().animate({
                    bottom: -50
                }, {
                    queue: false,
                    duration: 200
                });
            });
            var b = i - g;
            if ($instaMenu == "yes") {
                if (i > 19) {
                    a(".next").hide();
                } else {
                    a(".next").show();
                }
            }
            a("div").remove(".loading");
            for (var c = 0; c < g; c++) {
                k = c + 1;
                a("#slider-item" + c).delay(200 * k).fadeIn(800);
            }
            a(e).ready(function() {
                initSlider();
            });
        });
    };
    j.prototype.init = function() {
        i = 0;
        g = this.options.instaResults;
        $instaMenu = this.options.instaMenu;
        h = "https://api.instagram.com/v1/users/" + this.options.instaUser + "/media/recent/?access_token=" + this.options.instaToken;
        var b = this.element;
        a().createStream(i, b);
    };
    a.fn[d] = function(b) {
        return this.each(function() {
            if (!a.data(this, "plugin_" + d)) {
                a.data(this, "plugin_" + d, new j(this, b));
            }
        });
    };
})(jQuery, window);