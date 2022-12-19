//create router to handle user api requests
const { request } = require("express");
const { response } = require("express");
const exp = require("express");
const expressAsyncHandler = require("express-async-handler");
const { BiMessageAltError } = require("react-icons/bi");
const adminApp = exp.Router();
//to extract body of request object
adminApp.use(exp.json());
//to extract body of request object

var cloudinary=require("cloudinary").v2;
const {CloudinaryStorage}=require("multer-storage-cloudinary");
const multer=require("multer");
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET,
  secure:true,
});
//configure the storage
const cloudinarystorage=new CloudinaryStorage({
  cloudinary:cloudinary,
  params:async(req,file)=>{
    return{
      folder:"passGenApp",//here all images are stored and the name can be anything
      public_id:file.fieldname+"-"+Date.now(),
    }
  }
})
//configure the multer(middleware)
var upload=multer({storage:cloudinarystorage});


//creatr product using asyn and await
adminApp.post(
  "/CreateProducts",
  upload.single("photo"),
  expressAsyncHandler(async (request, response) => {
    // get productCollectionObject

    let EventObj = request.app.get("adminObj");
    let EObj = JSON.parse(request.body.adminObj);
    //let EObj = request.body;

    let checkEvent=await EventObj.findOne({
      username:EObj.username
    })
    if(checkEvent!=null){
      response.send({
        message:"Eventname has already taken,please choose an other username"
      })
    }else{
      
        EObj.eventImg=request.file.path;
        delete EObj.Photo;
        let r=await EventObj.insertOne(EObj);
        if(r==undefined){
          response.send({message:"error while creating event"})
        }
        else{
          response.send({ message: 1});
        }
        
      }
    
  
    
    
    
  })
);
adminApp.get(
  "/getEvents",
  expressAsyncHandler(async (request, response) => {
    //getuserCollectionobject
    let EventObj= request.app.get("adminObj");
    let result = await  EventObj.find().toArray();
    if (result == undefined) {
      response.send({ message: "no event found!" });
    } else {
      response.send({ message: "All Events", payload: result });
      //console.log(result)
      //result.map((e)=>{console.log(e)})
    }
    //get userobj from client
  })
);
adminApp.post(
  "/findEvent",expressAsyncHandler(async(request,response)=>{
    let EventObj=request.app.get("adminObj");
    
    let key=request.body;
    
    let result=await EventObj.findOne({
      username:key.username
    })
    if(result===null){

      response.send({message:"Invalid Event name"});
    }
    else{
      if(result.key===key.key)
      response.send({message:1,payload:result})
      else{
        response.send({message:"Invalid secret key"})
      }
    }

  })
)
adminApp.delete(
  "/deleteEvent/:del",expressAsyncHandler(async(request,response)=>{
    let EventObj=request.app.get("adminObj");
    
    let key=request.params.del;
    console.log(key)
    let result=await EventObj.deleteOne({
      username:key
    })
    if(result===null){
      
      response.send({message:"event not found!!"});
    }
    else{
        response.send({message:"Event has been deleted!! "})
    }

  })
)
adminApp.post(
  "/UpdateEvent",expressAsyncHandler(async(request,response)=>{
    let EventObj=request.app.get("adminObj");
    
    let changes=request.body;
    console.log(request.body)
    let result=await EventObj.updateOne({
       $and:[{username:changes.username},{key:changes.key}]},{$set:{
        venue:changes.venue,
        d:changes.d,
        t:changes.t,
        period:changes.period,
        phno:changes.phno,
        TicketCost:changes.TicketCost,
        Tlimit:changes.Tlimit

       }}
    )
    console.log(result)
    if(result===null){
      response.send({message:"cannnot be updated"});
    }
    else{
      response.send({message:"updated successfully",payload:result})
    }

  })
)
adminApp.post(
  "/UpdateTicket",expressAsyncHandler(async(request,response)=>{
    let EventObj=request.app.get("adminObj");
    
    let changes=request.body;
    let tChange=parseInt(changes.Tlimit)-1;
    
    let result=await EventObj.updateOne({
       $and:[{username:changes.username},{key:changes.key}]},{$set:{
        Tlimit:tChange  

       }}
    )
    
    if(result===null){
      response.send({message:"cannnot be updated"});
    }
    else{
      response.send({message:"updated successfully",payload:result})
    }

  })
)




//export apis
module.exports = adminApp;