<template>
  <v-app>
  <div id="app" class="app">
      <router-view></router-view>      
  </div>
  </v-app>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, userKey } from '@/global'

export default {
    name: "App",
    data: function () {
        return {
            validatingToken: true
        }
    },
    methods: {
        async validateToken() {
            this.validateToken = true
            this.$store.commit('setUser', null)
            const isHomePage = this.$route.name === 'home';

            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)

            if (!userData) {
                this.validatingToken = false

                if (!isHomePage)
                    this.$router.push({name: 'home'})
            }

            const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

            if (res.data) {
                this.$store.commit('setUser', userData)
            } else {
                localStorage.removeItem(userKey)
                if (!isHomePage)
                    this.$router.push({name: 'home'})
            }

            this.validatingToken = false
        }
    },
    created() {
        this.validateToken()
    }
}
</script>

<style>
@font-face {
    font-family: "RobotoSlab";
    src: url("./fonts/RobotoSlab-Regular.ttf");
}
@font-face {
    font-family: "Audiowide";
    src: url("./fonts/Audiowide-Regular.ttf");
}
body {
    margin: 0;
    background-color: rgba(156, 152, 152, 0.425);   
}
.app {    
    height: 678px;     
}
* {
    box-sizing: border-box;
}
</style>