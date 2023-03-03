const { db } = require("../config/firebase-admin");

const table = 'Class'
//create
exports.createClass= async (req, res) => {
  const { 
    MaPhong, 
    TenPhong,
    Mota,
    TenMayQuet,
  } = req.body;

  try {
    const docRef = await db.collection(table).doc(MaPhong);
    await docRef.set({
        MaPhong, 
        TenPhong,
        Mota,
        TenMayQuet,
    });
    const newClass = await docRef.get();
    const data = {
      id: newClass.id,
      ...newClass.data(),
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
exports.getClass = async (req, res) => {
  const ClassRef = db.collection(table);
  try{
    ClassRef.get().then((snapshot) => {
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
exports.updateClass = async (req, res) => {
  const {
    MaPhong, 
    TenPhong,
    Mota,
    TenMayQuet,
  } = req.body;

  try {
    const ClassRef = db.collection(table).doc(MaPhong);
    const clas = await ClassRef.get();

    if (!clas.exists) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    await ClassRef.update({
        MaPhong: MaPhong || clas.data.MaPhong,
        TenPhong: TenPhong || clas.data.TenPhong,
        Mota:Mota || clas.data.Mota,
        TenMayQuet:TenMayQuet || clas.data.TenMayQuet,
    });

    const updatedClass = await ClassRef.get();
    const data = {
      MaGV: updatedClass.MaPhong,
      ...updatedClass.data(),
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
exports.deleteClass = async (req, res) => {
  const { MaPhong} = req.body;
  try {
    const ClassRef = db.collection(table).doc(MaPhong);
    const clas = await ClassRef.get();

    if (!clas.exists) {
      return res.status(404).json({ message: 'Department not found' });
    }

    await ClassRef.delete();

    return res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ general: 'Something went wrong, please try again' });
  }
};