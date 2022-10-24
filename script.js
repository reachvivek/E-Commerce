const text=" The Generics "
const products=document.getElementById('products')
const qty=document.querySelector('.cart-number')
const toast=document.getElementById('toast')
const cart=document.getElementById('cart')
const closeCart=document.getElementById('close')

cart.addEventListener('click', showCart)
products.addEventListener('click', addToCart)
closeCart.addEventListener('click', hideCart)

let count=0

function showCart(){
    document.getElementById('popup-container').style.display="flex"
}

function hideCart(){
    document.getElementById('popup-container').style.display="none"
}


function addToCart(e){
    count++;
    qty.innerHTML=count
    console.log(e.target.id)
    switch(e.target.id){
        case '1':   {
            createNotification('Album 1')
        }
        break;
        case '2':   {
            createNotification('Album 2')
        }
        break;
        case '3':   {
            createNotification('Album 3')
        }
        break;
        case '4':   {
            createNotification('Album 4')
        }
        break;
        case '5':   {
            createNotification('T-Shirt')
        }
        break;
        case '6':   {
            createNotification('Coffee Cup')
        }
        break;
    }
}

function createNotification(prod){
    const notif=document.createElement('div')
    notif.classList.add('toast');
    notif.innerText=`Your Product: ${prod} is added to cart!`
    toast.appendChild(notif);
    setTimeout(()=>{
        notif.remove()
    }, 5000)
}

let index=0

function writeText(){
    document.querySelector('#header h1').innerText=text.slice(0,index)
    index++
    if(index>text.length-1){
        index=0
    }
}

setInterval(writeText, 400)