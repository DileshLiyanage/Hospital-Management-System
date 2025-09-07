const LaboratoryTest = require("../models/laboratoryTestModel"); // Path to your LaboratoryTest model

// Create a new laboratory test
const createTest = async (req, res) => {
  const { name, age, address, mobile, gender, testDate, testData } = req.body;

  try {
    const newTest = new LaboratoryTest({
      name,
      age,
      address,
      mobile,
      gender,
      testDate,
      testData,
    });
    await newTest.save();
    res.status(201).json({ success: true, data: newTest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating laboratory test' });
  }
};

// Get all laboratory tests
const getAllTest = async (req, res) => {
  try {
    const tests = await LaboratoryTest.find();
    res.status(200).json({ success: true, data: tests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching laboratory tests' });
  }
};

// Get a single laboratory test by ID
const getTestById = async (req, res) => {
  try {
    const test = await LaboratoryTest.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }
    res.status(200).json({ success: true, data: test });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching laboratory test' });
  }
};

// Update a laboratory test by ID
const updateTest = async (req, res) => {
  try {
    const updatedTest = await LaboratoryTest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTest) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }
    res.status(200).json({ success: true, data: updatedTest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error updating laboratory test' });
  }
};

// Delete a laboratory test by ID
const deleteTest = async (req, res) => {
  try {
    const deletedTest = await LaboratoryTest.findByIdAndDelete(req.params.id);
    if (!deletedTest) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }
    res.status(200).json({ success: true, message: 'Test deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error deleting laboratory test' });
  }
};

module.exports = {
  createTest,
  getAllTest,
  getTestById,
  updateTest,
  deleteTest,
};
