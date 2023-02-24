const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const multer = require("multer");
const cors = require("cors")
const path =  require("path")


dotenv.config();

app.use(express.json());
app.use("/images", express.static(path.join(__dirname,"/images")))

mongoose.connect(process.env.MONGO_URL, {
   useNewUrlParser: true, 
   useUnifiedTopology: true,
}).then(console.log("Connected to MONGODB")).
catch((err)=> console.log(err));


const storage = multer.diskStorage({
  destination:(req,file,cb) =>{
    cb(null,"images")
  },filename:(req,file,cb) =>{
    cb(null,req.body.name)
  }
  
})


app.use(cors());
const upload = multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded")
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen("5000",()=>{
    console.log("backend is running");

});
