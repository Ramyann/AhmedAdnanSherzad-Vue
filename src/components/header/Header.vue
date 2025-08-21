<template>
  <header>
    <div class="mx-auto px-4 sm:px-6 lg:px-8 ">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center gap-x-4">
          <Menu />

          <svg class="h-6 w-6 rounded-lg bg-primary text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>

          <div>
            <h1 class="text-xl font-bold text-gray-900">SECONDHAND</h1>
            <p class="-mt-1 text-xs text-gray-500">OFFICIAL</p>
          </div>
        </div>

        <nav class="hidden items-center space-x-8 md:flex">
          <a v-for="item in navigationItems" :key="item.name" href="#" @click.prevent="setActiveItem(item.name)"
            class="px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
            :class="{ 'font-semibold text-gray-900': activeItem === item.name }">
            {{ item.name }}
          </a>
        </nav>

        <div class="flex items-center space-x-4">
          <button @click="toggleLanguageMenu"
            class="relative flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path
                d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span>{{ selectedLanguage }}</span>

            <!-- Language Dropdown -->
            <div v-if="showLanguageMenu"
              class="absolute top-full right-0 z-10 mt-2 w-24 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
              <button v-for="lang in languages" :key="lang.code" @click="selectLanguage(lang)"
                class="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100" :class="{
                  'bg-gray-50 font-medium': selectedLanguage === lang.code,
                }">
                {{ lang.code }}
              </button>
            </div>
          </button>

          <button class="relative p-2 text-gray-600 hover:text-gray-900">
            <Cart class="h-6 w-6" />
            <span v-if="cartStore.totalCount > 0"
              class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-medium text-black">
              {{ cartStore.totalCount }}
            </span>
          </button>

          <div class="flex items-center space-x-3">
            <img :src="user.avatar" :alt="user.name" class="h-8 w-8 rounded-full border border-gray-200 object-cover" />
            <div class="hidden sm:block">
              <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
              <p class="text-xs text-gray-500">{{ user.status }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Menu from "@/assets/icons/Menu.svg";
import Cart from "@/assets/icons/Cart.svg";
import { useCartStore } from "@/stores/cartStore";
import { ref, onMounted } from "vue";

const cartStore = useCartStore();

const showMobileMenu = ref(false);
const showLanguageMenu = ref(false);
const activeItem = ref("How It Works?");
const selectedLanguage = ref("EN");

const navigationItems = [
  { name: "How It Works?" },
  { name: "Help & Support" },
];

const languages = [
  { code: "EN", name: "English" },
  { code: "AR", name: "Arabic" },
  { code: "FR", name: "French" },
];

const user = {
  name: "M. Khalid Saied",
  status: "Show Profile",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?...",
};

// function toggleMobileMenu() {
//   showMobileMenu.value = !showMobileMenu.value;
//   if (showMobileMenu.value) showLanguageMenu.value = false;
// }

function toggleLanguageMenu() {
  showLanguageMenu.value = !showLanguageMenu.value;
  if (showLanguageMenu.value) showMobileMenu.value = false;
}

function selectLanguage(language: { code: string; }) {
  selectedLanguage.value = language.code;
  showLanguageMenu.value = false;
}

function setActiveItem(itemName: string) {
  activeItem.value = itemName;
  showMobileMenu.value = false;
}

onMounted(() => {
  document.addEventListener("click", (e) => {
    const header = document.querySelector(".your-header-class"); // change to your header root
    if (header && !header.contains(e.target as HTMLElement)) {
      showLanguageMenu.value = false;
      showMobileMenu.value = false;
    }
  });
});
</script>


<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
