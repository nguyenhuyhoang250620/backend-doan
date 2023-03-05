var admin = require("firebase-admin");
var serviceAccount = require("../demoflutter-706b1-firebase-adminsdk-o5a4j-040ca6ff54.json");
const { Storage } = require('@google-cloud/storage');
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    storageBucket:"demoflutter-706b1.appspot.com"
});

const auth = admin.auth();
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true })
const bucket = admin.storage().bucket()
module.exports = {admin,db,bucket,auth}