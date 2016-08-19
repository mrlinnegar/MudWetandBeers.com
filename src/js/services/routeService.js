app.service("RouteService", function($http, $q){
  var routeService = {}
  routeService.getRoute = function getRoute(){
    return $http.get('./route.json').then(function(response){
        return response;
      },
      function(response){
        return $q.reject(response); //something bad happened
      })
  }
  return routeService;
});
