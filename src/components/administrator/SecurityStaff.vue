<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-card flat>
        <v-card-title class="pa-0">
          <v-toolbar
            color="primary"
            dark
          >
            <v-toolbar-title>Security staff</v-toolbar-title>
            ​
            <v-spacer /><v-btn
              icon
              primary
              @click="dialog = !dialog"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card-title>
        <v-card-text class="pa-0">
          <v-row no-gutters>
            <v-card>
              <v-card-title>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                />
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="users"
                :search="search"
              >
                <template #[`item.user_active`]="{ item }">
                  <v-chip
                    :color="item.user_active ? 'success' : 'error'"
                    dark
                  >
                    {{ item.user_active ? 'Active' : 'Inactive' }}
                  </v-chip>
                </template>
                <template #[`item.actions`]="{ item }">
                  <v-btn
                    color="red"
                    outlined
                    small
                    @click="toDelete.dialog = true, toDelete.name = item.user_name, toDelete.id = item.user_id"
                  >
                    <v-icon>mdi-trash-can</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card>
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
              @click="createUser()"
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
              v-model.number="newUser.name"
              outlined
              label="Caseta/Nombre"
            />
          </v-col>
          <!--v-col
            class="d-flex"
            cols="12"
          >
            <v-text-field
              v-model="newUser.username"
              outlined
              label="Username"
            />
          </v-col-->
          <v-col
            class="d-flex"
            cols="12"
          >
            <v-text-field
              v-model="newUser.phone"
              outlined
              maxlength="10"
              label="Telefono"
              @keydown.space.prevent
              @keypress="onlyNumbers($event)"
            />
          </v-col>
          <v-col
            class="d-flex"
            cols="12"
          >
            <v-text-field
              v-model="newUser.password"
              outlined
              label="Password"
              @keydown.space.prevent
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
    <v-row
      no-gutters
      justify="center"
    >
      <v-dialog
        v-model="toDelete.dialog"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            {{ toDelete.item.name }}
          </v-card-title>
          <v-card-text>Borrar definitivamente este usuario?</v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="error"
              text
              @click="toDelete.item = {}, toDelete.dialog = false"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="success"
              text
              @click="deleteUser()"
            >
              Si
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-row>
</template>
​
<script>
export default {
  props: {
    residential: { type: Object, default: () => {} },
    residence: { type: Object, default: () => {} }
  },
  data() {
    return {
      dialog: false,
      toDelete: {
        dialog: false,
        item: {}
      },
      itemsPerPage: 4,
       search: '',
        headers: [
          {
            text: 'Name',
            align: 'start',
            value: 'user_complete_name',
          },
          { text: 'Phone', value: 'user_phone' },
          { text: 'Status', value: 'user_active' },
          { text: '', value: 'actions' },
        ],
      users: [],
      newUser: {
        name: '',
        username: '',
        password: '',
        phone: ''
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
      await this.getUsers()
  },
  methods: {
    async getUsers() {
      this.users = await this.$axios
        .get('https://53ea886.online-server.cloud/users')
        .then((rs) => {
            console.log(this.$_.filter(rs.data.Data, {user_rol: 'security'}))
          return this.$_.filter(rs.data.Data, {user_rol: 'security'})
        })
        .catch((error) => {
            console.log(error)
          return []
        })
    },
    async createUser() {
      await this.$axios
        .post('https://53ea886.online-server.cloud/users', {
          user_residence_id: 0,
          user_complete_name: this.newUser.name,
          user_name: '-',
          user_password: this.newUser.password,
          user_phone: this.newUser.phone,
          user_rol: 'security',
          user_active: true
        })
        .then((rs) => {
          this.getUsers()
          this.$toast.success('Usuario guardado correctamente', {
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
    async deleteUser() {
      await this.$axios
        .delete('https://53ea886.online-server.cloud/users/' + this.toDelete.id)
        .then((rs) => {
          this.$toast.success('Usuario borrado correctamente', {
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
          this.getUsers()
          this.toDelete.item = {}
          this.toDelete.dialog = false
        })
        .catch((error) => {
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
          this.toDelete.item = {}
          this.toDelete.dialog = false
        })
    },
    onlyNumbers(event){
      let keyCode = event.keyCode ? event.keyCode : event.which
      if ((keyCode >= 48 && keyCode <= 57) || event.key == '.') {
        return
      } else {
        event.preventDefault()
      }
    }
  }
}
</script>
​
<style></style>