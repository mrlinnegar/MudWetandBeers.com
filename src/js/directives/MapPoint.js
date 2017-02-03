app.directive('mapPoint', function($window, MapProvider, $timeout){
  var elements = [];

  function offset(elm) {
    try {return elm.offset();} catch(e) {}
    var rawDom = elm[0];
    var _x = 0;
    var _y = 0;
    var body = document.documentElement || document.body;
    var scrollX = window.pageXOffset || body.scrollLeft;
    var scrollY = window.pageYOffset || body.scrollTop;
    _x = rawDom.getBoundingClientRect().left + scrollX;
    _y = rawDom.getBoundingClientRect().top + scrollY;
    return { left: _x, top: _y };
  }

  function inView(position){
    return (
      position.top < ($window.pageYOffset + $window.innerHeight) &&
      position.top > window.pageYOffset
    );
  }


  function link ($scope, $element, $attr) {
    var scrollDelay = 250,
        scrollThrottleTimeout,
        throttled = false,
        scrollListener = function (e) {
          if(!throttled) {
            throttled = true;

            scrollThrottleTimeout = $timeout(function(){
              for (var i = 0; i < elements.length; i++) {
                if (inView(offset(elements[i]))) {
                  var ngr = angular.element(elements[i]).attr("ngr");
                  angular.element(elements[i]).parent().toggleClass('active', true);
                  MapProvider.setGridRef(ngr);
                  $scope.gridRef = ngr;

                  break;
                } else {
                  angular.element(elements[i]).parent().toggleClass('active', false);
                }


              }
              throttled = false;
            }, scrollDelay);
          }
        };

      if(typeof $scope.mapPoints == "undefined") $scope.mapPoints = [];
      $scope.mapPoints.push($attr.ngr);
      elements.push($element);
      $element.wrap('<div class="article--image"></div>');

      if($element.attr('title')) {
        $element.parent().append('<div class="image--description">' + $element.attr('title') + '</div>');
      }

      angular.element($window).bind("scroll", scrollListener);
  }

  return {
    restrict: 'A',
    scope: false,
    link: link
   };
});
