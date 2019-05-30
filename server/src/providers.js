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

const GenreTxt = ['大学', '中学', '社交', '生活'];
const GenreImg = ['医疗', '安防', '交通', '其他'];

const txtName = ['个', '万条', '小时', '人', '段', '万张'];
const txtName2 = ['中学生', '模特', '大学生', '男生', '女生', '程序员', '工程师', '清洁工'];
const txtName3 = ['考试成绩', '上网时间', '业余生活', '出行状况', '学历信息', '英雄联盟数据'];
const keywordArr = ['学生，考试', '职业，生活', '社交，游戏', '社会，学习'];
const descArr = [
  `莫听穿林打叶声，何妨吟啸且徐行。竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。料峭春风吹酒醒，微冷，山头斜照却相迎。回首向来萧瑟处，归去，也无风雨也无晴。`,
  `明月几时有，把酒问青天。不知天上宫阙，今夕是何年？我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间！转朱阁，低绮户，照无眠。不应有恨，何事长向别时圆？人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟。`,
  `前瞻马耳九仙山。碧连天。晚云间。城上高台，真个是超然。莫使匆匆云雨散，今夜里，月婵娟。小溪鸥鹭静联拳。去翩翩。点轻烟。人事凄凉，回首便他年。莫忘使君歌笑处，垂柳下，矮槐前。`,
  `西塞山边白鹭飞。散花洲外片帆微。桃花流水鳜鱼肥。自庇一身青箬笠，相随到处绿蓑衣。斜风细雨不须归。`,
  `雪里餐毡例姓苏。使君载酒为回车。天寒酒色转头无。荐士已闻飞鹗表，报恩应不用蛇珠。醉中还许揽桓须。`
]
function randomIndex(count) {
  return Math.round(Math.random() * (count - 1));
}

async function createGenre() {
  GenreTxt.forEach(async item => {
    let doc = await Genres.insert({
      name: item,
      type: 1
    })
  })
  GenreTxt.forEach(async item => {
    let doc = await Genres.insert({
      name: item,
      type: 0
    })
  })
}

async function createData() {
  let list = await Genres.find({});
  list.forEach(async item => {
    let rand = randomIndex(10) + 1;
    for (let i = 0; i < rand; ++i) {
      let fakeNum = randomIndex(10000) + 5;
      let name = fakeNum + txtName[randomIndex(txtName.length)] + txtName2[randomIndex(txtName2.length)] + txtName3[randomIndex(txtName3.length)];
      let desc = descArr[randomIndex(descArr.length)];
      let genre = item._id;
      let keyword = keywordArr[randomIndex(keywordArr.length)];
      let type = item.type;
      let imgpath = 'public/img/default.jpg';
      let filepath = item.type === 0 ? 'public/img/default.jpg' : 'public/txt/123.txt';
      let price = randomIndex(9999) + 100;
      let doc = {
        name,
        desc,
        genre,
        imgpath,
        filepath,
        keyword,
        price,
        type,
      }
      let newDoc = await Datas.insert(doc);
    }
  })
}

async function initData() {
  // await createGenre();
  await createData();
}

// initData()

