window.addEventListener('load',()=>{
    const iter = document.getElementsByClassName('animShowBl')[Symbol.iterator]();
    for (const item of iter) {
        item.classList.add('animShowBl_show');
    }
})