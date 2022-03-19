<template>
  <section v-if="data && !pending">
    <div class="latest-videos">
      <h2>
        Latest
        <span>Videos</span>
      </h2>
      <ul>
        <li v-for="video in data.data.allVideo" :key="video.slug.current">
          <VideoCard :video="video" />
        </li>
      </ul>
      <a
        class="all"
        href="https://youtube.com/baldbeardedbuilder"
        title="See all videos"
      >See all videos</a>
    </div>
  </section>
</template>
<script setup>
</script>
<style lang="scss" scoped>
section {
  .latest-videos {
    @apply flex flex-col justify-center items-center;
    @apply mx-auto;
    @apply py-12 px-8;
    @apply w-full;
    @apply lg:max-w-4xl xl:max-w-6xl;
    @apply text-base;

    @apply text-darkPurple;

    h2 {
      @apply flex items-center;
      @apply font-cairo font-bold uppercase;
      @apply text-3xl md:text-4xl;
      span {
        @apply flex;
        @apply ml-1;
        @apply py-0 px-2;
        @apply text-white;
        @apply bg-blue-500;
      }
    }

    ul {
      @apply mt-12;
      @apply grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8;
      @apply list-none;

      li {
        @apply h-full;

        &:not(:nth-child(-n + 2)) {
          @apply hidden;
        }

        @screen sm {
          &:not(:nth-child(-n + 2)) {
            @apply block;
          }
          &:not(:nth-child(-n + 4)) {
            @apply hidden;
            @apply xl:block;
          }
        }
      }
    }

    .all {
      @apply font-bold uppercase;
      @apply bg-darkPurple;
      @apply text-white;
      @apply py-3 px-5;
      @apply mt-12;
      @apply rounded-md;

      &:hover {
        @apply bg-blue-500;
      }
    }
  }
}

body.dark {
  section {
    .latest-videos {
      @apply text-white;

      h2 {
        span {
          @apply text-darkPurple;
          @apply bg-bbbblue;
        }
      }
      .all {
        @apply font-bold uppercase;
        @apply bg-gray-200;
        @apply text-darkPurple;

        &:hover {
          @apply bg-bbbpink;
        }
      }
    }
  }
}
</style>