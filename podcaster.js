var request = require('request');
var fs = require('fs');
var async = require('async');

var googleTranslateUrl = 'https://translate.google.com/translate_tts?tl=en&client=t&q=';

var Podcaster = {
  convertStringToAudio: function(text, directory, cb) {
    var strings = text.split(' ');
    var i = 0, l = strings.length;
    var compiledStrings = [];
    var currentString = '';
    for (; i < l; i++) {
      currentString += strings[i] + ' ';
      if (i % 12 === 0 && i !== 0) {
        compiledStrings.push(currentString);
        currentString = '';
      }
    }
    compiledStrings.push(currentString);
    
    console.log(googleTranslateUrl + text);
    i = 0;
    async.eachSeries(compiledStrings, function(item, callback) {
      try {
        request.get(googleTranslateUrl + item).on('end', function() {
          console.log(i);
          i++;
          callback(null);
        }).pipe(fs.createWriteStream(directory + '/' + i + '.mp3'));
      } catch (e) {
        
      }
    }, function done() {
      cb(directory);
    });
  },
  setUpFolderStructure: function setUpFolderStructure(text, identifier, cb) {
    var self = this;
    fs.mkdir('./audios/' + identifier, function(e) {
      var i = 0;
      async.eachSeries(text, function(elem, callback) {
        fs.mkdir('./audios/' + identifier + '/' + i, function(e) {
          self.convertStringToAudio(elem, './audios/' + identifier + '/' + i, function(){
            console.log('ok');
            i++;
            callback(null)
          });
        });
      }, function done() {
        console.log('finished');
        cb(identifier);
      });
    });
  },
  createAudioFromText: function(textString, folderName) {
    this.setUpFolderStructure(textString, folderName, function(identifier) {
      var clips = [];
    
      var dir = './audios/' + identifier + '/';
      var files = fs.readdirSync(dir);
      var innerFiles = []
      files.forEach(function(file) {
        innerFiles.push(fs.readdirSync(dir + file));
      });
      
      console.log(innerFiles);
      
      var finishedMp3 = fs.createWriteStream(dir + '/done.mp3');
      
      var i = 0;
      async.eachSeries(innerFiles, function(item, callback) {
        item = item.map(function(obj) {
          return parseInt(obj);
        });
        
        item.sort(function(a, b) {
          return a - b;
        });
        
        async.eachSeries(item, function(file, cb) {
          
          var currentFile = dir + i + '/' + file + '.mp3';
          console.log(currentFile);
          fs.exists(currentFile, function(exists) {
            if (!exists) {
              return cb(null);
            }
            var stream = fs.createReadStream(currentFile);
            stream.pipe(finishedMp3, {end: false});
            stream.on('end', function() {
              return cb(null);
            });
          })

        }, function() {
          i++;
          callback(null);
        })
      }, function done() {
        finishedMp3.close();
        console.log('done');
      });
    });
  } 
}

module.exports = Podcaster;