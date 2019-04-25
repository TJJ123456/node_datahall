import express from 'express';
import multer from 'multer';
import fs from 'fs';
const route = express.Router();

// const uploadUrl = '/public/upload/img';

route.post('/img', multer({ dest: 'src/public/upload' }).single('file'), (req, res, next) => {
    // console.log(req.file);
    const file = req.file;
    if (file.mimetype === 'image/jpg') {
        fs.renameSync(orifilename, orifilename + '.jpg')
    } else if (file.mimetype === 'image/png') {
        fs.renameSync(orifilename, orifilename + '.png')
    } else if (file.mimetype === 'image/jpeg') {
        fs.renameSync(file.path, file.path + '.jpeg')
    }
    res.json({
        filepath: file.path
    });
})

export default route;