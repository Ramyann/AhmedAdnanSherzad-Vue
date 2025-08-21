<script setup lang="ts">
import { RouterLink } from "vue-router";
import Plus from "@/assets/icons/Plus.svg";
import Home from "@/assets/icons/Home.svg";
import Store from "@/assets/icons/Store.svg";
import Basket from "@/assets/icons/Basket.svg";
import Wallet from "@/assets/icons/Wallet.svg";
import Logout from "@/assets/icons/Logout.svg";
import Settings from "@/assets/icons/Settings.svg";
import Favorites from "@/assets/icons/Favorites.svg";
</script>

<template>
  <nav class="flex flex-col items-center justify-between px-4 py-14">
    <button class="rounded-lg bg-black p-2">
      <Plus />
    </button>

    <div class="flex flex-col items-center justify-between gap-y-11">
      <RouterLink to="/Home">
        <Home />
      </RouterLink>
      <RouterLink to="/Favorites">
        <Favorites />
      </RouterLink>
      <RouterLink to="/My-Items">
        <Basket />
      </RouterLink>

      <RouterLink to="/Store">
        <Store />
      </RouterLink>
      <RouterLink to="/Wallet">
        <Wallet />
      </RouterLink>
      <RouterLink to="/Settings">
        <Settings />
      </RouterLink>
    </div>

    <button>
      <Logout />
    </button>
  </nav>
</template>
