app.factory('Map', ['$q', function($q){

    initOverviewMap = function (places) {
        console.log("I initOverviewMap");

        var mapOptions = {
            zoom: 12,
            center: new google.maps.LatLng(59.3313821, 18.0282956),
            zoomControl: true   
        };

        this.map = new google.maps.Map(document.getElementById('mapOverview'), mapOptions);
    };

    refreshMap = function() {
        console.log("I refreshMap");
        window.setTimeout(function(){
            google.maps.event.trigger(map, 'resize');
        });
    };

    //Overview map
    overviewMap = function(places) {
        console.log("I overviewMap");

        this.markers = [];

        var infoWindow = new google.maps.InfoWindow();
        
        var createMarker = function (info){
            
            var marker = new google.maps.Marker({
                map: this.map,
                position: new google.maps.LatLng(info.lat, info.long),
                title: info.place
            });
            marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
            
            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open(this.map, marker);
            });
            
            this.markers.push(marker);

            
        };      

        for (i = 0; i < places.length; i++){
            createMarker(places[i]);
        }

        var openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        };
    };

    return Map;
}]);