import { collectionFactory, modelFactory } from './utils/database'

const idIndex = {
  fieldName: '_id',
  unique: true,
}

//用户
export const Users = modelFactory(collectionFactory('users', idIndex))
//书本
export const Books = modelFactory(collectionFactory('books', idIndex))
//书架
export const BookShelf = modelFactory(collectionFactory('bookshelf', idIndex))
//借阅表
export const BorrowList = modelFactory(collectionFactory('borrowlist', idIndex))
//种类表
export const Genres = modelFactory(collectionFactory('genres', idIndex))

