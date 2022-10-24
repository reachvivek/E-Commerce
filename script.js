const text=" The Generics "
const products=document.getElementById('products')
const qty=document.querySelector('.cart-number')
const toast=document.getElementById('toast')
const cart=document.getElementById('cart')
const seeCart=document.getElementById('open-cart')
const closeCart=document.getElementById('close')
const items=document.querySelectorAll('.item')
const total=document.getElementById('total')
const remove=document.getElementById('items')
console.log(items)

remove.addEventListener('click', removeItem)

seeCart.addEventListener('click', showCart)
cart.addEventListener('click', showCart)
products.addEventListener('click', addToCart)
closeCart.addEventListener('click', hideCart)

let count=0, cartTotal=0.00

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
            items[0].style.display="flex"
            cartTotal+=549.99
        }
        break;
        case '2':   {
            createNotification('Album 2')
            items[1].style.display="flex"
            cartTotal+=749.99
        }
        break;
        case '3':   {
            createNotification('Album 3')
            items[2].style.display="flex"
            cartTotal+=439.99
        }
        break;
        case '4':   {
            createNotification('Album 4')
            items[3].style.display="flex"
            cartTotal+=849.99
        }
        break;
        case '5':   {
            createNotification('T-Shirt')
            items[4].style.display="flex"
            cartTotal+=499.99
        }
        break;
        case '6':   {
            createNotification('Coffee Cup')
            items[5].style.display="flex"
            cartTotal+=349.99
        }
        break;
    }    
    total.innerHTML=`₹ ${parseFloat(cartTotal).toFixed(2)}`
}

function removeItem(e){
    switch(e.target.id){
        case '1':   {
            items[0].style.display="none"
            cartTotal-=549.99
        }
        break;
        case '2':   {
            items[1].style.display="none"
            cartTotal-=749.99
        }
        break;
        case '3':   {
            items[2].style.display="none"
            cartTotal-=439.99
        }
        break;
        case '4':   {
            items[3].style.display="none"
            cartTotal-=849.99
        }
        break;
        case '5':   {
            items[4].style.display="none"
            cartTotal-=499.99
        }
        break;
        case '6':   {
            items[5].style.display="none"
            cartTotal-=349.99
        }
        break;
    }
    total.innerHTML=`₹ ${parseFloat(cartTotal).toFixed(2)}`
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