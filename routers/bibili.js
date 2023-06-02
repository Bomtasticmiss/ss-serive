
(function () {
    document.querySelector(".bili-dyn-more__btn").click();
    document.getElementsByClassName("bili-dyn-more__menu__item")[1].click();
    setTimeout(()=>{
        document.querySelector('.bili-modal__footer').children[0].click();
    },100)
})()