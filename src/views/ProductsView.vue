<template>
  <section class="products">
    <el-row>
      <el-col :span="12">
        <InputSearch @onChildUpdate="(n) => onChildUpdate(n)" :products="products" v-if="renderComponent" />
      </el-col>
      <el-col :span="12">
        <el-select v-model="orderBy" placeholder="Ordenar Por:">
          <el-option label="Preço mais alto" value="price_up" />
          <el-option label="Preço mais baixo" value="price_down" />
          <el-option label="Desconto mais alto" value="discount_up" />
          <el-option label="Desconto mais baixo" value="discount_down" />
          <el-option label="Relevante" value="relevant" />
        </el-select>
        <el-button type="primary" @click="cleanFilters">Clean</el-button>
      </el-col>
    </el-row>

    <template v-if="!isMobile">
      <el-row justify="center">
        <el-space wrap>
          <el-card
            v-for="product in products"
            :key="product.id"
            :span="6"
            :body-style="{ padding: '0px' }"
            @click="goToProduct(product.id)"
            style="width: 250px"
          >
            <el-image :src="`${product.thumbnail}`" class="image" fit="cover" style="width: 100%; height: 200px" />
            <div style="padding: 14px">
              <span>{{ product.value }}</span>
              <div class="bottom">
                <time class="time">{{ product.price }}</time>
                <el-tag
                  :key="product.id"
                  :type="
                    product.stock < 90 && product.stock >= 50 ? 'warning' : product.stock < 50 ? 'danger' : 'success'
                  "
                >
                  {{ product.stock }}
                </el-tag>
              </div>
            </div>
          </el-card>
        </el-space>
      </el-row>
      <el-row justify="center">
        <el-pagination
          v-model:currentPage="pages.currentPage"
          v-model:page-size="pages.pageSize"
          :page-sizes="pages.pageSizeRange"
          layout="total,sizes, prev, pager, next"
          :total="pages.total"
        />
      </el-row>
    </template>

    <template v-else>
      <el-space wrap>
        <el-row v-for="product in products" :key="product.id" :span="12">
          <el-card :body-style="{ padding: '0px' }" @click="goToProduct(product.id)">
            <el-image :src="`${product.thumbnail}`" class="image" fit="contain" style="width: 200px; height: 200px" />
            <div style="padding: 14px">
              <span>{{ product.value }}</span>
              <div class="bottom">
                <time class="time">{{ product.price }}</time>
                <el-tag
                  :key="product.id"
                  :type="
                    product.stock < 90 && product.stock >= 50 ? 'warning' : product.stock < 50 ? 'danger' : 'success'
                  "
                >
                  {{ product.stock }}
                </el-tag>
              </div>
            </div>
          </el-card>
        </el-row>
      </el-space>
    </template>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import InputSearch from '../components/ui/InputSearch.vue';

export default {
  components: {
    InputSearch,
  },
  data() {
    return {
      search: null,
      renderComponent: true,
      orderBy: null,
      isMobile: null,
      gapProducts: null,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  computed: {
    ...mapGetters({
      products: 'getProducts',
      pages: 'pages',
    }),
  },
  watch: {
    pages: {
      handler(newValue) {
        if (newValue) {
          this.$store.dispatch('setCurrentPage');
        }
      },
      deep: true,
    },
    products: {
      handler() {
        this.renderComponent = false;
        this.$nextTick(() => {
          this.renderComponent = true;
        });
      },
    },
    orderBy: {
      handler(newValue) {
        if (newValue) {
          this.$store.dispatch('orderBy', newValue);
          this.$store.dispatch('setCurrentPage');
        }
      },
    },
  },

  methods: {
    handleScroll() {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 600) {
        this.gapProducts += 10;
        console.log(this.gapProducts);

        this.$store.dispatch('fetchProductLimit', this.gapProducts);
      }
    },
    cleanFilters() {
      this.$store.dispatch('fetchProducts');
    },
    onChildUpdate(item) {
      console.log(item);
      this.$store.dispatch('searchProduct', item);
      this.$store.dispatch('setCurrentPage');
    },
    goToProduct(id) {
      this.$router.push({ name: 'product', params: { id } });
    },
  },
  created() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.gapProducts = 10;
      this.$store.dispatch('fetchProductLimit', this.gapProducts);
      this.isMobile = true;
    } else {
      this.$store.dispatch('fetchProducts');
      this.isMobile = false;
    }
  },
};
</script>


<style>
.el-row {
  margin-bottom: 20px;
}
</style>
