//Global Variables
const orderUrl=`http://localhost:3000/orders`
const orderList=document.querySelector('.order-list')

//Show Order History
function showHistory(){
    axios({
        method: 'get',
        url: `${orderUrl}`
    }).then(response=>{
        console.log(response)
        if (response.data.length!==0){
            document.getElementById('default').style.display='none'
        }
        response.data.map(order=>{
            let li=document.createElement('li')
            let p1=document.createElement('p')
            let p2=document.createElement('p')
            p1.id="order-id"
            p2.id='order-price'
            p1.innerHTML=`Order ID: ${order.orderId}`
            p2.innerHTML=`Total Price: ₹ ${order.totalPrice}`
            li.appendChild(p1)
            li.appendChild(p2)
            orderList.appendChild(li)
            orderList.appendChild(document.createElement('hr'))
            JSON.parse(order.items).map(item=>{
                li=document.createElement('li')
                li.classList.add('product-history')
                let img=document.createElement('img')
                img.src=item.imageUrl
                p1=document.createElement('p')
                p2=document.createElement('p')
                let p3=document.createElement('p')
                p1.innerHTML=item.title
                p2.innerHTML='₹ '+item.price
                p3.innerHTML=`Qty: 1`
                li.appendChild(img)
                li.appendChild(p1)
                li.appendChild(p2)
                li.appendChild(p3)
                orderList.appendChild(li)
            })
        })
    }).catch(err=>{
        console.log(err)
    })
}

window.addEventListener('DOMContentLoaded', ()=>{
    showHistory()
})

