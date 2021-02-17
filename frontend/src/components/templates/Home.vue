<template>
    <div>
        <Header />      
        <Content />
    </div>
</template>

<script>
import Header from "@/components/templates/Header"
import Content from "@/components/home/Content"

export default {
    name: "Home",
    components: { Header, Content}
}
</script>

<style>

</style>