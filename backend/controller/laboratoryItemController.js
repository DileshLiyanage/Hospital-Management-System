const laboratoryItemModel = require("../models/laboratoryItemModel");

//   handle image lab item   ----------------------------------------------------------------------------------- //
const express = require("express");
const multer = require("multer");
const path = require("path");


const router = express.Router();


// Create Item
async function createItem(req, res) {
    try {
        const newItem = new laboratoryItemModel(req.body);
        await newItem.save();
        res.status(201).json({ data: newItem, success: true, message: "Item added successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message || err, error: true, success: false });
    }
}
// View all laboratory items

//----------------------------------------------------------------------
async function getAllItems(req,res){
  try{
      console.log("userid all Users", req._id)

      const getAllItems = await laboratoryItemModel.find()
      res.json({
          message: "All Users" ,
          data : getAllItems,
          success : true ,
          error : false
      })
  }
  catch(err){
      res.status(400).json({
          message : err.message || err,
          error : true,
          success : false
      })
  }
}
/*--------------------------------------------------------------------------
const getAllItems = async (req, res) => {
  try {
    const items = await laboratoryItemModel.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve items" });
  }
}; */

// View single item by ID
const getItemById = async (req, res) => {
  try {
    const item = await laboratoryItemModel.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve item" });
  }
};

// Update an existing laboratory item
const updateItem = async (req, res) => {
  try {
    const updatedItem = await laboratoryItemModel.findByIdAndUpdate(req.body._id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to update item" });
  }
};

// Delete an item
const deleteItem = async (req, res) => {
  try {
    const deletedItem = await laboratoryItemModel.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete item" });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
};