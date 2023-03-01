var admin = require("firebase-admin");
var serviceAccount = require("../demoflutter-706b1-firebase-adminsdk-o5a4j-040ca6ff54.json");
const { Storage } = require('@google-cloud/storage');
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
});
const storage = new Storage({
    projectId: "demoflutter-706b1",
    credentials: {
        client_email: 'tennguoidungoccho@gmail.com',
        private_key: serviceAccount
    }
});
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true })
module.exports = {admin,db,storage}