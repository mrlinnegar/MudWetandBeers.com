//require('harmonize')();

var Metalsmith = require('metalsmith'),
 branch = require('metalsmith-branch'),
	sass = require('metalsmith-sass'),
	layouts = require('metalsmith-layouts'),
  markdown   = require('metalsmith-markdown'),
  permalinks = require('metalsmith-permalinks'),
  collections = require('metalsmith-collections'),
  excerpts = require('metalsmith-excerpts'),
  watch = require('metalsmith-watch'),
  serve = require('metalsmith-serve'),
  moment = require('moment');

Metalsmith(__dirname)
	.source('./src')
  .use(collections({
    walks: {
      pattern: 'walks/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown())
  .use(branch('walks/**.html')
    .use(permalinks({
      pattern:':collection/:title'
    }))
  )
  .use(branch('**.html')
    .use(branch('!index.html')
      .use(permalinks({
        pattern:':title'
      }))
    )
  )
  .use(layouts({
    engine: 'jade',
    moment: 'moment'
  }))
  .use(sass({
  	outputDir: function(originalPath) { 
    		// this will change scss/some/path to css/some/path 
    		return originalPath.replace("scss", "css");
  	}
  }))
  .use(serve({
    port: 8080,
    http_error_files: {
      404: "/page-not-found/"
    }
  }))
  .use(watch({
    paths: {
        "${source}/**/*": "**/*",
        "layouts/**/*": "**/*"
      },
    livereload: true
  }))
  .destination('./build')
  .build(function(err){
  	if (err) throw err;
	});