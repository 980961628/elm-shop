import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import goods from '@/components/goods/goods';
import seller from '@/components/seller/seller';
import ratings from '@/components/ratings/ratings';

Vue.use(Router)

export default new Router({
    linkActiveClass: "active",
    routes: [{
            path: '/',
            redirect: 'goods'
        },
        {
            path: '/seller',
            name: 'seller',
            component: seller,
            linkActiveClass: "active"
        },
        {
            path: '/ratings',
            name: 'ratings',
            component: ratings
        },
        {
            path: '/goods',
            name: 'Goods',
            component: goods
        },
    ]
})