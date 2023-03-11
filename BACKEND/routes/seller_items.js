//const router = require("express").Router();
const express=require('express');
let Seller = require("../models/Seller");

const router=express.Router();

//Add items
router.route("/add").post((req,res)=>{

 const product_name = req.body.product_name; 
 const description = req.body.description; 
 const price = req.body.price;


 const newItem = new Seller({

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


//View added item data
/*
router.get('/all',(_req,res)=>{

   Seller.find().exec((err,seller_items)=>{
       if(err){
     return res.status(400).json({
      error:err
     });

    }

     return res.status(200).json({

         success:true,
         existingPackages:seller_items


     });


   });

}); */

router.route("/").get((req,res)=>{

   Seller.find().then((seller_items)=>{
   
     res.json(seller_items)
   
     }).catch((err)=>{
   
       console.log(err)
     })
   
})


//Update Seller Added Items
router.route("/update/:id").patch(async(req,res)=>{

   const pk = await Seller.findById(req.params.id);
 
 if (pk) {
   pk.product_name = req.body.product_name || fb.product_name;
   pk.description = req.body.description || fb.description;
   pk.price = req.body.price || fb.price;

   const updateItems = await pk.save();
 
   res.json({
      product_name: updateItems.name,
      description: updateItems.destination,
      price: updateItems.numofdays,
  
       
   });
 } else {
   res.status(404);
   
   throw new Error("Can't Update Item Details");
 }
 
 
 })

module.exports = router;