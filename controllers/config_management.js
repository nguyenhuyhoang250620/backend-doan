const { db,admin } = require("../config/firebase-admin");


const table = 'Config';
const teacher = 'Teacher'
const classs = 'Class'
const department = 'Department'
const shift = 'Shift'
const subject = 'Subject'
const user = 'User'
exports.createPoint = async(req,res)=>{
  
  const docRef = admin.firestore().collection(table);
  await docRef.where('MaGV', '==', req.body.magv).limit(1).get().then((querySnapshot) => {
    if (!querySnapshot.empty) {
      const danhsach = querySnapshot.docs[0].data()['danhsach'];
      // Tìm vị trí của object trong mảng dựa trên trường `MaSV`.
      const index = danhsach.findIndex((item) => item.MaSV === req.body.masv);

      // Thêm trường mới vào object tìm được.
      const updatedObj = Object.assign({},danhsach[index], { 
        DiemChuyenCan: req.body.DiemChuyenCan, 
        DiemGiuaKi: req.body.DiemGiuaKi, 
        DiemCuoiKi: req.body.DiemCuoiKi, 
        DiemTrungBinh: req.body.DiemTrungBinh, 
      });

      // Cập nhật object trong mảng.


      
      danhsach.splice(index, 1, updatedObj);

      // Cập nhật tài liệu với mảng đã được cập nhật.
      docRef.doc(querySnapshot.docs[0].id).update({ danhsach })
        .then(() => res.status(200).json(danhsach))
        .catch((error) => console.error('Lỗi khi cập nhật trường mới:', error));
    }
  });
}
exports.sumAvarage = async(req,res)=>{
  console.log(req.body.magv);
  console.log(req.body.mahocphan);
  let danhsach = [];
  const docRef = admin.firestore().collection(table);
  await docRef.where('MaGV', '==', req.body.magv).limit(1).get().then((querySnapshot) => {
    if (!querySnapshot.empty) {
      danhsach = querySnapshot.docs[0].data()['danhsach'];
      // Tính điểm trung bình của từng sinh viên trong mảng.
      for (let i = 0; i < danhsach.length; i++) {
        const avarage = parseInt(danhsach[i].DiemChuyenCan) * 0.1 + parseInt(danhsach[i].DiemGiuaKi) * 0.2 + parseInt(danhsach[i].DiemCuoiKi) * 0.7;
        console.log(avarage);
        // Tạo một đối tượng mới với trường `DiemTrungBinh` được cập nhật.
        const updatedObj = Object.assign({}, danhsach[i], { 
          DiemTrungBinh: avarage.toFixed(2).toString(), 
        });
        // Cập nhật đối tượng trong mảng.
        danhsach.splice(i, 1, updatedObj);
      }
      // Cập nhật tài liệu với mảng đã được cập nhật.
      docRef.doc(querySnapshot.docs[0].id).update({ danhsach })
        .then(() => res.status(200).json(danhsach))
        .catch((error) => console.error('Lỗi khi cập nhật trường mới:', error));
    }
  });

}
exports.deleteStudent = async (req, res) => {
  try {
    const { magv, masv } = req.body;

    const docRef = admin.firestore().collection(table).doc(magv);
    const doc = await docRef.get();

    if (!doc.exists) {
      console.log('Không tìm thấy tài liệu!');
      return res.status(404).json({ message: 'Không tìm thấy tài liệu!' });
    }

    const data = doc.data();
    if (!data.danhsach) {
      console.log('Không tìm thấy danh sách sinh viên trong tài liệu!');
      return res.status(404).json({ message: 'Không tìm thấy danh sách sinh viên trong tài liệu!' });
    }

    const updatedList = data.danhsach.filter((item) => item.MaSV !== masv);

    await docRef.update({ danhsach: updatedList });

    console.log('Xóa sinh viên thành công!');
    return res.status(200).json({ message: 'Xóa sinh viên thành công!', data: updatedList });
  } catch (error) {
    console.error('Lỗi khi xóa sinh viên:', error);
    return res.status(500).json({ message: 'Lỗi khi xóa sinh viên!', error });
  }
};
//create
exports.createConfig = async (req, res) => {
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
    const setdata = await db.collection(table).doc();
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
    if(req.query.MaGV == undefined){
        ShiftRef.get().then((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
      }));
          console.log(data);
          return res.status(200).json(data);
      })
    }else if(req.query.MaHocPhan != undefined && req.query.MaGV != undefined){
      ShiftRef.where('MaGV', '==', req.query.MaGV).where('mahocphan.MaHocPhan', '==' , req.query.MaHocPhan).get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(data);
        return res.status(200).json(data);
      });
    }
    else{
      ShiftRef.where('MaGV', '==', req.query.MaGV).get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(data);
        return res.status(200).json(data);
      });
    }
  } catch (error) {
      return res
      .status(500)
      .json({ general: "Something went wrong, please try again"});          
  }
};
//get dữ liệu
exports.deleteConfig = async (req, res) => {
  const ShiftRef = db.collection(table);
  ShiftRef.where('MaGV', '==', req.body.MaGV).where('mahocphan.MaHocPhan', '==',req.body.MaHocPhan).get().then((querySnapshot) => {
    // Duyệt qua từng documents để xóa
    querySnapshot.forEach((doc) => {
      doc.ref.delete().then(() => {
        console.log('Document successfully deleted!');
        return res.status(200).json('Document successfully deleted!')
      }).catch((error) => {
        console.error('Error removing document: ', error);
        return res.status(200).json('khong xoa duoc')
      });
    });
  });
};
