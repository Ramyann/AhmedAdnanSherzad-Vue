/// <reference types="vite/client" />

declare module "swiper/css";
declare module "swiper/css/navigation";
declare module "swiper/css/pagination";
declare module "swiper/css/scrollbar";

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "*.svg";
declare module "lucide-vue-next";

declare module "vueperslides" {
  import type { DefineComponent } from "vue";
  const VueperSlides: DefineComponent<any, any, any>;
  const VueperSlide: DefineComponent<any, any, any>;
  export { VueperSlides, VueperSlide };
}
