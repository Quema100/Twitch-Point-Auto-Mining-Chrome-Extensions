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

setInterval(()=>{
    click()
},1000)