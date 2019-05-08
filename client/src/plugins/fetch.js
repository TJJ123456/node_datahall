import state from '../main/state'
import router from '../router'
import saveAs from 'file-saver';
let baseUrl;

export async function $downloadfetch(url, options) {
    const finalOptions = Object.assign({}, {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }, options);
    console.log('1111');

    const response = await fetch(`${baseUrl}${url}`, finalOptions);
    console.log(response);
    try {
        let file = await response.blob();
        let a = document.createElement('a');
        a.href = window.URL.createObjectURL(file);
        a.click();
        // window.URL.revokeObjectURL(a.href);
    } catch (e) {
        console.error(e);
    }
}

export async function $fetch(url, options) {
    const finalOptions = Object.assign({}, {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }, options)
    const response = await fetch(`${baseUrl}${url}`, finalOptions);
    if (response.headers.get('Content-Type').indexOf('application/msexcel') > -1) {
        let data = await res.blob();
        // saveAs(datam, 'hahaha');
        const a = window.document.createElement('a');
        const downUrl = window.URL.createObjectURL(blob);// 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
        const filename = response.headers.get('Content-Disposition').split('filename=')[1].split('.');
        a.href = downUrl;
        // a.download = `${decodeURI(filename[0])}.${filename[1]}`;
        a.click();
        window.URL.revokeObjectURL(downUrl);
        return data;
    }
    else if (response.ok) {
        const data = await response.json();
        return data;
    } else if (response.status === 403) {
        console.log('403了?', router.currentRoute.fullPath)
        state.user = null;
        if (router.currentRoute.matched.some(r => r.meta.private)) {
            router.replace({
                name: 'login', params: {
                    wantedRoute: router.currentRoute.fullPath
                }
            })
        }
    } else if (response.status === 405) {
        const text = await response.text();
        const data = {
            err: true,
            msg: text
        }
        return data;
    } else {
        const message = await response.text();
        const error = new Error('error');
        error.response = message;
        throw error;
    }
}

export default {
    install(Vue, options) {
        baseUrl = options.baseUrl;
        Vue.prototype.$fetch = $fetch;
        Vue.prototype.$downloadfetch = $downloadfetch;
    }
}