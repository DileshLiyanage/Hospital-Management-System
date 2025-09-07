const mongoose = require('mongoose');

const laboratoryTestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    testDate: {
      type: Date,
      required: true,
    },
    testData: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const LaboratoryTest = mongoose.model('LaboratoryTest', laboratoryTestSchema);

module.exports = LaboratoryTest;
