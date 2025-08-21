import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

import MainLayout from "@/layouts/MainLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";

import Home from "@/views/home/Home.vue";
import Search from "@/views/search/Search.vue";
import Products from "@/views/products/Products.vue";

import Login from "@/views/auth/Login.vue";
import SignUp from "@/views/auth/SignUp.vue";

const Profile = () => import("@/views/profile/Profile.vue");
const Checkout = () => import("@/views/checkout/Checkout.vue");
const Settings = () => import("@/views/settings/Settings.vue");
const Favorites = () => import("@/views/favorites/Favorites.vue");
const OrderHistory = () => import("@/views/order-history/OrderHistory.vue");

import NotFound from "@/views/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/auth",
    component: AuthLayout,
    redirect: "/auth/login",
    children: [
      {
        path: "login",
        name: "Login",
        component: Login,
        meta: {
          title: "Login - SecondHand",
          guest: true,
        },
      },
      {
        path: "sign-up",
        name: "SignUp",
        component: SignUp,
        meta: {
          title: "Register - SecondHand",
          guest: true,
        },
      },
    ],
  },

  // Main routes with layout
  {
    path: "/",
    component: MainLayout,
    children: [
      // Public routes - accessible to everyone
      {
        path: "",
        name: "Home",
        component: Home,
        props: true,
        meta: {
          title: "SecondHand - Buy & Sell Second Hand Items",
        },
        beforeEnter: async (to, from, next) => {
          try {
            const products = await fetchProducts();
            const categories = await fetchCategories();

            to.meta.products = products;
            to.meta.categories = categories;

            next();
          } catch (error) {
            console.error("Failed to fetch before Home:", error);
            next(false);
          }
        },
      },
      {
        path: "products",
        name: "Products",
        component: Products,
        meta: {
          title: "All Products - SecondHand",
        },
      },
      {
        path: "products/:id",
        name: "ProductDetail",
        component: () => import("@/views/products/ProductDetail.vue"),
        props: true,
        meta: {
          title: "Product Details - SecondHand",
        },
      },
      {
        path: "categories/:category",
        name: "CategoryProducts",
        component: Products,
        props: true,
        meta: {
          title: "Category Products - SecondHand",
        },
      },
      {
        path: "search",
        name: "Search",
        component: Search,
        props: (route) => ({
          query: route.query.q,
          category: route.query.category,
          minPrice: route.query.minPrice,
          maxPrice: route.query.maxPrice,
          location: route.query.location,
        }),
        meta: {
          title: "Search Results - SecondHand",
        },
      },

      // Protected routes - require authentication
      {
        path: "profile",
        name: "Profile",
        component: Profile,
        meta: {
          title: "My Profile - SecondHand",
          requiresAuth: true,
        },
      },
      {
        path: "favorites",
        name: "Favorites",
        component: Favorites,
        meta: {
          title: "My Favourites - SecondHand",
          requiresAuth: true,
        },
      },
      {
        path: "checkout",
        name: "Checkout",
        component: Checkout,
        meta: {
          title: "Checkout - SecondHand",
          requiresAuth: true,
        },
      },
      {
        path: "orders",
        name: "OrderHistory",
        component: OrderHistory,
        meta: {
          title: "Order History - SecondHand",
          requiresAuth: true,
        },
      },
      {
        path: "settings",
        name: "Settings",
        component: Settings,
        meta: {
          title: "Settings - SecondHand",
          requiresAuth: true,
        },
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "Page Not Found - SecondHand",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    else if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else return { top: 0 };
  },
});

import { setupRouterGuards } from "@/router/guard";
import { fetchProducts } from "@/api/products";
import { fetchCategories } from "@/api/categories";
setupRouterGuards(router);

export default router;
