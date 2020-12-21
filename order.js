const mongoose=require('mongoose')
const orderSchema=new mongoose.Schema({

     loginid:{type:String,required:true},

     products:{type:Array,default:[]},
     date:{type:String,default:((new Date()).getDate()+"-"+(new Date()).getMonth()+"-"+(new Date()).getFullYear())}



})

module.exports=mongoose.model('orders',orderSchema)