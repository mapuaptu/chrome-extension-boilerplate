import '../icons/icon16.png';
import '../icons/icon48.png';
import '../icons/icon128.png';

chrome.runtime.onMessage.addListener((req, sender, res) => {
  req.todo === 'showPageAction' &&
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.pageAction.show(tabs[0].id);
    });
});
