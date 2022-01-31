<template>
  <div class="accent lighten-5 pt-0">
    <v-app-bar
      app
      clipped
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true" />

      <v-toolbar-title>{{ resident ? resident.user_complete_name : 'Resident' }}</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped-left
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="black--text text--accent-4"
        >
          <v-list-item @click="$router.push({name: 'ResidentHome'})">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.push({name: 'ResidentAccessCodes'})">
            <v-list-item-icon>
              <v-icon>mdi-qrcode</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Access codes</v-list-item-title>
          </v-list-item>
          
          <v-list-item @click="logout()">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-row no-gutters>
      <router-view />
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Resident',
  data() {
    return {
      drawer: false,
      group: null
    }
  },
  computed: {
    ...mapGetters({ resident: 'user' })
  },
  methods: {
    logout(){
      this.$store.dispatch('logout').then(()=>{
        this.$router.push({name: "Login"})
      })
    }
  }
}
</script>

<style></style>
