<template>
  <div class="wrapper">
      <Header />
      <ArticleArchive />
  </div>
</template>

<script>
import Header from './Header.vue'
import ArticleArchive from '../archives/ArticleArchive.vue'

export default {
    name: "Archives",
    components: { Header, ArticleArchive }
}
</script>

<style>

</style>