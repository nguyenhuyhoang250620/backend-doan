const { db } = require("../config/firebase-admin");

const table = 'Subject'
//create
exports.createSubject= async (req, res) => {
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
    const newSub = await docRef.get();
    const data = {
      id: newSub.id,
      ...newSub.data(),
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
exports.getSubject = async (req, res) => {
  const SubRef = db.collection(table);
  try{
    SubRef.get().then((snapshot) => {
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
exports.updateSubject = async (req, res) => {
  const {
    MaPhong, 
    TenPhong,
    Mota,
    TenMayQuet,
  } = req.body;

  try {
    const SubRef = db.collection(table).doc(MaPhong);
    const subject = await SubRef.get();

    if (!subject.exists) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    await SubRef.update({
        MaPhong: MaPhong || subject.data.MaPhong,
        TenPhong: TenPhong || subject.data.TenPhong,
        Mota:Mota || subject.data.Mota,
        TenMayQuet:TenMayQuet || subject.data.TenMayQuet,
    });

    const updatedSub = await SubRef.get();
    const data = {
      MaGV: updatedSub.MaPhong,
      ...updatedSub.data(),
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
exports.deleteSubject = async (req, res) => {
  const { MaPhong} = req.body;
  try {
    const SubRef = db.collection(table).doc(MaPhong);
    const subject = await SubRef.get();

    if (!subject.exists) {
      return res.status(404).json({ message: 'Department not found' });
    }

    await SubRef.delete();

    return res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ general: 'Something went wrong, please try again' });
  }
};