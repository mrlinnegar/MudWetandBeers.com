var mwab = mwab || {};


mwab.loadData = function(){
  return $.getJSON('/js/dummy_points.json').then(function(data){ return data; });
};

mwab.pointService =
{ getPointData : function(){
    var data = {};
    data.start = {"e":403480,"n":394120};
    data.end = {"e":403460,"n":394050};
    data.center = {"e":406535,"n":394140};
    data.route = new Array();
    data.route.push({"e":403480,"n":394120});
    data.route.push({"e":403990,"n":394200});
    data.route.push({"e":404130,"n":394180});
    data.route.push({"e":404200,"n":394690});
    data.route.push({"e":404220,"n":395000});
    data.route.push({"e":404430,"n":395330});
    data.route.push({"e":404390,"n":395600});
    data.route.push({"e":404530,"n":395860});
    data.route.push({"e":404240,"n":396250});
    data.route.push({"e":404360,"n":396310});
    data.route.push({"e":404650,"n":396170});
    data.route.push({"e":404950,"n":396300});
    data.route.push({"e":405220,"n":396600});
    data.route.push({"e":405490,"n":396960});
    data.route.push({"e":405810,"n":397020});
    data.route.push({"e":406190,"n":396890});
    data.route.push({"e":406250,"n":396750});
    data.route.push({"e":406560,"n":396720});
    data.route.push({"e":406950,"n":396430});
    data.route.push({"e":407520,"n":396460});
    data.route.push({"e":408040,"n":396580});
    data.route.push({"e":408140,"n":396460});
    data.route.push({"e":408610,"n":396540});
    data.route.push({"e":408930,"n":396600});
    data.route.push({"e":409240,"n":396520});
    data.route.push({"e":409390,"n":396100});
    data.route.push({"e":409320,"n":395530});
    data.route.push({"e":409500,"n":395160});
    data.route.push({"e":409760,"n":394770});
    data.route.push({"e":409910,"n":394370});
    data.route.push({"e":409700,"n":394060});
    data.route.push({"e":409370,"n":393790});
    data.route.push({"e":409080,"n":393460});
    data.route.push({"e":408900,"n":393090});
    data.route.push({"e":408820,"n":392690});
    data.route.push({"e":408390,"n":392090});
    data.route.push({"e":407980,"n":392060});
    data.route.push({"e":407680,"n":391780});
    data.route.push({"e":407320,"n":391590});
    data.route.push({"e":406940,"n":391370});
    data.route.push({"e":406120,"n":392040});
    data.route.push({"e":405570,"n":392470});
    data.route.push({"e":405270,"n":392850});
    data.route.push({"e":404890,"n":392600});
    data.route.push({"e":404580,"n":392620});
    data.route.push({"e":404330,"n":392670});
    data.route.push({"e":404300,"n":393020});
    data.route.push({"e":404230,"n":393250});
    data.route.push({"e":404010,"n":393300});
    data.route.push({"e":403720,"n":393430});
    data.route.push({"e":403500,"n":393480});
    data.route.push({"e":403570,"n":393760});
    data.route.push({"e":403370,"n":393870});
    data.route.push({"e":403470,"n":394090});
    data.route.push({"e":403470,"n":394090});
    data.route.push({"e":403460,"n":394050});
    return data;
  }
};

mwab.lineStyle = {strokeColor: "#0000CD", strokeOpacity: 0.5, strokeWidth: 4.5};


mwab.renderMap = function(){
  mwab.loadData().then(mwab.mapBuilder)
}

mwab.mapBuilder = function(pointData){
//variables for routes
var linesLayer, points, lineFeature, lineString, routeMarkersLayer, routepos, routesize, routeoffset, routeicon;

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
osMap.setCenter(new OpenSpace.MapPoint(pointData.center.e, pointData.center.n),7);

for(var i = 0, len = pointData.route.length; i < len; i++){
  var point = pointData.route[i];
  points.push(new OpenLayers.Geometry.Point(point.e, point.n));
}
// create a polyline feature from the array of points
lineString = new OpenLayers.Geometry.LineString(points);
lineFeature = new OpenLayers.Feature.Vector(lineString, null, mwab.lineStyle);
linesLayer.addFeatures([lineFeature]);
//crate a route start/end marker
routepos = new OpenSpace.MapPoint(pointData.start.e, pointData.start.n);
routesize = new OpenLayers.Size(33,45);
routeoffset = new OpenLayers.Pixel(-5,-37);
routeicon = new OpenSpace.Icon('https://openspace.ordnancesurvey.co.uk/osmapapi/img_versions/img_1.1/mapbuilder/routemarker-start.png', routesize, routeoffset, null, null);
routeMarkersLayer.addMarker(new OpenLayers.Marker(routepos, routeicon));
//crate a route start/end marker
routepos = new OpenSpace.MapPoint(pointData.end.e, pointData.end.n);
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
