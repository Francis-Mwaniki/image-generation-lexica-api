<template>
  <div class="overflow-hidden p-4">
    <Transition name="fade">
      <div
        v-if="downloading"
        class="fixed inset-x-0 top-0 max-w-full sm:max-w-[20%] mx-auto mt-2 mr-2 z-10"
      >
        <div
          class="inset-x-0 top-0 max-w-full sm:max-w-[20%] mx-auto cursor-pointer mt-2 mr-2 fixed z-10"
        >
          <p
            class="text-center text-gray-800 dark:text-white smooth flex justify-center items-center gap-x-1 bg-blue-100 dark:bg-blue-900 rounded-md p-2 shadow-lg shadow-black py-3"
          >
            Downloading...
            <Icon name="ic:baseline-download" class="h-6 w-6 text-blue-500" />
          </p>
        </div>
      </div>
    </Transition>
    <div
      class="flex flex-wrap justify-center items-center mx-auto overflow-x-auto sm:gap-3 gap-4"
    >
      <div
        v-for="(image, index) in paginatedImages"
        :key="index"
        class="w-full sm:w-1/2 md:w-1/5 px-2 sm:gap-2 gap-2"
      >
        <div class="group relative mb-4 smooth">
          <div v-if="loadingPager" class="animate-pulse rounded-lg overflow-hidden">
            <div class="bg-gray-300 h-40 w-full mb-2"></div>
            <div class="bg-gray-300 h-8 w-2/3"></div>
          </div>

          <nuxt-img
            @click="handleZoom(image)"
            fit="cover"
            v-else
            :src="`https://lexica-serve-encoded-images.sharif.workers.dev/md/${image}`"
            :alt="`image-${index}`"
            class="w-full h-auto hover:scale-110 transition-transform rounded-lg shadow-lg smooth"
          />
          <!-- Controls displayed on hover -->
          <div
            class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-lg"
          >
            <!-- Zoom and Like controls -->
            <div class="flex items-center justify-center gap-4">
              <button @click="handleZoom(image)" class="focus:outline-none">
                <Icon
                  name="solar:minimalistic-magnifer-zoom-in-bold"
                  class="text-white h-8 w-8"
                />
              </button>
              <!-- <button @click="handleLike(image)" class="focus:outline-none">
                <Icon
                  name="icon-park-solid:like"
                  class="h-8 w-8"
                  :class="{
                    'text-[#dd6b20] sparkle-like-button animate-bounce': isLiked,
                    'text-white': !isLiked,
                  }"
                />
              </button> -->
            </div>
            <!-- <div  class="absolute inset-x-0 bottom-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-lg flex-col">
       <h3 class="text-2xl font-semibold mb-2 text-center mx-2 my-2">
            Smiling cats flying over the city
          </h3>
           <p class="text-center text-gray-600 dark:text-white smooth">
                Smiling cats flying over the city, highly detailed, concept art, ultra realistic digital illustration, unreal engine 5++
            </p>
          </div> -->

            <!-- Implement your controls here -->
          </div>
        </div>
        <div class="flex justify-center items-center mx-auto">
          <button
            @click="downloadImage(image)"
            class="bg-transparent text-black transition-colors focus:outline-none hover:bg-[#dd6b20] hover:text-white flex justify-center items-center mx-auto justify-self-center w-full dark:text-white shadow rounded-sm py-1"
          >
            <span class="mr-2">Download</span>
            <Icon name="ic:baseline-download" class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
    <!-- Pagination Controls -->
    <div v-if="loading" class="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
      <div class="h-16 bg-[#dd6b20]" :style="{ width: loaderWidth }"></div>
    </div>
    <div
      class="flex justify-center mt-4 overflow-x-auto sm:pl-2 sm:pr-2 pr-64 py-3 pl-72 space-x-4"
    >
      <button
        v-for="(page, pageIndex) in totalPages"
        :key="pageIndex"
        @click="setCurrentPage(pageIndex)"
        :class="{
          'bg-[#dd6b20] text-white': currentPage === pageIndex + 1,
          'mx-2': pageIndex !== 0,
        }"
        class="px-4 py-2 rounded-lg border border-[#dd6b20] hover:bg-[#dd6b20] transition-colors focus:outline-none"
      >
        {{ pageIndex + 1 }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      images: this.images,

      pageSize: 5, // Number of images per page
      currentPage: 1,
      loading: false,
      loadingPager: true,
      loaderWidth: "0%",
      isDownloaded: false,
      downloading: false,
      allImages: [],
      isLiked: false,
    };
  },
  computed: {
    paginatedImages() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      /* loop and splice start to =  https://lexica.art/?q=03b34d55-bce3-43ca-b721-5caa907f5da8 */

      const flattenedImages = this.images
        .flatMap((image) => image.gallery)
        .map((image) => {
          let imgids = [];
          let imageId = image.split("=")[1];
          imgids.push(imageId);

          return imgids;
        });
      console.log("-----flattenedImages-----", flattenedImages);
      return flattenedImages.slice(startIndex, endIndex);
    },
    totalPages() {
      // Calculate the total number of pages
      return Math.ceil(this.images.length / this.pageSize);
    },
  },

  mounted() {
    // Simulate loading delay (You can replace this with actual loading logic)
    setTimeout(() => {
      this.loadingPager = false;
    }, 2000); // Adjust the time as needed
  },
  methods: {
    async downloadImage(src) {
      this.downloading = true;
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
        }, 1000);
      });
      setTimeout(() => {
        this.isDownloaded = true;
      }, 2000);

      setTimeout(() => {
        this.isDownloaded = false;
        this.downloading = false;
      }, 2000);
    },
    resetLikeClicked(image) {},
    handleZoom(image) {
      /* zoom  image*/
      const img = document.createElement("img");
      img.src = `https://lexica-serve-encoded-images.sharif.workers.dev/md/${image}`;
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
    handleLike(image) {
      this.isLiked = !this.isLiked;
      console.log("-----isLiked-----", this.isLiked);
    },

    setCurrentPage(pageIndex) {
      this.loading = true; // Set loading to true when paginating
      this.loadingPager = true;

      // Simulate loading delay (You can replace this with actual loading logic)
      setTimeout(() => {
        this.currentPage = pageIndex + 1;
        this.loading = false;
      }, 1000); // Adjust the time as needed

      setTimeout(() => {
        this.loadingPager = false;
      }, 2000); // Adjust the time as needed

      // Calculate the width of the loader
      this.loaderWidth = `${((pageIndex + 1) / this.totalPages) * 100}%`;
    },
  },
};
</script>

<style>
.animate-pulse {
  animation: pulse 1.5s infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

.sparkle-like-button {
  animation: sparkle 0.5s infinite;
}

@keyframes sparkle {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
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
