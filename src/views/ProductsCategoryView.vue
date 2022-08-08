<template>
  <el-container>
    <el-aside width="200px">
      <SideNav />
    </el-aside>
    <el-main>
      <el-col :span="24">
        <el-row justify="space-between" class="filters">
          <InputSearch v-if="renderComponent" @onChildUpdate="(n) => onChildUpdate(n)" :products="productsCategory" />
          <el-col :span="6">
            <OrderBy :products="productsCategory" />
            <el-button class="btn-clean" type="primary" @click="cleanFilters" size="large">Clean Filter</el-button>
          </el-col>
        </el-row>
        <el-row justify="center">
          <CardProduct :products="productsCategory" />
        </el-row>
      </el-col>
      <el-row justify="center">
        <Pagination :pages="pages" v-if="!isMobile" />
      </el-row>
    </el-main>
  </el-container>
</template>
<style lang="scss" scoped>
.filters {
  margin-left: 75px;
  margin-bottom: 40px;
}
.btn-clean {
  margin-left: 20px;
}
</style>
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
      id: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters({
      productsCategory: 'categories/productsCategory',
      pages: 'categories/pages',
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
    cleanFilters() {
      this.$store.dispatch('categories/fetchProdutsCategory',this.id);
    },
    onProductsUpdate(value) {
      console.log(value);
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        this.gapProducts = 10;
        this.$store.dispatch('categories/fetchProductCategoriesLimit', this.id, this.gapProducts);
        this.isMobile = true;
      } else {
        this.$store.dispatch('categories/fetchProdutsCategory', this.id);
        this.isMobile = false;
      }
    },
    onChildUpdate(item) {
      this.$store.dispatch('categories/searchProduct', item);
      this.$store.dispatch('categories/setCurrentPage');
    },
    handleScroll() {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 600) {
        this.gapProducts += 10;
        if (this.isMobile) {
          this.$store.dispatch('categories/fetchProductLimit', this.gapProducts);
        }
      }
    },
  },
  created() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.gapProducts = 10;
      this.$store.dispatch('categories/fetchProductCategoriesLimit', this.id, this.gapProducts);
      this.isMobile = true;
    } else {
      this.$store.dispatch('categories/fetchProdutsCategory', this.id);
      this.isMobile = false;
    }
  },
};
</script>
