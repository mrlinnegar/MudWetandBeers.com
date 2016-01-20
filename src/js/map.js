//variables for routes
var linesLayer, points, lineFeature, lineString, routeMarkersLayer, routepos, routesize, routeoffset, routeicon;
var style_blue = {strokeColor: "#0000CD", strokeOpacity: 0.5, strokeWidth: 4.5};

function initmapbuilder()
{
//initiate the map
var options = {resolutions: [2500, 1000, 500, 200, 100, 50, 25, 10, 5, 4, 2.5, 2, 1]};
osMap = new OpenSpace.Map('map', options);

//configure map options (basicmap.js)
setglobaloptions();
//set the center of the map and the zoom level
osMap.setCenter(new OpenSpace.MapPoint(406535,394140),7);
linesLayer = osMap.getVectorLayer();
// Set up layer for route markers
routeMarkersLayer = new OpenLayers.Layer.Markers("Route Markers");
//make a route
points = new Array();
points.push(new OpenLayers.Geometry.Point(339350,470010));
// create a polyline feature from the array of points
lineString = new OpenLayers.Geometry.LineString(points);
lineFeature = new OpenLayers.Feature.Vector(lineString, null, style_blue);
linesLayer.addFeatures([lineFeature]);
//make a route
points = new Array();
points.push(new OpenLayers.Geometry.Point(403480,394120));
points.push(new OpenLayers.Geometry.Point(403990,394200));
points.push(new OpenLayers.Geometry.Point(404130,394180));
points.push(new OpenLayers.Geometry.Point(404200,394690));
points.push(new OpenLayers.Geometry.Point(404220,395000));
points.push(new OpenLayers.Geometry.Point(404430,395330));
points.push(new OpenLayers.Geometry.Point(404390,395600));
points.push(new OpenLayers.Geometry.Point(404530,395860));
points.push(new OpenLayers.Geometry.Point(404240,396250));
points.push(new OpenLayers.Geometry.Point(404360,396310));
points.push(new OpenLayers.Geometry.Point(404650,396170));
points.push(new OpenLayers.Geometry.Point(404950,396300));
points.push(new OpenLayers.Geometry.Point(405220,396600));
points.push(new OpenLayers.Geometry.Point(405490,396960));
points.push(new OpenLayers.Geometry.Point(405810,397020));
points.push(new OpenLayers.Geometry.Point(406190,396890));
points.push(new OpenLayers.Geometry.Point(406250,396750));
points.push(new OpenLayers.Geometry.Point(406560,396720));
points.push(new OpenLayers.Geometry.Point(406950,396430));
points.push(new OpenLayers.Geometry.Point(407520,396460));
points.push(new OpenLayers.Geometry.Point(408040,396580));
points.push(new OpenLayers.Geometry.Point(408140,396460));
points.push(new OpenLayers.Geometry.Point(408610,396540));
points.push(new OpenLayers.Geometry.Point(408930,396600));
points.push(new OpenLayers.Geometry.Point(409240,396520));
points.push(new OpenLayers.Geometry.Point(409390,396100));
points.push(new OpenLayers.Geometry.Point(409320,395530));
points.push(new OpenLayers.Geometry.Point(409500,395160));
points.push(new OpenLayers.Geometry.Point(409760,394770));
points.push(new OpenLayers.Geometry.Point(409910,394370));
points.push(new OpenLayers.Geometry.Point(409700,394060));
points.push(new OpenLayers.Geometry.Point(409370,393790));
points.push(new OpenLayers.Geometry.Point(409080,393460));
points.push(new OpenLayers.Geometry.Point(408900,393090));
points.push(new OpenLayers.Geometry.Point(408820,392690));
points.push(new OpenLayers.Geometry.Point(408390,392090));
points.push(new OpenLayers.Geometry.Point(407980,392060));
points.push(new OpenLayers.Geometry.Point(407680,391780));
points.push(new OpenLayers.Geometry.Point(407320,391590));
points.push(new OpenLayers.Geometry.Point(406940,391370));
points.push(new OpenLayers.Geometry.Point(406120,392040));
points.push(new OpenLayers.Geometry.Point(405570,392470));
points.push(new OpenLayers.Geometry.Point(405270,392850));
points.push(new OpenLayers.Geometry.Point(404890,392600));
points.push(new OpenLayers.Geometry.Point(404580,392620));
points.push(new OpenLayers.Geometry.Point(404330,392670));
points.push(new OpenLayers.Geometry.Point(404300,393020));
points.push(new OpenLayers.Geometry.Point(404230,393250));
points.push(new OpenLayers.Geometry.Point(404010,393300));
points.push(new OpenLayers.Geometry.Point(403720,393430));
points.push(new OpenLayers.Geometry.Point(403500,393480));
points.push(new OpenLayers.Geometry.Point(403570,393760));
points.push(new OpenLayers.Geometry.Point(403370,393870));
points.push(new OpenLayers.Geometry.Point(403470,394090));
points.push(new OpenLayers.Geometry.Point(403470,394090));
points.push(new OpenLayers.Geometry.Point(403460,394050));
// create a polyline feature from the array of points
lineString = new OpenLayers.Geometry.LineString(points);
lineFeature = new OpenLayers.Feature.Vector(lineString, null, style_blue);
linesLayer.addFeatures([lineFeature]);
//crate a route start/end marker
routepos = new OpenSpace.MapPoint(403480,394120);
routesize = new OpenLayers.Size(33,45);
routeoffset = new OpenLayers.Pixel(-5,-37);
routeicon = new OpenSpace.Icon('https://openspace.ordnancesurvey.co.uk/osmapapi/img_versions/img_1.1/mapbuilder/routemarker-start.png', routesize, routeoffset, null, null);
routeMarkersLayer.addMarker(new OpenLayers.Marker(routepos, routeicon));
//crate a route start/end marker
routepos = new OpenSpace.MapPoint(403460,394050);
routesize = new OpenLayers.Size(33,45);
routeoffset = new OpenLayers.Pixel(-5,-37);
routeicon = new OpenSpace.Icon('https://openspace.ordnancesurvey.co.uk/osmapapi/img_versions/img_1.1/mapbuilder/routemarker-end.png', routesize, routeoffset, null, null);
routeMarkersLayer.addMarker(new OpenLayers.Marker(routepos, routeicon));
osMap.addLayer(routeMarkersLayer);}