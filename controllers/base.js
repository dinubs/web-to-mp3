var async = require('async');
var reader = require('../reader');
var Podcaster = require('../podcaster');
var fs = require('fs');

module.exports = {
  index: function(req, res) {
    res.view('base/index', {title: 'Hello'});    
  },
  get: function(req, res) {
    reader.getJson(req.query.url,
      function(article) {
        console.log(article.title); 
        console.log(article.content);
        res.view('base/get', {title: article.title, content: article.content});
        
        var textStrings = article.content.map(function(article) {
          return article.value;
        });
        
        Podcaster.createAudioFromText(textStrings, article.title);
        
      });
  },
  getAudio: function(req, res) { 
    res.file('../' + req.query.name + '/done.mp3');
    
  },
  list: function(req, res) {
    var files = fs.readdirSync(__dirname + '/../audios');
    files.shift();
    res.view('base/list', {pods: files});
    
  }
}