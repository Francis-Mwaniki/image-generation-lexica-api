<template>
  <div class="e">
    <button
      @click="toggleMode = !toggleMode"
      class="cursor-pointer rounded-xl mx-auto pl-4"
    >
      <button
        id="theme-toggle"
        class="text-gray-500 mr-5 dark:text-gray-400 h outline-none rounded-lg text-sm p-2.5"
      >
        <svg
          id="theme-toggle-light-icon"
          class="hidden w-7 h-10"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
          ></path>
        </svg>
        <!--   <Icon
          name="ic:outline-light-mode"
          id="theme-toggle-light-icon"
          class="hidden w-10 h-10 text-gray-200"
        />
        <Icon
          name="ic:round-dark-mode"
          id="theme-toggle-dark-icon"
          class="hidden w-10 h-10 text-gray-200"
        /> -->
        <svg
          id="theme-toggle-dark-icon"
          class="hidden w-10 h-10"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>

      <!--  <button id="theme-toggle">
                <div class="" v-if="toggleMode">
                  <img
                    id="theme-toggle-light-icon"
                    src="@/assets/images/light-icon.png"
                    class="h-11 w-11 hidden"
                    alt=""
                  />
                </div>
                <div class="" v-else>
                  <img
                    id="theme-toggle-dark-icon"
                    src="@/assets/images/dark-icon.png"
                    class="h-11 w-11 hidden"
                    alt=""
                  />
                </div>
              </button> -->
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const toggleMode = ref(false);

    return {
      toggleMode,
    };
  },
  mounted() {
    var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
    var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

    // Change the icons inside the button based on previous settings
    if (
      localStorage.getItem("color-theme") === "dark" ||
      !("color-theme" in localStorage)
    ) {
      document.documentElement.classList.add("dark");
      themeToggleLightIcon.classList.remove("hidden");
    } else {
      document.documentElement.classList.remove("dark");
      themeToggleDarkIcon.classList.remove("hidden");
    }

    // // if set via local storage previously
    // if (!localStorage.getItem("color-theme")) {
    //   if (localStorage.getItem("color-theme") === "light") {
    //     document.documentElement.classList.add("dark");
    //     localStorage.setItem("color-theme", "dark");
    //   } else {
    //     document.documentElement.classList.remove("dark");
    //     localStorage.setItem("color-theme", "light");
    //   }

    // if NOT set via local storage previously
    // } else {
    //   if (document.documentElement.classList.contains("dark")) {
    //     document.documentElement.classList.remove("dark");
    //     localStorage.setItem("color-theme", "light");
    //   } else {
    //     document.documentElement.classList.add("dark");
    //     localStorage.setItem("color-theme", "dark");
    //   }
    // }

    var themeToggleBtn = document.getElementById("theme-toggle");

    themeToggleBtn.addEventListener("click", function () {
      // toggle icons inside button
      themeToggleDarkIcon.classList.toggle("hidden");
      themeToggleLightIcon.classList.toggle("hidden");

      // if set via local storage previously
      if (localStorage.getItem("color-theme")) {
        if (localStorage.getItem("color-theme") === "light") {
          document.documentElement.classList.add("dark");
          localStorage.setItem("color-theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("color-theme", "light");
        }

        // if NOT set via local storage previously
      } else {
        if (document.documentElement.classList.contains("dark")) {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("color-theme", "light");
        } else {
          document.documentElement.classList.add("dark");
          localStorage.setItem("color-theme", "dark");
        }
      }
    });
  },
};
</script>

<style></style>
