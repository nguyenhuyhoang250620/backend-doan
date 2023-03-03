const { db } = require("../config/firebase-admin");

const table = 'Subject'
//create
exports.createSubject = async (req, res) => {
  const { 
    KhoiKienThuc,
    MaHocPhan,
    TenHocPhan,
    KiThu,
    SotinChi,
    TongSoTiet,
    DKTQ,
    MoTa
  } = req.body;

  try {
    const docRef = await db.collection(table).doc(MaHocPhan);
    await docRef.set({
        KhoiKienThuc,
        MaHocPhan,
        TenHocPhan,
        KiThu,
        SotinChi,
        TongSoTiet,
        DKTQ,
        MoTa
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
  const subjectRef = db.collection(table);
  try{
    subjectRef.get().then((snapshot) => {
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
    KhoiKienThuc,
    MaHocPhan,
    TenHocPhan,
    KiThu,
    SotinChi,
    TongSoTiet,
    DKTQ,
    MoTa
  } = req.body;

  try {
    const subjectRef = db.collection(table).doc(MaHocPhan);
    const subject = await subjectRef.get();

    if (!subject.exists) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    await subjectRef.update({
      KhoiKienThuc:KhoiKienThuc || subject.data.KhoiKienThuc,
      MaHocPhan:MaHocPhan || subject.data.MaHocPhan,
      TenHocPhan:TenHocPhan || subject.data.TenHocPhan,
      KiThu:KiThu || subject.data.KiThu,
      SotinChi:SotinChi || subject.data.SotinChi,
      TongSoTiet:TongSoTiet || subject.data.TongSoTiet,
      DKTQ:DKTQ || subject.data.DKTQ,
      MoTa:MoTa || subject.data.MoTa
    });

    const updatedSubject = await subjectRef.get();
    const data = {
      MaHocPhan: updatedSubject.MaHocPhan,
      ...updatedSubject.data(),
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
  const { MaHocPhan} = req.body;
  try {
    console.log(`${MaHocPhan}`)
    const subjectRef = db.collection(table).doc(MaHocPhan);
    const subject = await subjectRef.get();

    if (!subject.exists) {
      return res.status(404).json({ message: 'Department not found' });
    }

    await subjectRef.delete();

    return res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ general: 'Something went wrong, please try again' });
  }
};