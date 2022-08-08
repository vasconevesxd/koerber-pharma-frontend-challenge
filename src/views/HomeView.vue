<template>
  <SideNav />
  <el-row justify="center">
    <InputSearch v-if="renderComponent" @onChildUpdate="(n) => onChildUpdate(n)" :products="products" />
    <OrderBy :products="products" />
    <CardProduct :products="products" />
  </el-row>
  <el-row justify="center">
    <Pagination :pages="pages" v-if="!isMobile" />
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex';
import SideNav from '../components/base/SideNav.vue';
import Pagination from '../components/ui/Pagination.vue';
import CardProduct from '../components/ui/CardProduct.vue';
import InputSearch from '../components/ui/InputSearch.vue';
import OrderBy from '../components/ui/OrderBy.vue';
export default {
  components: {
    SideNav,
    CardProduct,
    Pagination,
    InputSearch,
    OrderBy,
  },
  data() {
    return {
      isMobile: false,
      gapProducts: null,
      renderComponent: true,
    };
  },
  computed: {
    ...mapGetters({
      products: 'products/getProducts',
      pages: 'products/pages',
    }),
  },
  watch: {
    products: {
      handler() {
        this.renderComponent = false;
        this.$nextTick(() => {
          this.renderComponent = true;
        });
      },
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    onChildUpdate(item) {
      this.$store.dispatch('products/searchProduct', item);
      this.$store.dispatch('products/setCurrentPage');
    },
    handleScroll() {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 600) {
        this.gapProducts += 10;
        if (this.isMobile) {
          this.$store.dispatch('products/fetchProductLimit', this.gapProducts);
        }
      }
    },
  },
  created() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.gapProducts = 10;
      this.$store.dispatch('products/fetchProductLimit', this.gapProducts);
      this.isMobile = true;
    } else {
      this.$store.dispatch('products/fetchProducts');
      this.isMobile = false;
    }
  },
};
</script>
