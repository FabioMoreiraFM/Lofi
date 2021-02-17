<template>
  <div>
    <b-form class="userForm">
            <input id="user-id" type="hidden" v-model="userAdmin.userId" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="user-name">
                        <b-form-input id="user-name" type="text" :state="validateState('name')" v-model="$v.userAdmin.name.$model" placeholder="Informe o Nome do Usuário..." />
                        <div class="error" v-if="submitted && !$v.userAdmin.name.required">Campo obrigatório.</div>
                        <div class="error" v-if="submitted && !$v.userAdmin.name.minLength">Este campo deve conter no mínimo 3 caracteres.</div>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-form-input id="user-email" type="text" :state="validateState('email')" v-model="$v.userAdmin.email.$model" placeholder="Informe o E-mail do Usuário..." />
                        <div class="error" v-if="submitted && !$v.userAdmin.email.required">Campo obrigatório.</div>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Senha:" label-for="user-password">
                        <b-form-input id="user-password" type="password" :state="validateState('password')" v-model="$v.userAdmin.password.$model" placeholder="Informe a Senha do Usuário..." />
                        <div class="error" v-if="submitted && !$v.userAdmin.password.required">Campo obrigatório.</div>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Confirmação de Senha:" label-for="user-confirm-password">
                        <b-form-input id="user-confirm-password" type="password" :state="validateState('confirmPassword')" v-model="$v.userAdmin.confirmPassword.$model" placeholder="Confirme a Senha do Usuário..." />
                        <div class="error" v-if="submitted && !$v.userAdmin.confirmPassword.required">Campo obrigatório.</div>
                        <div class="error" v-if="submitted && !$v.userAdmin.confirmPassword.sameAsPassword">A senha e confirmação de senha devem ser iguais.</div>          
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" @click="save">Salvar</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
      <hr>
      <b-table hover striped :items="users" :fields="fields" >
            <template #cell(actions)="data">
                <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
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
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import {baseApiUrl, showError} from '@/global'
import axios from 'axios'

export default {
  name: 'ArticleAdmin',
  data: function() { 
      return {
          users: [],
          userAdmin: {
              email: '',
              name: '',
              password: '',
              confirmPassword: ''
          },
          page: 1,
          limit: 0,
          count: 0,
          submitted: false,
          fields: [
              {key: 'userId', label: 'Código', sortable: true},
              {key: 'name', label: 'Nome', sortable: false},
              {key: 'email', label: 'E-mail', sortable: false},
              {key: 'actions', label: 'Ações'}
          ]
      }
  },
    validations: {
        userAdmin: {
            email: {required},
            name: {required, minLength: minLength(3)},
            password: {required},
            confirmPassword: {required, sameAsPassword: sameAs("password")}
        }
    },   
  methods: {
      validateState(name) {
        const { $dirty, $error } = this.$v.userAdmin[name];
        return $dirty && this.submitted ? !$error : null;
      },
      resetForm() {
        this.$nextTick(() => {
          this.$v.$reset();
          this.submitted = false;
        });
      },         
      loadUsers() {
          const url = `${baseApiUrl}/users?page=${this.page}`
          axios.get(url).then(res => {
              this.users = res.data.data
              this.count = res.data.count
              this.limit = res.data.limit
          })
      },
      formatDate(value) {
          return this.$options.filters.formatDate(value)
      },
      save() {
            this.submitted = true;
        
            this.$v.userAdmin.$touch();
            if (this.$v.userAdmin.$anyError) {
                return;
            }

            const method = this.userAdmin.id ? 'put' : 'post'
            const id = this.userAdmin.id ? `/${this.userAdmin.id}` : ''
            axios[method](`${baseApiUrl}/signup${id}`, this.userAdmin)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)    
                
            this.resetForm()
      },
      reset() {
          this.loadUsers()
          this.userAdmin = {
            email: '',
            name: '',
            password: '',
            confirmPassword: ''
          }
          this.resetForm()
      },
      remove(user) {
        axios.delete(`${baseApiUrl}/users/${user.userId}`)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                this.reset()
            })
            .catch(showError)
      },
      loadUser(user) {
        this.userAdmin = user
      }
  },
  watch: {
    page() {
        this.loadUsers()
    }
  },
  mounted() {
    this.loadUsers()
  }
}
</script>

<style>
.userForm .error {
  color: red;
  font-size: 12px;
}
</style>