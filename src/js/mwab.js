var mwab = mwab || {};


mwab.loadData = function(){
  return $.getJSON('./route.json').then(function(data){ return data; });
};


mwab.lineStyle = {strokeColor: "#0000CD", strokeOpacity: 0.5, strokeWidth: 10};


mwab.renderMap = function(){
  mwab.loadData().then(mwab.mapBuilder)
}

mwab.mapBuilder = function(data){
//variables for routes
var linesLayer, points, lineFeature, lineString, routeMarkersLayer, routepos, routesize, routeoffset, routeicon;
var pointData = data.route;
//initiate the map
var options = {resolutions: [100, 50, 25, 10, 5]};
osMap = new OpenSpace.Map('map', options);

//configure map options (basicmap.js)
setglobaloptions();
//set the center of the map and the zoom level
linesLayer = osMap.getVectorLayer();
// Set up layer for route markers
routeMarkersLayer = new OpenLayers.Layer.Markers("Route Markers");
points = new Array();
//make a route
osMap.setCenter(new OpenSpace.MapPoint(data.center.easting,data.center.northing),6);

for(var i = 0, len = pointData.length; i < len; i++){
  var point = pointData[i];
  points.push(new OpenLayers.Geometry.Point(Math.floor(point.easting), Math.floor(point.northing)));
}
// create a polyline feature from the array of points
lineString = new OpenLayers.Geometry.LineString(points);
lineFeature = new OpenLayers.Feature.Vector(lineString, null, mwab.lineStyle);
linesLayer.addFeatures([lineFeature]);
//crate a route start/end marker
routepos = new OpenSpace.MapPoint(pointData[0].easting, pointData[0].northing);
routesize = new OpenLayers.Size(33,45);
routeoffset = new OpenLayers.Pixel(-5,-37);
routeicon = new OpenSpace.Icon('https://openspace.ordnancesurvey.co.uk/osmapapi/img_versions/img_1.1/mapbuilder/routemarker-start.png', routesize, routeoffset, null, null);
routeMarkersLayer.addMarker(new OpenLayers.Marker(routepos, routeicon));
//crate a route start/end marker
routepos = new OpenSpace.MapPoint(pointData[len-1].easting, pointData[len-1].northing);
routesize = new OpenLayers.Size(33,45);
routeoffset = new OpenLayers.Pixel(-5,-37);
routeicon = new OpenSpace.Icon('https://openspace.ordnancesurvey.co.uk/osmapapi/img_versions/img_1.1/mapbuilder/routemarker-end.png', routesize, routeoffset, null, null);
routeMarkersLayer.addMarker(new OpenLayers.Marker(routepos, routeicon));
osMap.addLayer(routeMarkersLayer);

}

mwab.loadMap = function(){
  if(document.getElementById('map')){
    this.renderMap();
  }
};

$(document).ready(function () {
  'use strict';
  mwab.loadMap()
});
