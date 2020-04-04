window.addEventListener('load',()=>{
    const iter = document.getElementsByClassName('mask')[Symbol.iterator]();
    do{
        const {value,done} = iter.next();
        value.classList.add('mask_show');
        if (!done) break;
    }while (1)
})

