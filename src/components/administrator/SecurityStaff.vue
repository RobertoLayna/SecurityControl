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
              label="Full name"
            />
          </v-col>
          <v-col
            class="d-flex"
            cols="12"
          >
            <v-text-field
              v-model="newUser.username"
              outlined
              label="Username"
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
            />
          </v-col>
          <v-col
            class="d-flex"
            cols="12"
          >
            <v-text-field
              v-model="newUser.phone"
              outlined
              label="Phone"
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
    residential: { type: Object, default: () => {} },
    residence: { type: Object, default: () => {} }
  },
  data() {
    return {
      dialog: false,
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
          user_name: this.newUser.username,
          user_password: this.newUser.password,
          user_phone: this.newUser.phone,
          user_rol: 'security',
          user_active: true
        })
        .then((rs) => {
          this.getUsers()
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
