const { db } = require("../config/firebase-admin");

const table = 'Teacher'
//create
exports.createTeacher = async (req, res) => {
  const { 
    MaGV, 
    TenGV,
    ChuyenNganh,
    NamSinh,
    GioiTinh,
    CCCD,
    Email,
    SoDT 
  } = req.body;

  try {
    const docRef = await db.collection(table).doc(MaGV);
    await docRef.set({
      MaGV, 
      TenGV,
      ChuyenNganh,
      NamSinh,
      GioiTinh,
      CCCD,
      Email,
      SoDT 
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
exports.getTeacher = async (req, res) => {
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
};
//update
exports.updateTeacher = async (req, res) => {
  const {
    MaGV, 
    TenGV,
    ChuyenNganh,
    NamSinh,
    GioiTinh,
    CCCD,
    Email,
    SoDT 
  } = req.body;

  try {
    const teacherRef = db.collection(table).doc(MaGV);
    const teacher = await teacherRef.get();

    if (!teacher.exists) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    await teacherRef.update({
      MaGV: MaGV || teacher.data.MaGV,
      TenGV: TenGV || teacher.data.TenGV,
      ChuyenNganh:ChuyenNganh || teacher.data.ChuyenNganh,
      NamSinh:NamSinh || teacher.data.NamSinh,
      GioiTinh:GioiTinh || teacher.data.GioiTinh,
      CCCD:CCCD || teacher.data.CCCD,
      Email:Email || teacher.data.Email,
      SoDT:SoDT || teacher.data.SoDT
    });

    const updatedTeacher = await teacherRef.get();
    const data = {
      MaGV: updatedTeacher.MaGV,
      ...updatedTeacher.data(),
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
exports.deleteTeacher = async (req, res) => {
  const { MaGV} = req.body;
  try {
    console.log(`${MaGV}`)
    const teacherRef = db.collection(table).doc(MaGV);
    const teacher = await teacherRef.get();

    if (!teacher.exists) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    await teacherRef.delete();

    return res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ general: 'Something went wrong, please try again' });
  }
};