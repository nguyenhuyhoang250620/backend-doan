const {admin} = require("../config/firebase-admin")
const { db } = require("../config/firebase-admin");
const table = "Teacher"
// signup
exports.author = (req, res) => {
    if(req.body.authorcation != undefined){
        admin.auth().setCustomUserClaims(`${req.body.email}@gmail.com`, { 
            role: req.body.role,
            authorcation : `${req.body.authorcation}`
          }).then(() => {
            const documentRef = db.collection(table).doc(req.body.email);
                documentRef.set({
                author:req.body.authorcation
                }, { merge: true })
                .then(() => {
                console.log('Thêm trường mới thành công');
                })
                .catch((error) => {
                console.log('Lỗi khi thêm trường mới:', error);
                });
          });
          return res.status(201).json('Thanh cong');
    }
    else{
        admin.auth().setCustomUserClaims(`${req.body.email}@gmail.com`, { 
            role: req.body.role,
          }).then(() => {
          });
          return res.status(201).json(data);
    }
};