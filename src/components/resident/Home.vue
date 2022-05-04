<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-card
        class="mx-auto"
        max-width="344"
      >
        <v-card-text>
          <div>{{ user.user_complete_name }}</div>
          <p class="text-h4 text--primary">
            {{ residence.residence_address }}
          </p>
          <div class="text--primary">
            {{ residential.residential_name }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            primary
            outlined
            block
            @click="dialog = true"
          >
            Cambiar contraseña
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      max-width="600"
    >
      <v-card>
        <v-toolbar
          color="primary"
          dark
        >
          Cambiar contraseña
        </v-toolbar>
        <v-card-text>
          <v-row class="pt-3">
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="olderPass"
                label="Contraseña actual"
                outlined
                clearable
                hide-details
              />
            </v-col>
          </v-row><v-row class="pt-3">
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="newPass"
                label="Nueva contraseña"
                outlined
                clearable
                hide-details
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            color="error"
            outlined
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="success"
            @click="updatePassword()"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      dialog: false,
      residence: {},
      residential: {},
      olderPass: null,
      newPass: null,
    }
  },
  
  computed: {
    ...mapGetters({ user: 'user' })
  },
  watch: {
    async user() {
      await this.getResidence()
    },
    async residence(){
        await this.getResidential()
    }
  },
  async mounted() {
      await this.getResidence()
  },
  methods: {
    async getResidence() {
      this.residence = await this.$axios
        .get(
          'https://53ea886.online-server.cloud/residences/' +
            this.user.user_residence_id
        )
        .then((rs) => {
          return rs.data.Data
        })
        .catch((error) => {
          return []
        })
    },
    async getResidential() {
      this.residential = await this.$axios
        .get(
          'https://53ea886.online-server.cloud/residentials/' +
            this.residence.residence_residential_id
        )
        .then((rs) => {
          return rs.data.Data
        })
        .catch((error) => {
          return []
        })
    },
    async updatePassword() {
      this.userUpdate = await this.$axios
        .post(
          'https://53ea886.online-server.cloud/app/updatePassword', {
            id: this.user.user_id,
            olderPass: this.olderPass,
            newPass: this.newPass
          }
        )
        .then((rs) => {
          this.dialog = false
          
      this.$store.dispatch('logout').then(()=>{
        this.$router.push({name: "Login"})
      })
    
        })
        .catch((error) => {
          console.log('PreLogin', err)
        this.$toast.error(err, {
            position: 'bottom-center',
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: 'button',
            icon: true,
            rtl: false
          })
        })
    }
  }
}
</script>

<style></style>
