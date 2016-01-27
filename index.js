//require('harmonize')();

var Metalsmith = require('metalsmith'),
 branch = require('metalsmith-branch'),
	sass = require('metalsmith-sass'),
	layouts = require('metalsmith-layouts'),
  markdown   = require('metalsmith-markdown'),
  permalinks = require('metalsmith-permalinks'),
  collections = require('metalsmith-collections');

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
  .use(branch('posts/**.html')
    .use(permalinks({
      pattern:':collection/:title'
    }))
  )
  .use(branch('**.html')
    .use(branch('!index.html')
      .use(branch('!404.html')
        .use(permalinks({
          pattern:':title'
        }))
      )
    )
  )
  .use(layouts({
    engine: 'jade'
  }))
  .use(sass({
  	outputDir: function(originalPath) { 
    		// this will change scss/some/path to css/some/path 
    		return originalPath.replace("scss", "css");
  	}
  }))
    .destination('./build')
    .build(function(err){
    	if (err) throw err;
  	});