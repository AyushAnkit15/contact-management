const express = require("express");

const contactRouter = express.Router();
const {createContact , getAllContact , getOneContact ,deleteOneContact  ,updateContact} = require('../controller/contact.controller')

contactRouter.get("/contacts",getAllContact);


contactRouter.post("/createcontact", createContact);

  contactRouter.put("/contact/:id", updateContact);

  contactRouter.delete("/contact/:id", deleteOneContact);
  
  contactRouter.get("/contact1/:id", getOneContact);

  
  
  


module.exports = contactRouter;
