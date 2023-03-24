const { db } = require("../config/firebase-admin");

const table = 'Orderfood'
//create
exports.createOrderfood = async (req, res) => {
  const { 
    MaGV, 
    maMon,
    tenMonAn,
    soLuong,
    url,
    thoiGian
  } = req.body;

  try {
    const docRef = await db.collection(table).doc();
    await docRef.set({
      MaGV, 
      maMon,
      tenMonAn,
      soLuong,
      url,
      thoiGian
    });
    const newDep = await docRef.get();
    const data = {
      id: newDep.id,
      ...newDep.data(),
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
exports.getOderfood = async (req, res) => {
  const departRef = db.collection(table);
  try{
    departRef.get().then((snapshot) => {
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
