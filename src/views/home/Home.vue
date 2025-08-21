<template>
  <div class="flex flex-col gap-y-4 p-2 px-4">
    <div>
      <HotProducts />
    </div>

    <!-- Search and Filters -->
    <div class="flex h-14 gap-6">
      <div class="flex w-80">
        <input type="text" v-model="searchQuery" @keyup.enter="performSearch" placeholder="Search Item or Brand.."
          class="size-full rounded-xl border border-gray-200 px-3 indent-12 focus:outline-none" />
      </div>

      <!-- Filters -->
      <div class="flex items-center gap-4">
        <select v-model="selectedCategory"
          class="h-full w-32 rounded-lg border-2 border-gray-200 bg-gray-50 px-4 text-sm transition focus:outline-none">
          <option value="">Category</option>
          <option v-for="category in categories" :key="category.name" :value="category.name">
            {{ category.name }}
          </option>
        </select>

        <select v-model="selectedBrand"
          class="h-full w-25 rounded-lg border-2 border-gray-200 px-4 text-sm transition focus:outline-none">
          <option value="">Brand</option>
          <!-- <option v-for="brand in brands" :key="brand" :value="brand">
            {{ brand }}
          </option> -->
        </select>

        <select v-model="priceRange"
          class="h-full w-39 rounded-lg border-2 border-gray-200 px-8 text-xs transition focus:outline-none">
          <option value="">Price Range</option>
          <option value="0-1000">Under IQD 1,000</option>
          <option value="1000-5000">IQD 1,000 - 5,000</option>
          <option value="5000-10000">IQD 5,000 - 10,000</option>
          <option value="10000+">Above IQD 10,000</option>
        </select>

        <!-- Express Toggle -->
        <label
          class="flex cursor-pointer flex-row items-center gap-2 border border-gray-200 px-4 py-2 transition hover:bg-gray-100">
          <input type="checkbox" v-model="expressOnly" class="hidden" />
          <span :class="[
            'text-sm',
            expressOnly
              ? 'font-semibold text-green-600'
              : 'text-gray-600',
          ]">
            Express
          </span>
        </label>
      </div>

      <!-- Sort -->
      <div class="flex items-center gap-3 text-sm text-gray-600">
        <span>Sort by</span>
        <select v-model="sortBy"
          class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
          <option value="popular">Popular</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product"
        @click="viewProduct(product.id)" @favorite="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Product } from "@/types/product";
import { useRouter, useRoute } from "vue-router";
import ProductCard from "./components/ProductCard.vue";
import HotProducts from "./components/HotProducts.vue";

interface Category {
  name: string;
}

const route = useRoute()
const router = useRouter();

const products = ref<Product[]>(route.meta.products as Product[]);
const categories = ref<Category[]>(route.meta.categories as Category[]);

const priceRange = ref("");
const searchQuery = ref("");
const sortBy = ref("popular");
const selectedBrand = ref("");
const expressOnly = ref(false);
const selectedCategory = ref("");

// Filtered products
const filteredProducts = computed(() => {
  let filtered = [...products.value];

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(query)
    );
  }

  // Category filter
  if (selectedCategory.value) filtered = filtered.filter((p) => p.category === selectedCategory.value);

  // Price range filter
  if (priceRange.value) {
    const [min, max] = priceRange.value.split("-").map(Number);
    filtered = filtered.filter((p) => {
      if (max) {
        return p.price >= min && p.price <= max;
      } else {
        return p.price >= min;
      }
    });
  }

  // Sorting
  switch (sortBy.value) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
      break;
    default:
      break;
  }

  return filtered;
});

// Methods
const viewProduct = (productId: string) => {
  router.push(`/products/${productId}`);
};

// const toggleFavorite = (productId: number) => {
//   const product = products.value.find((p) => p.id === productId);
//   if (product) product.isFavorite = !product.isFavorite;
// };

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/search?q=${encodeURIComponent(searchQuery.value)}`);
  }
};

</script>