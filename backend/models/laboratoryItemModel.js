const mongoose = require('mongoose');

const laboratoryItemSchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    itemCount: {
      type: Number,
      required: true,
    },
   /* itemPicture: {
      type: String, // URL or path to the image
      required: true,
    },*/
  },
  { timestamps: true }
);

const laboratoryItemModel = mongoose.model('LaboratoryItem', laboratoryItemSchema);

module.exports = laboratoryItemModel;
