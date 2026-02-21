<!-- components/AppBottomBar.vue -->
<template>
  <nav class="sticky bottom-0 z-50 w-full border-t border-[--ui-border] bg-[--ui-bg]/90 backdrop-blur-md">
    <ul
      class="mx-auto p-1 grid max-w-lg"
      :style="{ gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))` }"
    >
      <li
        v-for="item in navItems"
        :key="item.path"
      >
        <NuxtLink
          :to="item.path"
          class="h-12 w-full flex flex-col items-center justify-center gap-0.5 text-xs transition-all active:scale-95"
          active-class="text-[--ui-primary]"
          :exact="item.path === '/'"
        >
          <UIcon
            :name="item.icon"
            class="w-5 h-5 transition-colors"
          />
          <span class="font-medium">{{ item.label }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const navItems = [
  { label: '首页', path: '/', icon: 'i-lucide-home' },
  { label: '排行', path: '/rank', icon: 'i-lucide-trophy' },
  { label: '组合', path: '/mix', icon: 'i-lucide-layers' },
  { label: '历史', path: '/history', icon: 'i-lucide-history' },
  { label: '我的', path: '/profile', icon: 'i-lucide-user' }
]
</script>

<style>
/* 全局隐藏滚动条 */
body {
  overflow: auto;
}

/* 隐藏Webkit浏览器的滚动条 */
body::-webkit-scrollbar {
  display: none;
}

/* Firefox隐藏滚动条 */
html {
  scrollbar-width: none;
}
</style>
