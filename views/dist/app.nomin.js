/*! angular-grunt-foundation 2016-02-24 */
var app = angular.module("sthlmHar", [ "ui.router", "google-maps", "ngRoute" ]);

app.controller("aboutUsPageController", [ "$scope", "$http", function(a, b) {
    console.log("Inne i aboutusPageController");
} ]);

app.controller("findUsPageController", [ "$scope", "$http", "$document", "Map", "$timeout", function(a, b, c, d, e) {
    console.log("Inne i findUsPageController");
    var f = this;
    a.places = [ {
        place: "Stockholm hår",
        desc: "Detta är Stockholm Hår",
        lat: 59.3313821,
        "long": 18.0282956
    } ];
    a.overviewMap = function(b) {
        console.log("overviewMap");
        f.Map = initOverviewMap();
        f.Map = overviewMap(a.places);
    };
    a.geolocation = function() {
        a.loading = true;
        var b = new google.maps.DirectionsService();
        var c = new google.maps.DirectionsRenderer({
            draggable: false
        });
        navigator.geolocation.getCurrentPosition(function(b) {
            var c = new google.maps.LatLng(b.coords.latitude, b.coords.longitude);
            a.long = b.coords.longitude;
            a.lat = b.coords.latitude;
            a.$apply(function() {
                console.log("$scope.long (i navigator.geolocation): ", a.long);
                console.log("$scope.lat: (i navigator.geolocation)", a.lat);
                a.places.push({
                    place: "Din nuvarande position",
                    desc: "",
                    lat: a.lat,
                    "long": a.long
                });
                console.log("places: ", a.places);
                a.loading = false;
                a.overviewMap(a.places);
            });
        });
    };
} ]);

app.controller("mainController", [ "$scope", "$http", "$state", "$timeout", "$rootScope", "$window", function(a, b, c, d, e, f) {
    console.log("Inne i mainCtrl");
    a.getMenu = function() {
        b.get("navData.json").success(function(b) {
            a.menuItems = b;
            console.log("$scope.getMenu: ", a.menuItems);
        });
    };
    a.getMenu();
    a.currentMenuItem = function(b) {
        a.currentPath = b;
        if (window.location.href.indexOf(a.currentPath) > -1) {
            return "currentPath";
        }
    };
    e.$on("$stateChangeStart", function(b, c, e, f, g) {
        a.isStateChange = true;
        a.isRespMenuOpen = false;
        d(function() {
            a.isStateChange = false;
        }, 800);
    });
} ]);

app.controller("pricesPageController", [ "$scope", "$http", function(a, b) {
    console.log("Inne i pricesPageController");
    a.getPriceList = function() {
        b.get("priceList.json").success(function(b) {
            a.priceList = b;
            console.log("$scope.priceList: ", a.priceList);
        });
    };
    a.getPriceList();
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
            instaUser: a.instaUsrSth,
            instaResults: 10,
            instaMenu: "yes"
        });
    };
} ]);

app.directive("loading", function() {
    return {
        restrict: "E",
        replace: true,
        template: '<div class="respCenter loading"><p>Laddar</p><img src="../img/ajax-loader.gif" class="respCenterIcon"/></div>',
        link: function(a, b, c) {
            a.$watch("loading", function(a) {
                if (a) $(b).show(); else $(b).hide();
            });
        }
    };
});

app.directive("resolveLoader", [ "$rootScope", "$timeout", function(a, b) {
    return {
        restrict: "E",
        replace: true,
        template: '<div class="alert alert-success ng-hide"><strong>Welcome!</strong> Content is loading, please hold.</div>',
        link: function(c, d) {
            a.$on("$routeChangeStart", function(a, c, e) {
                if (e) return;
                b(function() {
                    d.removeClass("ng-hide");
                });
            });
            a.$on("$routeChangeSuccess", function() {
                d.addClass("ng-hide");
            });
        }
    };
} ]);

app.directive("showDuringResolve", [ "$rootScope", function(a) {
    return {
        link: function(b, c) {
            c.addClass("ng-hide");
            var d = a.$on("$routeChangeStart", function() {
                c.removeClass("ng-hide");
            });
            b.$on("$destroy", d);
        }
    };
} ]);

app.factory("Map", [ "$q", function(a) {
    initOverviewMap = function(a) {
        console.log("I initOverviewMap");
        var b = {
            zoom: 12,
            center: new google.maps.LatLng(59.3313821, 18.0282956),
            zoomControl: true
        };
        this.map = new google.maps.Map(document.getElementById("mapOverview"), b);
    };
    refreshMap = function() {
        console.log("I refreshMap");
        window.setTimeout(function() {
            google.maps.event.trigger(map, "resize");
        });
    };
    overviewMap = function(a) {
        console.log("I overviewMap");
        this.markers = [];
        var b = new google.maps.InfoWindow();
        var c = function(a) {
            var c = new google.maps.Marker({
                map: this.map,
                position: new google.maps.LatLng(a.lat, a.long),
                title: a.place
            });
            c.content = '<div class="infoWindowContent">' + a.desc + "</div>";
            google.maps.event.addListener(c, "click", function() {
                b.setContent("<h2>" + c.title + "</h2>" + c.content);
                b.open(this.map, c);
            });
            this.markers.push(c);
        };
        for (i = 0; i < a.length; i++) {
            c(a[i]);
        }
        var d = function(a, b) {
            a.preventDefault();
            google.maps.event.trigger(b, "click");
        };
    };
    return Map;
} ]);

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

app.run([ "$rootScope", "$location", "$route", "$timeout", function(a, b, c, d) {
    a.config = {};
    a.config.app_url = b.url();
    a.config.app_path = b.path();
    a.layout = {};
    a.layout.loading = false;
    a.$on("$routeChangeStart", function() {
        console.log("$routeChangeStart");
        d(function() {
            a.layout.loading = true;
        });
    });
    a.$on("$routeChangeSuccess", function() {
        console.log("$routeChangeSuccess");
        d(function() {
            a.layout.loading = false;
        }, 200);
    });
    a.$on("$routeChangeError", function() {
        alert("wtff");
        a.layout.loading = false;
    });
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
        controller: "findUsPageController"
    }).state("prices", {
        url: "/priser",
        templateUrl: "partials/prices.html",
        controller: "pricesPageController"
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
    $(".bottomOfSet").each(function(a) {
        var b = $(this).offset().top + $(this).outerHeight() - 300;
        var c = $(window).scrollTop() + $(window).height();
        if (c > b) {
            $(this).animate({
                opacity: "1"
            }, 700);
        }
    });
});

$("#myModal").on("shown.bs.modal", function() {
    $("header").removeClass("sticky");
});

$("#myModal").on("hide.bs.modal", function() {
    $("header").addClass("sticky");
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