import { Plans, Foods, Hotels, Spots } from '../providers'
import express from 'express'
const route = express.Router();

async function getByname(name) {
    return await Plans.findOne({ name })
}

async function populateFood(id) {
    return await Foods.findOne({ _id: id });
}

async function populateHotel(id) {
    return await Hotels.findOne({ _id: id });
}

async function populateSpot(id) {
    return await Spots.findOne({ _id: id });
}


route.post('/create', async (req, res, next) => {
    try {
        const food = await getByname(req.body.name);
        console.log(food);
        if (food) {
            throw new Error('已有同名的计划');
        }
        const newDoc = await Plans.insert(req.body);
        res.json({ status: 'ok' })
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.get('/count', async (req, res, next) => {
    try {
        let data = await Plans.count({});
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }

})

route.get('/list', async (req, res, next) => {
    try {
        let data = await Plans.find({});
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
        let data = await Plans.find({}, { limit: limit, skip: offset });
        if (data) {
            for (let j = 0; j < data.length; ++j) {
                let plan = data[j];
                for (let i = 0; i < plan.list.length; ++i) {
                    plan.list[i].breakfast = await populateFood(plan.list[i].breakfast);
                    plan.list[i].morningspot = await populateSpot(plan.list[i].morningspot);
                    plan.list[i].lunch = await populateFood(plan.list[i].lunch);
                    plan.list[i].afternoonspot = await populateSpot(plan.list[i].afternoonspot);
                    plan.list[i].dinner = await populateFood(plan.list[i].dinner);
                    plan.list[i].hotel = await populateHotel(plan.list[i].hotel);
                }
            }
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
        let data = await Plans.removeOne({ _id: id });
        res.json({ status: 'ok' })
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/change', async (req, res, next) => {
    const id = req.body._id;
    try {
        let data = await Plans.updateOne({ _id: id }, req.body);
        res.json({ status: 'ok' })
    } catch (e) {
        res.status(405).send(e.message);
    }
})

export default route;
