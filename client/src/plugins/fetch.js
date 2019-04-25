import state from '../main/state'
import router from '../router'

let baseUrl;

export async function $fetch(url, options) {
    const finalOptions = Object.assign({}, {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }, options)
    const response = await fetch(`${baseUrl}${url}`, finalOptions);
    if (response.ok) {
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
    }
}