Audio.prototype.toggle = function() {
  if (this.paused) {
    this.play();
    return;
  }
  
  this.pause();
}

window.Player = new Audio();
window.currentIndex = 0;
window.Pods = []


window.Player.addEventListener('canplay', function() {
  window.Player.play();
});

window.Player.addEventListener('ended', function() {
  if (document.querySelector('.audio-click.active')) {
    document.querySelector('.audio-click.active').classList.remove('active');
  }
  window.currentIndex++
  document.querySelector('.audio-click[data-id="'+window.currentIndex+'"]').classList.add('active');
  window.Player.src = '/audios/'+ window.currentIndex + '/done.mp3';
});

function nextTrack() {
  if (document.querySelector('.audio-click.active')) {
    document.querySelector('.audio-click.active').classList.remove('active');
  }
  window.currentIndex++
  if (window.currentIndex === window.Pods.length) {
    window.currentIndex = 0;
  }
  document.querySelector('.audio-click[data-id="'+window.currentIndex+'"]').classList.add('active');
  window.Player.src = '/audios/'+ window.currentIndex + '/done.mp3';
}

function prevTrack() {
  if (document.querySelector('.audio-click.active')) {
    document.querySelector('.audio-click.active').classList.remove('active');
  }
  window.currentIndex--
  if (window.currentIndex < 0) {
    window.currentIndex = window.Pods.length - 1
  }
  document.querySelector('.audio-click[data-id="'+window.currentIndex+'"]').classList.add('active');
  window.Player.src = '/audios/'+ window.currentIndex + '/done.mp3';
}

window.addEventListener('keyup', function(e) {
  console.log(e);
  if (e.keyCode === 32) {
    window.Player.toggle();
  } 
  if(e.keyCode === 39) {
    console.log('next');
    nextTrack();
  }
  if(e.keyCode === 37) {
    console.log('prev');
    prevTrack();
  }
});

function audioFileClick() {
  if (document.querySelector('.audio-click.active')) {
    document.querySelector('.audio-click.active').classList.remove('active');
  }
  console.log(this.innerText);
  window.currentIndex = this.dataset.id;
  window.Player.src = '/audios/'+ window.currentIndex + '/done.mp3';
  this.classList.add('active');
}

window.onload = function() {  
  var files = document.querySelectorAll('.audio-click');
  if (files) {
    var i = 0;
    var l = files.length;
    
    for (; i < l; i++) {
      console.log('ok');
      files[i].addEventListener('click', audioFileClick);
      window.Pods.push(files[i].innerText);
    }
  }
  
  var aTags = document.querySelectorAll('a');
	var i = 0, l = aTags.length;

	for (i = 0; i < l; i++) {
		if (aTags[i].href === window.location.href) {
			aTags[i].classList.add('active');
      return;
		}
	}
}

window.onscroll = function() {
  if (window.scrollY > 50) {
    document.querySelector('nav').classList.add('active');
    return;
  } 
  document.querySelector('nav').classList.remove('active');
}