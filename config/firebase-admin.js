var admin = require("firebase-admin");
var serviceAccount = require("../demoflutter-706b1-firebase-adminsdk-o5a4j-040ca6ff54.json");
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
})
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true })
module.exports = {admin,db}