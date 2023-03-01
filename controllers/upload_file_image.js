const { storage } = require("../config/firebase-admin");
const fs = require('fs');

exports.uploadfile = async (req, res) => {
    try {
        // Lấy tệp tin cần tải lên từ request của client
        console.log(req)
        const file = req.file;

        // Tạo tên tệp tin trên Firebase Storage
        const fileName = `${Date.now()}_${file.originalname}`;

        // Tải lên tệp tin lên Firebase Storage
        const bucket = storage.bucket('gs://demoflutter-706b1.appspot.com');
        const blob = bucket.file(fileName);

        const stream = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        stream.on('error', (err) => {
            console.log('Upload failed:', err);
            res.status(500).send('Upload failed');
        });

        stream.on('finish', async () => {
            console.log('Upload success!');
            // Lấy URL của tệp tin vừa tải lên
            const url = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
            res.status(200).send(url);
        });

        stream.end(file.buffer);
    } catch (error) {
        console.log('Upload failed:', error);
        res.status(500).send('Upload failed');
    }
};
exports.getImageUrl = async function(fileName) {
    try {
        const bucket = storage.bucket('gs://demoflutter-706b1.appspot.com');
        const file = bucket.file(fileName);
        const url = await file.getSignedUrl({
            action: 'read',
            expires: '03-09-2024' // Ngày hết hạn
        });
        console.log('Image URL:', url);
        return url;
    } catch (error) {
        console.log('Get image URL failed:', error);
        return null;
    }
};

