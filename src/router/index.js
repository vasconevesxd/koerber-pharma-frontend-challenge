import { createRouter, createWebHistory } from 'vue-router';
import ProductsCategoryView from '../views/ProductsCategoryView.vue';
import ProductView from '../views/ProductView.vue';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    { path: '/category/product/:id', name: 'product', component: ProductView },
    { path: '/category/:id', name: 'category', component: ProductsCategoryView },
  ],
});

export default router;
