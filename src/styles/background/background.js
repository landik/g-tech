document.addEventListener('mousemove',event=>{
    const {x,y} = event;
    const w = window.innerWidth/2;
    const h = window.innerHeight/2;
    const image = document.getElementById('bg-img');
    // console.log(x,y,image);
    const signX = (w-x)/50,
        signY = (h-y)/50;
    image.style.transform = `translate(${ signX }px,${ signY}px) scale(1.1)`
});