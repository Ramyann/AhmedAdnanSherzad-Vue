<script setup lang="ts">
import Navbar from "@/components/navbar/Navbar.vue";
import Header from "@/components/header/Header.vue";
</script>

<template>
  <div class="flex max-h-svh flex-col overflow-hidden">
    <Header />
    <div class="flex flex-1 overflow-hidden pl-2">
      <Navbar />
      <router-view class="flex-1 overflow-auto" />
    </div>
  </div>
</template>

<style scoped></style>
