<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col>
      <v-card
        class="mt-4 mx-auto text-center"
        tile
      >
        <v-card-text class="py-0">
          <v-row
            no-gutters
            justify="center"
          >
            <v-col
              cols="12"
              class="justify-center"
            >
              <v-img
                class="justify-center"
                src="../../assets/logo.png"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text class="pt-12">
              <v-alert
                type="error"
                :value="errorAlert"
                dismissible
              >
                {{ errorMessage }}
              </v-alert>
              <v-text-field
                v-model="phone"
                label="Phone number"
                name="phone"
                :rules="[phoneRules.required]"
                type="text"
                clearable
                dense
              />
            </v-card-text>
            <v-divider />
            <v-card-actions class="px-0">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-btn
                    color="primary"
                    block
                    tile
                    @click="preLogin()"
                  >
                    Continue
                  </v-btn>
                  <v-btn
                    color="primary"
                    small
                    text
                    @click="() => {}"
                  >
                    Create account
                  </v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-card-actions>
          </v-window-item>
          <v-window-item :value="2">
            <v-chip
              close
              @click:close="step = 1"
            >
              <v-avatar left>
                <v-icon>mdi-account-circle-outline</v-icon>
              </v-avatar>
              {{ userFullName }}
            </v-chip>
            <v-card-text>
              <v-text-field
                v-model="password"
                label="Password*"
                name="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[passwordRules.required]"
                :type="showPassword ? 'text' : 'password'"
                dense
                @click:append="showPassword = !showPassword"
              />
            </v-card-text>
            <v-divider />
            <v-card-actions class="px-0">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-btn
                    color="primary"
                    block
                    tile
                    @click="login()"
                  >
                    Ingresar
                  </v-btn>
                  <!--v-btn
                    color="primary"
                    small
                    text
                    @click="() => {}"
                  >
                    ¿No recuerda su contraseña?
                  </v-btn-->
                </v-list-item-content>
              </v-list-item>
            </v-card-actions>
            <v-snackbar
              v-model="snackbar"
              color="error"
            >
              {{ message }}
              <v-btn
                dark
                text
                @click="snackbar = false"
              >
                Close
              </v-btn>
            </v-snackbar>
          </v-window-item>
        </v-window>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      phone: '',
      phoneChip: true,
      userFullName: '',
      password: '',
      snackbar: false,
      message: '',
      showPassword: false,
      phoneRules: {
        required: (value) => !!value || 'Required'
        //minLength: (value) => (value && value.length >= 8) || 'Debe contener al menos 8 caracteres'
      },
      passwordRules: {
        required: (value) => !!value || 'Required'
        //minLenght: (value) => value.length >= 8 || 'Debe contener al menos 8 caracteres'
      },
      errorAlert: false,
      errorMessage: ''
    }
  },
  methods: {
    showMessage(message) {
      this.message = message
      this.snackbar = true
    },
    async preLogin() {
      try {
        await this.$axios
          .post('https://us-central1-securitycontrol-nopalnet.cloudfunctions.net/preLogin', {
            phone: this.phone
          })
          .then((rs) => {
            if (rs.data.status != "success") throw 'No existe usaurio con ese numero de telefono'
            this.userFullName = rs.data.data.user_complete_name
            this.step = 2
          })
      } catch (err) {
        console.log('PreLogin', err)
        this.errorAlert = true
        this.errorMessage = err
      }
    },
    async login() {
      try {
        await this.$axios
          .post('https://us-central1-securitycontrol-nopalnet.cloudfunctions.net/login', {
            phone: this.phone,
            password: this.password
          })
          .then((rs) => {
            if (rs.data.status != "success") throw 'Password incorrecto.'
            this.$store.dispatch('setUser', rs.data.data).then(()=>{
              this.$router.push('/')
            })
          })
      } catch (err) {
        console.log('PreLogin', err)
        this.errorAlert = true
        this.errorMessage = err
      }
    }
  }
}
</script>

<style></style>
