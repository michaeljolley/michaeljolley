<template>
  <ul>
    <li>
      <NuxtLink
        to="/blog/"
        aria-label="Aggregated content Michael has generated"
        >Blog</NuxtLink
      >
    </li>
    <li>
      <NuxtLink
        no-rel
        href="https://bbb.dev/shop"
        aria-label="T-shirts, stickers, and other swag"
        >Swag</NuxtLink
      >
    </li>
  </ul>
</template>
<style lang="scss" scoped>
ul {
  @apply hidden md:flex;
  @apply list-none;
  @apply justify-evenly gap-6 md:gap-10;

  li {
    @apply flex items-center;
    @apply border-b-4 border-transparent;

    @apply font-raleway font-bold;
    @apply text-darkPurple dark:text-gray-100;

    &:hover {
      border-image-slice: 1;
      border-image-source: linear-gradient(to right, #ff00ff, #00ffff);
    }
  }
}
</style>
