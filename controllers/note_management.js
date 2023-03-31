const { db } = require("../config/firebase-admin");

const table = 'Note'
//create
exports.createNote = async (req, res) => {
  const { 
    MaGV, 
    Status,
    Mota,
    Type,
    ThoiGian
  } = req.body;

  try {
    const docRef = await db.collection(table).doc();
    await docRef.set({
        MaGV, 
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
exports.getNote = async (req, res) => {
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
exports.updateNote = async (req, res) => {
  const {
    MaGV, 
    Status,
    Mota,
    Type,
    ThoiGian
  } = req.body;
    const collectionRef = db.collection(table); 
    const query = collectionRef.where('MaGV', '==', MaGV)
    .where('Type', '==', Type)
    .where('ThoiGian','==',ThoiGian);
                              
    query.get().then(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.update({
          Status: Status
        });
      });
    })
    return res.status(200).json(query);;
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