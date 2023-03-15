const firebase = require('../config/firebase-admin');
const multer = require('multer')
const{bucket} = require("../config/firebase-admin");
const path = require('path');
const{updateUser} = require("../controllers/student_management")
const { db } = require("../config/firebase-admin");

exports.upload = multer({
    storage: multer.memoryStorage()
})
exports.uploadfile = async (req, res) => {
    if(!req.file) {
        return res.status(400).send("Error: No files found")
    }
    const blob = firebase.bucket.file(req.file.originalname)
    
    const blobWriter = blob.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    })
    
    blobWriter.on('error', (err) => {
        console.log(err)
    })
    
    blobWriter.on('finish', () => {
        blob.getSignedUrl({
            action: 'read',
            expires: '03-09-2024' // Thời gian hết hạn URL, có thể là một đối số tuỳ chọn
        }, async (err, url) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error: Unable to generate signed URL");
            }
            console.log(url);
            if(req.body.masv == undefined){
                await db.collection('Teacher').doc(req.body.magv).set({
                    url:url
                },{merge:true})
            }
            else{
                await db.collection('User').doc(req.body.masv).set({
                    url:url
                },{merge:true})
            }
            res.status(200).send("File uploaded.")
        });
    })
    
    blobWriter.end(req.file.buffer)
};

exports.getImageUrl = async function() {
    try {
        console.log(bucket)
        console.log(bucket.parent.baseUrl)
        // const file = bucket.file();
        // const url = await file.getSignedUrl({
        //     action: 'read',
        //     expires: '03-09-2024' // Ngày hết hạn
        // });
        // console.log('Image URL:', url);
        // return url;
    } catch (error) {
        console.log('Get image URL failed:', error);
        return null;
    }
};

