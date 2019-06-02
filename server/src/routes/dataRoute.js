import { Genres, Datas, downloadHead, Orders } from '../providers'
import express from 'express'
const route = express.Router();
import fs from 'fs';
import path from 'path';
//检查是否有该名字数据
async function getByname(name) {
    return await Datas.findOne({ name })
}
//新建数据
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
//根据id请求数据细节
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
//请求数据数量
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
//请求数据列表
route.get('/list', async (req, res, next) => {
    try {
        let data = await Datas.find({});
        for (let i = 0; i < data.length; ++i) {
            if (data[i].genre !== '') {
                let doc = await Genres.findOne({ _id: data[i].genre });
                if (doc)
                    data[i].genrename = doc.name;
                else
                    data[i].genrename = '无此类型';
                data[i].ordercount = await Orders.count({ dataid: data[i]._id });
            }
        }
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }
})
//根据条件请求数据列表
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
//请求搜索结果列表
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
//删除数据
route.post('/delete', async (req, res, next) => {
    const id = req.body.id;
    try {
        let data = await Datas.removeOne({ _id: id });
        res.json({ status: 'ok' })
    } catch (e) {
        res.status(405).send(e.message);
    }
})
//更改数据
route.post('/change', async (req, res, next) => {
    const id = req.body._id;
    try {
        let data = await Datas.updateOne({ _id: id }, req.body);
        res.json({ status: 'ok' })
    } catch (e) {
        res.status(405).send(e.message);
    }
})
//下载数据
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
