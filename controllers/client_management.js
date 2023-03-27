// Để xóa một phần tử của một mảng trong một trường của một document trong Firebase Firestore bằng Node.js, bạn có thể sử dụng phương thức update() của đối tượng DocumentReference. Ví dụ:

const admin = require('firebase-admin');
const db = admin.firestore();

const docRef = db.collection('collectionName').doc('documentId');

// Xóa phần tử có giá trị là "valueToDelete" trong mảng "arrayFieldName"
docRef.update({
  arrayFieldName: admin.firestore.FieldValue.arrayRemove('valueToDelete')
})
.then(() => {
  console.log("Document updated successfully.");
})
.catch((error) => {
  console.error("Error updating document: ", error);
});