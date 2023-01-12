<template>
  <div>
    <Navigation />
    <NuxtPage />
    <Foot />
  </div>
</template>
<script>
import Navigation from "./components/Navigation.vue";
import Foot from "./components/Foot.vue";

export default {
  components: { Navigation, Foot },
};
</script>
