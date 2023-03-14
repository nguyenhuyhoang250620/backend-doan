const { db,admin } = require("../config/firebase-admin");

const table = 'Config';
const teacher = 'Teacher'
const classs = 'Class'
const department = 'Department'
const shift = 'Shift'
const subject = 'Subject'
const user = 'User'
//create
exports.createConfig = async (req, res) => {
  // console.log(req.body.MaGV);
  // console.log(req.body.MaPhong);
  // console.log(req.body.MaDV);
  // console.log(req.body.MaCa);
  console.log(req.body.MaSV);
  try {
    const myArr = Object.values(req.body.MaSV);
    const docsToAdd = [];
    myArr.map(async (value)=>{
      const docSV = await db.collection(user).doc(value).get()
        .then(async (doc) => {
            if (doc.exists) {
            console.log('Dữ liệu của document:', doc.data());
              return doc.data();
            } else {
            console.log('Không tìm thấy document!');
              return 'Không tìm thấy document!'
            }
        })
        .catch((error) => {
            console.log('Lỗi khi lấy dữ liệu:', error);
        });
      docsToAdd.push(docSV);
    })
    const docGV = await db.collection(teacher).doc(req.body.MaGV).get()
    .then(async (doc) => {
        if (doc.exists) {
        console.log('Dữ liệu của document:', doc.data());
          return doc.data();
        } else {
        console.log('Không tìm thấy document!');
          return 'Không tìm thấy document!'
        }
    })
    .catch((error) => {
        console.log('Lỗi khi lấy dữ liệu:', error);
    });

    const docMaPhong = await db.collection(classs).doc(req.body.MaPhong).get()
    .then(async (doc) => {
        if (doc.exists) {
        console.log('Dữ liệu của document:', doc.data());
          return doc.data();
        } else {
        console.log('Không tìm thấy document!');
          return 'Không tìm thấy document!'
        }
    })
    .catch((error) => {
        console.log('Lỗi khi lấy dữ liệu:', error);
    });

    const docMaDV = await db.collection(department).doc(req.body.MaDV).get()
    .then(async (doc) => {
        if (doc.exists) {
        console.log('Dữ liệu của document:', doc.data());
          return doc.data();
        } else {
        console.log('Không tìm thấy document!');
          return 'Không tìm thấy document!'
        }
    })
    .catch((error) => {
        console.log('Lỗi khi lấy dữ liệu:', error);
    });

    const docMaCa = await db.collection(shift).doc(req.body.MaCa).get()
    .then(async (doc) => {
        if (doc.exists) {
        console.log('Dữ liệu của document:', doc.data());
          return doc.data();
        } else {
        console.log('Không tìm thấy document!');
          return 'Không tìm thấy document!'
        }
    })
    .catch((error) => {
        console.log('Lỗi khi lấy dữ liệu:', error);
    });

    const docMaHocPhan = await db.collection(subject).doc(req.body.MaHocPhan).get()
    .then(async (doc) => {
        if (doc.exists) {
        console.log('Dữ liệu của document:', doc.data());
          return doc.data();
        } else {
        console.log('Không tìm thấy document!');
          return 'Không tìm thấy document!'
        }
    })
    .catch((error) => {
        console.log('Lỗi khi lấy dữ liệu:', error);
    });
    const newData = Object.assign({}, docGV, 
      { magv: docGV, 
        maphong:docMaPhong,
        madv:docMaDV,
        maca:docMaCa,
        mahocphan:docMaHocPhan,
        danhsach: admin.firestore.FieldValue.arrayUnion(...docsToAdd)
      }
      
    );
    const setdata = await db.collection('Config').doc(req.body.MaGV);
    setdata.set(newData);
    return res.status(201).json(newData);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ general: 'Something went wrong, please try again' });
  }
};

//get dữ liệu
exports.getConfig = async (req, res) => {
  const ShiftRef = db.collection(table);
  try{
    ShiftRef.get().then((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
      }));
          console.log(data);
          return res.status(200).json(data);
      })
  } catch (error) {
      return res
      .status(500)
      .json({ general: "Something went wrong, please try again"});          
  }
};