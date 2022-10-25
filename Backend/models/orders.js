const Sequelize=require('sequelize')

const sequelize=require('../util/database')

const Orders=sequelize.define('orders', {
    orderId:{
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    userId:{
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    items:{
        type: Sequelize.STRING,
        allowNull:false
    },
    totalPrice:{
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

module.exports=Orders;