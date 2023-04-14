const { db } = require("../config/firebase-admin");

const table = 'Attendance_Teacher'
//create
exports.getAttendanceTeacher = async (req, res) => {
    const ClassRef = db.collection(table);
    try {
    const docRef = ClassRef.doc(req.query.MaGV);
    const snapshot = await docRef.get();
    if (snapshot.exists) {
        const data = {
        id: snapshot.id,
        ...snapshot.data()
        }
        console.log(data);
        return res.status(201).json([data]);
    } else {
        return res.status(201).json([]);
    }
    } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong, please try again" });
    }
  };