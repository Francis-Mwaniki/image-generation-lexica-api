<script setup lang="ts">
export interface BlockGallery {
  headline?: string | null;
  id?: string;
  title?: string | null;
  gallery_items?: BlockGalleryFile[] | null;
}
export interface BlockGalleryFile {
  block_gallery?: (string | BlockGallery) | null;
  directus_files_id?: (string | File) | null;
  id?: number;
  sort?: number | null;
}

const props = defineProps<{
  data: BlockGallery;
}>();

const galleryItems = computed(() => {
  return props.data.gallery_items?.map((item: BlockGalleryFile) => {
    return item.directus_files_id;
  });
});
</script>

<template>
  <BlockContainer>
    <TypographyTitle v-if="data.title">{{ data.title }}</TypographyTitle>
    <TypographyHeadline v-if="data.headline" :content="data.headline" size="lg" />
    <VGallery v-if="galleryItems && galleryItems.length > 0" :items="galleryItems" />
  </BlockContainer>
</template>
