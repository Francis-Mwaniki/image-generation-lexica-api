<template>
  <div>
    <div
      class="dark:bg-slate-900 bg-pink-300 flex justify-center mx-auto items-center p-2 gap-x-2"
    >
      <ToggleMode />
      <Nuxt-Link
        to="/"
        class="text-white flex h-9 justify-center flex-row items-center gap-x-1 ring ring-pink-300 rounded bg-pink-800 dark:bg-transparent"
      >
        <Icon name="ic:baseline-home" class="w-6 h-6 text-gray-200" />
        <span class="md:text-xl text-sm"> Home</span></Nuxt-Link
      >
      <Nuxt-Link
        to="/history"
        class="text-white px-1 h-9 flex justify-center items-center gap-x-1 flex-row ring ring-pink-300 rounded bg-pink-800 dark:bg-transparent"
      >
        <Icon name="ic:baseline-history" class="w-6 h-6 text-gray-200" />
        <span class="md:text-xl text-sm">Downloads </span></Nuxt-Link
      >
    </div>
    <NuxtPage />
    <footer
      class="flex justify-center items-center mx-auto text-sm dark:bg-slate-900 bg-pink-200 dark:text-pink-300 text-pink-600 py-3"
    >
      Developed by Francis💖 &copy; Copyrights 2023
    </footer>
  </div>
</template>
<script>
import ToggleMode from "./components/toggleMode.vue";

export default {
  components: { ToggleMode },
};
</script>
