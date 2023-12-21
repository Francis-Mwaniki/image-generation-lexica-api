<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import ExampleImages from "~/components/EampleImages.vue";
const route = useRoute();
const images = ref([]);
const searching = ref(false);
const errorMessage = ref("");
const userInput = ref("");
userInput.value = route.query.prompt;

async function submitPrompt() {
  images.value = [];
  searching.value = true;

  if (userInput.value.trim() !== "") {
    try {
      const response = await fetch(
        `https://lexica.art/api/v1/search?q=${userInput.value}`
      );

      if (response.ok) {
        const res = await response.json();
        images.value = res.images;
        console.log("res", res);
      } else {
        searching.value = false;
        errorMessage.value = "Something went wrong, please try again";
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      searching.value = false;
      errorMessage.value = "An error occurred, please try again";
    }

    userInput.value = ""; // Clear input field
    errorMessage.value = ""; // Reset error message
  } else {
    errorMessage.value = "Please enter a prompt.";
    searching.value = false;
  }
}
onMounted(async () => {
  submitPrompt();
});
</script>

<template>
  <div class="py-8">
    <h3 class="text-2xl font-semibold text-gray-800 dark:text-white mx-3">
      Create your own image
    </h3>

    <div v-if="images.length > 0">
      <ExampleImages :images="images" />
    </div>

    <div v-if="errorMessage" class="text-red-500 text-sm font-semibold">
      {{ errorMessage }}
    </div>

    <div v-if="!images" class="flex flex-col justify-center items-center mx-auto">
      <span class="text-gray-500 text-sm font-semibold"> No images found. </span>
    </div>

    <!-- Create your own prompt -->
    <NuxtLink
      to="/create"
      class="text-sm md:text-base smooth mt-2 italic text-orange-600 text-center flex justify-center items-center mx-auto no-underline"
    >
      <UButton class="py-3 px-6">
        <span>Create Your Image </span>
        <span>
          <Icon name="ic:round-arrow-forward-ios" class="h-6" />
        </span>
      </UButton>
    </NuxtLink>
  </div>
</template>
