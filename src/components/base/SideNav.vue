<template>
  <el-radio-group v-model="isActive" style="margin-bottom: 20px">
    <el-radio-button :label="false">expand</el-radio-button>
    <el-radio-button :label="true">collapse</el-radio-button>
  </el-radio-group>
  <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isActive"
    ><template v-for="(category, index) in productCategories" :key="index">
      <router-link :to="`/category/${category}`">
        <el-menu-item :index="index">
          <template #title>{{ category }}</template>
        </el-menu-item>
      </router-link>
    </template>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return { isActive: false };
  },
  computed: {
    ...mapGetters({
      productCategories: 'categories/categories',
    }),
  },
  methods: {
    isCollapse() {
      this.isActive = !this.isActive;
    },
  },
  created() {
    this.$store.dispatch('categories/fetchProductCategories');
  },
};
</script>
