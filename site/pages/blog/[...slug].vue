<template>
  <article class="page" v-if="data && data.length > 0 && !pending">
    <header>
      <img src="{data[0].coverImageUrl}" alt="{data[0].title}" />
    </header>
    <main>
      <aside>
        <!-- <TableOfContents :toc="{ toc }" levels="{levels}"  /> -->
      </aside>
      <section class="content">
        <PageTopper :title="data[0].title" />
        <CanonicalNotice :canonicalUrl="data[0].canonicalUrl" />
      </section>
    </main>
  </article>
</template>
<script setup>
const route = useRoute()

const currentPost = `*[_type == "post" && slug == ${route.params.slug}]{
  slug,
  title,
  publishedAt,
  "coverImageUrl": coverImage.asset -> url,
  canonicalUrl,
  body
}`
const { data, pending } = useSanityQuery(currentPost)
</script>
