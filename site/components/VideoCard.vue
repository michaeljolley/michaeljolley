<template>
  <a :href="video.url" :title="videoTitle" target="_blank" class="videoCard">
    <img :src="video.coverImageUrl" :title="videoTitle" />
    <main>
      <h3>{{ videoTitle }}</h3>
    </main>
    <footer>
      Watch Now
      <IconVideoCamera />
    </footer>
  </a>
</template>
<script>
export default {
  props: {
    video: {
      type: Object,
      required: true,
    }
  },
  computed: {
    videoTitle() {
      return this.video.title.replace(' | Extension Highlight', '');
    }
  }
}
</script>
<style lang="scss" scoped>
a {
  @apply flex flex-col overflow-hidden;
  @apply h-full;
  @apply rounded-md;
  @apply border-b-4 border-transparent;
  @apply bg-white dark:bg-darkPurple;
  img {
    @apply rounded-t-md;
    padding: 1px;
  }
  main {
    @apply flex flex-col gap-3;
    @apply p-5;
    h3 {
      @apply text-xl font-bold;
    }
    p {
      @apply text-sm font-raleway;
      @apply text-gray-500;
    }
  }
  footer {
    @apply opacity-0;
    @apply uppercase;
    @apply text-bbbpink font-bold;
    @apply p-5 mt-auto;
    @apply flex align-middle gap-1;
    @apply text-xs;
  }
  &:hover {
    border-image-slice: 1;
    border-image-source: linear-gradient(to right, #ff00ff, #00ffff);
    @apply rounded-md;
    @apply shadow-2xl;
    main {
      h3 {
        background: linear-gradient(
          90deg,
          rgba(255, 0, 255, 1) 0%,
          rgba(0, 255, 255, 1) 100%
        );
        -webkit-text-fill-color: transparent;
        @apply bg-clip-text;
      }
    }
    footer {
      @apply opacity-100;
    }
  }
}
body.dark {
  a {
    @apply bg-darkPurple;
    &:hover {
      box-shadow: 0 25px 50px -12px rgba(255, 255, 255, 0.09);
    }
  }
}
</style>