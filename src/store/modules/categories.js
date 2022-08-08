import axios from 'axios';
export default {
  namespaced: true,
  state: {
    productsCategory: [],
    productsCategoryFilter: [],
    categories: [],
    pages: {
      currentPage: 1,
      pageSize: 5,
      pageSizeRange: [5, 10, 15],
      total: 0,
    },
  },
  getters: {
    productsCategory: (state) => state.productsCategory,
    categories: (state) => state.categories,
    pages: (state) => state.pages,
  },
  mutations: {
    GET_PRODUCTS(state, productsCategory) {
      state.productsCategory = productsCategory;
    },
    GET_PRODUCTS_LIMIT(state, productsCategory) {
      state.productsCategory = [...state.productsCategory, ...productsCategory];
    },
    GET_PRODUCT(state, product) {
      state.product = product;
    },
    ORDER_BY(state, value) {
      switch (value) {
        case 'price_up':
          state.productsCategoryFilter.sort((a, b) => {
            return b.price - a.price;
          });
          break;
        case 'price_down':
          state.productsCategoryFilter.sort((a, b) => {
            return a.price - b.price;
          });
          break;
        case 'discount_up':
          state.productsCategoryFilter.sort((a, b) => {
            return b.discountPercentage - a.discountPercentage;
          });
          break;
        case 'discount_down':
          state.productsCategoryFilter.sort((a, b) => {
            return a.discountPercentage - b.discountPercentage;
          });
          break;
        default:
          state.productsCategoryFilter.sort((a, b) => {
            return b.rating - a.rating;
          });
      }
    },
    CURRENT_PAGE(state) {
      if (Array.isArray(state.productsCategoryFilter)) {
        let orderValues = state.productsCategoryFilter.slice(
          (state.pages.currentPage - 1) * state.pages.pageSize,
          state.pages.currentPage * state.pages.pageSize
        );
        state.productsCategory = orderValues;
      } else {
        state.productsCategory = [state.productsCategoryFilter];
      }
    },
    UPDATE_PAGES(state, limit) {
      state.pages.total = limit;
    },
    GET_PRODUCTS_FILTER(state, productsCategory) {
      state.productsCategoryFilter = productsCategory;
    },
    SEARCH_PRODUCT(state, product) {
      state.pages.total = 1;
      state.productsCategoryFilter = product;
    },
    GET_PRODUCTS_CATEGORIES(state, categories) {
      state.categories = categories;
    },
  },
  actions: {
    async fetchProdutsCategory({ commit }, value) {
      return new Promise((resolve, reject) => {
        axios
          .get(`https://dummyjson.com/products/category/${value}`)
          .then(function (response) {
            commit('GET_PRODUCTS', response.data.products);
            commit('GET_PRODUCTS_FILTER', response.data.products);
            commit('UPDATE_PAGES', response.data.limit);
            commit('CURRENT_PAGE');
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
    async fetchProductCategories({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get('https://dummyjson.com/products/categories')
          .then(function (response) {
            commit('GET_PRODUCTS_CATEGORIES', response.data);
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
    async fetchProductCategoriesLimit({ commit }, value, gap) {
      return new Promise((resolve, reject) => {
        axios
          .get(`https://dummyjson.com/products/category/${value}?limit=5&skip=${gap}`)
          .then(function (response) {
            commit('GET_PRODUCTS_LIMIT', response.data.products);
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
    orderBy({ commit }, value) {
      commit('ORDER_BY', value);
    },
    setCurrentPage({ commit }) {
      commit('CURRENT_PAGE');
    },
    searchProduct({ commit }, value) {
      commit('SEARCH_PRODUCT', value);
    },
  },
};
