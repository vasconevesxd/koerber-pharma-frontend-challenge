<template>
  <el-menu default-active="2" class="el-menu-vertical" id="side-nav" :collapse="isActive">
    <template v-for="(category, index) in productCategories" :key="index">
      <router-link :to="`/category/${category}`">
        <el-menu-item :index="index.toString()">
          <template #title>
            {{ category }}
          </template>
        </el-menu-item>
      </router-link>
    </template>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    isActive: {
      type: Boolean,
      default: null,
    },
  },
  computed: {
    ...mapGetters({
      productCategories: 'categories/categories',
    }),
  },
  created() {
    this.$store.dispatch('categories/fetchProductCategories');
  },
};
</script>
