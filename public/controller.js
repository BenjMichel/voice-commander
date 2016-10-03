const IP_SPOT_DEAMON = 'http://192.168.1.91/spotcommander';

let currentSong = null;

function recognized(text) {
  var rec = document.getElementById('conversation');
  rec.innerHTML += '<div class="recognized"><div>' + text + '</div></div>';
}

function sendAction(action, data) {
  const formData = new FormData();
  formData.append('action', action);
  if (data) {
    formData.append('data', data);
  }

  const request = new XMLHttpRequest();
  request.open('POST', `${IP_SPOT_DEAMON}/main.php`);
  request.send(formData);
}

function updateNowPlaying(nowPlayingResponse) {
  const rec = document.getElementById('title');
  rec.innerHTML = `${nowPlayingResponse.title} by ${nowPlayingResponse.artist}`;
  const vol = document.getElementById('volume');
  vol.innerHTML = nowPlayingResponse.current_volume;
  const cover = document.getElementById('cover');
  cover.src = nowPlayingResponse.cover_art;
}

function like() {
  if (currentSong.actions.filter(action => action.action[0] === 'Remove from Library').length) {
    recognized('Already liked')
    return console.log('Already liked');
  }
  const request = new XMLHttpRequest();
  request.onload = function() {
    if (this.responseText === 'Track saved to library') {
      recognized('Track saved to library');
    } else {
      recognized('Error: ' + this.responseText);
    }
  };
  const formData = new FormData();
  formData.append('artist', encodeURI(currentSong.artist));
  formData.append('title', encodeURI(currentSong.title));
  formData.append('uri', currentSong.uri);
  request.open('POST', `${IP_SPOT_DEAMON}/library.php?save`);
  request.send(formData);
}


function nowPlaying() {
  const request = new XMLHttpRequest();
  request.onload = function() {
    currentSong = JSON.parse(this.responseText);
    console.log(currentSong);
    updateNowPlaying(currentSong);
  };
  request.open('POST', `${IP_SPOT_DEAMON}/nowplaying.php`);
  request.send();
  setTimeout(nowPlaying, 2000);
}

setTimeout(nowPlaying, 1000);
