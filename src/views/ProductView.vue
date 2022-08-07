<template>
  <el-row :gutter="20" justify="center">
    <el-col :span="8">
      <el-carousel :interval="2000" type="card" height="200px" arrow="always">
        <el-carousel-item v-for="item in product.images" :key="item.id">
          <el-image style="width: 200px; height: 200px" :src="item" :fit="cover" />
        </el-carousel-item>
      </el-carousel>
    </el-col>
    <el-col :span="8">
      {{ product.title }}
      {{ product.description }}
      {{ product.price }}
      {{ product.stock }}
      <el-input-number v-model="num" :min="1" :max="10" @change="handleChange" />
      <el-button type="primary">Adicionar</el-button>
      <el-button type="primary">Comprar Já</el-button>
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
      product: 'getProduct',
    }),
  },
  methods: {},
  created() {
    this.$store.dispatch('fetchProduct', Number(this.id));
  },
};
</script>
