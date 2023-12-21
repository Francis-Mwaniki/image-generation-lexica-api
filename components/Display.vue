<template>
  <div class="flex justify-center items-center flex-col gap-y-7">
    <h3 class="text-2xl font-semibold mb-2 text-center mx-2 my-5">
      You describe it, we draw it!
    </h3>

    <p class="text-center dark:text-white font-semibold">
      Lexica is a platform that generates images based on your description. You can create
      your own image or try with examples.
    </p>
    <!-- <div
      class="group relative mb-4 smooth flex justify-center items-center mx-auto max-w-md"
    >
      <nuxt-img
        @click="handleZoom(image)"
        fit="cover"
        :src="image"
        :alt="`image-${image}`"
        class="w-full h-auto hover:scale-110 transition-transform rounded-lg shadow-lg smooth"
      />
      <div
        class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-lg"
      >
        <div class="flex items-center justify-center gap-4 flex-col">
          <h3 class="text-2xl font-semibold mb-2 text-center mx-2 my-2">
            Smiling cats flying over the city
          </h3>
          <p class="text-center text-gray-600 dark:text-white font-semibold">
            Smiling cats flying over the city, highly detailed, concept art, ultra
            realistic digital illustration, unreal engine 5++
          </p>
        </div>
      </div>
    </div> -->
    <div class="flex justify-center items-center mx-auto sm:flex-row flex-col gap-x-3">
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
      <UDivider direction="vertical" label="OR" class="max-w-20 my-2" />
      <NuxtLink
        to="/examples"
        class="text-sm md:text-base smooth mt-2 italic underline text-orange-600"
      >
        <UButton class="py-3 px-6">
          <span> Try with examples </span>
          <span>
            <Icon name="ic:round-arrow-forward-ios" class="h-6" />
          </span>
        </UButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      totalPages: 0,
      loaderWidth: "0%",
      image: "https://image.lexica.art/full_webp/f86cc68c-76bd-48a5-8e2d-49d61cb71ecc",
    };
  },
  methods: {
    handleZoom() {
      /* zoom  image*/
      const img = document.createElement("img");
      img.src = `https://lexica-serve-encoded-images.sharif.workers.dev/md/${this.image}`;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "contain";
      img.style.position = "fixed";
      img.style.top = "0";
      img.style.left = "0";
      img.style.zIndex = "999999";
      img.style.cursor = "zoom-out";
      img.onclick = () => {
        img.remove();
      };
      document.body.appendChild(img);
    },
  },
};
</script>

<style scoped></style>
