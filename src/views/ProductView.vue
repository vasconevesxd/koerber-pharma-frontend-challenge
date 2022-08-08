<template>
  <el-row :gutter="20" justify="center">
    <el-col :span="8">
      <el-carousel :interval="2000" type="card" height="200px" arrow="always">
        <el-carousel-item v-for="item in product.images" :key="item.id">
          <el-image style="width: 200px; height: 200px" :src="item" fit="cover" />
        </el-carousel-item>
      </el-carousel>
    </el-col>
    <el-col :span="8">
      <h2>{{ product.title }}</h2>
      <el-row justify="space-between">
        <h3 class="color-primary">{{ product.price }} €</h3>
        <el-tag
          :key="product.id"
          :type="product.stock < 90 && product.stock >= 50 ? 'warning' : product.stock < 50 ? 'danger' : 'success'"
        >
          {{ product.stock }}
        </el-tag>
      </el-row>
      <p>{{ product.description }}</p>
      <el-row :span="24" justify="space-between">
        <el-button size="large" class="bg-primary b-primary" type="primary">Adicionar</el-button>
        <el-button size="large" type="primary">Comprar Já</el-button>
      </el-row >
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters({
      product: 'product/getProduct',
    }),
  },
  methods: {},
  created() {
    this.$store.dispatch('product/fetchProduct', Number(this.id));
  },
};
</script>
