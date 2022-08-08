<template>
  <el-select v-model="orderBy" placeholder="Order By:" size="large">
    <el-option label="Highest Price" value="price_up" />
    <el-option label="Lower Price" value="price_down" />
    <el-option label="Highest Discount" value="discount_up" />
    <el-option label="Lower Discount" value="discount_down" />
    <el-option label="Relevant" value="relevant" />
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
