<template>
  <main>
    <section class="pb-20 relative block min-h-screen bg-slate-900 text-white">
      <Nuxt-Link to="/" class="text-white flex justify-end items-end">
        <span class="px-4 py-2 ring rounded bg-slate-800 m-3">Go home</span></Nuxt-Link
      >
      <div
        class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
        style="height: 80px"
      >
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z"
            class="shape-fill"
            fill="#171820"
            fill-opacity="1"
          ></path>
        </svg>
      </div>
      <div class="container mx-auto px-4 lg:pt-24 lg:pb-64">
        <div class="flex flex-wrap text-center justify-center">
          <div class="w-full lg:w-6/12 px-4 py-2">
            <h2 class="text-4xl font-semibold">Your download history</h2>
            <p class="text-lg leading-relaxed mt-4 mb-4">All downloads appears here</p>
          </div>
        </div>
        <div class="grid md:grid-cols-3 grid-cols-1 mt-10 gap-5">
          <div
            class="card w-full rounded-md h-80 ring-1 ring-indigo-600 p-1"
            v-for="img in all_images[0]"
            :key="img"
          >
            <nuxt-img fit="cover" class="w-full h-64 object-cover" :src="img.img_url" />
            <h3 class="text-center text-white">{{ img.name }}</h3>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
const client = useSupabaseClient();
let all_images = ref([]);
const get_all = async () => {
  const { data, error } = await client.from("images").select("*");
  if (data) {
    all_images.value.push(data);
    console.log(all_images);
  } else {
    console.log(error);
  }
};
get_all();
</script>

<style></style>
