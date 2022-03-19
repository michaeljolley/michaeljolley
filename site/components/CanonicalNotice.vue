<template>
  <blockquote v-if="canonicalUrl">
    This post originally appeared on
    <a :href="canonicalUrl" target="_blank">{{ canonicalRoot }}</a>.
  </blockquote>
</template>
<script>
export default {
  setup() {
    const props = defineProps({
      canonicalUrl: {
        type: String,
        required: true,
      },
    })

    const canonicalRoot = computed(() => {
      return this.canonicalUrl ? this.canonicalUrl.split("/")[2] : "";
    })

    return {
      canonicalRoot
    }
  }
}
</script>