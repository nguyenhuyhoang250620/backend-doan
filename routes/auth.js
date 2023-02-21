const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  forgetPassword,
  books,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/auth");

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/forget-password", forgetPassword);


router.post("/create-user", addBook);

router.get("/get-user", books);

router.patch("/update-user", updateBook);

router.delete("/delete-user", deleteBook);

module.exports = router;
