var site = require('./build.js');

site.build(function(err){
	if (err) throw err;
});