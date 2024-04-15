import {createRouter, createWebHashHistory} from "vue-router";


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import((`../views/Login.vue`))
        },
        {
            path: '/index',
            component: () => import((`../views/Index.vue`)),
            children: [
                {
                    path: '',
                    component: () => import((`../views/Home.vue`))
                },
                {
                    path: '/email',
                    component: () => import((`../views/Email.vue`))
                },
                {
                    path: '/message',
                    component: () => import((`../views/Message.vue`))
                },
                {
                    path: '/center',
                    component: () => import((`../views/user/Center.vue`))
                },
                {
                    path: '/changepwd',
                    component: () => import((`../views/user/ChangePwd.vue`))
                },
                {
                    path: '/role',
                    component: () => import((`../views/user/Role.vue`))
                },
                {
                    path: '/user',
                    component: () => import((`../views/user/User.vue`))
                },
                {
                    path: '/bill',
                    component: () => import((`../views/bill/Bill.vue`))
                },
                {
                    path: '/file',
                    component: () => import((`../views/file/File.vue`))
                },
            ]
        }
    ]
})



export default router