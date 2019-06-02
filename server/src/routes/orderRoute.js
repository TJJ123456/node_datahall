import { Orders, Genres, Datas, Users } from '../providers'
import express from 'express'
const route = express.Router();

async function getByname(name) {
    return await Orders.findOne({ name })
}
//新建订单
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
        req.session.user.money -= data.price;
        await Users.updateOne({ _id: req.session.user._id }, { $set: { 'money': req.session.user.money } });
        res.json({
            _id: req.session.user._id,
            username: req.session.user.username,
            money: req.session.user.money
        })
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})
//根据用户id请求该用户的订单数量
route.get('/userlist', async (req, res, next) => {
    try {
        if (!req.session.user) {
            throw new Error('请登录');
        }
        let data = await Orders.find({ userid: req.session.user._id });
        for (let i in data) {
            if (data[i].userid !== '') {
                let doc = await Users.findOne({ _id: data[i].userid });
                data[i].username = doc.username;
            }
            let datadoc = await Datas.findOne({ _id: data[i].dataid });
            if (datadoc) {
                data[i].dataname = datadoc.name;
            } else {
                data[i].dataname = '已删除';
            }
        }
        res.json({
            data: data
        });
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})
//请求订单详细信息
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
//请求订单总数
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
//请求订单列表
route.get('/list', async (req, res, next) => {
    try {
        let data = await Orders.find({});
        for (let i in data) {
            if (data[i].userid !== '') {
                let doc = await Users.findOne({ _id: data[i].userid });
                if (doc) {
                    data[i].username = doc.username;
                } else {
                    data[i].username = '用户不存在';
                }
            }
            let datadoc = await Datas.findOne({ _id: data[i].dataid });
            if (datadoc) {
                data[i].dataname = datadoc.name;
            } else {
                data[i].dataname = '数据不存在';
            }
        }
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }
})
//根据条件请求订单表
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
//删除订单列表
route.post('/delete', async (req, res, next) => {
    const id = req.body.id;
    try {
        let data = await Orders.removeOne({ _id: id });
        res.json({ status: 'ok' })
    } catch (e) {
        res.status(405).send(e.message);
    }
})
//根据id改变订单
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
