<!-- layouts/default.vue -->
<template>
  <div class="flex flex-col min-h-[100dvh] bg-[--ui-bg]">
    <!-- 内容区域 -->
    <main class="flex-1 overflow-y-auto pb-4">
      <slot />
    </main>

    <!-- Bottom Bar -->
    <AppBottomBar />
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>
