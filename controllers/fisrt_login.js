const admin = require("../config/firebase-admin")
const { db } = require("../config/firebase-admin");
table = 'test'
exports.getCurentIdUser = async function(){
    const booksRef = db.collection(table);
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
}