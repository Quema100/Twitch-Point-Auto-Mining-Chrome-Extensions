function nowtab() {
  if (chrome.tabs) {
    chrome.tabs.query({ url: "https://www.twitch.tv/*" }, function(tabs) {
      for (let i = 0; i < tabs.length; i++) {
        chrome.tabs.update(tabs[i].id, { active: true }, function(tab) {
          if (chrome.runtime.lastError) {
            // Error occurred, retry after a short delay
            console.error(chrome.runtime.lastError.message);
            setTimeout(function() {
              nowtab(); // Retry the tab activation
            }, 1000); // Delay in milliseconds (adjust as needed)
          } else {
            console.log("Tab activated:", tab);
          }
        });
      }
    });
  } else {
    console.error("chrome.tabs API가 로드되지 않았습니다.");
  }
}

setInterval(() => {
  nowtab();
}, 1000);