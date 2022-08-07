import axios from 'axios';
export default {
  state: {
    products: [],
    productsFilter: [],
    product: {},
    pages: {
      currentPage: 1,
      pageSize: 5,
      pageSizeRange: [5, 10, 15],
      total: 0,
    },
  },
  getters: {
    getProducts: (state) => state.products,
    getProduct: (state) => state.product,
    pages: (state) => state.pages,
  },
  mutations: {
    GET_PRODUCTS(state, products) {
      state.products = products;
    },
    GET_PRODUCTS_LIMIT(state, products) {
      state.products = [...state.products, ...products];
    },
    GET_PRODUCT(state, product) {
      state.product = product;
    },
    ORDER_BY(state, value) {
      switch (value) {
        case 'price_up':
          state.productsFilter.sort((a, b) => {
            return b.price - a.price;
          });
          break;
        case 'price_down':
          state.productsFilter.sort((a, b) => {
            return a.price - b.price;
          });
          break;
        case 'discount_up':
          state.productsFilter.sort((a, b) => {
            return b.discountPercentage - a.discountPercentage;
          });
          break;
        case 'discount_down':
          state.productsFilter.sort((a, b) => {
            return a.discountPercentage - b.discountPercentage;
          });
          break;
        default:
          state.productsFilter.sort((a, b) => {
            return b.rating - a.rating;
          });
      }
    },
    CURRENT_PAGE(state) {
      if (Array.isArray(state.productsFilter)) {
        let orderValues = state.productsFilter.slice(
          (state.pages.currentPage - 1) * state.pages.pageSize,
          state.pages.currentPage * state.pages.pageSize
        );
        state.products = orderValues;
      } else {
        state.products = [state.productsFilter];
      }
    },
    UPDATE_PAGES(state, limit) {
      state.pages.total = limit;
    },
    GET_PRODUCTS_FILTER(state, products) {
      state.productsFilter = products;
    },
    SEARCH_PRODUCT(state, product) {
      state.pages.total = 1;
      state.productsFilter = product;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get('https://dummyjson.com/products')
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
    async fetchProductLimit({ commit }, gap) {
      return new Promise((resolve, reject) => {
        axios
          .get(`https://dummyjson.com/products?limit=5&skip=${gap}`)
          .then(function (response) {
            commit('GET_PRODUCTS_LIMIT', response.data.products);
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
    async fetchProduct({ commit }, id) {
      axios
        .get(`https://dummyjson.com/products/${id}`)
        .then(function (response) {
          commit('GET_PRODUCT', response.data);
        })
        .catch(function (error) {
          console.log(error);
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
