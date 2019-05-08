import { collectionFactory, modelFactory } from './utils/database'

const idIndex = {
  fieldName: '_id',
  unique: true,
}

//用户
export const Users = modelFactory(collectionFactory('users', idIndex))
//种类表
export const Genres = modelFactory(collectionFactory('genres', idIndex))

//数据表
export const Datas = modelFactory(collectionFactory('datas', idIndex))
//订单表
export const Orders = modelFactory(collectionFactory('orders', idIndex))

export const downloadHead = __dirname;


