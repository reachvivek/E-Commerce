const Product = require('../models/product');
const Orders = require('../models/orders');
const CartItem = require('../models/cart-item');

const ITEMS_PER_PAGE=2

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.status(200).send(products)
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(req.params)
  Product.findByPk(prodId)
    .then(product => {
      res.status(200).send(product)
    })
    .catch(err => console.log(err));
};

exports.getIndex = async (req, res, next) => {
  console.log(req.params)
  var totalProducts;
  const page = +req.params.pageNo || 1;
  let totalItems=Product.findAll().then(response=>{
    totalProducts=response.length
  }).catch(err=>console.log(err))

  await totalItems;

  Product.findAll({offset: (page-1)*ITEMS_PER_PAGE, limit: ITEMS_PER_PAGE})
    .then(products => {
      res.status(200).send({
        products: products,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalProducts,
        hasPreviousPage: page > 1,
        nextPage:page+1,
        previousPage:page-1,
        lastPage:Math.ceil(totalProducts/ITEMS_PER_PAGE),
        totalItems: totalProducts
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};


exports.getCart =async (req, res, next) => {
  var totalCartItems;
  var totalPrice=0.00;
  const page = +req.params.pageNo || 1;
  let totalItems=req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          totalCartItems=products.length
          products.map(i=>totalPrice+=i.price)
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  
  await totalItems

  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts({offset: (page-1)*ITEMS_PER_PAGE, limit: ITEMS_PER_PAGE})
        .then(cartItems => {
          res.status(200).send({
            cartItems: cartItems,
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalCartItems,
            hasPreviousPage: page > 1,
            nextPage:page+1,
            previousPage:page-1,
            lastPage:Math.ceil(totalCartItems/ITEMS_PER_PAGE),
            totalItems: totalCartItems,
            totalPrice:totalPrice
          })
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));

};

exports.addToCart = (req, res, next) => {
  const prodId = req.params.productId;
  // console.log(req.params)
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then((response) => {
      console.log(response)
      res.status(201).send(response)
      // res.redirect('/cart');
    })
    .catch(err => console.log(err));
};


exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then((response) => {
      console.log(response)
      res.redirect('/')
      // res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  console.log(req.params)
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: req.params.productId } });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.status(201).send(result);
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Orders.findAll().then(response=>{
    res.status(200).send(response)
  }).catch(err=>console.log(err)) 
};

exports.createOrder = (req, res, next) => {
  console.log(req.params)
  const items=[];
  const totalPrice=req.params.totalPrice
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts()})
      .then(cartItems => {
          cartItems.map(i=>{
            items.push(i)
          })
          CartItem.destroy({
            where: {},
            truncate: true
          })
        }).catch(err => console.log(err))
        .then(()=>{
          Orders.create({
            userId: 1,
            items: JSON.stringify(items),
            totalPrice: totalPrice,
          }).then(result => {
            console.log(result)
            res.status(201).send(result)
          }).catch(err=>console.log(err))
    })
    .catch(err => console.log(err));
};
