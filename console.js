function tab() {
  if (chrome.tabs) {
    chrome.tabs.query({ url: "https://www.twitch.tv/*" }, function(tabs) {
      tabs.forEach(function () { (tabs2) => {
           console.log(tabs2)
          chrome.tabs.executeScript(tabs2.id, { code: `(${click})();` });
        }
      });
     })
  } else {
    console.error("chrome.tabs API가 로드되지 않았습니다.");
  }
}
setInterval(()=>{
  tab()
},1000)