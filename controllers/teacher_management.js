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
  const { id, title, author, publishedYear } = req.body;

  try {
    const bookRef = db.collection(table).doc(id);
    const book = await bookRef.get();

    if (!book.exists) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await bookRef.update({
      title: title || book.data().title,
      author: author || book.data().author,
      publishedYear: publishedYear || book.data().publishedYear,
    });

    const updatedBook = await bookRef.get();
    const data = {
      id: updatedBook.id,
      ...updatedBook.data(),
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
  const { id} = req.body;
  try {
    console.log(`${id}`)
    const bookRef = db.collection(table).doc(id);
    const book = await bookRef.get();

    if (!book.exists) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await bookRef.delete();

    return res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ general: 'Something went wrong, please try again' });
  }
};