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



//creatr product using asyn and await
adminApp.post(
  "/CreateProducts",
  expressAsyncHandler(async (request, response) => {
    // get productCollectionObject

    let EventObj = request.app.get("adminObj");
    let EObj = request.body;

    let checkEvent=await EventObj.findOne({
      username:EObj.username
    })
    if(checkEvent!=null){
      response.send({
        message:"Eventname has already taken,please choose another username"
      })
    }else{
      let result = await EventObj.insertOne(EObj);
      if (result == undefined) {
        response.send({ message: "no event has been created!" });
      } else {
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




//export apis
module.exports = adminApp;
