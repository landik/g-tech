window.addEventListener('load',()=>{
    const iter = document.getElementsByClassName('mask')[Symbol.iterator]();
    for (const item of iter) {
        item.classList.add('mask_show');
    }
})

