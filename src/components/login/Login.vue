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
                    @click="step = 2"
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
              {{ phone }}
            </v-chip>
            <v-card-text>
              <v-text-field
                label="Password*"
                name="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[passwordRules.required, passwordRules.minLenght]"
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
                  <v-btn
                    color="primary"
                    small
                    text
                    @click="() => {}"
                  >
                    ¿No recuerda su contraseña?
                  </v-btn>
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
      }
    }
  },
  methods: {
    showMessage(message) {
      this.message = message
      this.snackbar = true
    },
    login(){
      //TODO
      this.$router.push({name: 'Administrator'})
    }
  }
}
</script>

<style>

</style>