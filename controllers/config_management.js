const { db } = require("../config/firebase-admin");

const table = 'Teacher'
//create
exports.createConfig = async (req, res) => {
    console.log(req.body.MaGV)
  try {
    const docRef = await db.collection(table).doc(req.body.MaGV).get()
    .then(async (doc) => {
        if (doc.exists) {
        console.log('Dữ liệu của document:', doc.data());
          return doc.data();
        } else {
        console.log('Không tìm thấy document!');
          return 'Không tìm thấy document!'
        }
    })
    .catch((error) => {
        console.log('Lỗi khi lấy dữ liệu:', error);
    });
    const de = await db.collection('Department').doc('123456789');
    de.get().then(async(tes)=>{
        const newData = Object.assign({}, docRef, { newField: docRef, });
        const setdata = await db.collection('Config').doc(req.body.MaGV);
        setdata.set(newData);
        return res.status(201).json(newData);
    })
    // return res.status(200).json(de);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ general: 'Something went wrong, please try again' });
  }
};