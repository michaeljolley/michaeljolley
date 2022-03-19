<template>
  <article>
    <div class="latest-posts">
      <h1>
        Give me moar
        <span>Posts</span>
      </h1>
      <ul v-if="data && !pending">
        <li v-for="post in data" :key="post.slug">
          <BlogCard :post="post" />
        </li>
      </ul>
    </div>
  </article>
</template>
<script setup>
const latestPosts = groq`*[_type == "post" && dateTime(publishedAt) <= dateTime(now())] | order(publishedAt desc){
  slug,
  title,
  publishedAt,
  excerpt,
  "coverImageUrl": coverImage.asset -> url
}`
const { data, pending } = useSanityQuery(latestPosts)
</script>
<style lang="scss" scoped>
article {
  .latest-posts {
    @apply flex flex-col justify-center items-center;
    @apply mx-auto;
    @apply py-12 px-8;
    @apply w-full;
    @apply lg:max-w-4xl xl:max-w-6xl;
    @apply text-base;

    @apply text-darkPurple dark:text-white;

    h1 {
      @apply flex items-center;
      @apply font-cairo font-bold uppercase;
      @apply text-3xl md:text-4xl;
      span {
        @apply flex;
        @apply ml-1;
        @apply py-0 px-2;
        @apply text-white dark:text-darkPurple;
        @apply bg-blue-500 dark:bg-bbbblue;
      }
    }

    ul {
      @apply mt-16;
      @apply grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8;
      @apply list-none;

      li {
        @apply h-full;
      }
    }
  }
}

body.dark {
  article {
    .latest-posts {
      @apply text-white;
      h1 {
        span {
          @apply text-darkPurple;
          @apply bg-bbbblue;
        }
      }
    }
  }
}
</style>