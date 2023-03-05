const { db } = require("../config/firebase-admin");

const table = 'Shift'
//create
exports.createShift= async (req, res) => {
  const { 
    MaCa,
    TenCa, 
    SoCa,
    Mota,
    ThoiGian,
  } = req.body;

  try {
    const docRef = await db.collection(table).doc(MaCa);
    await docRef.set({
        MaCa,
        TenCa, 
        SoCa,
        Mota,
        ThoiGian,
    });
    const newShift = await docRef.get();
    const data = {
      id: newShift.id,
      ...newShift.data(),
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
exports.getShift = async (req, res) => {
  const ShiftRef = db.collection(table);
  try{
    ShiftRef.get().then((snapshot) => {
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
exports.updateShift = async (req, res) => {
  const {
    MaCa,
    TenCa, 
    SoCa,
    Mota,
    ThoiGian,
  } = req.body;

  try {
    const ShiftRef = db.collection(table).doc(MaCa);
    const shift = await ShiftRef.get();

    if (!shift.exists) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    await ShiftRef.update({
        MaCa:MaCa || shift.data.MaCa,
        TenCa:TenCa || shift.data.TenCa, 
        SoCa:SoCa || shift.data.SoCa,
        Mota:Mota || shift.data.Mota,
        ThoiGian:ThoiGian || shift.data.ThoiGian,
    });

    const updatedShift = await ShiftRef.get();
    const data = {
        MaPhong: updatedShift.MaPhong,
      ...updatedShift.data(),
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
exports.deleteShift = async (req, res) => {
  const { MaCa} = req.body;
  try {
    const ShiftRef = db.collection(table).doc(MaCa);
    const shift = await ShiftRef.get();

    if (!shift.exists) {
      return res.status(404).json({ message: 'Department not found' });
    }

    await ShiftRef.delete();

    return res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ general: 'Something went wrong, please try again' });
  }
};