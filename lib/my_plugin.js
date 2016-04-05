var parser = require("../node_modules/xml2json");
var my_plugin = function (options) {


    function isGPX(filename){
      var pattern = /\.gpx/;
      return pattern.test(filename);
    }

    function toJSON(){

    }

    return function (files, metalsmith, done) {
        // Does nothing and calls done() to tell Metalsmith it has finished
        Object.keys(files).forEach(function(file){
            if(isGPX(file)){
              //console.log(files[file].contents.toString());
            }
            var file_data = files[file];
        });
        done();
    };
};

// Expose the plugin
module.exports = my_plugin;
