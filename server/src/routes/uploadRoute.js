import express from 'express';
import multer from 'multer';
import fs from 'fs';
const route = express.Router();
import { Genres, Datas } from '../providers'

async function getByname(name) {
    return await Datas.findOne({ name })
}

route.post('/img', multer({ dest: 'src/public/upload' }).single('file'), (req, res, next) => {
    // console.log(req.file);
    const file = req.file;
    let filename = file.path;
    if (file.mimetype === 'image/jpg') {
        fs.renameSync(file.path, file.path + '.jpg')
        filename += file.path + '.jpg';
    } else if (file.mimetype === 'image/png') {
        fs.renameSync(file.path, file.path + '.png')
        filename += file.path + '.png';
    } else if (file.mimetype === 'image/jpeg') {
        fs.renameSync(file.path, file.path + '.jpeg')
        filename = file.path + '.jpeg';
    }else if (file.mimetype === 'text/plain') {
        fs.renameSync(file.path, file.path + '.txt')
        filename = file.path + '.txt';
    }else if (file.mimetype === 'application/msword') {
        fs.renameSync(file.path, file.path + '.doc')
        filename = file.path + '.doc';
    }else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        fs.renameSync(file.path, file.path + '.docx')
        filename = file.path + '.docx';
    }
    res.json({
        filepath: filename
    });
})

route.post('/remove', (req, res, next) => {
    const filepath = req.body.filepath;
    console.log(filepath);
    fs.unlink(filepath, (err) => {
        if (err) {
            res.json({
                err: true
            });
        } else {
            res.json({
                status: 'ok'
            });
        }
    });
})

export default route;