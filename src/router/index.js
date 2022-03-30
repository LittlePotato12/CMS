import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: "Main",
        component: () => import("../views/Main.vue"),
        redirect:'/home',
        children: [
            // {
            //     path: '/home',
            //     name: "home",
            //     component: () => import('../views/Home/HomeIndex.vue')
            // },
            // {
            //     path: '/user',
            //     name: "user",
            //     component: () => import('../views/User/UserIndex.vue')
            // },
            // {
            //     path: '/mall',
            //     name: "mall",
            //     component: () => import('../views/Mall/MallIndex.vue')
            // },
            // {
            //     path: '/page1',
            //     name: "page1",
            //     component: () => import('../views/Other/PageOne.vue')
            // },
            // {
            //     path: '/page2',
            //     name: "page2",
            //     component: () => import('../views/Other/PageTwo.vue')
            // }

        ]
    },
    {
        path:"/login",
        name:"login",
        component:()=>import("../views/Login/Login.vue")
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router