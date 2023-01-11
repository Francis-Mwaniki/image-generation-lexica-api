<template>
  <main>
    <section class="block min-h-screen dark:bg-slate-900 bg-pink-300">
      <div class="container mx-auto px-4 lg:pt-6 lg:pb-20">
        <div class="flex flex-wrap text-center justify-center">
          <div class="w-full lg:w-6/12 px-4 py-2">
            <h2 class="text-4xl font-semibold dark:text-pink-300 text-pink-600">
              Your download history...
            </h2>
            <p class="text-lg leading-relaxed mt-4 mb-4 dark:text-pink-300 text-pink-600">
              All downloads appears here
            </p>
          </div>
        </div>
        <div class="grid md:grid-cols-3 grid-cols-1 mt-10 gap-5">
          <div
            class="card w-full rounded-md h-80 ring-1 dark:ring-indigo-600 ring-pink-600 p-1"
            v-for="img in all_images[0]"
            :key="img"
          >
            <nuxt-img fit="cover" class="w-full h-64 object-cover" :src="img.img_url" />
            <h3 class="text-center dark:text-white text-black">{{ img.name }}</h3>
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
  } else {
    alert("error in retrieving");
  }
};
get_all();
</script>

<style></style>
