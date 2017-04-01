'use strict';

var makeAudio = function(file, volume) {
  var audio = new Audio(chrome.extension.getURL('ogg/' + file));
  audio.volume = volume;

  return audio;
};

var droooow = function() {
  var audio = makeAudio('drow.wav', 1);
  audio.play();
};

var handleMutation = function(mutations) {
  var addedNodes = mutations[0].addedNodes;

  if (addedNodes.length > 0 && addedNodes[0].innerText.includes('offers draw')) {
    droooow();
  }
};

var init = function() {
  var drowObserver = new MutationObserver(handleMutation);
  var config = { childList: true };
  var elChat = document.querySelector('.discussion .messages');

  drowObserver.observe(elChat, config);
};

// Blah
window.setTimeout(init, 1000);
