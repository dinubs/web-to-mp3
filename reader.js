var read = require('read-art');

read.use(function() {
  this.skipTags('br, hr, img');
  this.regexps.positive(/section/i);
  this.regexps.unlikely(/graf--empty/i);
  
});

module.exports = {
  get: function(url, options, cb) {
    read(url, options, function(err, article) {
      return cb({
        title: article.title,
        content: article.content
      });
    });
  },
  getJson: function(url, cb) {
    var opts = {
      output: {
        type: 'json',
        stripSpaces: true,
        break: true
      }
    };
    this.get(url, opts, cb);
  }  
}
