<template>
    <article class="article">
        <div class="imagem">
            <router-link :to="{ name: 'articleById', params: { id: article.id } }">
                <img :src="require(`@/assets/${article.imgPath}`)" alt="Imagem Artigo">
            </router-link>
        </div>
        <div class="dataArtigo">
            <span>{{article.published | formatDate}}</span>
        </div>
        <h4 class="titulo">
            <router-link :to="{ name: 'articleById', params: { id: article.id } }">
                {{ article.title }}
            </router-link>
        </h4>
        <div class="textoArtigo" v-html="article.content"></div>          
    </article>
</template>

<script>
export default {
    name: "ArticleCard",
    props: ['article']
}
</script>

<style>
.article {    
    margin-right: 23px;
    width: 358px;
    height: 408px;
    margin-bottom: 60px;
    overflow: hidden;
    background-color: rgba(128, 128, 128, 0.199);

    border-color:  rgba(128, 128, 128, 0.199);
    border-radius: 5px;
}

.imagem img{
    width: 100%;
}

.imagem  {
    max-height: 190px;
    overflow: hidden;
}

.dataArtigo {
    color: gray;
    padding-top: 10px;
    padding-left: 10px;
    font-size: 12px;
}

.titulo {
    margin: 5px 0 20px 0;    
    font-size: 25px;
    font-family: 'RobotoSlab';
    color: rgb(70, 65, 65);
}

.titulo  a{
    text-decoration: none;
    color: rgb(70, 65, 65);
    padding-left: 10px;
}

.titulo  a:hover {
    color: blueviolet;
    text-decoration: underline;
}

.textoArtigo {
    font-family: 'RobotoSlab';
    font-size: 15px;
    color: rgb(70, 65, 65);
}

.textoArtigo {
    display: block;
    display: -webkit-box; 
    height: 105px;  /* font-size * line-height * -webkit-line-clamp */
    margin: 0 auto;
    font-size: 15px;
    line-height: 1.4;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;    
    
    padding-left: 10px;
}
</style>