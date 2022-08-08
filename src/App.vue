<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/base/Navbar.vue';
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Navbar />
      </el-header>
      <el-main>
        <RouterView :key="$route.path" />
      </el-main>
    </el-container>
  </div>
</template>
