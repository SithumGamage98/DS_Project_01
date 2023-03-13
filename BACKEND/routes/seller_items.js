//const router = require("express").Router();
const express=require('express');
let Seller = require("../models/Seller");

const router=express.Router();

//Add items
router.route("/add").post((req,res)=>{

 const product_id = req.body.product_id;
 const product_name = req.body.product_name; 
 const description = req.body.description; 
 const price = req.body.price;


 const newItem = new Seller({
  
  product_id,
  product_name,
  description,
  price,

 })

 newItem.save().then(()=>{

     res.json("Item added");


  }).catch((err)=>{

     console.log(err);

  })

}) 

//retrive all 
router.get('/all',(req,res)=>{

  Seller.find().exec((err,seller_items)=>{
      if(err){
    return res.status(400).json({
     error:err
    });
   }

    return res.status(200).json({

        success:true,
        existingItems:seller_items


    });


  });



});


//Update 
router.route("/update/:id").patch(async(req,res)=>{

  const itm = await Seller.findById(req.params.id);

if (itm) {

  itm.product_id = req.body.product_id || itm.product_id;
  itm.product_name = req.body.product_name || itm.product_name;
  itm.description = req.body.description || itm.description;
  itm.price = req.body.price || itm.price;

  const updateItems = await itm.save();

  res.json({

    product_id: updateItems.product_id,
    product_name: updateItems.product_name,
    description: updateItems.description,
    price: updateItems.price,
    
  });
} else {
  res.status(404);
  
  throw new Error("Can't Update item details");
}


})


//Retrive specific item by using MongoDB item id -> Auto Generated
router.route("/get/:id").get(async(req,res)=>{
  const fb = await Seller.findById(req.params.id);

if (fb) {
  res.json(fb);
} else {
  res.status(404).json({ message: "Item not found" });
}
})


//Delete items by uing MongoDb Id
router.route("/delete/:id").delete(async(req,res)=>{

  let itemId =req.params.id;
  
  await Seller.findByIdAndDelete(itemId).then(()=> {
  
   res.status(200).send({status: "Item Deleted"});
   
   }).catch((err)=>{
  
  console.log(err.message);
  res.status(500).send({status: "Error with delete the seller's item", error:err.message});
  
   })
  })


module.exports = router;