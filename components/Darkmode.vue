<script setup lang="ts">
export interface DarkModeToggleProps {
  bg?: "dark" | "light";
}

withDefaults(defineProps<DarkModeToggleProps>(), {
  bg: "light",
});

const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>
<template>
  <ClientOnly>
    <UButton @click="isDark = !isDark" class="font-bold px-2 py-1.5">
      <Icon v-if="isDark" name="ic:round-light-mode" class="h-6 w-6 text-white" />
      <Icon v-else name="ic:round-dark-mode" class="h-6 w-6 text-white" />
    </UButton>
    <template #fallback>
      <div class="w-10 h-10" />
    </template>
  </ClientOnly>
</template>
