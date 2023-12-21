<template>
  <div class="progress-bar" :style="{ width: progressBarWidth }"></div>
</template>

<script>
export default {
  data() {
    return {
      progressBarWidth: "0%", // Initial width of the progress bar
    };
  },
  methods: {
    updateProgressBar() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollableHeight) * 100;
      this.progressBarWidth = `${scrolled}%`;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.updateProgressBar);
  },
  beforeMount() {
    window.removeEventListener("scroll", this.updateProgressBar);
  },
};
</script>

<style>
/* Style your progress bar as desired */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: #dd6b20; /* Change color as desired */
  z-index: 9999; /* Ensure it appears above other content */
  transition: width 0.3s ease; /* Add a smooth transition effect */
}
</style>
