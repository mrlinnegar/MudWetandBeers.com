require('harmonize')();

var Metalsmith = require('metalsmith'),
	sass = require('metalsmith-sass'),
	layouts = require('metalsmith-layouts'),
    markdown   = require('metalsmith-markdown');


Metalsmith(__dirname)
	.source('./src')
    .destination('./build')
    .use(sass({
    	outputDir: function(originalPath) { 
      		// this will change scss/some/path to css/some/path 
      		return originalPath.replace("scss", "css");
    	}
  	}))
    // .use(layouts({
    //   engine: 'handlebars',
    //   partials: 'partials'
    // }))
    .build(function(err){
    	if (err) throw err;
  	});