<template>
  <div>
        <Header />
        <div class="articleContainer">
            <div class="imgContainer">
                <img :src="require(`@/assets/${this.article.imgPath}`)" alt="Imagem do Artigo">
            </div>
            <div class="articleTitle">
                {{this.article.title}}
            </div>
            <div class="content" v-html="article.content"></div>
        </div>
  </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import Header from "@/components/templates/Header"

export default {
    name: "Article",
    components: { Header},
    data: function() {
        return {
            article: {imgPath: 'castelo.jpg'} // Default Image. Avoid error message when the component is assembled before article is loaded.
        }
    },
    mounted() {              
        const url = `${baseApiUrl}/articles/${this.$route.params.id}`
        axios.get(url)
            .then(res => {
                this.article = res.data
            })    
    }
}
</script>

<style>
.articleContainer {
    margin: 0 auto 10em;
    padding: 40px 0 0 0;
    width: 800px;
    
    display: flex;
    flex-direction: column;
}

.imgContainer {
    width: 100%;
}

.imgContainer img {
    width: 100%;
    height: 100%;    
}

.articleTitle {
    align-self: center;
    margin: 40px 0;

    font-size: 40px;    
    font-family: 'RobotoSlab';
}

.content {
    font-family: 'RobotoSlab';
    font-size: 17px;

    line-height: 2em;    
}
</style>