<template>
  <el-select v-model="orderBy" placeholder="Ordenar Por:" size="large">
    <el-option label="Preço mais alto" value="price_up" />
    <el-option label="Preço mais baixo" value="price_down" />
    <el-option label="Desconto mais alto" value="discount_up" />
    <el-option label="Desconto mais baixo" value="discount_down" />
    <el-option label="Relevante" value="relevant" />
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      orderBy: null,
    };
  },
  watch: {
    orderBy: {
      handler(newValue) {
        if (newValue) {
          let id = this.$route.params.id;
          if (id) {
            this.$store.dispatch('categories/orderBy', newValue);
            this.$store.dispatch('categories/setCurrentPage');
          } else {
            this.$store.dispatch('products/orderBy', newValue);
            this.$store.dispatch('products/setCurrentPage');
          }
        }
      },
    },
  },
};
</script>
