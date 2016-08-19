app.controller('Walk', function($scope, MapProvider, ENTONGR, RouteService){
    var walk = this;
    walk.format = ENTONGR;

    $scope.mapPoints = [];

    $scope.gridRef = "";

    RouteService.getRoute().then(function(response){
      walk.data = response.data;
      MapProvider.setCenter(walk.data.center.easting,walk.data.center.northing);
      MapProvider.setRoute(walk.data.route);
    });

    $scope.$watch("gridRef", function(){

    });

    $scope.$watch('mapPoints', function(){
      MapProvider.setPoints($scope.mapPoints);
    });

  });
