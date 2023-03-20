const { db } = require("../config/firebase-admin");

const table = 'Food'
//create
exports.createFood= async (req, res) => {
  const { 
    ma_mon,
    ten_mon_an,
    calo, 
    khoi_luong,
    chi_tiet,
    so_luong,
    trang_thai,
    hinh_anh
  } = req.body;

  try {
    const docRef = await db.collection(table).doc(ma_mon);
    await docRef.set({
        ma_mon,
        ten_mon_an,
        calo, 
        khoi_luong,
        chi_tiet,
        so_luong,
        trang_thai,
        hinh_anh
    });
    const newFood = await docRef.get();
    const data = {
      id: newFood.id,
      ...newFood.data(),
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
exports.getFood = async (req, res) => {
  const FoodRef = db.collection(table);
  try{
    FoodRef.get().then((snapshot) => {
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
exports.updateFood = async (req, res) => {
  const {
    ma_mon,
    ten_mon_an,
    calo, 
    khoi_luong,
    chi_tiet,
    so_luong,
    trang_thai,
    hinh_anh
  } = req.body;

  try {
    const FoodRef = db.collection(table).doc(ma_mon);
    const food = await FoodRef.get();

    if (!food.exists) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    await FoodRef.update({
        ma_mon:ma_mon ||food.data.ma_mon,
        ten_mon_an:ten_mon_an ||food.data.ten_mon_an,
        calo:calo ||food.data.calo, 
        khoi_luong:khoi_luong ||food.data.khoi_luong,
        chi_tiet:chi_tiet ||food.data.chi_tiet,
        so_luong:so_luong ||food.data.so_luong,
        trang_thai:trang_thai ||food.data.trang_thai,
        hinh_anh:hinh_anh ||food.data.hinh_anh
    });

    const updatedFood = await FoodRef.get();
    const data = {
        MaPhong: updatedFood.MaPhong,
      ...updatedFood.data(),
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
exports.deleteFood = async (req, res) => {
  const { ma_mon} = req.body;
  try {
    const FoodRef = db.collection(table).doc(ma_mon);
    const food = await FoodRef.get();

    if (!food.exists) {
      return res.status(404).json({ message: 'Department not found' });
    }

    await FoodRef.delete();

    return res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ general: 'Something went wrong, please try again' });
  }
};