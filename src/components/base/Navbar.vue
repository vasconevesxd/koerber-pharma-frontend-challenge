<template>
  <el-menu :default-active="activeIndex" class="el-menu-horizontal" mode="horizontal">
    <el-row class="el-menu-center">
      <h3>E-Commerce</h3>
      <el-icon class="color-primary" :size="24" @click="isCollapse()">
        <Menu />
      </el-icon>
    </el-row>
    <div class="flex-grow" />
    <RouterLink to="/">
      <el-menu-item index="1"> Home </el-menu-item>
    </RouterLink>
  </el-menu>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { Menu } from '@element-plus/icons-vue';
const activeIndex = ref('1');
const emit = defineEmits(['isCollapse']);
let isActive = false;

const isCollapse = () => {
  isActive = !isActive;
  emit('isCollapse', isActive);
};
</script>
