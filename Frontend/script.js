// Global Variables
const shopUrl=`https://nodeexp-ecommerce-app.herokuapp.com/pagination/`
const productsUrl=`https://nodeexp-ecommerce-app.herokuapp.com/products`
const cartUrl=`https://nodeexp-ecommerce-app.herokuapp.com/cart`
const orderUrl=`https://nodeexp-ecommerce-app.herokuapp.com/orders`
const text=" The Generics "
const products=document.getElementById('products')
const qty=document.querySelector('.cart-number')
const toast=document.getElementById('toast')
const cart=document.getElementById('cart')
const seeCart=document.getElementById('open-cart')
const closeCart=document.getElementById('close')
const items=document.getElementById('items')
const pages=document.getElementById('pages-button')
var totalPrice=0.00;

//Event Listeners
pages.addEventListener('click', showProducts)
seeCart.addEventListener('click', showCart)
cart.addEventListener('click', showCart)
products.addEventListener('click', addToCart)
closeCart.addEventListener('click', hideCart)
items.addEventListener('click', removeItem)


// Show Products
async function showProducts(e){
    let pageNo;
    try {
        pageNo=e.target.id
    }
    catch(err){
        pageNo=1
    }
    await axios({
        method: 'get',
        url: `${shopUrl}${pageNo}`
    }).then(response=>{
        products.innerHTML=""
        pages.innerHTML=""
        response.data.products.map(product=>{
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

        if (response.data.lastPage>=2){
            if(response.data.currentPage==response.data.lastPage){
                let cur_btn=document.createElement('button')
                cur_btn.innerHTML=1
                cur_btn.id=1
                pages.appendChild(cur_btn)
            }
    
            if(response.data.hasPreviousPage){
                let cur_btn=document.createElement('button')
                cur_btn.innerHTML=response.data.previousPage
                cur_btn.id=response.data.previousPage
                pages.appendChild(cur_btn)
            }
            if(response.data.currentPage){
                let cur_btn=document.createElement('button')
                cur_btn.classList.add('active')
                cur_btn.innerHTML=response.data.currentPage
                cur_btn.id=response.data.currentPage
                pages.appendChild(cur_btn)
            }
            if(response.data.hasNextPage){
                let cur_btn=document.createElement('button')
                cur_btn.innerHTML=response.data.nextPage
                cur_btn.id=response.data.nextPage
                pages.appendChild(cur_btn)
            }
            if(response.data.currentPage==1){
                let cur_btn=document.createElement('button')
                cur_btn.innerHTML=response.data.lastPage
                cur_btn.id=response.data.lastPage
                pages.appendChild(cur_btn)
            }
        }


    }).catch(err=>console.log(err))
}
// Show Cart
async function loadCart(e){
    let pageNo;
    try {
        pageNo=e.target.id
    }
    catch(err){
        pageNo=1
    }

    await axios({
        method: 'get',
        url: `${cartUrl}/${pageNo}`
    }).then(response=>{
        console.log(response)
        qty.innerHTML=response.data.totalItems
        items.innerHTML=""
        response.data.cartItems.map(item=>{
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

        // Pagination Buttons for Cart
        let div=document.createElement('div')
        div.innerHTML=""
        div.classList.add('pages-container')
        if(response.data.lastPage==2){
            if(response.data.hasPreviousPage){
                let cur_btn=document.createElement('button')
                cur_btn.innerHTML=response.data.previousPage
                cur_btn.id=response.data.previousPage
                cur_btn.classList.add('cart-pages')
                div.appendChild(cur_btn)
            }
            if(response.data.currentPage){
                let cur_btn2=document.createElement('button')
                cur_btn2.innerHTML=response.data.currentPage
                cur_btn2.id=response.data.currentPage
                cur_btn2.classList.add('cart-pages-active')
                div.appendChild(cur_btn2)
            }
            if(response.data.hasNextPage){
                let cur_btn2=document.createElement('button')
                cur_btn2.innerHTML=response.data.nextPage
                cur_btn2.id=response.data.nextPage
                cur_btn2.classList.add('cart-pages')
                div.appendChild(cur_btn2)
            }
    
            items.appendChild(div)
        }
        else if(response.data.lastPage>2){
            if(response.data.currentPage==response.data.lastPage){
                let cur_btn=document.createElement('button')
                cur_btn.innerHTML=1
                cur_btn.id=1
                cur_btn.classList.add('cart-pages')
                div.appendChild(cur_btn)
            }
            if(response.data.hasPreviousPage){
                let cur_btn=document.createElement('button')
                cur_btn.innerHTML=response.data.previousPage
                cur_btn.id=response.data.previousPage
                cur_btn.classList.add('cart-pages')
                div.appendChild(cur_btn)
            }
            if(response.data.currentPage){
                let cur_btn2=document.createElement('button')
                cur_btn2.innerHTML=response.data.currentPage
                cur_btn2.id=response.data.currentPage
                cur_btn2.classList.add('cart-pages-active')
                div.appendChild(cur_btn2)
            }
            if(response.data.hasNextPage){
                let cur_btn2=document.createElement('button')
                cur_btn2.innerHTML=response.data.nextPage
                cur_btn2.id=response.data.nextPage
                cur_btn2.classList.add('cart-pages')
                div.appendChild(cur_btn2)
            }
            if(response.data.lastPage!==response.data.currentPage && !response.data.hasNextPage){
                let cur_btn2=document.createElement('button')
                cur_btn2.innerHTML=response.data.lastPage
                cur_btn2.id=response.data.lastPage
                cur_btn2.classList.add('cart-pages')
                div.appendChild(cur_btn2)
            }
            if(response.data.currentPage==1){
                let cur_btn2=document.createElement('button')
                cur_btn2.innerHTML=response.data.lastPage
                cur_btn2.id=response.data.lastPage
                cur_btn2.classList.add('cart-pages')
                div.appendChild(cur_btn2)
            }
            items.appendChild(div)
        }

        let p=document.createElement('p')
        p.classList.add('total')
        p.innerHTML="Total "
        let total=document.createElement('span')
        total.id="total"
        totalPrice=response.data.totalPrice
        total.innerHTML=`₹ ${parseFloat(response.data.totalPrice).toFixed(2)}`
        p.appendChild(total)
        items.appendChild(p)
        let button=document.createElement('button')
        button.classList.add('purchase')
        button.innerHTML="ORDER NOW"
        items.appendChild(button)

        const order=document.querySelector('.purchase')
        order.addEventListener('click', createOrder)
    }).catch(err=>console.log(err)).then(()=>{
        const cart_pages=document.querySelector('.pages-container')
        cart_pages.addEventListener('click', loadCart)
    })
}

//On DOM Content Loaded
window.addEventListener('DOMContentLoaded', ()=>{
    loadCart()
    showProducts()
})




// Place Order
function createOrder(){
    if(totalPrice==0.00|| totalPrice<1){
        alert('Cart is Empty!')
        return
    }
    axios({
        method: 'post',
        url: `${orderUrl}/${totalPrice}`
    }).then(response=>{
        alert(`Order Successfully Placed With Order ID: ${response.data.orderId}`)
        location.reload()
    }).catch(err=>console.log(err))
}

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
    if (e.target.innerHTML!=="REMOVE"){
        return
    }
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