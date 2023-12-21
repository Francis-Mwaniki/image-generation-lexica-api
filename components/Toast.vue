<template>
  <transition name="toast">
    <div
      v-if="isVisible"
      class="fixed top-5 right-5 bg-white p-4 rounded-lg shadow-md border border-l-2 border-green-500"
      @click="emitTOastHidingEvent"
    >
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <p class="text-gray-800">{{ message }}</p>
        </div>
        <div class="ml-4">
          <button
            @click="emitTOastHidingEvent"
            class="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg
              @click="emitTOastHidingEvent"
              class="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 1 1 1.414 1.414L11.414 10l2.293 2.293a1 1 0 0 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 0-1.414z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isVisible: true,
    };
  },
  methods: {
    showToast(message) {
      this.message = message;
      this.isVisible = true;
      setTimeout(() => {
        this.isVisible = false;
      }, 3000); // Hide toast after 3 seconds
    },
    hideToast() {
      this.isVisible = false;
    },
    emitTOastHidingEvent() {
      this.hideToast();
      this.$emit("toastHiding");
    },
  },
  mounted() {
    this.showToast();
  },
};
</script>

<style>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
  animation: slideIn 0.3s ease;
}
.toast-enter,
.toast-leave-to {
  opacity: 0;
}

@keyframes slideIn {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
