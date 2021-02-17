<template>
  <header class="header">      
    <router-link to="/">
        <div class="logotipo">        
            <div class="img">
                <img src="@/assets/vaca.jpg" alt="Logo">
            </div>          
            <div class="text">
                <span class="logo">Universo</span>
                <span class="logo">Lo-fi</span>
            </div>              
        </div>
    </router-link>
    
    <nav class="menus">
        <router-link to="/noticias">Notícias</router-link>
    </nav>  

    <UserDropdown />
  </header>
</template>

<script>
import UserDropdown from './UserDropdown.vue'

export default {
    name: 'Header',
    components: { UserDropdown }
}
</script>

<style>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: #2b2b29;
    height: 80px;
    box-shadow: -5px 0px 15px 3px rgba(0,0,0,0.49);
}

.logotipo {
    display: flex; 
}

.header > a {
    text-decoration: none;
}

.header > a:hover {
    text-decoration: none;
}

.img img{
    height: 80px;
}

.text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.logo {
    color: white;
    font-family: "Audiowide";
    font-size: 1.5rem;
}

.menus {
    flex-grow: 1; 
    margin-left: 50px;    
}

.menus a {
    text-decoration: none;
    color: white;
    padding: 20px;    
    font-size: 20px;
    font-family: 'RobotoSlab';
}

.menus a:hover {
    color: antiquewhite;
}
</style>