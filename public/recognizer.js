const commands = {
  'stop': function () {
    recognized('Stop');
    sendAction('play_pause');
  },
  'play': function () {
    recognized('Play');
    sendAction('play_pause');
  },
  'next': function () {
    recognized('Next song');
    sendAction('next');
  },
  'previous': function () {
    recognized('Previous song');
    sendAction('previous');
  },
  'loud': function () {
    recognized('Volume up');
    sendAction('adjust_spotify_volume', 'up');
  },
  'down': function () {
    recognized('Volume down');
    sendAction('adjust_spotify_volume', 'down');
  },
  'library': function () {
    recognized('Like');
    like();
  },
  'light': function () {
    recognized('Like');
    like();
  },
  ':nomatch': function (message) {
    recognized(`${message} not recognized`);
  }
};

annyang.addCommands(commands);
annyang.start();

annyang.addCallback('error', function (err) {
  console.log('error', err);
  // location.reload();
});
// setTimeout(function() { location.reload(); }, 60000);
