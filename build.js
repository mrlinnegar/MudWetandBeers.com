//require('harmonize')();

var Metalsmith = require('metalsmith'),
 branch = require('metalsmith-branch'),
  sass = require('metalsmith-sass'),
  layouts = require('metalsmith-layouts'),
  markdown   = require('metalsmith-markdown'),
  permalinks = require('metalsmith-permalinks'),
  collections = require('metalsmith-collections'),
  excerpts = require('metalsmith-excerpts'),
  tags = require('./lib/metalsmith-tag-edit.js'),
  imagemin = require('metalsmith-imagemin'),
  sitemap = require('metalsmith-sitemap'),
  moment = require('moment');

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
  .use(collections({
    walks: {
      pattern: 'walks/*/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown())
  .use(excerpts())
  .use(branch('walks/*/*.html')
    .use(permalinks({
      pattern:':collection/:title/'
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
    handle: 'tags',
    path: ':tag/index.html',
    pathPage: ':tag/:num/index.html',
    perPage: 2,
    layout: 'tag.jade',
    slug: function(tag) { return tag.toLowerCase().replace(' ','-'); }
  }))
  .use(layouts({
    engine: 'jade',
    moment: moment
  }))
  .use(sass({
    outputDir: function(originalPath) {
        // this will change scss/some/path to css/some/path
        return originalPath.replace("scss", "css");
    },
    outputStyle: "compressed"
  }))
  .use(imagemin({
    optimizationLevel: 3
  }))
  .use(sitemap({hostname: 'http://mudwetandbeers.com'}))
  .destination('./build');
