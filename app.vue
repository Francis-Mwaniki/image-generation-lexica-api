<template>
  <div
    class="min-h-screen bg-[#ffffff] sm:dark:bg-slate-900 dark:bg-slate-600 overflow-x-hidden"
  >
    <LoadingPage v-if="loading" />
    <div v-if="!loading">
      <div class="flex justify-start items-center gap-x-3 mt-3">
        <NavLayout />
        <Darkmode />
      </div>
      <NuxtPage />

      <!-- create by francis -->
      <footer
        class="dark:text-white text-center text-xs p-3 w-full smooth overflow-hidden"
      >
        <div class="flex justify-center items-center gap-x-2">
          <div class="flex justify-center items-center gap-x-2 smooth">
            <Icon name="akar-icons:github-fill" class="h-6 w-6" />
            <a
              href="https://github.com/Francis-Mwaniki"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-gray-400"
            >
              <span>Francis Mwaniki</span>
            </a>
          </div>
        </div>
      </footer>
      <ProgressBar />
      <ScrollToTop />
    </div>
  </div>
</template>

<script>
import NavLayout from "~/components/Navigation/NavLayout.vue";
import Darkmode from "./components/Darkmode.vue";
import ProgressBar from "./components/progressBar.vue";
import LoadingPage from "./components/loading.vue";
import ScrollToTop from "./components/ScrollToTop.vue";

export default {
  components: {
    NavLayout,
    LoadingPage,
    Darkmode,
    ScrollToTop,
    ProgressBar,
  },
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.loading = false;
    });
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans&family=Satisfy&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Quicksand&display=swap");
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Josefin Sans", sans-serif;
  font-family: "Satisfy", cursive;
}

p,
li,
span,
button,
a {
  font-family: "Quicksand", sans-serif;
}
</style>
