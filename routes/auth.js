const express = require("express");
const router = express.Router();

const { storage } = require("../config/firebase-admin");
const {
  signup,
  signin,
  forgetPassword,
  logout
} = require("../controllers/authencation");

const {  
  createUser,
  getUser,
  updateUser,
  deleteUser
}= require("../controllers/student_management")

const {  
  createTeacher,
  getTeacher,
  updateTeacher,
  deleteTeacher
}= require("../controllers/teacher_management")

const {  
  createDepartment,
  getDepartment,
  updateDepartment,
  deleteDepartment
}= require("../controllers/department_management")

const {  
  createClass,
  getClass,
  updateClass,
  deleteClass
}= require("../controllers/class_management") 

const {  
  createSubject,
  getSubject,
  updateSubject,
  deleteSubject
}= require("../controllers/subject_management")

const {  
  createShift,
  getShift,
  updateShift,
  deleteShift
}= require("../controllers/shift_management")

const {createConfig,getConfig} = require("../controllers/config_management")


const{upload,uploadfile,getImageUrl} = require("../controllers/upload_file_image")


// authencation
router.post("/signup", signup);

router.post("/signin", signin);

router.post("/forget-password", forgetPassword);

router.post("/logout", logout);


//  student management
router.post("/create-user", createUser);

router.get("/get-user", getUser);

router.patch("/update-user", updateUser);

router.delete("/delete-user", deleteUser);

//  teacher management
router.post("/create-teacher", createTeacher);

router.get("/get-teacher", getTeacher);

router.patch("/update-teacher", updateTeacher);

router.delete("/delete-teacher", deleteTeacher);

// department management
router.post("/create-department", createDepartment);

router.get("/get-department", getDepartment);

router.patch("/update-department", updateDepartment);

router.delete("/delete-department", deleteDepartment);

// class management
router.post("/create-class", createClass);

router.get("/get-class", getClass);

router.patch("/update-class", updateClass);

router.delete("/delete-class", deleteClass);

//  subject management
router.post("/create-subject", createSubject);

router.get("/get-subject", getSubject);

router.patch("/update-subject", updateSubject);

router.delete("/delete-subject", deleteSubject);

// shift management
router.post("/create-shift", createShift);

router.get("/get-shift", getShift);

router.patch("/update-shift", updateShift);

router.delete("/delete-shift", deleteShift);

//config management

router.post("/create-config",createConfig);

router.get("/get-config",getConfig);


router.post("/upload-image",upload.single('file'),uploadfile);
// router.post("/upload-image", upload.fields([
//   { name: 'file', maxCount: 1 },
//   { name: 'text' }
// ]),uploadfile);

router.get("/get-image",getImageUrl);


const {getCurentIdUser} = require("../controllers/fisrt_login")

router.get("/test",getCurentIdUser)



module.exports = router;
