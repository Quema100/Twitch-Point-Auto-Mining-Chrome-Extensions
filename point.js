function click (){
    // 특정 요소의 생성을 감지하여 자동 클릭
    const targetElement = document.querySelector('button[aria-label="Claim Bonus"]');
    if (targetElement) {
        targetElement.click();
    }
}

setInterval(()=>{
    click()
},1000)