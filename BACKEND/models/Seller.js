const mongoose = require('mongoose');
const router = require('../routes/seller_items');

//const Schema=mongoose.Schema;

const sellerItemScheama = new mongoose.Schema({

    product_id :{

     type:String,
     required : true

    },

    product_name :{

     type : String,
     required : true
         
    },
    
   
    description:{
    
     type:String,
     required:true
    
    
    },

    
    price :{

     type : String,
     required : true
         
    },

    })

const SellerItem=mongoose.model("seller items",sellerItemScheama);

module.exports=SellerItem;
    