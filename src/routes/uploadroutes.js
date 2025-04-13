const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Photo = require("../models/photos")
const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,path.join(__dirname,"../images"));
    },
    filename: function (req,file,cb){
       cb(null, file.originalname)
    }
});
const upload = multer({storage });

router.post("/upload", upload.single("image"), async (req,res) => {
    
    if (req.file) {
      
          Photo.create({
            url: req.file.path, // Save the path of each uploaded photo
          
          })
       
  
        
      }
  
      res.status(200).json({message:"image upoladed"});

})

module.exports = router;