<template>
  <el-pagination
    v-model:currentPage="pages.currentPage"
    v-model:page-size="pages.pageSize"
    :page-sizes="pages.pageSizeRange"
    layout="prev, pager, next, sizes ,total"
    :total="pages.total"
  />
</template>

<script>
export default {
  props: {
    pages: {
      type: Object,
      default: null,
    },
  },
  watch: {
    pages: {
      handler(newValue) {
        if (newValue) {
          let id = this.$route.params.id;
          if (id) {
            this.$store.dispatch('categories/setCurrentPage');
          } else {
            this.$store.dispatch('products/setCurrentPage');
          }
        }
      },
      deep: true,
    },
  },
};
</script>
