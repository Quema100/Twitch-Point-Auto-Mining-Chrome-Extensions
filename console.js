function tab() {
    if (chrome.tabs) {
      chrome.tabs.query({ active: true }, function(tabs) {
        console.log(tabs)
        tabs.forEach(function (tabs2) { () => {
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

function window(){
  if (chrome.windows && chrome.tabs) {
    chrome.windows.getAll({ populate: true }, function (windows) {
      windows.forEach( (window) => {
        chrome.windows.update(window.id, { focused: true },  () => {
          chrome.tabs.query({ windowId: window.id, url: "https://www.twitch.tv/*" }, (tabs) => {
            tabs.forEach( (tab) => {
              chrome.tabs.update(tab.id, { active: true });
            });
          });
        });
      });
    });
  } else {
    console.error("chrome.windows 또는 chrome.tabs API가 로드되지 않았습니다.");
  }
}

setInterval(()=>{
    window()
},6000)