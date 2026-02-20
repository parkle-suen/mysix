<template>
  <div class="relative w-full overflow-hidden rounded-2xl">
    <Swiper
      :modules="modules"
      :loop="true"
      :space-between="0"
      :slides-per-view="1"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false
      }"
      :pagination="{
        el: '.swiper-pagination',
        clickable: true
      }"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }"
      :speed="600"
      class="w-full"
    >
      <SwiperSlide
        v-for="slide in sliders"
        :key="slide.id"
      >
        <div class="relative w-full h-full">
          <a
            :href="slide.target_url"
            class="block relative w-full h-full"
            @click.prevent="handleSlideClick(slide)"
          >
            <img
              :src="slide.image_url"
              :alt="slide.title"
              class="w-full h-auto max-h-[280px] object-cover"
              loading="lazy"
            >
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
              <p class="text-lg font-medium">{{ slide.title }}</p>
            </div>
          </a>
        </div>
      </SwiperSlide>

      <!-- 分页指示器 -->
      <div class="swiper-pagination !bottom-4 absolute bottom-4 left-1/2 transform -translate-x-1/2" />

      <!-- 导航按钮 -->
      <div class="swiper-button-prev !hidden md:!flex absolute top-1/2 left-4 transform -translate-y-1/2 z-10" />
      <div class="swiper-button-next !hidden md:!flex absolute top-1/2 right-4 transform -translate-y-1/2 z-10" />
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

interface SliderItem {
  id: number | string
  title: string
  image_url: string
  target_url: string
}

const modules = [Autoplay, Pagination, Navigation]

const sliders = ref<SliderItem[]>([])

const fetchSliders = async () => {
  try {
    sliders.value = await $fetch('/api/sliders')
  } catch (error) {
    console.error('Failed to fetch sliders:', error)
    sliders.value = []
  }
}

const handleSlideClick = (slide: SliderItem) => {
  if (slide.target_url) {
    if (slide.target_url.startsWith('http')) {
      window.open(slide.target_url, '_blank')
    } else {
      navigateTo(slide.target_url)
    }
  }
}

onMounted(async () => {
  await fetchSliders()
})
</script>

<style scoped>
@import 'swiper/css';
@import 'swiper/css/pagination';
@import 'swiper/css/navigation';

.swiper {
  padding-bottom: calc(env(safe-area-inset-bottom) + 2rem);
}
</style>
