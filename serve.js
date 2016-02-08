var watch = require('metalsmith-watch'),
    serve = require('metalsmith-serve'),
    site = require('./build.js');

site.use(serve({
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
  .build(function(err){
  	if (err) throw err;
	});
