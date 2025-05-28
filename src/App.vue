<template>
  <div>
    <Header />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'

defineOptions({
  name: "App"
})
</script>

