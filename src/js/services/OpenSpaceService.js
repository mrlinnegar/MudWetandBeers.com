app.service('OpenSpaceService', function(){
  var script = window.document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://openspace.ordnancesurvey.co.uk/osmapapi/openspace.js?key=02020AC47FF123EBE0530B6CA40A2D86';
  document.getElementsByTagName('head')[0].appendChild(script);

  script.onload = function() {
      alert( 'loaded' );
  }
});
