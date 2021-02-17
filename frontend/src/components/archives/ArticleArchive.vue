<template>
  <div>
    <div class="articleArchive">
        <ArticleCard v-for="article in articles" :key="article.id" :article="article"/>  
    </div>  
    <div class="loadMore" v-if="loadMore">        
        <b-button variant="outline-dark" @click="getArticles">Carregar Mais Artigos</b-button>
    </div>    
  </div>
</template>

<script>
import ArticleCard from "@/components/home/ArticleCard"
import {baseApiUrl} from '@/global'
import axios from 'axios'

export default {
    name: "ArticleArchive",
    components: {ArticleCard}, 
    data: function() {
        return {
            articles: [],
            page: 1,
            loadMore: true,
            limit: 6
        }
    },
    methods: {
        getArticles() {
            const url = `${baseApiUrl}/articles?page=${this.page}`
            axios(url).then(res => {
                this.articles = this.articles.concat(res.data.data)                
                this.page++

                if(res.data.data.length === 0 || res.data.data.length < this.limit) this.loadMore = false
            })
        }
    },
    mounted() {
        this.getArticles()
    }    
}
</script>

<style>
.articleArchive {
    display: flex;
    flex-wrap: wrap;

    margin: 0 auto;
    padding: 40px 0 0 0;
    width: 1143px;
}

.loadMore {
    display: flex;
    justify-content: center;

    margin: 0 0 50px 0px;
}
</style>