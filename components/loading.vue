<template>
  <div v-if="isLoading" class="loading-page bg-[#ffffff] dark:bg-slate-900">
    <div class="spinner"></div>
    <!-- You can add a message or additional content here -->
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true, // Initially set to true to simulate loading
    };
  },
  mounted() {
    // Simulate loading delay (You can replace this with actual loading logic)
    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 2000); // Adjust the time as needed
  },
};
</script>

<style>
/* Style your loading page */
.loading-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999; /* Ensure it appears above other content */
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left: 4px solid #dd6b20; /* Change color as desired */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  position: relative;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(90deg);
  }
  to {
    transform: rotate(450deg);
  }
}
</style>
