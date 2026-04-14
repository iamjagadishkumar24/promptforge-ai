// Background service worker — registers right-click context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "promptforge-optimize",
    title: "⚡ Optimize with PromptForge AI",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "promptforge-optimize") {
    chrome.storage.local.set({ selectedText: info.selectionText });
    chrome.action.openPopup();
  }
});
