const { db } = require("../config/firebase-admin");

const table = 'User'
//create
exports.createUser = async (req, res) => {
  const { 
    MaSV, 
    TenSV,
    Khoa,
    NamSinh,
    GioiTinh,
    CCCD,
    Email,
    SoDT,
    Image, 
  } = req.body;
  try {
    const docRef = await db.collection(table).doc(MaSV);
    await docRef.set({
      MaSV, 
      TenSV,
      Khoa,
      NamSinh,
      GioiTinh,
      CCCD,
      Email,
      SoDT,
      Image  
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
exports.getUser = async (req, res) => {
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
exports.updateUser = async (req, res) => {
  const {
    MaSV, 
    TenSV,
    Khoa,
    NamSinh,
    GioiTinh,
    CCCD,
    Email,
    SoDT,
   } = req.body;
  try {
    const userRef = db.collection(table).doc(MaSV);
    const user = await userRef.get();

    if (!user.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    await userRef.update({
      MaSV: MaSV || user.data.MaSV,
      TenSV: TenSV || user.data.TenSV,
      Khoa:Khoa || user.data.Khoa,
      NamSinh:NamSinh || user.data.NamSinh,
      GioiTinh:GioiTinh || user.data.GioiTinh,
      CCCD:CCCD || user.data.CCCD,
      Email:Email || user.data.Email,
      SoDT:SoDT || user.data.SoDT,
    });

    const updatedUser = await userRef.get();
    const data = {
      MaSV: updatedUser.MaSV,
      ...updatedUser.data(),
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
exports.deleteUser = async (req, res) => {
  const { MaSV} = req.body;
  try {
    console.log(`${MaSV}`)
    const userRef = db.collection(table).doc(MaSV);
    const user = await userRef.get();

    if (!user.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    await userRef.delete();

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ general: 'Something went wrong, please try again' });
  }
};