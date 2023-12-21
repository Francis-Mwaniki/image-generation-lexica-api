<template>
  <div>
    <UButton
      @click="toggle"
      class="text-white focus:outline-none m-1.5 rounded px-6 py-2 font-medium"
    >
      Menu
    </UButton>
    <div :class="menuClasses">
      <button
        aria-label="Close"
        class="absolute top-3 right-3 text-5xl dark:text-white cursor-pointer"
        @click="toggle"
      >
        &times;
      </button>

      <div class="container overflow-auto text-base sm:text-3xl">
        <div class="my-4">
          <h1 class="sm:text-5xl dark:text-white font-bold v-font text-4xl text-wrap p-2">
            Generate Image Using AI
          </h1>
        </div>

        <div class="p-2">
          <NuxtLink @click="open = false" to="/" class="item">
            <UButton class="px-5 py-3 min-w-36 font-bold"> Home </UButton>
          </NuxtLink>
        </div>

        <div class="p-2">
          <NuxtLink @click="open = false" to="/create" class="item">
            <UButton class="px-5 py-3 min-w-36 font-bold"> Generate Image </UButton>
          </NuxtLink>
        </div>
        <div class="p-2">
          <NuxtLink @click="open = false" to="/favorite" class="item">
            <UButton class="px-5 py-3 min-w-36 font-bold"> Favorites </UButton>
          </NuxtLink>
        </div>
        <div class="p-2">
          <NuxtLink @click="open = false" to="/saved" class="item">
            <UButton class="px-5 py-3 min-w-36 font-bold"> My Images </UButton>
          </NuxtLink>
        </div>

        <!-- <div class="p-2">
          <NuxtLink @click="open = false" to="/login" class="item">
            <UButton class="px-5 py-3 min-w-36 font-bold"> Login </UButton>
          </NuxtLink>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    };
  },
  mounted() {},
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
  computed: {
    menuClasses() {
      return {
        menu: true,
        open: this.open,
        close: !this.open,
      };
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Satisfy&display=swap");

v-font {
  font-family: "Satisfy", cursive;
}
.container {
  position: relative;

  width: 100%;
  text-align: center;
  margin-top: 8rem;
  overflow-y: auto;
}

.item {
  color: #ccc;
  cursor: pointer;
  text-decoration: none;
}

.item:hover {
  color: #fff;
}

.menu {
  overflow-x: hidden;
  overflow-y: auto;
  transition-duration: 700ms;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  background-color: #fff;
}

.dark .menu {
  background-color: #1f2937;
}

.open {
  height: 100%;
  width: 100%;
}

.close {
  width: 0;
  height: 100%;
}
</style>
