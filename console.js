function tab() {
  if (chrome.tabs) {
    chrome.tabs.query({ url: "https://www.twitch.tv/*" }, function(tabs) {
      tabs.forEach(function(tab) {
        chrome.tabs.sendMessage(tab.id, { action: "click" });
      });
    });
  } else {
    console.error("chrome.tabs API가 로드되지 않았습니다.");
  }
}

setInterval(() => {
  tab();
}, 1000);