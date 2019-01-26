const express= require('express');
const router = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;

const User = require('../models/secuser');
const Shop = require('../models/secuser');
const Food = require('../models/itemschema');


const Invoice =require('../models/invoicedb');
const Deliverer=require('../models/deliverers');
//get a list from db
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


module.exports.editall=(req,res,next)=>{ 
    User.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
      User.findOne({_id:req.params.id}).then(function(details){
        res.send(details);
        console.log(details);
    });
    
}).catch(next);
}



module.exports.changepwall=(req,res,next)=>{ 
User.find({_id:req.params.id}).then(function(details){
    if(details.length>0){
                                            
        bcrypt.compare(req.body.currerntpassword,details[0].password,(err,result)=>{    
            if(err){
                console.log(err)
                return res.status(400).json({
                    error:err
                });
                
            }
            else if(result)
            {
                bcrypt.hash(req.body.newpassword,10,(err,hash)=>{
                    if(err){
                        return res.status(300).json({
                            error:err
                        });
                    }
                    else{ 
    
                  User.findOneAndUpdate({_id:req.params.id}, {$set:{ password:hash}}, {new: true}, (err, doc) => {
                    if (err) {
                        console.log("Something wrong when updating data!");
                    }
                    else{
                        return res.status(200).json({
                            msg:"updated"
                        });
                        console.log(doc);
                    }
                  
                });
            }
        });
            }
            else
            {
                return res.status(400).json({
                    error:err
                });
            }
        });
                 
    }

});
}





module.exports.viewprofile=(req,res,next)=>{ 
User.findById({_id:req.params.id},req.body).then(function(details){
    res.send(details);
    console.log("Details for tharuja")
    console.log(details.shop_id);

}).catch(next);

}

module.exports.viewitems=(req,res,next)=>{ 
    User.findById({_id:req.params.id},req.body).then(function(details){
        //res.send(details);
        // console.log("Details for tharuja")
        // console.log(details);
        Food.find({shopid:details.shop_id},req.body).then(function(itms){
            
            res.send(itms);
            console.log("New API details");
            console.log(itms);
        
        }).catch(next);

    }).catch(next);
    
    }



//get shop_name from db
module.exports.getShopName = (req, res) => {
    console.log(req.query.key.toString());
  
    var shopprofile = {
      shop_id : "",
      email : "",
      shop_owner_name : "",  
      address: "",
      password : "",
      contact_no : "",
      type : "",
      town : "",
      description: "",
      imagepath: "",
      shop_name:  "",
      _id:  "",
      rating: "",
      
    }
  
    Shop.find({"shop_id" : req.query.key.toString()}, (err, foods) => {
      
      shopprofile.shop_id = foods[0].shop_id;  
      shopprofile.address = foods[0].address;
      shopprofile.town = foods[0].town;
      shopprofile.description = foods[0].description
      shopprofile.imagepath = foods[0].imagepath
      shopprofile.shop_name = foods[0].shop_name
      shopprofile._id = foods[0]._id
      shopprofile.rating = foods[0].rating
  
        console.log("foods[0].town");
        console.log(foods[0].town);
      if (err) return res.json({ success: false, error: err });
     
  
      Food.find({"shopid" : req.query.key.toString()}, (err, foods) => {
        console.log("$$$$") 
        console.log(foods)  
        shopprofile.items = foods;
        if (err) return res.json({ success: false, error: err });
        console.log("merged result")
        //console.log(foods)
        console.log(shopprofile)
        return res.json({ success: true, data: shopprofile });
      });
  
    });
  };


//get shops from db according to address  
module.exports.getShopAcdintoAddress = (req, res) => {
    Shop.aggregate([
      {$group: {
          _id: "$town",
          shops: {$push: "$$ROOT"}
      }}
    ], (err, shops) => {
        console.log("get shops from db according to address")
        console.log(shops);
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: shops });
    });
  };


