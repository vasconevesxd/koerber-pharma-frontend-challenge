<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/base/Navbar.vue';
import SideNav from './components/base/SideNav.vue';
import { ref } from 'vue';
let toggle = ref(null);

const onToggle = (value) => {
  toggle.value = value;
};
</script>
<template>
  <div>
    <el-container>
      <el-header class="header">
        <Navbar @isCollapse="(n) => onToggle(n)" />
      </el-header>
      <el-main>
        <SideNav :isActive="toggle" />
        <RouterView :key="$route.path" />
      </el-main>
    </el-container>
  </div>
</template>
