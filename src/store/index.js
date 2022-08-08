import { createStore } from 'vuex';
import products from './modules/products';
import categories from './modules/categories';
import product from './modules/product';
export default createStore({
  modules: {
    products,
    categories,
    product,
  },
});
