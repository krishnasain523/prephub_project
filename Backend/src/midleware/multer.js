const multer=require("multer");
const path=require("path");
// const upload=require("../../uploads")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
 const upload = multer({ storage })
console.log("Multer middleware loaded ");
module.exports=upload;