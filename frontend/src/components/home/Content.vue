<template>
  <section class="homePageArticles">
      <ArticleCard v-for="article in articles" :key="article.id" :article="article"/>
  </section>
</template>

<script>
import ArticleCard from "@/components/home/ArticleCard"
import {baseApiUrl} from '@/global'
import axios from 'axios'

export default {
    name: "Content",
    components: {ArticleCard},    
    data: function() {
        return {
            articles: [],
        }
    },
    methods: {
        getArticles() {
            const url = `${baseApiUrl}/articles`
            axios(url).then(res => {
                this.articles = res.data.data
            })
        }
    },
    mounted() {
        this.getArticles()
    }
}
</script>

<style>
.homePageArticles {
    margin: 0 auto 10em;
    padding: 40px 0 0 0;
    width: 1143px;

    display: flex;
    flex-wrap: wrap;  
}
</style>