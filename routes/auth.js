const express = require("express");
const router = express.Router();
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


// authencation
router.post("/signup", signup);

router.post("/signin", signin);

router.post("/forget-password", forgetPassword);

// create student management
router.post("/create-user", createUser);

router.get("/get-user", getUser);

router.patch("/update-user", updateUser);

router.delete("/delete-user", deleteUser);

// create teacher management
router.post("/create-teacher", createTeacher);

router.get("/get-teacher", getTeacher);

router.patch("/update-teacher", updateTeacher);

router.delete("/delete-teacher", deleteTeacher);
module.exports = router;
