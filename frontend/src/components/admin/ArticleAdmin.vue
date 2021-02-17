<template>
  <div class="articleForm">
      <b-form @submit.stop.prevent="save">
            <input id="article-id" type="hidden" v-model="article.id" />
            <b-form-group label="Título:" label-for="article-title">
                <b-form-input id="article-title" type="text" :state="validateState('title')" v-model="$v.article.title.$model" placeholder="Informe o nome do título do artigo." />
                <div class="error" v-if="submitted && !$v.article.title.required">Campo obrigatório.</div>
            </b-form-group>
            <b-form-group label="Imagem (URL):" label-for="article-imgPath">
                <b-form-input id="article-imgPath" type="text" :state="validateState('imgPath')" v-model="$v.article.imgPath.$model" placeholder="Informe a URL da Imagem..." />
                <div class="error" v-if="submitted && !$v.article.imgPath.required">Campo obrigatório.</div>
            </b-form-group>            
            <b-form-group label="Data de Publicação:" label-for="article-published">
                <b-form-datepicker id="article-published" :state="validateState('published')" v-model="$v.article.published.$model" class="mb-2"></b-form-datepicker>
                <div class="error" v-if="submitted && !$v.article.published.required">Campo obrigatório.</div>
            </b-form-group>
            <b-form-group label="Conteúdo:" label-for="article-content">
                <VueEditor v-model="$v.article.content.$model" placeholder="Informe o Conteúdo do Artigo..." />
                <div class="error" v-if="submitted && !$v.article.content.required">Campo obrigatório.</div>
            </b-form-group>
            <b-button variant="primary" type="submit">Salvar</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
      </b-form>
      <hr>
      <b-table hover striped :items="articles" :fields="fields" >
            <template #cell(actions)="data">
                <b-button variant="warning" @click="loadArticle(data.item)" class="mr-2">
                    <font-awesome-icon icon="edit" />
                </b-button>
                
                <b-button variant="danger" @click="remove(data.item)">
                    <font-awesome-icon icon="trash" />
                </b-button>
            </template>
      </b-table>
      <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import {VueEditor} from "vue2-editor"
import {baseApiUrl, showError} from '@/global'
import axios from 'axios'

export default {
  name: 'ArticleAdmin',
  components: {VueEditor},
  data: function() { 
      return {
          article: { 
              title: '',
              imgPath: '',
              published: null,
              content: null
          },          
          submitted: false,
          articles: [],
          page: 1,
          limit: 0,
          count: 0,
          fields: [
              {key: 'id', label: 'ID', sortable: true},
              {key: 'title', label: 'Título', sortable: false},
              {key: 'imgPath', label: 'Nome da Imagem', sortable: false},
              {key: 'published', label: 'Data da Publicação', sortable: true, formatter: "formatDate" },
              {key: 'actions', label: 'Ações'}
          ]
      }
  },
  validations: {
    article: {
        title: {required},
        imgPath: {required},
        published: {required},
        content: {required}
    }
  },  
  methods: {
      validateState(name) {
        const { $dirty, $error } = this.$v.article[name];
        return $dirty && this.submitted ? !$error : null;
      },
      resetForm() {
        this.$nextTick(() => {
          this.$v.$reset();
          this.submitted = false;
        });
      },      
      loadArticles() {
          const url = `${baseApiUrl}/articles?page=${this.page}`
          axios.get(url).then(res => {
                this.articles = res.data.data
                this.count = res.data.count
                this.limit = res.data.limit
          })
      },
      formatDate(value) {
          return this.$options.filters.formatDate(value)
      },
      save() {
            this.submitted = true
            this.$v.article.$touch()
            if (this.$v.article.$anyError) {
                return
            }

            this.submitted = false
            this.resetForm()

            const method = this.article.id ? 'put' : 'post'
            const id = this.article.id ? `/${this.article.id}` : ''
            axios[method](`${baseApiUrl}/articles${id}`, this.article)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)            
      },
      reset() {
          this.loadArticles()
          this.article = {
              title: '',
              imgPath: '',
              published: null,
              content: null
          }
          this.resetForm()
      },
      remove(article) {
        axios.delete(`${baseApiUrl}/articles/${article.id}`)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                this.reset()
            })
            .catch(showError)
      },
      loadArticle(article) {
        console.log(article)
        axios.get(`${baseApiUrl}/articles/${article.id}`)
            .then(res => this.article = res.data)
      }
  },
  watch: {
      page() {
          this.loadArticles()
      }
  },
  mounted() {
      this.loadArticles()
  }
}
</script>

<style>
.articleForm .error {
  color: red;
  font-size: 12px;
}
</style>