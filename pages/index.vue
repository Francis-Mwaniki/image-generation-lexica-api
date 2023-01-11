<template>
  <div class="dark:bg-slate-900 bg-pink-300 min-h-screen dark:text-white text-black pb-2">
    <div
      wire:loading
      v-show="loading"
      class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-900 opacity-75 flex flex-col items-center justify-center"
    >
      <div
        class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"
      ></div>
      <p
        class="sm:w-1/3 w-2/3 text-center dark:text-pink-300 text-indigo-100"
        v-show="errMsg"
      >
        {{ errMsg }}
      </p>
      <h2 class="text-center dark:text-pink-300 text-indigo-100 text-xl font-semibold">
        Loading...
      </h2>
      <p class="sm:w-1/3 w-2/3 text-center dark:text-pink-300 text-indigo-100">
        This may take a few seconds, please don't close this page.
      </p>
      <ClientOnly>
        <button
          class="outline-none ring-1 ring-pink-600 rounded py-1 px-6 text-white hover:bg-pink-700 gap-x-2 focus:outline-none dark:text-white flex justify-center items-center mx-auto my-2"
          @click="loading = false"
        >
          Cancel
          <Icon name="uil:cancel" />
        </button>
      </ClientOnly>
    </div>

    <div class="px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
      <!-- hero -->
      <div class="hero">
        <!-- hero headline -->
        <div
          class="hero-headline flex flex-col items-center justify-center pt-24 text-center gap-y-2"
        >
          <h1 class="font-bold text-3xl dark:text-white text-black">
            Stunning free images & royalty free stock
          </h1>
          <div
            class="font-base text-base text-gray-300 ring-1 ring-pink-700 p-2 flex justify-center items-center mx-auto md:flex-row flex-col"
          >
            <Icon name="ic:sharp-info" class="h-6 w-6 text-pink-600" />
            <p class="text-sm md:text-xl dark:text-white text-black">
              Please Note that these are AI generated images. Ask relevant prompts
            </p>
          </div>
        </div>

        <!-- image search box -->
        <div class="box pt-6">
          <div class="box-wrapper">
            <div
              class="bg-pink-200 rounded-full flex items-center w-full shadow-sm border border-pink-600 ring-1"
              :class="
                loading ? 'cursor-not-allowed bg-gray-500 ring-1 ring-pink-600' : ''
              "
            >
              <button
                class="outline-none bg-pink-800 focus:outline-none rounded-full p-3"
                :class="loading ? 'cursor-not-allowed bg-gray-500' : ''"
                @click.once="getImg"
              >
                <Icon
                  name="ic:sharp-search"
                  class="w-7 h-7 text-gray-100 cursor-pointer"
                />
              </button>

              <input
                type="text"
                :class="loading ? 'cursor-not-allowed bg-gray-500' : ''"
                name=""
                autocomplete="on"
                @keypress.enter.once="getImg"
                :disabled="loading"
                v-model="query"
                :placeholder="loading ? 'Generating...' : 'Describe your images'"
                id=""
                class="w-full pl-4 text-pink-600 font-mono uppercase font-bold text-sm outline-none focus:outline-none bg-transparent"
              />
            </div>
            <ClientOnly>
              <button
                :class="loading ? 'cursor-not-allowed bg-gray-500' : ''"
                class="outline-none ring-1 ring-pink-600 rounded py-1 px-6 hover:text-white hover:bg-pink-900 gap-x-2 focus:outline-none dark:text-white text-black flex justify-center items-center mx-auto my-2"
                @click="refresh"
              >
                Refresh
                <Icon name="uil:refresh" />
              </button>
            </ClientOnly>
          </div>
        </div>
        <div
          class="flex justify-center mx-auto py-3 items-center text-2xl dark:text-white text-black px-1"
        >
          Your search is "{{ query }}"
        </div>
        <div class="my-5 grid grid-cols-1 md:grid-cols-4 gap-4">
          <section v-for="img in allPosts[0]" :key="img.id">
            <nuxt-img fit="cover" class="w-full h-64 object-cover" :src="img.src" />
            <button
              @click="downloadImage(img.src)"
              class="py-1 px-3 m-1 dark:text-white text-black cursor-pointer float-right"
            >
              <Icon
                :name="downloading ? 'ic:outline-circle' : 'ic:baseline-cloud-download'"
                class="w-6 h-6 text-pink-600 ring-2 rounded ring-fuchsia-600"
                :class="downloading ? '  animate-spin ' : ''"
              />
            </button>
          </section>
        </div>
        <div
          v-show="allPosts.length === 0"
          class="flex justify-center mx-auto md:flex-row flex-col gap-x-2 md:max-w-2xl max-w-lg py-3 rounded my-2 ring-1 ring-pink-600 items-center md:text-2xl text-lg dark:text-white text-black"
        >
          <Icon
            name="ic:baseline-edit-note"
            class="w-10 h-10 dark:text-white text-black"
          />
          <p class="text-sm md:text-xl">{{ err }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
let query = ref("");
let allPosts = ref([]);
let loading = ref(false);
let downloading = ref(false);
let all_imgs = ref([]);
let err = ref("Give atleast a gap of 2 minutes per search");
let errMsg = ref("");
const client = useSupabaseClient();
// const { pending, data: posts } = useLazyFetch(
//   `https://lexica.art/api/v1/search?q=${query.value}`
// );
// watch(posts, (newPosts) => {
//   allPosts.push(posts, newPosts);
// });
const getImg = async () => {
  setTimeout(async () => {
    loading.value = true;
    let data = await fetch(`https://lexica.art/api/v1/search?q=${query.value}`);
    if (data.ok) {
      let res = await data.json();
      allPosts.value.push(res.images);
      setTimeout(() => {
        loading.value = false;
      }, 8000);
      // for (let i = 0; i <= allPosts[0].length; i++) {
      //   all_imgs.value.push(res.images[i]);
      // }

      console.log(allPosts);
    } else {
      let res = await data.json();
      errMsg.value = res.message;
      setTimeout(() => {
        loading.value = false;
      }, 3000);
    }
  }, 8000);
};
const downloadImage = async (src) => {
  downloading.value = true;
  axios({
    url: src,
    method: "GET",
    responseType: "blob",
  }).then((response) => {
    setTimeout(() => {
      let fileUrl = window.URL.createObjectURL(new Blob([response.data]));
      let fileLink = document.createElement("a");
      fileLink.href = fileUrl;
      fileLink.setAttribute("download", "image.jpg");
      document.body.appendChild(fileLink);
      fileLink.click();
    }, 5000);
  });
  setTimeout(() => {
    downloading.value = false;
  }, 2000);

  const { error } = await client
    .from("images")
    .insert({ name: query.value, img_url: src });
  if (error) {
    alert("Error in saving ");
  }
};

// onMounted(() => {
//   setTimeout(async () => {
//     await getImg();
//   }, 100);
// });
const refresh = () => {
  window.location.reload();
};
</script>

<style>
.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
