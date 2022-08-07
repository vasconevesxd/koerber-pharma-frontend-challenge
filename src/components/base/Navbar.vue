<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="0">E-Commerce</el-menu-item>
    <div class="flex-grow" />
    <RouterLink to="/">
      <el-menu-item index="1"> Products </el-menu-item>
    </RouterLink>
  </el-menu>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";

const activeIndex = ref("1");
</script>
