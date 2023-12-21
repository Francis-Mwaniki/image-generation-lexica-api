<template>
  <div class="relative">
    <h3 class="text-2xl font-semibold mb-2 text-center mx-2 my-2 smooth">
      Example of prompts you can Describe
    </h3>
    <p class="text-center text-gray-600 dark:text-white smooth">Click to try</p>
    <Transition name="fade">
      <div
        v-if="isCopied"
        class="fixed inset-x-0 top-0 sm:max-w-[20%] max-w-full mx-auto mt-2 mr-2 z-10"
      >
        <div
          class="inset-x-0 top-0 sm:max-w-[20%] max-w-full mx-auto cursor-pointer mt-2 mr-2 fixed z-10"
          @click="isCopied = false"
        >
          <p
            class="text-center text-gray-600 dark:text-white smooth flex justify-center items-center gap-x-1 bg-green-100 dark:bg-green-900 rounded-md p-2 shadow-lg shadow-black py-3"
          >
            Copied to clipboard

            <Icon name="ic:round-check-circle" class="h-6 w-6 text-green-500" />
          </p>
        </div>
      </div>
    </Transition>
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center items-start my-3 sm:max-w-2xl md:max-w-4xl lg:max-w-6xl max-w-xl sm:mx-auto mx-2 dark:text-white"
    >
      <div
        v-for="(prompt, index) in prompts"
        :key="index"
        class="prompt-container group smooth flex flex-row shadow-lg justify-start items-center gap-x-2"
      >
        <div
          class="text-gray-900 dark:text-white space-x-2 absolute left-[92%] transform -translate-x-1/2 -translate-y-1/2 rounded-full"
          @click="redirectToParams(prompt.description)"
        >
          <Icon
            name="uil:external-link-alt"
            class="text-gray-900 dark:text-white h-14 w-14"
          />
        </div>
        <div>
          <h2 class="text-lg dark:text-white md:text-xl font-semibold mb-2">
            {{ prompt.title }}
          </h2>
          <p class="text-sm md:text-base mt-2">{{ prompt.description }}</p>
        </div>
        <div class="flex items-center justify-start m-2">
          <!-- <Icon name="ic:round-arrow-forward-ios" class="h-6 w-6" /> -->
          <a class="no-underline" @click="copyPayload(prompt.description)">
            <Icon name="ic:outline-content-copy" class="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>

    <div class="flex justify-center items-center mx-auto flex-col">
      <!-- Create your own prompt -->
      <NuxtLink
        to="/create"
        class="text-sm md:text-base smooth mt-2 italic underline text-orange-600"
      >
        <UButton class="py-3 px-6">
          <span>Create Your Image </span>
          <span>
            <Icon name="ic:round-arrow-forward-ios" class="h-6" />
          </span>
        </UButton>
      </NuxtLink>
      <UDivider label="OR" class="max-w-20 my-2" />
      <NuxtLink
        to="/examples"
        class="text-sm md:text-base smooth mt-2 italic underline text-orange-600"
      >
        <span class="mx-1"> See examples</span>
        <span>
          <Icon name="uil:external-link-alt" class="h-6" />
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const prompts = ref([
  {
    id: 1,
    title: "Serene Natural Landscape",
    description:
      "Describe a serene natural landscape you'd like to see. Consider the elements like mountains, lakes, or forests.",
    payload: "payload1",
  },
  {
    id: 2,
    title: "Futuristic Cityscape",
    description:
      "Envision a futuristic cityscape bustling with technological advancements. Detail the architecture and innovations.",
    payload: "payload2",
  },
  {
    id: 3,
    title: "A Haunted House",
    description:
      "Describe a haunted house. What makes it haunted? What does it look like? What is the history of the house?",
    payload: "payload3",
  },
  {
    id: 4,
    title: "A Magical Forest",
    description:
      "Describe a magical forest. What makes it magical? What does it look like? What is the history of the forest?",
    payload: "payload4",
  },
  {
    id: 5,
    title: "A Peaceful Beach",
    description:
      "Describe a peaceful beach. What makes it peaceful? What does it look like? What is the history of the beach?",
    payload: "payload5",
  },
  {
    id: 6,
    title: "A Busy City",
    description:
      "Describe a busy city. What makes it busy? What does it look like? What is the history of the city?",
    payload: "payload6",
  },
  {
    id: 7,
    title: "A Deserted Island",
    description:
      "Describe a deserted island. What makes it deserted? What does it look like? What is the history of the island?",
    payload: "payload7",
  },
  {
    id: 8,
    title: "A Peaceful Mountain",
    description:
      "Describe a peaceful mountain. What makes it peaceful? What does it look like? What is the history of the mountain?",
    payload: "payload8",
  },
]);
const router = useRouter();
const isCopied = ref(false);

const copyPayload = (payload) => {
  navigator.clipboard.writeText(payload);
  console.log("copied", payload);
  isCopied.value = true;

  setTimeout(() => {
    isCopied.value = false;
  }, 2000);
};

const redirectToParams = (payload) => {
  router.push({
    path: "/create/example",
    query: { prompt: payload },
  });
};
</script>

<style>
/* Styles remain unchanged */

.prompt-container {
  border-radius: 0.5rem;
  padding: 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  transition: all 0.6s ease-in-out;
  cursor: pointer;
  background-color: #f6ecea;
}

.prompt-container:hover {
  transform: scale(1);
  box-shadow: 0 0 0.5rem rgb(252, 252, 252);
}

.dark .prompt-container {
  background-color: #0a1322;
  box-shadow: 0 0 0.5rem rgb(83, 83, 83);
}

/* Add this */
.animate-arrow {
  transform: scale(1.03);
  animation: arrow 1s infinite;
  transition: all 0.4s ease-in-out;
}

@keyframes arrow {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(0.5rem);
  }
  100% {
    transform: translateX(0);
  }
}

@media (width < 768px) {
  .dark .prompt-container {
    background-color: #24282e;
    box-shadow: 0 0 0.5rem rgb(83, 83, 83);
  }

  .prompt-container {
    background-color: #f6ecea;
    box-shadow: 0 0 0.5rem rgb(252, 252, 252);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
