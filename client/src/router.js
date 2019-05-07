import Vue from 'vue';
import VueRouter from 'vue-router';
import state from './main/state'

Vue.use(VueRouter);


import mangerHome from './components/managerHome.vue';
import mangerLogin from './components/mangerLogin.vue';
import addImgData from './views/addImgData.vue';
import addImgGenre from './views/addImgGenre.vue';
import addTxtData from './views/addTxtData.vue';
import addTxtGenre from './views/addTxtGenre.vue';
import imgDataList from './views/imgDataList.vue';
import imgGenreList from './views/imgGenreList.vue';
import txtDataList from './views/txtDataList.vue';
import txtGenreList from './views/txtGenreList.vue';

import userList from './views/userList.vue';
import orderList from './views/orderList.vue';
import manage from './views/manage.vue';
import home from './views/home.vue';

import userhome from './userviews/userhome.vue';
import userLayout from './userviews/userLayout.vue';
import userLogin from './userviews/login.vue';
import myOrder from './userviews/myOrder.vue';
import dataDetail from './userviews/dataDetail.vue';
import searchview from './userviews/searchview.vue';

const routes = [
    {
        path: '/', name: 'userhome', component: userLayout,
        children: [{
            path: '/',
            name: 'userindex',
            component: userhome,
            meta: [],
        },
        {
            path: '/home/myOrder',
            component: myOrder,
            meta: [],
        },
        {
            path: '/home/dataDetail/:id',
            name: 'detail',
            component: dataDetail,
            props: true
        },
        {
            path: '/home/search/:keyword',
            name: 'search',
            component: searchview,
            props: true
        },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: userLogin,
        meta: [],
    },
    { path: '/managerlogin', name: 'managerlogin', component: mangerLogin },
    {
        path: '/manager',
        name: '',
        component: manage,
        meta: { manager: true },
        children: [{
            path: '',
            component: home,
            meta: [],
        }, {
            path: '/addImgData',
            component: addImgData,
            props: true,
            meta: ['图像数据', '添加数据'],
        }, {
            path: '/addImgGenre',
            component: addImgGenre,
            params: { type: 0 },
            props: true,
            meta: ['图像数据', '添加种类'],
        }, {
            path: '/imgDataList',
            component: imgDataList,
            props: true,
            params: { type: 0 },
            meta: ['图像数据', '数据列表'],
        }, {
            path: '/imgGenreList',
            component: imgGenreList,
            props: true,
            params: { type: 0 },
            meta: ['图像数据', '种类列表'],
        }, {
            path: '/addTxtData',
            component: addTxtData,
            props: true,
            meta: ['文本数据', '添加数据'],
        }, {
            path: '/addTxtGenre',
            component: addTxtGenre,
            props: true,
            meta: ['文本数据', '添加种类'],
        }, {
            path: '/txtDataList',
            component: txtDataList,
            props: true,
            meta: ['文本数据', '数据列表'],
        }, {
            path: '/txtGenreList',
            component: txtGenreList,
            props: true,
            meta: ['文本数据', '种类列表'],
        },
        {
            path: '/userList',
            component: userList,
            props: true,
            meta: ['用户管理', '用户列表'],
        },
        {
            path: '/orderList',
            component: orderList,
            props: true,
            meta: ['订单管理', '订单列表'],
        },]
    },

]

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        if (to.hash) {
            return { selector: to.hash }
        }
        return { x: 0, y: 0 }
    },
})

router.beforeEach((to, from, next) => {
    console.log('to', to.name, to.meta, to.fullPath);
    // if (to.meta.private && !state.user) {
    if (to.matched.some(r => r.meta.manager) && !state.manager) {
        next({ name: 'managerlogin', params: { wantedRoute: to.fullPath } });
        return;
    }
    if (to.matched.some(r => r.meta.private) && !state.user) {
        next({ name: 'login', params: { wantedRoute: to.fullPath } });
        return;
    }
    if (to.matched.some(r => r.meta.guest) && state.user) {
        next({ name: 'home' });
        return;
    }
    next();
})

export default router;