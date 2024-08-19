let previousTabId = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const activeTab = await chrome.tabs.get(activeInfo.tabId);
  
  if (activeTab.url.includes("youtube.com/watch")) {
    // Pause video in the previous tab if it was YouTube
    if (previousTabId !== null) {
      chrome.tabs.sendMessage(previousTabId, { action: "pause" });
    }
    // Play video in the current tab
    chrome.tabs.sendMessage(activeInfo.tabId, { action: "play" });
    previousTabId = activeInfo.tabId;
  } else {
    // If the active tab is not YouTube, don't set it as previous
    previousTabId = null;
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId === previousTabId && !tab.url.includes("youtube.com/watch")) {
    previousTabId = null; // Reset if the previous tab is no longer YouTube
  }
});
