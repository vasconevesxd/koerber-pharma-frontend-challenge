<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Products</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>