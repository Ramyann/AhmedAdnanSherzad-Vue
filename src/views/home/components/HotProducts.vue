<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const products = [
  {
    id: 1,
    title: "Crossbody Bucket Bag",
    price: "IQD 2,900",
    color: "bg-gradient-to-br from-pink-400 to-pink-500",
    image: "@/assets/images/model.jpg",
  },
  {
    id: 2,
    title: "Crossbody Bucket Bag",
    price: "IQD 2,900",
    color: "bg-gradient-to-br from-gray-600 to-gray-700",
    image: "@/assets/images/1.jpg",
  },
  {
    id: 3,
    title: "Crossbody Bucket Bag",
    price: "IQD 2,900",
    color: "bg-gradient-to-br from-teal-500 to-teal-600",
    image: "@/assets/images/1.jpg",
  },
  {
    id: 4,
    title: "Crossbody Bucket Bag",
    price: "IQD 2,900",
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
    image: "@/assets/images/1.jpg",
  },
  {
    id: 5,
    title: "Crossbody Bucket Bag",
    price: "IQD 2,900",
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
    image: "@/assets/images/1.jpg",
  },
];

</script>

<template>
  <div class=" mx-auto py-4">
    <Swiper :slides-per-view="3.5" :space-between="20" navigation pagination class="h-64" :breakpoints="{
      320: { slidesPerView: 1 },
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 4 }
    }">
      <SwiperSlide v-for="product in products" :key="product.id"
        class="flex flex-col items-center justify-center p-4 rounded-lg text-white" :class="product.color">
        <img :src="product.image" :alt="product.title" class="h-32 w-32 object-cover rounded-md mb-2" />
        <h3 class="font-semibold text-lg">{{ product.title }}</h3>
        <p class="text-sm">{{ product.price }}</p>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
/* Optional: customize navigation buttons */
.swiper-button-next,
.swiper-button-prev {
  color: #374151;
  /* Tailwind gray-700 */
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  background-color: white;
  transform: scale(1.1);
}
</style>
