// Global Variables
const productsUrl=`http://localhost:3000/products`
const cartUrl=`http://localhost:3000/cart`
const text=" The Generics "
const products=document.getElementById('products')
const qty=document.querySelector('.cart-number')
const toast=document.getElementById('toast')
const cart=document.getElementById('cart')
const seeCart=document.getElementById('open-cart')
const closeCart=document.getElementById('close')
const items=document.getElementById('items')
const total=document.getElementById('total')

//Event Listeners
seeCart.addEventListener('click', showCart)
cart.addEventListener('click', showCart)
products.addEventListener('click', addToCart)
closeCart.addEventListener('click', hideCart)
items.addEventListener('click', removeItem)


// Show Products
async function showProducts(){
    await axios({
        method: 'get',
        url: productsUrl
    }).then(response=>{
        response.data.map(product=>{
            let div=document.createElement('div')
            div.classList.add('product')
            let h3=document.createElement('h3')
            h3.innerHTML=product.title
            let img=document.createElement('img')
            img.src=product.imageUrl
            let subdiv=document.createElement('div')
            subdiv.classList.add('product-details')
            let p=document.createElement('p')
            p.innerHTML=`₹ ${product.price}`
            let button=document.createElement('button')
            button.id=product.id
            button.innerHTML="ADD TO CART"
            subdiv.appendChild(p)
            subdiv.appendChild(button)
            div.appendChild(h3)
            div.appendChild(img)
            div.appendChild(subdiv)
            products.appendChild(div)
        })

    }).catch(err=>console.log(err))
}

async function loadCart(){
    await axios({
        method: 'get',
        url: `${cartUrl}`
    }).then(response=>{
        qty.innerHTML=response.data.length
        items.innerHTML=""
        let cartTotal=0.00
        response.data.map(item=>{
            cartTotal+=item.price
            let li=document.createElement('li')
            li.classList.add('item')
            let img=document.createElement('img')
            img.src=item.imageUrl
            let p1=document.createElement('p')
            p1.innerHTML=item.title
            let p2=document.createElement('p')
            p2.innerHTML=item.price
            let qty=document.createElement('input')
            qty.classList.add('qty')
            qty.type="number"
            qty.value="1"
            let button=document.createElement('button')
            button.id=item.id
            button.innerHTML="REMOVE"
            li.appendChild(img)
            li.appendChild(p1)
            li.appendChild(p2)
            li.appendChild(qty)
            li.appendChild(button)
            items.appendChild(li)
        })
        let p=document.createElement('p')
        p.classList.add('total')
        p.innerHTML="Total "
        let total=document.createElement('span')
        total.id="total"
        total.innerHTML=`₹ ${parseFloat(cartTotal).toFixed(2)}`
        p.appendChild(total)
        items.appendChild(p)
        let button=document.createElement('button')
        button.classList.add('purchase')
        button.innerHTML="PURCHASE"
        items.appendChild(button)
    }).catch(err=>console.log(err))
}

//On DOM Content Loaded
window.addEventListener('DOMContentLoaded', ()=>{
    showProducts()
    loadCart()
})

//Show Cart Popup Modal
function showCart(){
    document.getElementById('popup-container').style.display="flex"
}

//Hide Cart Popup Modal
function hideCart(){
    document.getElementById('popup-container').style.display="none"
}


async function addToCart(e){
    await axios({
        method: 'post',
        url: `${productsUrl}/cart/${e.target.id}`
    }).then(response=>{
        if(response.status==201){
            createNotification(e.target.id)
        }
    }).catch(err=>console.log(err))

    loadCart()
}

function removeItem(e){
    axios({
        method: 'post',
        url : `${cartUrl}-delete-item/${e.target.id}`
    }).then(response=>{
        if (response.status==201){
            loadCart()
        }
        else{
            console.log(response)
        }
    }).catch(err=>console.log(err))
}

//Create Notification on Adding Product to Cart
async function createNotification(prodId){
    const notif=document.createElement('div')
    notif.classList.add('toast');
    await axios({
        method: 'get',
        url: `${[productsUrl]}/${prodId}`
    }).then(response=>{
        // console.log(response)
        notif.innerText=`Your Product: ${response.data.title} is added to cart!`
        toast.appendChild(notif);
        setTimeout(()=>notif.remove(), 5000)
    }).catch(err=>console.log(err))
}


let index=0
//Function to auto write header The Generics
function writeText(){
    document.querySelector('#header h1').innerText=text.slice(0,index)
    index++
    if(index>text.length-1){
        index=0
    }
}

setInterval(writeText, 400)