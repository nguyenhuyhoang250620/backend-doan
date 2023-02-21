const firebase = require("./../config/firebase");
const { db } = require("../config/firebase-admin");

//create
exports.addBook = async (req, res) => {
  const { title, author, publishedYear } = req.body;

  try {
    const docRef = await db.collection('Books').add({
      title,
      author,
      publishedYear,
    });

    const newBook = await docRef.get();
    const data = {
      id: newBook.id,
      ...newBook.data(),
    };

    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ general: 'Something went wrong, please try again' });
  }
};
//get dữ liệu
exports.books = async (req, res) => {
  const booksRef = db.collection('Books');
  try{
          booksRef.get().then((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
      }));
          console.log(data);
          return res.status(201).json(data);
      })
  } catch (error) {
      return res
      .status(500)
      .json({ general: "Something went wrong, please try again"});          
  }
};
//update
exports.updateBook = async (req, res) => {
  const { id, title, author, publishedYear } = req.body;

  try {
    const bookRef = db.collection('Books').doc(id);
    const book = await bookRef.get();

    if (!book.exists) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await bookRef.update({
      title: title || book.data().title,
      author: author || book.data().author,
      publishedYear: publishedYear || book.data().publishedYear,
    });

    const updatedBook = await bookRef.get();
    const data = {
      id: updatedBook.id,
      ...updatedBook.data(),
    };

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ general: 'Something went wrong, please try again' });
  }
};
//delete
exports.deleteBook = async (req, res) => {
  const { id} = req.body;
  try {
    console.log(`${id}`)
    const bookRef = db.collection('Books').doc(id);
    const book = await bookRef.get();

    if (!book.exists) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await bookRef.delete();

    return res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ general: 'Something went wrong, please try again' });
  }
};
// signup
exports.signup = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(422).json({
      email: "email is required",
      password: "password is required",
    });
  }
  firebase
    .auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then((data) => {
      return res.status(201).json(data);
    })
    .catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode == "auth/weak-password") {
        return res.status(500).json({ error: errorMessage });
      } else {
        return res.status(500).json({ error: errorMessage });
      }
    });
};

// signin
exports.signin = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(422).json({
      email: "email is required",
      password: "password is required",
    });
  }
  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((user) => {
      console.log("dang nhap thanh cong")
      return res.status(200).json(user);
    })
    .catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        return res.status(500).json({ error: errorMessage });
      } else {
        return res.status(500).json({ error: errorMessage });
      }
    });
};

// verify email
// this work after signup & signin
exports.verifyEmail = (req, res) => {
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(function () {
      return res.status(200).json({ status: "Email Verification Sent!" });
    })
    .catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === "auth/too-many-requests") {
        return res.status(500).json({ error: errorMessage });
      }
    });
};

// forget password
exports.forgetPassword = (req, res) => {
  if (!req.body.email) {
    return res.status(422).json({ email: "email is required" });
  }
  firebase
    .auth()
    .sendPasswordResetEmail(req.body.email)
    .then(function () {
      return res.status(200).json({ status: "Password Reset Email Sent" });
    })
    .catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode == "auth/invalid-email") {
        return res.status(500).json({ error: errorMessage });
      } else if (errorCode == "auth/user-not-found") {
        return res.status(500).json({ error: errorMessage });
      }
    });
};

// create user
exports.createUser = async (req, res) => {
  const doc =firebase.firestore().collection('users').doc('aviable');
  await doc.set({
    first:'Ada',
    last:'haha'
  })
  console.log("luu")
};
