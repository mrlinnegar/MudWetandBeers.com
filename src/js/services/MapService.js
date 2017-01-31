app.service('MapProvider', function(NGRTOEN){
  var options = {resolutions: [100, 50, 25, 10, 5], controls:[]};
  var nc = new OpenLayers.Control.Navigation();
  nc.activate = function() {
    this.dragPan.activate();
    return
  };
  var osMap = new OpenSpace.Map('map', options);
  osMap.addControl(nc);

  var routeMarkersLayer = new OpenLayers.Layer.Markers("Route Markers");
  var currentRef = "";
  var points = [];
  var markers = [];
  var selected_marker = null;


  function addPoint(ref){
    var data = NGRTOEN(ref);
    console.log(data);
    routepos = new OpenSpace.MapPoint(data.e,data.n);
    routesize = new OpenLayers.Size(50,50);
    routeoffset = new OpenLayers.Pixel(0, 0);
    routeicon = new OpenSpace.Icon('/images/icons/point.png', routesize, routeoffset, null, null);
    var marker = new OpenLayers.Marker(routepos, routeicon)
    markers.push(marker);
    routeMarkersLayer.addMarker(marker);
  }


  function addSelectedPoint(ref){
    var data = NGRTOEN(ref);
    //routeMarkersLayer.clearMarkers();
    //console.log(routeMarkersLayer);
    routepos = new OpenSpace.MapPoint(data.e,data.n);
    routesize = new OpenLayers.Size(50,50);
    routeoffset = new OpenLayers.Pixel(0, 0);
    routeicon = new OpenSpace.Icon('/images/icons/point-selected.png', routesize, routeoffset, null, null);

    if(selected_marker) {
      console.log(selected_marker);
      routeMarkersLayer.removeMarker(selected_marker);
    }

    console.log(routeMarkersLayer.markers);
    console.log(selected_marker);
    selected_marker = new OpenLayers.Marker(routepos, routeicon);
    routeMarkersLayer.addMarker(selected_marker);
  }

  function setCenter(e,n){
    osMap.setCenter(new OpenSpace.MapPoint(e, n), 7);
  }

  return {
    setCenter: setCenter,
    setGridRef: function(ref){
      if(ref != currentRef){
        var data = NGRTOEN(ref);
        osMap.setCenter(new OpenSpace.MapPoint(data.e, data.n), 7);
        currentRef = ref;
        addSelectedPoint(ref);
      }
    },
    setPoints: function(points){

      for(var i = 0; i < points.length;i++){
        addPoint(points[i]);
      }
    },
    setRoute: function(pointData){

      //set the center of the map and the zoom level
      linesLayer = osMap.getVectorLayer();
      // Set up layer for route markers


      //make a route
      osMap.setCenter(new OpenSpace.MapPoint(pointData[0].easting,pointData[0].northing), 6);

      for(var i = 0, len = pointData.length; i < len; i++){
        var point = pointData[i];
        points.push(new OpenLayers.Geometry.Point(Math.floor(point.easting), Math.floor(point.northing)));
      }
      // create a polyline feature from the array of points
      lineString = new OpenLayers.Geometry.LineString(points);
      lineFeature = new OpenLayers.Feature.Vector(lineString, null, {strokeColor: "#0000CD", strokeOpacity: 0.5, strokeWidth: 10});
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
  };
})
