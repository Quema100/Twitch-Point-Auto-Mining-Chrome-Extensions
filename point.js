chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "performClick") {
    click();
  }
});

function click() {
  // 특정 요소의 생성을 감지하여 자동 클릭
  const targetElementEn = document.querySelector('button[aria-label="Claim Bonus"]');
  if (targetElementEn) {
    targetElementEn.click();
    console.log('포인트 얻기 완료')
  }

  // 특정 요소의 생성을 감지하여 자동 클릭
  const targetElementKo = document.querySelector('button[aria-label="보너스 받기"]');
  if (targetElementKo) {
    targetElementKo.click();
    console.log('포인트 얻기 완료')
  }
}