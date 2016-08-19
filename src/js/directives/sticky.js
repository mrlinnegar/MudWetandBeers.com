app.directive('sticky', function($window, MapProvider){
  var elements = [];
  var sticky_element = angular.element(document.querySelector('#sticky-anchor'));

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


  angular.element($window).bind("scroll", function(e) {
    for(var i = 0; i < elements.length; i++){
      if($window.pageYOffset > offset(sticky_element).top) {
        elements[i].addClass("fixed");
      } else {
        elements[i].removeClass("fixed");
      }
    }

  });

  return {
    scope: false,
    link: function ($scope, $element, $attr) {
      $scope.jimbo = [];
      $scope.jimbo.push("Point");
      elements.push($element);
    }
  };
})
