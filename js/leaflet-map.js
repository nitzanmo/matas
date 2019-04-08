const MAP_URL = "";

function setAircraftMarkerIcon(marker, url,anchor=36) {
    // if (anchor!= null) {
    //     marker.setIcon({
    //         url: url,
    //         //scaledSize: new google.maps.Size(scale, scale),
    //         anchor: new google.maps.Point(anchor, anchor)
    //     });
    // } else {
    //     marker.setIcon({
    //         url: url
    //     });
    // }
}

function setMarkerIcon(marker, icon) {
    // marker.setIcon(icon);
}

var aircrafts = null;
var selectedLocation = null;
var selectedLocationMarker = null;
var selectedLocationMarkerIcon = null;

function createAircraftMarker(position, name, hide, clickEvent) {
    // aircraftMarker =  new SlidingMarker({
    //     position: position,
    //     map: hide?null:map,
    //     title: name,
    //     easing: "linear",
    //     optimized: false,
    //     zIndex:9
    // });
    //
    // // add "clicked" event
    // aircraftMarker.addListener('click', function(event) {
    //     var items = getItemsInCircle(getPixelPosition(event.latLng), 32);
    //     if (items.locations.length == 0 && items.aircrafts.length == 1) {
    //         clickEvent();
    //     }
    //     else {
    //         openMapClusterPopup($.merge(items.aircrafts, items.locations));
    //         //alert("found multiple items, aircrafts:"+items.aircrafts.length+" locations:"+items.locations.length);
    //     }
    // });
    //
    //
    // return aircraftMarker;
    return {}
}

function toggleAircraftMarkerVisibility(marker, shouldShow) {
    // if (!shouldShow) {
    //     marker.setMap(null);
    // } else if (!marker.getMap()) {
    //     marker.setMap(map);
    // }
}

var currentHeadingMarker;
var currentPosition;
var currentHeading = null;

function createHeadingArea(heading) {
    return {}
    // return  {
    //     path: "M0 0 L32 -64 L-32 -64 Z",
    //     strokeOpacity: 0,
    //     fillColor: "#f44242",
    //     fillOpacity: 0.4,
    //     scale: 1.5,
    //     rotation: -heading-90,
    //     origin: new google.maps.Point(0,0)
    // };
}

function createPositionIcon() {
    return {}
    // return  {
    //     path: google.maps.SymbolPath.CIRCLE,
    //     strokeOpacity: 0.8,
    //     strokeColor : "black",
    //     strokeWeight: 1,
    //     fillColor: "#f44242",
    //     fillOpacity: 0.8,
    //     scale: 5,
    //     origin: new google.maps.Point(0,0)
    // };
}

function updateCurrentHeading(heading) {
    // currentHeading = heading;
    // currentHeadingMarker.setIcon(createHeadingArea(currentHeading));
    // currentHeadingMarker.setMap(map);
}

/**
 * draws a marker on the map given a location and icon
 * @param position - the position to draw the marker
 * @param icon - the icon of the marker
 * @param shouldUseMap - should the map be
 */
function drawMarker(position, icon, shouldUseMap) {
    // var marker = new SlidingMarker({
    //     position: position,
    //     map: shouldUseMap ? map : null,
    //     icon: icon
    // });
    // return marker;
    return {}
}

/**
 * Sets the map's focus on the given location and zooms in on it
 * @param location
 */
function focusOnLocation(location,zoom=12) {
    // map.setCenter(location);
    // map.setZoom(zoom);
}

function setMarkerIcon(marker, icon) {
    // marker.setIcon(icon);
}

// location markers
function getMarkerIcon(color, clicked) {
    if (!clicked)
        return L.icon({
            iconUrl: "icons/pointSmall-" + color + ".png",
            iconAnchor: [14, 14]
        });
    else return L.icon({
            iconUrl: "icons/pointPress-" + color + ".png",
            iconAnchor: [20, 20]
        });
}

function panTo(map, location) {
    // map.panTo(location);
}

var markersMap = {};

var rad = function(x) {
    return x * Math.PI / 180;
};

var distanceBetweenPixels = function(p1, p2) {
    var a = p1.x - p2.x;
    var b = p1.y - p2.y;
    var c = Math.sqrt( a*a + b*b );
    return c;
};

function getPixelPosition(position) {
    // var scale = Math.pow(2, map.getZoom());
    // var nw = new google.maps.LatLng(
    //     map.getBounds().getNorthEast().lat(),
    //     map.getBounds().getSouthWest().lng()
    // );
    // var worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
    // var worldCoordinate = map.getProjection().fromLatLngToPoint(position);
    // var pixelOffset = new google.maps.Point(
    //     Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
    //     Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
    // );
    // return pixelOffset;
    return {};
}

function getMarkerPixelPosition(marker) {
    return getPixelPosition(marker.getPosition());
}

function getItemsInCircle(pixel, radius) {
    // items = [];
    // var aircraftsInCircle = $.map(aircrafts, function(aircraft, index) {
    //     var aircraftMarker = aircraftMarkers[aircraft.aircraftId];
    //     var aircraftPixel = getMarkerPixelPosition(aircraftMarker);
    //     if (aircraftMarker.map != null && distanceBetweenPixels(pixel, aircraftPixel) < radius) {
    //         return [aircraft];
    //     } else {
    //         return [];
    //     }
    // });
    //
    // var locationsInCircle = $.map(locations, function(location, index) {
    //     if (location !== undefined && markersMap[location.pointId] !== undefined) {
    //         var locationMarker = markersMap[location.pointId];
    //         var aircraftPixel = getMarkerPixelPosition(locationMarker);
    //         if (distanceBetweenPixels(pixel, aircraftPixel) < radius) {
    //             return [location];
    //         } else {
    //             return [];
    //         }
    //     } else return [];
    // });
    // return {aircrafts:aircraftsInCircle, locations:locationsInCircle};
    return {}
}

function drawRouteOnMap(route) {
    // create the line path
    var path = [];
    for (var i=0; i<route.points.length; i++) {
        path[i] = convertLocation(route.points[i].N, route.points[i].E);
    }

    // add lines as data layer
    if (route.visible)
        var polyline = L.polyline(path, {color: "#"+route.color, riseOffset: route.routeId}).addTo(map);

    // var data = new google.maps.Data.LineString(path);
    // var dropShadowFeature = new google.maps.Data.Feature();
    // dropShadowFeature.setGeometry(data);
    // dropShadowFeature.setProperty("type", "dropShadow");
    // dropShadowFeature.setProperty("visibile", route.visible);
    //
    // var pathFeature = new google.maps.Data.Feature();
    // pathFeature.setGeometry(data);
    // pathFeature.setProperty("zIndex", route.routeId);
    // pathFeature.setProperty("color", "#" + route.color);
    // pathFeature.setProperty("type", "path");
    // pathFeature.setProperty("visibile", route.visible);
    //
    // map.data.add(dropShadowFeature);
    // map.data.add(pathFeature);
    //
    var markerIcon = getMarkerIcon(route.color, false);
    var markerIconClicked = getMarkerIcon(route.color, true);
    //
    // // create the points marker
    route.points.forEach(function(point) {
        if (!point.hidden) {
            var location = convertLocation(point.N, point.E);

            var marker = L.marker(location, {icon:markerIcon, riseOffset:route.routeId, title: "לחץ כדי להציג את רשימת המטוסים במיקום זה"});
            marker.addTo(map);

            // draw marker for this location
    //         var marker = new google.maps.Marker({
    //             position: location,
    //             map: null,
    //             title: "לחץ כדי להציג את רשימת המטוסים במיקום זה",
    //             icon: markerIcon,
    //             optimized: false,
    //             zIndex:route.routeId
    //         });
    //
    //         marker.addListener('click', function(event) {
    //             var items = getItemsInCircle(getPixelPosition(event.latLng), 32);
    //             if (items.locations.length == 1 && items.aircrafts == 0) {
    //                 if (selectedLocation == location) {
    //                     deselectLocation();
    //                 } else {
    //                     // first hide the previous popup
    //                     if (selectedLocation != null) {
    //                         deselectLocation(function () {
    //                             // then show a new popup
    //                             selectLocation(point.pointId, location, marker, markerIcon, markerIconClicked, "#" + route.color, "#" + route.primaryTextColor, "#" + route.secondaryTextColor);
    //                         });
    //                     } else {
    //                         // then show a new popup
    //                         selectLocation(point.pointId, location, marker, markerIcon, markerIconClicked, "#" + route.color, "#" + route.primaryTextColor, "#" + route.secondaryTextColor);
    //                     }
    //                 }
    //             } else {
    //                 openMapClusterPopup($.merge(items.aircrafts, items.locations));
    //                 // alert("found multiple items, aircrafts:"+items.aircrafts.length+" locations:"+items.locations.length);
    //             }
    //         });
            markersMap[point.pointId] = marker;
        }
    }, this);
    //
    // var markers = $.map(markersMap, function(value, index) {
    //     return [value];
    // });
    //
    // var markerCluster = new MarkerClusterer(map, markers,
    //     {
    //         styles: [
    //             {url: "icons/pointSmall-"+route.color+".png", textSize: 1, textColor: "#" + route.color, width: 27, height:27},
    //             {url: "icons/pointSmall-"+route.color+".png", textSize: 1,  textColor: "#" + route.color, width: 27, height:27},
    //             {url: "icons/pointSmall-"+route.color+".png", textSize: 1,  textColor: "#" + route.color, width: 27, height:27},
    //             {url: "icons/pointSmall-"+route.color+".png", textSize: 1,  textColor: "#" + route.color, width: 27, height:27},
    //             {url: "icons/pointSmall-"+route.color+".png", textSize: 1,  textColor: "#" + route.color, width: 27, height:27}],
    //         zIndex: route.routeId
    //     });
}

function drawRoutesOnMap(routes) {
    map.invalidateSize();
    // set style options for routes
    // map.data.setStyle(function(feature) {
    //     var color = feature.getProperty('color');
    //     var ftype = feature.getProperty('type');
    //     var visible = feature.getProperty('visibile');
    //     var zIndex = feature.getProperty('zIndex');
    //
    //     if (ftype == "path") {
    //         return {
    //             geodesic: true,
    //             strokeColor: color,
    //             strokeOpacity: visible?1.0:0.2,
    //             strokeWeight: 3,
    //             fillOpacity: 0,
    //             zIndex: zIndex,
    //         };
    //     } else if (ftype == "dropShadow") {
    //         return {
    //             geodesic: true,
    //             strokeOpacity: visible?0.1:0.0,
    //             strokeColor: "black",
    //             strokeWeight: 6,
    //             fillOpacity: 0,
    //             zIndex: 0
    //         };
    //     } return {};
    // });

    // add all routes
    routes.forEach(function(route) {
        drawRouteOnMap(route);
    }, this);
}

function loadPlugins() {
    // $.getScript("js/slidingMarker/jquery.easing.1.3.js");
    // $.getScript("js/slidingMarker/markerAnimate.js");
    // $.getScript("js/markerclusterer.js");
    // $.getScript("js/slidingMarker/SlidingMarker.min.js");
}

function createMapObject(clickCallback) {
    var map = L.map('map').setView([32.00, 35.00], 8);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibGVvMjEyIiwiYSI6ImNqdTc5b2c2bjFta2c0M25yYTM4Mzl4cmYifQ.2WIyCJuvt3ErquZS1A3tCg', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibGVvMjEyIiwiYSI6ImNqdTc5b2c2bjFta2c0M25yYTM4Mzl4cmYifQ.2WIyCJuvt3ErquZS1A3tCg'
    }).addTo(map);

    //map.addListener('click', clickCallback);
    return map;
}

function updateMarkerPosition(marker, position, animationDuration) {
    // marker.setDuration(animationDuration);
    // marker.setPosition(position);
}

function setZoomCallback(zoomCallback) {
    //google.maps.event.addListener(map, 'zoom_changed', zoomCallback);
}

function getZoomLevel() {
    //return map.getZoom();
}

function getMapFromMarker(marker) {
    return null;
}