<template>
  <div>
      <Header />
      <div class="admin-pages-tabs">
          <b-card no-body>
              <b-tabs card>
                  <b-tab title="Artigos" active>
                    <ArticleAdmin />
                  </b-tab>
                  <b-tab title="Usuários" active>
                    <UserAdmin />
                  </b-tab>                  
              </b-tabs>
          </b-card>
      </div>
  </div>
</template>

<script>
import Header from '@/components/templates/Header.vue'
import ArticleAdmin from '@/components/admin/ArticleAdmin.vue'
import UserAdmin from '@/components/admin/UserAdmin.vue'

export default {
  name: 'Admin',
  components: { Header, ArticleAdmin, UserAdmin}
}
</script>

<style>

</style>