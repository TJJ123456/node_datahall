import { Genres, Books } from '../providers'
import express from 'express'
const route = express.Router();

async function getByname(name) {
    return await Genres.findOne({ name })
}

route.post('/create', async (req, res, next) => {
    try {
        const food = await getByname(req.body.name);
        console.log(food);
        if (food) {
            throw new Error('已有同名的种类');
        }
        const newDoc = await Genres.insert(req.body);
        res.json({ status: 'ok' })
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.get('/count', async (req, res, next) => {
    try {
        let data = await Genres.count({});
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }

})

route.get('/list', async (req, res, next) => {
    try {
        let data = await Genres.find({});
        for (let i = 0; i < data.length; ++i) {
            console.log(data[i]._id);
            data[i].bookList = await Books.find({ "genre": data[i]._id })
        }
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
        let data = await Genres.find({}, { limit: limit, skip: offset });
        for (let i = 0; i < data.length; ++i) {
            console.log(data[i]._id);
            data[i].bookList = await Books.find({ genre: data[i]._id })
            let tmp = await Books.find({});
            console.log(tmp);
            console.log(data[i].bookList);
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
        let data = await Genres.removeOne({ _id: id });
        let tmp = await Books.update({ 'genre': id }, { $pull: { 'genre': id } })
        res.json({ status: 'ok' })
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/change', async (req, res, next) => {
    const id = req.body._id;
    try {
        let data = await Genres.updateOne({ _id: id }, req.body);
        res.json({ status: 'ok' })
    } catch (e) {
        res.status(405).send(e.message);
    }
})

export default route;
