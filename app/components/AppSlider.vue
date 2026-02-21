<template>
  <div class="relative w-full max-w-lg mx-auto px-2.5 py-2.5">
    <Swiper
      :modules="modules"
      :loop="true"
      :space-between="0"
      :slides-per-view="1"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }"
      :speed="600"
      class="w-full swiper-container"
    >
      <SwiperSlide
        v-for="slide in sliders"
        :key="slide.id"
      >
        <div class="relative w-full h-full">
          <a
            :href="slide.target_url"
            class="block relative w-full h-full overflow-hidden rounded-xl group"
            @click.prevent="handleSlideClick(slide)"
          >
            <!-- 固定高度的图片容器 -->
            <div class="relative w-full h-[150px] overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
              <!-- 图片 - 使用绝对定位和 transform 居中 -->
              <img
                :src="getImageUrl(slide.image_url)"
                :alt="slide.title || '轮播图'"
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover min-w-full min-h-full transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                @error="handleImageError"
              >
            </div>

            <!-- 标题 - 显示在图片底部 -->
            <div
              v-if="slide.title"
              class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3 text-white rounded-b-xl"
            >
              <p class="text-sm font-medium truncate text-center">{{ slide.title }}</p>
            </div>
          </a>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'

interface SliderItem {
  id: number | string
  title: string
  image_url: string
  target_url: string
}

const modules = [Autoplay]
const sliders = ref<SliderItem[]>([])

// 处理图片URL
const getImageUrl = (url: string): string => {
  if (!url) return ''
  // 1. 如果是完整URL，直接返回
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  // 2. 如果已经是正确的相对路径（以/static/开头），直接返回
  if (url.startsWith('/static/')) {
    return url
  }

  // 3. 如果是以/开头但不是/static，可能需要调整
  if (url.startsWith('/') && !url.startsWith('/static/')) {
    // 如果是/static目录下的图片，直接返回
    if (url.includes('static/images/sliders/')) {
      return url
    }
  }

  // 4. 处理数据库存储的相对路径（如 "ad_1.jpg"）
  // 假设数据库存储的是文件名或相对路径
  if (!url.includes('://') && !url.startsWith('/')) {
    // 如果是简单的文件名，如 "ad_1.jpg"，转换为完整路径
    if (url.match(/^[a-zA-Z0-9_-]+\.(jpg|jpeg|png|gif|webp)$/i)) {
      return `/static/images/sliders/${url}`
    }
  }

  // 5. 其他情况，原样返回
  return url
}

const fetchSliders = async () => {
  try {
    // 直接指定返回类型为 SliderItem[] 数组
    const data = await $fetch<SliderItem[]>('/api/sliders')
    console.log('成功load sliders:', data)

    // 直接处理数组
    sliders.value = data.map(slide => ({
      ...slide,
      image_url: getImageUrl(slide.image_url)
    }))
  } catch (error) {
    console.error('Failed to fetch sliders:', error)
    // 使用默认数据
    sliders.value = [
      {
        id: 1,
        title: '欢迎使用',
        image_url: '/static/images/sliders/ad_1.jpg',
        target_url: '/'
      },
      {
        id: 2,
        title: '功能丰富',
        image_url: '/static/images/sliders/ad_2.jpg',
        target_url: '/features'
      }
    ]
  }
}

const handleSlideClick = (slide: SliderItem) => {
  if (slide.target_url) {
    if (slide.target_url.startsWith('http')) {
      window.open(slide.target_url, '_blank', 'noopener,noreferrer')
    } else {
      navigateTo(slide.target_url)
    }
  }
}

// 图片加载失败处理
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  console.warn('图片加载失败:', img.src)
  img.src = '../static/images/sliders/ad_1.jpg'
  img.onerror = null
}

onMounted(async () => {
  await fetchSliders()
})
</script>

<style>
@import 'swiper/css';

.swiper-container {
  height: 150px;
  border-radius: 8px;
}

.swiper-slide {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper-pagination,
.swiper-button-prev,
.swiper-button-next {
  display: none !important;
}

.swiper-slide img {
  will-change: transform;
}
</style>
