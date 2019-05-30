import { Genres, Datas, downloadHead } from '../providers'
import express from 'express'
const route = express.Router();
import fs from 'fs';
import path from 'path';

async function getByname(name) {
    return await Datas.findOne({ name })
}

route.post('/create', async (req, res, next) => {
    try {
        const food = await getByname(req.body.name);
        if (food) {
            throw new Error('已有同名的数据');
        }
        let doc = {
            name: req.body.name,
            desc: req.body.desc,
            genre: req.body.genre,
            imgpath: req.body.imgpath,
            filepath: req.body.filepath,
            keyword: req.body.keyword,
            price: req.body.price,
            type: req.body.type,
        }
        const newDoc = await Datas.insert(doc);
        res.json({ status: 'ok' })
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.post('/data', async (req, res, next) => {
    const id = req.body.id;
    try {
        let data = await Datas.findOne({ _id: id });

        let relateList = await Datas.find(
            {
                $and:
                    [
                        { genre: data.genre },
                        { _id: { $ne: data._id } }
                    ]
            }, { limit: 4 });
        res.json({
            data: data,
            relateList: relateList
        });
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.get('/count', async (req, res, next) => {
    try {
        let data = await Datas.count({});
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }

})

route.get('/list', async (req, res, next) => {
    try {
        let data = await Datas.find({});
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/list', async (req, res, next) => {
    const limit = req.body.limit;
    const offset = req.body.offset;
    try {
        let data = await Datas.find({}, { limit: limit, skip: offset });
        for (let i = 0; i < data.length; ++i) {
            if (data[i].genre !== '') {
                let doc = await Genres.findOne({ _id: data[i].genre });
                data[i].genrename = doc.name;
            }
        }
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/searchlist', async (req, res, next) => {
    try {
        const keyword = req.body.keyword;
        let regex = new RegExp(keyword);
        let data = await Datas.find({
            $or: [
                { "name": regex }, { "keyword": regex }
            ]
        });
        for (let i = 0; i < data.length; ++i) {
            if (data[i].genre !== '') {
                let doc = await Genres.findOne({ _id: data[i].genre });
                data[i].genrename = doc.name;
            }
        }
        res.json({ data: data });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/delete', async (req, res, next) => {
    const id = req.body.id;
    try {
        let data = await Datas.removeOne({ _id: id });
        res.json({ status: 'ok' })
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/change', async (req, res, next) => {
    const id = req.body._id;
    try {
        let data = await Datas.updateOne({ _id: id }, req.body);
        res.json({ status: 'ok' })
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/download', async (req, res, next) => {
    const id = req.body.id;
    try {
        if (!req.session.user) {
            throw new Error('请登录');
        }
        let doc = await Datas.findOne({ _id: id });
        if (doc) {
            // res.set("Content-type: application/binary");
            // res.download(doc.filepath);
            // let road = fs.createReadStream(doc.filepath); //创建输入流入口
            // road.pipe(res);// 通过管道方式写入
            res.set("Content-type: application/binary");
            let filepath = path.join(downloadHead, doc.filepath);
            console.log(filepath);
            res.download(filepath);

        }
        // res.json({ status: 'ok' })
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

export default route;
