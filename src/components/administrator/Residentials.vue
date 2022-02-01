<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-data-iterator
        :items="residentials"
        :items-per-page.sync="itemsPerPage"
      >
        <template v-slot:header>
          <v-toolbar
            class="mb-2"
            color="primary darken-5"
            dark
            flat
          >
            <v-toolbar-title>Residentials</v-toolbar-title>
            <v-spacer />

            <v-btn
              icon
              @click="dialog = !dialog"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
        </template>

        <template v-slot:default="props">
          <v-row no-gutters>
            <v-col
              v-for="item in props.items"
              :key="item.name"
              cols="12"
            >
              <v-card>
                <v-card-title class="subheading font-weight-bold">
                  {{ item.residential_name }}
                  <v-spacer />
                  <v-btn
                    dark
                    color="green"
                    @click="
                      $router.push({
                        name: 'AdministratorResidentialDetails',
                        params: { id: item.residential_id, residential: item }
                      })
                    "
                  >
                    View
                  </v-btn>
                </v-card-title>

                <v-divider />

                <!--v-list dense>
                    <v-list-item>
                      <v-list-item-content>Residents:</v-list-item-content>
                      <v-list-item-content class="align-end">
                        {{ item.calories }}
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-->
              </v-card>
            </v-col>
          </v-row>
        </template>

        <!--template v-slot:footer>
            <v-toolbar
              class="mt-2"
              color="primary darken-5"
              dark
              flat
            >
              <v-toolbar-title class="subheading">
                This is a footer
              </v-toolbar-title>
            </v-toolbar>
          </template-->
      </v-data-iterator>
    </v-col>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Create new</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="createResidential()"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <v-col
            class="d-flex"
            cols="12"
          >
            <v-text-field
              v-model="newResidential.name"
              outlined
              label="Nombre"
            />
          </v-col>
          <!--v-col
            class="d-flex"
            cols="12"
          >
            <v-text-field
              outlined
              label="Location"
            />
          </v-col-->
          <!--v-col
            class="d-flex"
            cols="12"
          >
            <v-select
              v-model="itemSelectAdmin"
              :items="itemsSelectAdmin"
              label="Administrator"
              outlined
            />
          </v-col-->
          <!--v-container
            v-if="itemSelectAdmin == 'Existing'"
            no-gutters
          >
            <v-col
              class="d-flex"
              cols="12"
            >
              <v-autocomplete
                v-model="selectedAdmin"
                :items="itemsAdmins"
                outlined
                dense
                chips
                label="Find user"
              />
            </v-col>
          </v-container-->
          <!--v-constainer
            v-if="itemSelectAdmin == 'New'"
            no-gutters
          >
            <v-col
              class="d-flex"
              cols="12"
            >
              <v-text-field
                outlined
                label="Name"
              />
            </v-col>
            <v-col
              class="d-flex"
              cols="12"
            >
              <v-text-field
                outlined
                label="Phone"
              />
            </v-col>
            <v-col
              class="d-flex"
              cols="12"
            >
              <v-text-field
                outlined
                label="Email"
              />
            </v-col>
            <v-col
              class="d-flex"
              cols="12"
            >
              <v-text-field
                outlined
                label="Password"
              />
            </v-col>
          </v-constainer-->
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      itemsPerPage: 10,
      residentials: [],
      newResidential: {
        name: null,
        location: null
      },
      itemsSelectAdmin: ['New', 'Existing'],
      itemSelectAdmin: null
    }
  },
  async mounted() {
    await this.getResidentials()
  },
  methods: {
    async getResidentials() {
      this.residentials = await this.$axios
        .get('https://53ea886.online-server.cloud/residentials')
        .then((rs) => {
          return rs.data.Data
        })
        .catch((error) => {
          return []
        })
    },
    async createResidential() {
      await this.$axios
        .post('https://53ea886.online-server.cloud/residentials', {
          residential_group_id: 0,
          residential_name: this.newResidential.name
        })
        .then((rs) => {
          this.getResidentials()
          this.dialog = false
        })
        .catch((error) => {
          console.log(error)
          this.$toast.error('Ocurrio un error, intente de nuevo', {
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
          this.dialog = false
        })
    }
  }
}
</script>

<style></style>
