import axios from 'axios';
export default {
  namespaced: true,
  state: {
    product: {},
    pages: {
      currentPage: 1,
      pageSize: 5,
      pageSizeRange: [5, 10, 15],
      total: 0,
    },
  },
  getters: {
    getProduct: (state) => state.product,
  },
  mutations: {
    GET_PRODUCT(state, product) {
      state.product = product;
    },
  },
  actions: {
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
  },
};
