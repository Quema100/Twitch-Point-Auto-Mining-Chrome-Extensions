function click (){
    // 특정 요소의 생성을 감지하여 자동 클릭
    const targetElementen = document.querySelector('button[aria-label="Claim Bonus"]');
    if (targetElementen) {
        targetElementen.click();
    }
        // 특정 요소의 생성을 감지하여 자동 클릭
    const targetElementko = document.querySelector('button[aria-label="보너스 받기"]');
    if (targetElementko) {
        targetElementko.click();
    }
}

function tab(){
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'executeScript') {
      chrome.tabs.query({ active: true }, function (tabs) {
        tabs.forEach(function (tab) {
          chrome.tabs.executeScript(tab.id, { code: `(${click})();` });
        });
      });
    }
  });
}

setInterval(()=>{
    tab()
    click ()
},1000)