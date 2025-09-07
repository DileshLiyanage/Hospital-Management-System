const express = require('express')

const router = express.Router()



const userSignUpController = require("../controller/userSignup")
const userSignInController = require("../controller/userSignin")
const userDetailsController = require('../controller/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/userLogout')
const allUsers = require('../controller/allUsers')
const updateUser = require('../controller/updateUser')
const AddChannelingAppoiintmentController = require('../controller/addChannelingAppointment')
const getChannelingAppointmentController = require('../controller/getChannelingAppointments')
const AddNoticeController = require('../controller/addNotice')
const getNoticeController = require('../controller/getNotice')
const updateNoticeController = require('../controller/updateNotice')
const updateChannelingAppointmentController = require('../controller/updateChannelingAppointment')
const AddHomeVisitAppoiintmentController = require('../controller/addHomeVisitAppointment')
const getHomeVisitAppointmentController = require('../controller/getHomeVisitAppointment')
const updateHomeVisitAppointmentController = require('../controller/updateHomeVisitAppointment')

const { createItem, getAllItems, getItemById, updateItem, deleteItem } = require('../controller/laboratoryItemController')
const { getAllStock, getStockById, updateStock, deleteStock, createStock } = require('../controller/pharmacyStockController')
const { getAllTest, getTestById, updateTest, deleteTest, createTest } = require('../controller/laboratoryTestController')
const deleteUser = require('../controller/deleteUser')
const { getResources, addResource, updateResourceAvailability, deleteResource } = require('../controller/resourceController')
const deleteChannelingAppointment = require('../controller/deleteChannelingAppointment')



router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)



//admin panel
router.get("/all-users",allUsers)
router.post("/update-user",authToken,updateUser)
router.delete("/delete-user/:id", deleteUser);



//add channeling appointment
module.exports = router
router.post("/add-channeling-appointment",AddChannelingAppoiintmentController)
router.get("/get-channeling-appointments",getChannelingAppointmentController)
router.post("/update-channeling-appointment",updateChannelingAppointmentController)
router.post("/delete-channeling-appointment",deleteChannelingAppointment)


//add Notice
router.post("/add-notice",authToken,AddNoticeController)
router.get("/get-notice",getNoticeController)
router.post("/update-notice",authToken,updateNoticeController)


//home visit appointment
router.post("/add-homevisit-appointment",AddHomeVisitAppoiintmentController)
router.get("/get-homevisit-appointments",getHomeVisitAppointmentController)
router.post("/update-homevisit-appointment",updateHomeVisitAppointmentController)



//add lab items
router.post("/add-item", createItem);
router.get("/get-items", getAllItems);
router.get("/get-item/:id", getItemById);
router.post("/edit-item:id", updateItem);
router.delete("/delete-item/:id", deleteItem);

//add pharmacy stock
router.post("/add-stock", createStock);
router.get("/get-stocks", getAllStock);
router.get("/get-stock/:id", getStockById);
router.post("/edit-stock:id", updateStock);
router.delete("/delete-stock/:id", deleteStock);

//add lab tests
router.post("/add-test", createTest);
router.get("/get-tests", getAllTest);
router.get("/get-test/:id", getTestById);
router.post("/edit-test:id", updateTest);
router.delete("/delete-test/:id", deleteTest);


//resources
router.get("/resources", getResources);
router.post("/resources", addResource);
router.patch("/resources/:id", updateResourceAvailability);
router.delete("/resources/:id", deleteResource);

