<template>
  <div class="containerLogin">  
    <div class="restrictedAcessMsg">
      <b-alert class="mt-3" variant="danger" :show="dismissCountDown" @dismissed="dismissCountDown=0" fade dismissible>
        Acesso Restrito. É necessário entrar no sistema para continuar. 
      </b-alert>    
    </div>
    <b-form @submit.stop.prevent="submissionType">
      <div class="loginScreen">      
        <router-link to="/">
          <div class="loginImg">
            <img src="@/assets/vaca.jpg" alt="Logo">
          </div>
        </router-link>
        <hr />
        <div class="loginTitle">
          <span>{{!showSignup ? 'ACESSO RESTRITO' : 'CADASTRO'}}</span>
        </div>      
        
        <div class="inputLogin" v-if="showSignup">
          <b-input-group size="sm" class="mb-2">
            <b-input-group-prepend is-text>
              <font-awesome-icon icon="user" />
            </b-input-group-prepend>
            <b-form-input type="text" name="nome" :state="validateState('name')" v-model="$v.user.name.$model" placeholder="Nome"></b-form-input>
          </b-input-group>        
          <div class="error" v-if="submitted && !$v.user.name.required">Campo obrigatório.</div>
          <div class="error" v-if="submitted && !$v.user.name.minLength">Este campo deve conter no mínimo 3 caracteres.</div>
        </div>
        
        <div class="inputLogin">
          <b-input-group size="sm" class="mb-2">
            <b-input-group-prepend is-text>
              <font-awesome-icon icon="at" />
            </b-input-group-prepend>
            <b-form-input type="email" id="email" name="email" :state="validateState('email')" v-model.trim="$v.user.email.$model" placeholder="E-mail"></b-form-input>
          </b-input-group>              
          <div class="error" v-if="submitted && !$v.user.email.required">Campo obrigatório.</div>
        </div>

        <div class="inputLogin">
          <b-input-group size="sm" class="mb-2">
            <b-input-group-prepend is-text>
              <font-awesome-icon icon="lock" />
            </b-input-group-prepend>
            <b-form-input type="password" v-model="$v.user.password.$model" :state="validateState('password')" name="password" placeholder="Senha"></b-form-input>
          </b-input-group>        
          <div class="error" v-if="submitted && !$v.user.password.required">Campo obrigatório.</div>
        </div>

        <div class="inputLogin" v-if="showSignup">
          <b-input-group size="sm" class="mb-2">
            <b-input-group-prepend is-text>
              <font-awesome-icon icon="lock" />
            </b-input-group-prepend>
            <b-form-input type="password" v-model="$v.user.confirmPassword.$model" :state="validateState('confirmPassword')" name="confirmPassword" placeholder="Confirme a Senha"></b-form-input>
          </b-input-group>        
          <div class="error" v-if="submitted && !$v.user.confirmPassword.required">Campo obrigatório.</div>
          <div class="error" v-if="submitted && !$v.user.confirmPassword.sameAsPassword">A senha e confirmação de senha devem ser iguais.</div>          
        </div>      

        <b-button variant="outline-light" type="submit" v-if="showSignup">Registrar</b-button>
        <b-button variant="outline-light" type="submit" v-else>Entrar</b-button>

        <a href @click.prevent="alterar">
          <span v-if="showSignup">Já possui cadastro? Acesse o Login! </span>
          <span v-if="!showSignup">Não tem cadastro? Registre-se aqui!</span>
        </a>
      </div>
    </b-form>
  </div>
</template>

<script>
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import { baseApiUrl, showError, userKey } from '@/global'
import axios from 'axios'

export default {
    name: 'Login',
    data: function() {
      return  {
        submissionType: this.signin,
        showSignup: false,
        submitted: false,
        user: {
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        },
        dismissCountDown: 0
      }
    },
    validations: {
      user: {
        email: {required},
        name: {required, minLength: minLength(3)},
        password: {required},
        confirmPassword: {required, sameAsPassword: sameAs("password")}
      }
    },
    methods: {
      validateState(name) {
        const { $dirty, $error } = this.$v.user[name];
        return $dirty && this.submitted ? !$error : null;
      },
      alterar() {
        this.showSignup = !this.showSignup
        this.resetForm()
        
        if (!this.showSignup) {
          this.submissionType = this.signin
        } else {
          this.submissionType = this.signup
        }
      },
      resetForm() {
        this.$nextTick(() => {
          this.$v.$reset();
          this.submitted = false;
        });
      },
      signin() {
        this.submitted = true;
        
        this.$v.user.$touch();
        if (this.$v.user.email.$anyError && this.$v.user.password.$anyError) {
          return;
        }

        axios.post(`${baseApiUrl}/signin`, this.user)
          .then(res => {
            this.$store.commit('setUser', res.data)
            localStorage.setItem(userKey, JSON.stringify(res.data))
            this.$router.push({path: '/'})            
          })
          .catch(showError)
      },
      signup() {
        this.submitted = true;

        this.$v.user.$touch();
        if (this.$v.user.$anyError) {
          return;
        }

        axios.post(`${baseApiUrl}/signup`, this.user)
          .then(() => {
              this.user = {}
          })
          .catch(showError)

        this.resetForm()
      }
    },
    mounted() {
      if (this.$route.params.naoAutorizado === 'true') {
        this.dismissCountDown = 3;
      }
    }
}
</script>

<style>

.containerLogin {
  display: flex;
  flex-direction: column;
  
  align-items: center;
}

.loginScreen {
  background-color: #2b2b29;
  height: 600px;
  width: 600px;
  border-radius: 5px;

  
  box-shadow: 0px 0px 12px 0px #000000;

  display: flex;
  flex-direction: column;  
  align-content: center;
  justify-content: space-between;

  padding: 30px;
}

.loginImg {
  align-self: center;
}

.loginImg img {
  height: 150px;
  border-radius: 100px;
}

.loginTitle {
  align-self: center;
  font-size: 20px;
  color: white;
  font-family: 'RobotoSlab';
}

.inputLogin svg {
  margin-right: 10px;
  font-size: 20px;
  color: gray;
}

.loginScreen hr {
    border: 0;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(to right,
        rgba(120, 120, 120, 0),
        rgba(120, 120, 120, 0.75),
        rgba(120, 120, 120, 0));
}

.loginScreen a {
  color: white;
  align-self: center;
}

.restrictedAcessMsg {
  height: 70px;
}

.containerLogin .error {
  color: pink;
  font-size: 12px;
  margin-top: -7px;
}
</style>