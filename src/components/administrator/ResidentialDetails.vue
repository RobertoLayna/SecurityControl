<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-card flat>
        <v-card-title class="pa-0">
          <v-toolbar>
            <v-btn
              icon
              @click="$router.push({ name: 'AdministratorResidentials' })"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>

            <v-toolbar-title>{{ residential.residential_name }} / Residences</v-toolbar-title>

            <v-spacer />
          </v-toolbar>
        </v-card-title>
        <v-card-text class="pa-0">
          <v-row no-gutters>
            <v-data-iterator
              :items="residences"
              :items-per-page.sync="itemsPerPage"
              :search="search"
              :sort-by="sortBy.toLowerCase()"
              :sort-desc="sortDesc"
            >
              <template v-slot:header>
                <v-toolbar
                  dark
                  color="primary darken-3"
                  class="mb-1"
                >
                  <v-text-field
                    v-model="search"
                    clearable
                    flat
                    solo-inverted
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    label="Search"
                  />
                  <v-spacer />

                  <v-btn
                    icon
                    @click="dialog = !dialog"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <template v-if="$vuetify.breakpoint.mdAndUp">
                    <v-spacer />
                    <v-select
                      v-model="sortBy"
                      flat
                      solo-inverted
                      hide-details
                      :items="keys"
                      prepend-inner-icon="mdi-magnify"
                      label="Sort by"
                    />
                    <v-spacer />
                    <v-btn-toggle
                      v-model="sortDesc"
                      mandatory
                    >
                      <v-btn
                        large
                        depressed
                        color="primary"
                        :value="false"
                      >
                        <v-icon>mdi-arrow-up</v-icon>
                      </v-btn>
                      <v-btn
                        large
                        depressed
                        color="primary"
                        :value="true"
                      >
                        <v-icon>mdi-arrow-down</v-icon>
                      </v-btn>
                    </v-btn-toggle>
                  </template>
                </v-toolbar>
              </template>

              <template v-slot:default="props">
                <v-row no-gutters>
                  <v-col
                    v-for="item in props.items"
                    :key="item.name"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                  >
                    <v-card>
                      <v-card-title class="subheading font-weight-bold">
                        {{ item.residence_number }}
                        <v-spacer />
                        <v-btn
                          icon
                          color="primary"
                          @click="
                            $router.push({
                              name: 'AdministratorResidenceDetails',
                              params: { id: item.residence_residential_id, residential: residential, residence: item }
                            })
                          "
                        >
                          <v-icon>mdi-cog</v-icon>
                        </v-btn>
                      </v-card-title>
                      <v-card-subtitle>
                        {{ item.residence_address }}
                      </v-card-subtitle>

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
          </v-row>
        </v-card-text>
      </v-card>
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
              @click="createResidence()"
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
              v-model.number="newResidence.number"
              outlined
              label="Number"
            />
          </v-col>
          <v-col
            class="d-flex"
            cols="12"
          >
            <v-text-field
              v-model="newResidence.address"
              outlined
              label="Address"
            />
          </v-col>
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
  props: {
    residential: { type: Object, default: () => {} }
  },
  data() {
    return {
      dialog: false,
      itemsPerPage: 4,
       search: '',
        filter: {},
        sortDesc: false,
        sortBy: 'residence_number',
        keys: [
          'residence_number',
          'residence_address'
        ],
      residences: [],
      newResidence: {
        number: null,
        address: null
      }
    }
  },
  computed: {
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== 'Name')
      },
    },
  async mounted() {
      await this.getResidences()
  },
  methods: {
    async getResidences() {
      this.residences = await this.$axios
        .get('https://us-central1-securitycontrol-nopalnet.cloudfunctions.net/api/residences')
        .then((rs) => {
          return this.$_.filter(rs.data.Data, {residence_residential_id: this.residential.residential_id})
        })
        .catch((error) => {
            console.log(error)
          return []
        })
    },
    async createResidence() {
      await this.$axios
        .post('https://us-central1-securitycontrol-nopalnet.cloudfunctions.net/api/residences', {
    residence_residential_id: this.residential.residential_id,
    residence_number: this.newResidence.number,
    residence_address: this.newResidence.address,
})
        .then((rs) => {
          this.getResidences()
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
