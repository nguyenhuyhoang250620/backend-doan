const { db } = require("../config/firebase-admin");

const table = 'Note'
//create
exports.createNote = async (req, res) => {
  const { 
    MaGV, 
    TenGV,
    Status,
    Mota,
    Type,
    ThoiGian
  } = req.body;

  try {
    const docRef = await db.collection(table).doc();
    await docRef.set({
        MaGV, 
        TenGV,
        Status,
        Mota,
        Type,
        ThoiGian
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
exports.getDepartment = async (req, res) => {
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
//update
exports.updateDepartment = async (req, res) => {
  const {
    MaDV, 
    TenDV,
    Mota,
  } = req.body;

  try {
    const departmentRef = db.collection(table).doc(MaDV);
    const department = await departmentRef.get();

    if (!department.exists) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    await departmentRef.update({
      MaDV: MaDV || department.data.MaDV,
      TenDV: TenDV || department.data.TenDV,
      Mota:Mota || department.data.Mota,
    });

    const updatedDepartment = await departmentRef.get();
    const data = {
      MaDV: updatedDepartment.MaDV,
      ...updatedDepartment.data(),
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
exports.deleteDepartment = async (req, res) => {
  const { MaDV} = req.body;
  try {
    console.log(`${MaDV}`)
    const departmentRef = db.collection(table).doc(MaDV);
    const department = await departmentRef.get();

    if (!department.exists) {
      return res.status(404).json({ message: 'Department not found' });
    }

    await departmentRef.delete();

    return res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ general: 'Something went wrong, please try again' });
  }
};