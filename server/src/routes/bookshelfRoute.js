import { BookShelf, Books } from '../providers'
import express from 'express'
const route = express.Router();

async function getByname(name) {
    return await BookShelf.findOne({ name })
}

route.post('/create', async (req, res, next) => {
    try {
        const food = await getByname(req.body.name);
        console.log(food);
        if (food) {
            throw new Error('已有同名的书架');
        }
        const newDoc = await BookShelf.insert(req.body);
        res.json({ status: 'ok' })
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.get('/count', async (req, res, next) => {
    try {
        let data = await BookShelf.count({});
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
        let data = await BookShelf.find({}, { limit: limit, skip: offset });
        for (let i = 0; i < data.length; ++i) {
            data[i].bookList = await Books.find({ 'bookshelf': data[i]._id })
        }
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.get('/list', async (req, res, next) => {
    try {
        let data = await BookShelf.find({});
        for (let i = 0; i < data.length; ++i) {
            data[i].bookList = Books.find({ bookshelf: data[i]._id })
        }
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/delete', async (req, res, next) => {
    const id = req.body.id;
    try {
        let data = await BookShelf.removeOne({ _id: id });
        let tmp = await Books.update({ 'bookshelf': id }, { $set: { 'bookshelf': "" } })
        res.json({ status: 'ok' })
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/change', async (req, res, next) => {
    const id = req.body._id;
    try {
        let data = await BookShelf.updateOne({ _id: id }, req.body);
        res.json({ status: 'ok' })
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/transferBook', async (req, res, next) => {

})

export default route;
