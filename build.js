//require('harmonize')();

var Metalsmith = require('metalsmith'),
 branch = require('metalsmith-branch'),
  sass = require('metalsmith-sass'),
  dateFormatter = require('metalsmith-date-formatter'),
  layouts = require('metalsmith-layouts'),
  markdown   = require('metalsmith-markdown'),
  permalinks = require('metalsmith-permalinks'),
  collections = require('metalsmith-collections'),
  excerpts = require('metalsmith-excerpts'),
  tags = require('./lib/metalsmith-tag-edit.js'),
  //imagemin = require('metalsmith-imagemin'),
  sitemap = require('metalsmith-sitemap'),
  drafts = require('metalsmith-drafts'),
  moment = require('moment'),
  LatLon = require('./node_modules/geodesy/npm.js').LatLonEllipsoidal,
  OsGridRef = require('./node_modules/geodesy/npm.js').OsGridRef;



var my_plugin = function (options) {

    function isGPX(filename){
      var pattern = /\.gpx/;
      return pattern.test(filename);
    }

    function toJSON(xml){
      var p = require("xml-js");
      var json =  p.xml2json(xml, {compact: true});
      return JSON.parse(json);
    }

    return function (files, metalsmith, done) {

        // Does nothing and calls done() to tell Metalsmith it has finished
        Object.keys(files).forEach(function(file){
            if(!isGPX(file))
              return;
            console.log(file);
            var newFile = {};//files[file];
            var xml = files[file].contents.toString();
            var json = toJSON(xml);

            var track = json.gpx.trk.trkseg.trkpt;
            var data = {};
            var grid_refs = [];
            var lats = [];
            var lons = [];

            for(var i = 0, l = track.length; i < l; i++){
              var ll = new LatLon(track[i]._attributes.lat, track[i]._attributes.lon);
              lats.push(track[i]._attributes.lat);
              lons.push(track[i]._attributes.lon);
              grid_refs.push(OsGridRef.latLonToOsGrid(ll));
            }

            var maxLat = Math.max.apply(null, lats);
            var minLat = Math.min.apply(null, lats);
            var maxLon = Math.max.apply(null, lons);
            var minLon = Math.min.apply(null, lons);


            var centerLat = ((maxLat - minLat)/2) + minLat;
            var centerLon = ((maxLon - minLon)/2) + minLon;

            data.center = OsGridRef.latLonToOsGrid(new LatLon(centerLat, centerLon));

            data.route = grid_refs
            newFile.contents = new Buffer(JSON.stringify(data), "utf-8");
            var fileNameData = file.split("/");
            fileNameData[fileNameData.length - 1] = "route.json";
            var newFilename = fileNameData.join("/");
            files[newFilename] = newFile;
        });
        done();
    };
};


module.exports = Metalsmith(__dirname)
  .metadata({
    site: {
      title: 'MudWetandBeers.com',
      lead: 'Walks for normal people.',
      url: 'http://mudwetandbeers.com',
      build_time: new Date(),
      build_number: process.env.SNAP_PIPELINE_COUNTER  || 'local build'
    }
  })
  .source('./src')
  .use(drafts())
  .use(my_plugin())
  .use(dateFormatter({
    dates: [ { key: 'publishDate', format: 'MMM YYYY'}]
  }))
  .use(collections({
    featured: {
      pattern: 'walks/*/*.md',
      sortBy: 'date',
      limit: 5
    },
    walks: {
      pattern: 'walks/*/*.md',
      sortBy: 'date',
      reverse: true
    },
    blog: {
      pattern: 'blog/*.md',
      sortBy: 'date'
    }
  }))
  .use(markdown())
  .use(excerpts())
  .use(branch('walks/*/*.html')
    .use(permalinks({
      pattern:'walks/:title/'
    }))
  )
  .use(branch('blog/*.html')
    .use(permalinks({
      pattern:'blog/:title/'
    }))
  )
  .use(branch('**.html')
    .use(branch('!index.html')
      .use(permalinks({
        pattern:':title'
      }))
    )
  )
  .use(tags({
    title: "Walks in :tag",
    handle: 'region',
    metadataKey: 'regions',
    path: 'region/:tag/index.html',
    pathPage: 'region/:tag/:num/index.html',
    perPage: 9,
    layout: 'tag.jade',
    slug: function(tag) { return tag.toLowerCase().split(' ').join('-'); }
  }))
  .use(tags({
    title: "Walks in :tag",
    handle: 'wainwright',
    metadataKey: 'wainwright',
    path: 'wainwright/:tag/index.html',
    pathPage: 'wainwright/:tag/:num/index.html',
    perPage: 9,
    layout: 'tag.jade',
    slug: function(tag) { return tag.toLowerCase().split(' ').join('-'); }
  }))
  .use(tags({
    title: ":tag Walks",
    handle: 'grade',
    path: 'grade/:tag/index.html',
    pathPage: 'grade/:tag/:num/index.html',
    perPage: 9,
    layout: 'tag.jade',
    slug: function(tag) { return tag.toLowerCase().split(' ').join('-'); }
  }))
  .use(tags({
    title: "Walks in map :tag",
    handle: 'maps',
    metadataKey: 'map',
    path: 'map/:tag/index.html',
    pathPage: 'map/:tag/:num/index.html',
    perPage: 9,
    layout: 'tag.jade',
    slug: function(tag) { return tag.toLowerCase().split(' ').join('-'); }
  }))
  .use(layouts({
    engine: 'jade',
    moment: moment
  }))
  .use(sitemap({hostname: 'http://mudwetandbeers.com'}))
  .destination('./build')
  .use(sass({
    outputDir: function(originalPath) {
        // this will change scss/some/path to css/some/path
        return originalPath.replace("scss", "css");
    },
    outputStyle: "compressed"
  }));
 /* .use(imagemin({
    optimizationLevel: 3
  }))
  */

