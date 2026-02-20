<!-- layouts/default.vue -->
<template>
  <div class="flex flex-col min-h-[100dvh] bg-[--ui-bg]">
    <!-- 内容区域 -->
    <main class="flex-1 overflow-y-auto pb-4">
      <slot />
    </main>

    <!-- Bottom Bar -->
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
            class="h-12 w-full flex flex-col items-center justify-center gap-0.5 text-xs text-[--ui-text-muted] hover:text-[--ui-primary] transition-colors"
            :aria-current="route.path === item.path ? 'page' : undefined"
          >
            <UIcon
              :name="item.icon"
              :class="[
                'w-5 h-5',
                route.path === item.path ? 'text-[--ui-primary]' : ''
              ]"
            />
            <span
              :class="[
                'font-medium',
                route.path === item.path ? 'text-[--ui-primary]' : ''
              ]"
            >{{ item.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
const route = useRoute()
const navItems = [
  { label: '首页', path: '/', icon: 'i-lucide-home' },
  { label: '排行', path: '/rank', icon: 'i-lucide-trophy' },
  { label: '组合', path: '/mix', icon: 'i-lucide-layers' },
  { label: '历史', path: '/history', icon: 'i-lucide-history' },
  { label: '我的', path: '/profile', icon: 'i-lucide-user' }
]
</script>

<style scoped>
</style>
