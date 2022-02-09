<template>
  <v-container
    fluid
    ma-0
    pa-0
    class="align-start justify-center"
  >
    <v-card flat>
      <v-card-title class="pa-0">
        <v-row no-gutters>
          <v-toolbar
            dark
            color="primary"
          >
            <v-btn
              icon
              @click="$router.push({ name: 'AdministratorResidentials' })"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>

            <v-toolbar-title>{{ residential.residential_name }} / Casas</v-toolbar-title>

            <v-spacer />
            <v-btn
              icon
              @click="dialog = !dialog"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn
              v-if="user.user_rol == 'su_admin'"
              icon
              color="error"
              @click="
                ;(dialogDelete = true),
                  (residentialToDelete.name = residential.residential_name),
                  (residentialToDelete.id = residential.residential_id)
              "
            >
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
          </v-toolbar>
        </v-row>
      </v-card-title>
      <v-card-text class="pa-0">
        <v-row no-gutters>
          <v-col cols="12">
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
                <v-row
                  v-for="item in props.items"
                  :key="item.name"
                  no-gutters
                >
                  <v-col cols="12">
                    <v-container>
                      <v-card>
                        <v-card-title class="subheading font-weight-bold">
                          <v-row no-gutters>
                            <v-chip
                              :color="item.residence_active ? 'success' : 'error'"
                              dark
                            >
                              {{ item.residence_active ? 'Activa' : 'Morosa' }}
                            </v-chip>
                            {{ item.residence_number }}
                          </v-row>
                          <v-spacer />
                          <v-btn
                            icon
                            color="primary darken-5"
                            class="mx-3"
                            @click="
                              ;(HouseToUpdate = {
                                id: item.residence_id,
                                name: item.residence_number,
                                address: item.residence_address
                              }),
                                (dialogUpdateRecidence = true)
                            "
                          >
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                          <v-btn
                            icon
                            color="primary"
                            @click="
                              $router.push({
                                name: 'AdministratorResidenceDetails',
                                params: {
                                  id: item.residence_residential_id,
                                  residential: residential,
                                  residence: item
                                }
                              })
                            "
                          >
                            <v-icon>mdi-cog</v-icon>
                          </v-btn>
                        </v-card-title><v-card-subtitle>
                          {{ item.residence_address }}
                        </v-card-subtitle>

                        <v-divider />
                        <v-card-actions>
                          <v-btn
                            v-if="item.residence_active"
                            outlined
                            color="error"
                            @click="setActive(item.residence_id, !item.residence_active)"
                          >
                            Desactivar
                          </v-btn>
                          <v-btn
                            v-else
                            outlined
                            color="success"
                            @click="setActive(item.residence_id, !item.residence_active)"
                          >
                            Activar
                          </v-btn>
                          <v-spacer />
                          <v-btn
                            outlined
                            color="error"
                            @click="
                              ;(dialogDeleteHouse = true),
                                (HouseToDelete.name = item.residence_number),
                                (HouseToDelete.id = item.residence_id)
                            "
                          >
                            Borrar casa
                          </v-btn>
                        </v-card-actions>
                        <!--v-list dense>
                    <v-list-item>
                      <v-list-item-content>Residents:</v-list-item-content>
                      <v-list-item-content class="align-end">
                        {{ item.calories }}
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-->
                      </v-card>
                    </v-container>
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
        </v-row>
      </v-card-text>
    </v-card>
    <v-row no-gutters>
      <v-col cols="12">
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
              <v-toolbar-title>Crear nueva casa</v-toolbar-title>
              <v-spacer />
              <v-toolbar-items>
                <v-btn
                  dark
                  text
                  @click="createResidence()"
                >
                  Guardar
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-container>
              <v-col
                class="d-flex"
                cols="12"
              >
                <v-text-field
                  v-model="newResidence.number"
                  outlined
                  label="Identificador"
                />
              </v-col>
              <v-col
                class="d-flex"
                cols="12"
              >
                <v-text-field
                  v-model="newResidence.address"
                  outlined
                  label="Direccion"
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
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <v-dialog
          v-model="dialogUpdateRecidence"
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
                @click="dialogUpdateRecidence = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Editar casa</v-toolbar-title>
              <v-spacer />
              <v-toolbar-items>
                <v-btn
                  dark
                  text
                  @click="updateHouse()"
                >
                  Guardar
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-container>
              <v-col
                class="d-flex"
                cols="12"
              >
                <v-text-field
                  v-model="HouseToUpdate.name"
                  outlined
                  label="Identificador"
                />
              </v-col>
              <v-col
                class="d-flex"
                cols="12"
              >
                <v-text-field
                  v-model="HouseToUpdate.address"
                  outlined
                  label="Direccion"
                />
              </v-col>
            </v-container>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row
      no-gutters
      justify="center"
    >
      <v-col cols="12">
        <v-dialog
          v-model="dialogDelete"
          persistent
          max-width="290"
        >
          <v-card>
            <v-card-title class="text-h5">
              {{ residentialToDelete.name }}
            </v-card-title>
            <v-card-text>Borrar definitivamente esta residencial?</v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="error"
                text
                @click="dialogDelete = false"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="success"
                text
                @click="deleteItem()"
              >
                Si
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row
      no-gutters
      justify="center"
    >
      <v-col cols="12">
        <v-dialog
          v-model="dialogDeleteHouse"
          persistent
          max-width="290"
        >
          <v-card>
            <v-card-title class="text-h5">
              {{ HouseToDelete.name }}
            </v-card-title>
            <v-card-text>Borrar definitivamente esta casa?</v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="error"
                text
                @click="dialogDeleteHouse = false"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="success"
                text
                @click="deleteHouseItem()"
              >
                Si
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
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
      keys: ['residence_number', 'residence_address'],
      residences: [],
      newResidence: {
        number: null,
        address: null
      },
      dialogDelete: false,
      dialogDeleteHouse: false,
      HouseToDelete: {
        id: null,
        name: null
      },
      HouseToUpdate: {
        id: null,
        name: null,
        address: null
      },
      residentialToDelete: {
        id: null,
        name: null
      },
      dialogUpdateRecidence: false
    }
  },
  computed: {
    ...mapGetters({ user: 'user' }),
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== 'Name')
    }
  },
  async mounted() {
    await this.getResidences()
  },
  methods: {
    async getResidences() {
      this.residences = await this.$axios
        .get('https://53ea886.online-server.cloud/residences')
        .then((rs) => {
          return this.$_.filter(rs.data.Data, {
            residence_residential_id: this.residential.residential_id
          })
        })
        .catch((error) => {
          console.log(error)
          return []
        })
    },
    async createResidence() {
      await this.$axios
        .post('https://53ea886.online-server.cloud/residences', {
          residence_residential_id: this.residential.residential_id,
          residence_number: this.newResidence.number,
          residence_address: this.newResidence.address,
          residence_active: true
        })
        .then((rs) => {
          this.getResidences()
          this.dialog = false
          this.newResidence = {
            id: null,
            name: null
          }
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
    },
    async deleteItem() {
      await this.$axios
        .delete('https://53ea886.online-server.cloud/residentials/' + this.residentialToDelete.id)
        .then(async (rs) => {
          this.dialogDelete = false
          this.$router.push({ name: 'AdministratorResidentials' })
        })
        .catch((error) => {
          console.log(error)
          this.$toast.error(error, {
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
    },
    async deleteHouseItem() {
      await this.$axios
        .delete('https://53ea886.online-server.cloud/residences/' + this.HouseToDelete.id)
        .then(async (rs) => {
          this.getResidences()
          this.dialogDeleteHouse = false
        })
        .catch((error) => {
          console.log(error)
          this.$toast.error(error, {
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
    },
    async setActive(id, status) {
      await this.$axios
        .put('https://53ea886.online-server.cloud/residences/' + id, { residence_active: status })
        .then(async (rs) => {
          this.getResidences()
        })
        .catch((error) => {
          this.$toast.error(error, {
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
    },
    async updateHouse() {
      await this.$axios
        .put('https://53ea886.online-server.cloud/residences/' + this.HouseToUpdate.id, { residence_number: this.HouseToUpdate.name, residence_address: this.HouseToUpdate.address })
        .then(async (rs) => {
          console.log(rs)
          this.HouseToUpdate.id = null
          this.HouseToUpdate.name = null
          this.HouseToUpdate.address = null
          this.dialogUpdateRecidence = false
          this.getResidences()
        })
        .catch((error) => {
          this.$toast.error(error, {
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
