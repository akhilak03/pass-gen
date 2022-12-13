//create router to handle user api requests
const { request } = require("express");
const { response } = require("express");
const exp = require("express");
const expressAsyncHandler = require("express-async-handler");
const { BiMessageAltError } = require("react-icons/bi");
const confirmApp = exp.Router();
//to extract body of request object
confirmApp.use(exp.json());
//to extract body of request object
confirmApp.post(
    "/order",
    expressAsyncHandler(async (request, response) => {
      // get productCollectionObject
  
      let EventObj = request.app.get("confirmObj");
      let EObj = request.body;
  
      
      
       let result = await EventObj.insertOne(EObj);
       if (result == undefined) {
          response.send({ message: "no order has been confirmed!" });
        } else {
          response.send({ message: 1});
        }
      
    
      
      
      
    })
  );
  module.exports = confirmApp;