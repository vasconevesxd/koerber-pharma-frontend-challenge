<template>
  <el-card
    v-for="product in products"
    :key="product.id"
    :span="12"
    :body-style="{ padding: '0px' }"
    @click="goToProduct(product.id)"
    style="width: 250px"
  >
    <el-image :src="`${product.thumbnail}`" class="image" fit="cover" style="width: 100%; height: 200px" />
    <div style="padding: 14px">
      <span>{{ product.value ? product.value : product.title }}</span>
      <el-row class="card-values">
        <p>{{ product.price }} €</p>
        <el-tag
          :key="product.id"
          :type="product.stock < 90 && product.stock >= 50 ? 'warning' : product.stock < 50 ? 'danger' : 'success'"
        >
          {{ product.stock }}
        </el-tag>
      </el-row>
    </div>
  </el-card>
</template>
<script>
export default {
  props: {
    products: {
      type: Array,
      default: null,
    },
  },
  methods: {
    goToProduct(id) {
      this.$router.push({ name: 'product', params: { id } });
    },
  },
};
</script>
