const firebase = require("./../config/firebase");
const {admin} = require("../config/firebase-admin")


// signup
exports.signup = (req, res) => {
  console.log("vao khong")
  if (!req.body.email || !req.body.password) {
    return res.status(422).json({
      uid: 'email is required',
      email: "email is required",
      password: "password is required",
    });
  }
  admin
    .auth()
    .createUser(
      {
        uid: req.body.email,
        email: req.body.email,
        password: req.body.password,
        disabled: true,
      })
    .then((data) => {
      admin.auth().setCustomUserClaims(req.body.email, { role: 'admin' }).then(() => {
        // Custom claims set for user
      });
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

// disable
exports.disable = (req, res) => {
  console.log(req.body.uid)
  admin.auth().updateUser(req.body.uid, {
    disabled: true
  })
  .then(() => {
    console.log('User account has been disabled');
    return res.status(200).json('thanh cong')
  })
  .catch((error) => {
    console.log('Error disabling user account:', error);
  });
};

// enable
exports.enable = (req, res) => {
  console.log(req.body.uid)
  admin.auth().updateUser(req.body.uid, {
    disabled: false
  })
  .then(() => {
    console.log('User account has been disabled');
    return res.status(200).json('thanh cong')
  })
  .catch((error) => {
    console.log('Error disabling user account:', error);
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
    .then((userCredential) => {
      // Lấy thông tin người dùng
      const user = userCredential.user;
      
      // Lấy ID token của người dùng
      user.getIdToken().then((idToken) => {
        // Sử dụng ID token để xác thực người dùng
        // Tiếp tục xử lý tại đây
        return res.status(200).json({ user: user, idToken: idToken });
      });
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
exports.logout = (req, res) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Đăng xuất thành công");
      return res.status(200).json({message: "Đăng xuất thành công"});
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error: error.message });
    });
};
