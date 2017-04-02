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
  var addedNodes, text;

  mutations = mutations.filter(function(record) {
    return record.addedNodes.length > 0;
  });

  if (mutations.length === 0) { return; }

  addedNodes = mutations[0].addedNodes;

  if (addedNodes.length > 0) {
    text = addedNodes[0].innerText;

    if (text && text.toLowerCase().includes('draw')) {
      droooow();
    }
  }
};

var init = function() {
  var drowObserver = new MutationObserver(handleMutation);
  var config = { childList: true };
  var elChat = document.querySelector('.discussion .messages');
  var elControlButtons = document.querySelector('.lichess_ground .control.buttons');

  drowObserver.observe(elControlButtons, config);
};

// Blah
window.setTimeout(init, 1000);
