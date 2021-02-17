<template>
  <div class="headerUserOptions">
    <aside class="login" v-if="!user">        
        <router-link to="/login">Entrar <font-awesome-icon icon="sign-in-alt" /></router-link>
    </aside>

    <aside class="userProfile" v-if="user">        
        <span>{{ user.name }}</span>
        <div class="user-dropdown-img">
            <Gravatar :email="user.email" alt="User" />
        </div>
        <font-awesome-icon icon="angle-down"></font-awesome-icon>
    </aside>

    <div class="menuDropdown" v-if="user">
        <router-link to="/admin" >
            <font-awesome-icon icon="cogs"></font-awesome-icon><span>Administração</span>
        </router-link>
        <a href @click.prevent="logout">
            <font-awesome-icon icon="sign-out-alt"></font-awesome-icon><span>Sair</span>
        </a>
    </div>
  </div>
</template>

<script>
import {userKey} from '@/global'
import Gravatar from 'vue-gravatar'
import { mapState } from 'vuex'

export default {
    name: 'UserDropdown',
    props: {hideUserDropdown: Boolean},
    components: { Gravatar },
    computed: mapState(['user']),
    methods: {
        logout() {
            localStorage.removeItem(userKey)
            this.$store.commit('setUser', null)
            this.$router.push({ name: 'home' })
        }
    }
}
</script>

<style>
.headerUserOptions {
    position: relative;
    height: 100%;
}

.userProfile:hover {
    background-color: rgba(0, 0, 0, 0.2);
    color: antiquewhite;
}

.menuDropdown {
    position: absolute;
    right: 0px;
    background-color: #f9f9f9;
    min-width: 180px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

    padding: 10px;
    z-index: 1;
    border-radius: 2px;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s linear;
    
}

.headerUserOptions:hover .menuDropdown {
    visibility: visible;
    opacity: 1;
}

.menuDropdown a {
    text-decoration: none;
    padding: 10px;
    color: black;
}

.menuDropdown a svg {
    margin-right: 10px;
}

.menuDropdown a:hover {
    background-color: #EDEDED;
}

.userProfile {
    height: 100%;

    display: flex;
    align-items: center;

    color: white;
    font-size: 18px;
    padding: 0 20px;
}

.userProfile img {
    max-height: 40px;
    border-radius: 5px;
    margin: 0px 10px;
}

.login {
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-right: 20px;
}

.login a{    
    text-decoration: none;
    color: white;
    font-size: 20px;
    font-family: 'RobotoSlab';
}

.login a:hover {
    color: antiquewhite;
}

</style>