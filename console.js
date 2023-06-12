chrome.runtime.onInstalled.addListener(function() {
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "click") {
      chrome.tabs.sendMessage(sender.tab.id, { action: "performClick" });
    }
  });
  
  // 확인을 위한 콘솔 메시지 출력
  setInterval(function() {
    console.log("확장 프로그램이 작동 중입니다.");
  }, 1000); // 5초마다 메시지 출력
});