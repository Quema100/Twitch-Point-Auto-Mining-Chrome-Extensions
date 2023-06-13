function activateAllTabs() {
  chrome.tabs.query({ url: "https://www.twitch.tv/*" }, function(tabs) {
    let index = 0;

    function activateNextTab() {
      if (index < tabs.length) {
        const tab = tabs[index];
        if (!tab.active && !tab.discarded) {
          chrome.tabs.get(tab.id, function(existingTab) {
            if (chrome.runtime.lastError || !existingTab) {
              activateAllTabs()
            } else {
              chrome.tabs.update(existingTab.id, { active: true }, function(updatedTab) {
                if (chrome.runtime.lastError) {
                  console.error(chrome.runtime.lastError.message);
                } else {
                  console.log("Tab activated:", updatedTab);
                }
              });
            }
          });
        }
        index++; // Move to the next tab
      }

      if (index >= tabs.length) {
        // All tabs have been processed
        index = 0; // Reset index for the next iteration
      }

      setTimeout(activateNextTab, 4000); // Delay before activating the next tab
    }

    activateNextTab();
  });
}

activateAllTabs(); // 최초 접속 시 작동

// 탭의 상태 변경을 감지하여 처리
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && tab.url.startsWith("https://www.twitch.tv/")) {
    activateAllTabs();
  }
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  chrome.tabs.query({ url: "https://www.twitch.tv/*" }, function(tabs) {
    // Check if the removed tab is included in the current tabs list
    const removedTab = tabs.find(tab => tab.id === tabId);
    if (!removedTab) {
      // Tab is no longer present, adjust the loop
      activateAllTabs();
    }
  });
});