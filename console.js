let isActivated = false; // 변수 추가

function activateAllTabs() {
  if (isActivated) return; // 이미 작동 중인 경우 중복 실행 방지

  isActivated = true; // 작동 플래그 설정

  chrome.tabs.query({ url: "https://www.twitch.tv/*" }, function(tabs) {
    let index = 0;

    function activateNextTab() {
      if (index < tabs.length) {
        const tab = tabs[index];
        if (!tab.active && !tab.discarded) {
          chrome.tabs.update(tab.id, { active: true }, function(updatedTab) {
            if (chrome.runtime.lastError) {
              setTimeout(activateNextTab, 5000); // 5초 딜레이 후 다음 탭 활성화
            } else {
              console.log("Tab activated:", updatedTab);
            }
          });
        }
        index++; // Move to the next tab

        if (index < tabs.length) {
          setTimeout(activateNextTab, 5000); // 5초 딜레이 후 다음 탭 활성화
        } else {
          setTimeout(() => {
            isActivated = false; // 작동 플래그 초기화
            activateAllTabs(); // 모든 탭 처리 완료 후 재시작
          }, 7000); // 7초 딜레이 후 재시작
        }
      }
    }

    activateNextTab();
  });
}

activateAllTabs(); // 최초 접속 시 작동

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && tab.url.startsWith("https://www.twitch.tv/")) {
    setTimeout(activateAllTabs, 7000); // Delay before activating tabs after an update
    console.log('업데이트')
  }
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  chrome.tabs.query({ url: "https://www.twitch.tv/*" }, function(tabs) {
    // Check if the removed tab is included in the current tabs list
    const removedTab = tabs.find(tab => tab.id === tabId);
    if (!removedTab) {
      setTimeout(activateAllTabs, 7000); // Delay before activating tabs after a tab removal
    }
  });
});