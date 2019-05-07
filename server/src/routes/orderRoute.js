import { Orders, Genres, Datas, Users } from '../providers'
import express from 'express'
const route = express.Router();

async function getByname(name) {
    return await Orders.findOne({ name })
}

route.post('/create', async (req, res, next) => {
    try {
        if (!req.session.user) {
            throw new Error('请登录');
        }
        const doc = await Orders.findOne({ userid: req.session.user._id, dataid: req.body.dataid });
        if (doc) {
            throw new Error('您已经购买了该数据');
        }
        const date = new Date()
        const data = {
            userid: req.session.user._id,
            dataid: req.body.dataid,
            price: req.body.price,
            createtime: date.getTime()
        }
        const newDoc = await Orders.insert(data);
        res.json({ status: 'ok' })
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.get('/userlist', async (req, res, next) => {
    try {
        if (!req.session.user) {
            throw new Error('请登录');
        }
        let data = await Orders.find({ userid: req.session.user._id });
        console.log(data);
        for (let i in data) {
            if (data[i].userid !== '') {
                let doc = await Users.findOne({ _id: data[i].userid });
                data[i].username = doc.username;
            }
            let datadoc = await Datas.findOne({ _id: data[i].dataid });
            data[i].dataname = datadoc.name;
        }
        res.json({
            data: data
        });
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.post('/order', async (req, res, next) => {
    const id = req.body.id;
    try {
        let data = await Orders.findOne({ _id: id });
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.get('/count', async (req, res, next) => {
    try {
        let data = await Orders.count({});
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }

})

route.get('/list', async (req, res, next) => {
    try {
        let data = await Orders.find({});
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
        let data = await Orders.find({}, { limit: limit, skip: offset });
        for (let i in data) {
            if (data[i].userid !== '') {
                let doc = await Users.findOne({ _id: data[i].userid });
                data[i].username = doc.username;
            }
            let datadoc = await Datas.findOne({ _id: data[i].dataid });
            data[i].dataname = datadoc.name;
        }
        res.json({
            data: data
        });
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.post('/searchlist', async (req, res, next) => {
    try {
        const keyword = req.body.keyword;
        let regex = new RegExp(keyword);
        let data = await Orders.find({
            $or: [
                { "name": regex }, { "keyword": regex }
            ]
        });
        console.log(keyword, data);
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
        let data = await Orders.removeOne({ _id: id });
        res.json({ status: 'ok' })
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/change', async (req, res, next) => {
    const id = req.body._id;
    try {
        let data = await Orders.updateOne({ _id: id }, req.body);
        res.json({ status: 'ok' })
    } catch (e) {
        res.status(405).send(e.message);
    }
})

export default route;
