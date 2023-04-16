import VueRouter from "vue-router";
import LogIn from "../pages/LogIn"
import Home from "../pages/Home"
import MyHistory from "../pages/MyHistory"
import UserInfo from "../pages/UserInfo"
import Users from "../pages/Users"
import UserHistory from "../pages/UserHistory"
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default new VueRouter({
    routes: [{
            name: 'LogIn',
            path: '/',
            component: LogIn,

        },
        {
            name: 'Home',
            path: '/home',
            component: Home,
            beforeEnter: (to, from, next) => {
                // user = JSON.parse(localStorage.getItem('user'))
                if (localStorage.getItem('user')) next()
            }
        },
        {
            name: 'MyHistory',
            path: '/history',
            component: MyHistory,
        },
        {
            name: 'UserInfo',
            path: '/userinfo',
            component: UserInfo,
        },
        {
            name: 'Users',
            path: '/users',
            component: Users,
            children: [{
                name: 'UserHistory',
                path: 'user_history',
                component: UserHistory,
                props($route) {
                    return {
                        user_id: $route.query.user_id
                    }
                }
            }]
        }
    ]
})