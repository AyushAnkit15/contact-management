const Contacts = require("../models/contact.model");

const createContact = async (req, res) => {
  const { name, age, phone } = req.body;

  if (!name || !age || !phone) {
    return res.status(400).json("give all parameters");
  }

  try {
    const newContact = await Contacts.create({
      name,
      age,
      phone,
    });
    res.status(201).json("contact created");
  } catch (err) {
    res.send("contact can not  be made");
  }
};

const getAllContact = async (req, res) => {
  const contacts = await Contacts.find();

  res.status(200).json(contacts);
};

const getOneContact = async (req, res) => {

    const id = req.params.id ; 
    const contacts = await Contacts.findOne({_id:  id});
  if(!contacts){
    res.json('no contact found')
  }
    res.status(200).json(contacts);
  };

  const deleteOneContact = async (req, res) => {

    const id = req.params.id ; 

    // if(!contacts){
    //         res.json('no contact found')
    //        }


    const contacts = await Contacts.findByIdAndDelete(id)
  
    res.status(200).json( 'contact deleted');
  };
const updateContact = async (req, res) => {

  try {
    const contact = await Contacts.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) return res.status(404).send('User not found');
    res.send(contact);
} catch (error) {
    res.status(500).send(error);
}
  };


module.exports = { createContact, getAllContact , getOneContact , deleteOneContact ,updateContact };
