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
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      residence: {},
      residential: {}
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
          'https://us-central1-securitycontrol-nopalnet.cloudfunctions.net/api/residences/' +
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
          'https://us-central1-securitycontrol-nopalnet.cloudfunctions.net/api/residentials/' +
            this.residence.residence_residential_id
        )
        .then((rs) => {
          return rs.data.Data
        })
        .catch((error) => {
          return []
        })
    }
  }
}
</script>

<style></style>
