<template>
  <div class="mx-8 py-8 relative">
    <div
      class="flex items-center mx-auto justify-center space-x-3 focus:border-4 border-2 sm:dark:border-slate-800 border-gray-200 rounded-lg dark:border-gray-400"
      :class="searching ? 'border-orange-600' : 'border-gray-200'"
    >
      <UTextarea
        @keydown.enter="submitPrompt"
        variant="none"
        :disabled="searching"
        v-model="userInput"
        :placeholder="searching ? 'Searching...' : 'Enter a prompt'"
        class="w-full placeholder:text-orange-600 dark:placeholder:text-white dark:text-white font-bold tracking-wide leading-5"
      />

      <UButton
        :disabled="searching"
        variant="primary"
        class="ml-2 px-6 py-[23px]"
        @click="submitPrompt"
      >
        <Icon name="ic:round-search" class="w-10 h-8 mr-2 smooth" />
      </UButton>
    </div>

    <!-- seraching dots .. animated -->
    <div class="mt-2 flex justify-center items-center smooth">
      <div class="flex justify-center items-center gap-x-1"></div>
    </div>
    <Transition name="fade">
      <div
        v-if="searching && userInput != ''"
        class="fixed inset-x-0 top-0 max-w-full sm:max-w-[20%] mx-auto mt-2 mr-2 z-10"
      >
        <div
          class="inset-x-0 top-0 max-w-full sm:max-w-[20%] mx-auto cursor-pointer mt-2 mr-2 fixed z-10"
        >
          <p
            class="text-center text-gray-800 dark:text-white smooth flex justify-center items-center gap-x-1 bg-blue-100 dark:bg-blue-900 rounded-md p-2 shadow-lg shadow-black py-3"
          >
            searching for images
            <Icon name="svg-spinners:bars-rotate-fade" class="h-6 w-6 text-blue-600" />
          </p>
        </div>
      </div>
    </Transition>

    <!-- clear everything if images -->
    <div v-if="images.length > 0" class="mt-2 flex justify-center items-center">
      <UButton
        variant="primary"
        class="ml-2 px-6 py-[23px]"
        @click="
          images = [];
          countOneMinute = 0;
          isOneMinuteExpired = true;
          time = null;
          userInput = '';
        "
      >
        <span>clear</span>
        <Icon name="ic:round-delete-sweep" class="w-10 h-8 mr-2" />
      </UButton>
    </div>
    <!-- shortcut -->
    <div class="mt-2 flex justify-center items-center mx-auto flex-row gap-x-1">
      <h2 class="text-sm font-bold sm:dark:text-gray-600 dark:text-gray-300">Shortcut</h2>

      <UKbd size="sm">Enter</UKbd>
    </div>

    <!-- your prompt -->
    <div class="mt-5 max-w-md overflow-hidden text-wrap">
      <h2 class="text-2xl font-bold dark:text-gray-300 sm:dark:text-gray-500">
        Your prompt
      </h2>
      <p
        class="mt-2 dark:text-gray-300 sm:dark:text-gray-500 font-semibold overflow-x-auto h-7"
      >
        {{ userInput }}
      </p>
    </div>

    <div class="mt-5">
      <!-- your response -->
      <p
        v-if="isOneMinuteExpired"
        class="dark:text-gray-300 sm:dark:text-gray-500 font-semibold overflow-x-auto h-7"
      >
        {{ proceedMessage }}
      </p>

      <p
        v-if="!isOneMinuteExpired"
        class="t dark:text-gray-300 sm:dark:text-gray-500 font-semibold overflow-x-auto h-7"
      >
        {{ time }}
      </p>

      <Transition name="fade">
        <div
          v-if="errorMessage"
          class="fixed inset-x-0 top-0 max-w-full sm:max-w-[20%] mx-auto mt-2 mr-2 z-10"
        >
          <div
            class="inset-x-0 top-0 max-w-full sm:max-w-[20%] mx-auto cursor-pointer mt-2 mr-2 fixed z-10"
            @click="errorMessage = ''"
          >
            <p
              class="text-center text-gray-600 dark:text-white smooth flex justify-center items-center gap-x-1 bg-red-100 dark:bg-red-900 rounded-md p-2 shadow-lg shadow-black py-3"
            >
              {{ errorMessage }}
              <Icon name="ic:twotone-error-outline" class="h-6 w-6 text-red-500" />
            </p>
          </div>
        </div>
      </Transition>
    </div>

    <!-- images -->
    <div class="mt-5" />
    <div v-if="images.length > 0">
      <ExampleImages :images="images" />
    </div>
  </div>
</template>

<script>
import ExampleImages from "~/components/EampleImages.vue";
export default {
  components: {
    ExampleImages,
  },
  data() {
    return {
      userInput: "",
      negativeWords: [
        "sex",
        "nudity",
        "porn",
        "explicit",
        "offensive",
        "violence",
        "hate",
        "nude",
        "abuse",
        "racism",
        "discrimination",
        "harassment",
        "drugs",
        "alcohol",
        "gambling",
        "weapon",
        "suicide",
        "death",
        "harm",
        "injury",
        "illegal",
        "fraud",
        "scam",
        "terrorist",
        "extremism",
        "incest",
        "pedophilia",
        "bestiality",
        "self-harm",
        "anorexia",
        "bulimia",
        "suicidal",
        "bomb",
        "exploit",
        "gore",
        "rape",
        "murder",
        "kidnap",
        "torture",
        "cult",
        "genocide",
        "war",
        "famine",
        "poison",
        "toxic",
        "homophobia",
        "xenophobia",
        "hatred",
        "prejudice",
        "oppression",
        "depression",
        "anxiety",
        "prostitution",
        "sexism",
        "voyeurism",
        "promiscuity",
        "fetish",
        "orgy",
      ],
      errorMessage: "",
      capturedOffensiveWord: "",
      searching: false,
      images: [],
      countOneMinute: 0,
      isOneMinuteExpired: true,
      time: null,
      proceedMessage: "",
    };
  },
  methods: {
    async submitPrompt() {
      this.images = [];
      this.searching = true;
      if (this.userInput.trim() !== "") {
        this.searching = false;
        const userInputLower = this.userInput.toLowerCase();
        const containsNegative = this.negativeWords.some((word) =>
          userInputLower.includes(word)
        );

        if (containsNegative) {
          this.searching = false;
          this.capturedOffensiveWord = this.userInput;
          this.errorMessage = `Please ${this.capturedOffensiveWord} contains negative word/s, Avoid negative words`;
        } else {
          this.searching = true;
          // Handle the user's input here if it doesn't contain negative terms
          const config = {
            method: "GET",
          };
          let data = await fetch(
            `https://lexica.art/api/v1/search?q=${this.userInput}`,
            config
          );
          // For example, log it or process it further
          console.log("User input:", this.userInput);

          if (data.ok) {
            this.searching = false;
            let res = await data.json();
            this.images = res.images;
            console.log("res", res);

            /* count one minute using set interval */
            this.isOneMinuteExpired = false;
            this.proceedMessage = "please wait for 1 minute";
            let oneMinute = setInterval(() => {
              this.countOneMinute++;
              this.time = this.countOneMinute;
            }, 1000);

            /* clear when its over */
            setTimeout(() => {
              clearInterval(oneMinute);
              this.isOneMinuteExpired = true;
            }, 60000);
          }
          if (!data.ok) {
            this.searching = false;
            this.errorMessage = "Something went wrong, please try again";
          }

          // Clear the input field after submitting
          this.userInput = "";
          this.errorMessage = ""; // Reset error message
        }
      } else {
        this.errorMessage = "Please enter a prompt.";
        this.searching = false;
      }
    },
  },

  /* watch errorMesage */
  watch: {
    errorMessage() {
      if (this.errorMessage) {
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      }
    },

    /* watch isOneMinuteExpired & record countOneMinute */
    isOneMinuteExpired() {
      if (this.isOneMinuteExpired) {
        setTimeout(() => {
          this.isOneMinuteExpired = false;
          this.countOneMinute = 0;
        }, 60000);
      }
    },
    countOneMinute() {
      if (this.countOneMinute === 60) {
        this.isOneMinuteExpired = true;
        this.proceedMessage = "You can proceed now";
      }
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
