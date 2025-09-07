const mongoose = require('mongoose');

const pharmacyItemSchema = new mongoose.Schema(
  {
    stockId: {
      type: String,
      required: true,
    },
    stockName: {
      type: String,
      required: true,
    },
    stockCount: {
      type: Number,
      required: true,
    },
    exDate: {
      type: Date,
      required: true,
    },
    mfDate: {
      type: Date,
      required: true,
      },
    company: {
      type: String,
      required: true,
      },
    contact: {
      type: Number,
      required: true,
      },
   
  },
  { timestamps: true }
);

const pharmacyItemModel = mongoose.model('PharmacyItem', pharmacyItemSchema);

module.exports = pharmacyItemModel;
