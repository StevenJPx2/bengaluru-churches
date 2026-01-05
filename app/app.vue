<script setup lang="ts">
useHead({
  title: 'Bengaluru Churches',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Explore historic churches in Bengaluru' }
  ],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en'
  }
})
</script>

<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: "Inter", sans-serif;
  overflow: hidden; /* Prevent body scroll since we use h-screen */
}
</style>
