chrome.runtime.onConnect.addListener(function (port) {

  let current_count = 0;

  chrome.browserAction.onClicked.addListener(function (tab) {
    port.postMessage({action: 'click_icon'});
  });
});