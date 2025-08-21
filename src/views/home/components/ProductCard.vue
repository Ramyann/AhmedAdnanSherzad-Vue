<template>
  <div
    class="flex flex-col gap-y-2 cursor-pointer overflow-hidden rounded-2xl p-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    @click="$emit('click', product.id)">

    <div class="relative h-52 w-full overflow-hidden p-1">
      <img src="@/assets/images/model.jpg"
        class="h-full w-full rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105" />

      <!-- <div class="absolute top-3 left-3 flex flex-col gap-1.5">
        <Badge v-if="product.isNew">New</Badge>
        <Badge v-if="product.isExpress">
          <img :src="deliveryIcon" alt="Express Delivery" class="h-4 w-4 inline-block mr-1" />
        </Badge>
      </div> -->

      <!-- <div class="absolute top-3 right-3 flex gap-2 transition-opacity duration-300 group-hover:opacity-100">
        <button @click.stop="$emit('favorite', product.id)" :class="[
          'flex h-9 w-9 items-center justify-center rounded-full shadow-md backdrop-blur-md transition-transform duration-300',
          product.isFavorite
            ? 'scale-110 bg-red-500 text-white'
            : 'bg-white/90 hover:scale-110 hover:bg-white',
        ]">
          <HeartIcon :class="{ 'fill-current': product.isFavorite }" />
        </button>
      </div> -->

    </div>

    <h3 class="text-md font-semibold text-gray-900">
      {{ product.title }}
    </h3>

    <div class="flex items-center justify-between gap-2">
      <span class="text-lg font-bold text-gray-900">IQD {{ product.price.toLocaleString() }}</span>

      <!-- <span v-if="product.isBidden" class="text-sm text-gray-500">
        {{ product.bidTimeFrame.toLocaleString() }}
      </span> -->

      <div class="flex gap-x-4">Size
        <span class="font-medium">{{
          ["S", "M", "L"].join("&nbsp&nbsp")
        }}</span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { Product } from "@/types/product";
import Badge from "@/components/badge/Badge.vue";
import deliveryIcon from "@/assets/icons/Delivery.svg"


// Props
defineProps<{
  product: Product;
}>();

// Emits
defineEmits<{
  click: [productId: string];
  favorite: [productId: string];
  compare: [productId: string];
}>();

// Methods
const formatTimeLeft = (endDate: Date) => {
  const now = new Date();
  const diff = endDate.getTime() - now.getTime();

  if (diff <= 0) return "Ended";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days}d ${hours}h left`;
  if (hours > 0) return `${hours}h ${minutes}m left`;
  return `${minutes}m left`;
};
</script>
