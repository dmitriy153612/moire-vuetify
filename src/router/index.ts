import { createRouter, createWebHashHistory } from 'vue-router'
const CatalogPage = () => import('@/pages/CatalogPage.vue')
const ProductPage = () => import('@/pages/ProductPage.vue')
const BasketPage = () => import('@/pages/BasketPage.vue')

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/catalog' },
    { path: '/catalog', name: 'catalog', component: CatalogPage },
    { path: '/product', name: 'product', component: ProductPage },
    { path: '/basket', name: 'basket', component: BasketPage },
    { path: '/test', name: 'test', component: () => import('@/pages/TestPage.vue') }
  ]
})

export default router
