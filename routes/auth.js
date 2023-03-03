const express = require("express");
const router = express.Router();

const { storage } = require("../config/firebase-admin");
const {
  signup,
  signin,
  forgetPassword,
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

const{upload,uploadfile,getImageUrl} = require("../controllers/upload_file_image")


// authencation
router.post("/signup", signup);

router.post("/signin", signin);

router.post("/forget-password", forgetPassword);

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

// class subject
router.post("/create-subject", createSubject);

router.get("/get-subject", getSubject);

router.patch("/update-subject", updateSubject);

router.delete("/delete-subject", deleteSubject);


router.post("/upload-image",upload.single('file'),uploadfile);

router.get("/get-image",getImageUrl);

module.exports = router;
