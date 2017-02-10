chrome.runtime.onConnect.addListener(function (port) {
  chrome.browserAction.onClicked.addListener(function (tab) {
    port.postMessage({action: 'click_icon'});
  });
});
