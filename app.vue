<template>
  <div>
    <div class="dark:bg-slate-900 bg-pink-300 flex justify-start items-center p-2">
      <ToggleMode />
      <Nuxt-Link to="/" class="text-white flex justify-end items-end gap-x-1">
        <span
          class="px-4 py-2 ring ring-pink-300 rounded bg-pink-800 dark:bg-transparent m-3"
        >
          <Icon name="ic:baseline-home" class="w-7 h-7 text-gray-200" /> Home</span
        ></Nuxt-Link
      >
      <Nuxt-Link to="/history" class="text-white flex justify-end items-end gap-x-1">
        <span
          class="px-4 py-2 ring ring-pink-300 rounded bg-pink-800 dark:bg-transparent m-3"
          ><Icon name="ic:baseline-history" class="w-7 h-7 text-gray-200" />Download
          History</span
        ></Nuxt-Link
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
