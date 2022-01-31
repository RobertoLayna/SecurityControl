<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-data-iterator
        :items="visits"
        :items-per-page.sync="itemsPerPage"
      >
        <template v-slot:header>
          <v-toolbar
            class="mb-2"
            color="primary darken-5"
            dark
            flat
          >
            <v-toolbar-title>Access codes</v-toolbar-title>
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
              v-for="(item, idx) in props.items"
              :key="item.name"
              cols="12"
            >
              <v-card
                class="mx-auto"
                max-width="344"
                outlined
              >
                <v-card-title>
                  {{ item.visit_identifier }}
                  <v-spacer />
                  <v-btn
                    icon
                    color="error"
                    @click="dialogDelete = true, codeToDelete.name = item.visit_identifier, codeToDelete.id = item.visit_id"
                  >
                    <v-icon>mdi-trash-can</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="text-overline mb-4">
                        {{ getDateString(item) }}
                      </div>
                      <v-list-item-title class="text-h5 mb-1">
                        {{ item.visit_visitor_name }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-card-text>

                <v-card-actions>
                  <!--v-btn
                    outlined
                    color="error"
                  >
                    Remove
                  </v-btn-->
                  <v-btn
                    outlined
                    color="success"
                    @click=";(dialogQr = true), (value = item.visit_identifier)"
                  >
                    View QR code
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </template>
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
              @click="createCode()"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <v-row no-gutters>
            <v-col
              class="d-flex"
              cols="12"
            >
              <v-text-field
                v-model="newVisitor.name"
                outlined
                label="Visitor Name"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              class="d-flex"
              cols="12"
            >
              <v-dialog
                ref="dialog"
                v-model="modalDate"
                :return-value.sync="newVisitor.startDate"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="newVisitor.startDate"
                    outlined
                    label="Start date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="newVisitor.startDate"
                  scrollable
                >
                  <v-spacer />
                  <v-btn
                    text
                    color="primary"
                    @click="modalDate = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog.save(newVisitor.startDate)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col class="d-flex">
              <v-checkbox
                v-model="checkboxSetEndDate"
                label="Set end date"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col class="d-flex">
              <v-dialog
                ref="dialogEndDate"
                v-model="modalEndDate"
                :return-value.sync="newVisitor.endDate"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="newVisitor.endDate"
                    :disabled="!checkboxSetEndDate"
                    outlined
                    label="End date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="newVisitor.endDate"
                  scrollable
                >
                  <v-spacer />
                  <v-btn
                    text
                    color="primary"
                    @click="modalEndDate = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialogEndDate.save(newVisitor.endDate)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
          </v-row><v-row no-gutters>
            <v-col class="d-flex">
              <v-checkbox
                v-model="checkboxSetStartTime"
                label="Set start time"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col class="d-flex">
              <v-dialog
                ref="dialogStartTime"
                v-model="modalStartTime"
                :return-value.sync="newVisitor.startTime"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="newVisitor.startTime"
                    :disabled="!checkboxSetStartTime"
                    outlined
                    label="Start time"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-time-picker
                  v-if="modalStartTime"
                  v-model="newVisitor.startTime"
                  full-width
                >
                  <v-spacer />
                  <v-btn
                    text
                    color="primary"
                    @click="modalStartTime = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialogStartTime.save(newVisitor.startTime)"
                  >
                    OK
                  </v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col class="d-flex">
              <v-checkbox
                v-model="checkboxSetEndTime"
                label="Set end time"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col class="d-flex">
              <v-dialog
                ref="dialogEndTime"
                v-model="modalEndTime"
                :return-value.sync="newVisitor.endTime"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="newVisitor.endTime"
                    :disabled="!checkboxSetEndTime"
                    outlined
                    label="End time"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-time-picker
                  v-if="modalEndTime"
                  v-model="newVisitor.endTime"
                  full-width
                >
                  <v-spacer />
                  <v-btn
                    text
                    color="primary"
                    @click="modalEndTime = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialogEndTime.save(newVisitor.endTime)"
                  >
                    OK
                  </v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col class="d-flex">
              <p>
                {{ textoPre }}
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogQr"
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
            @click=";(dialogQr = false), (value = null)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>QR CODE</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="shareImage(value)"
            >
              Share
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container ref="printMe">
          <v-row
            no-gutters
            class="text-center"
            justify="center"
            align="center"
          >
            <div class="d-flex align-center">
              <v-img
                class="ma-1"
                width="50"
                height="50"
                src="../../assets/logo.png"
              />
            </div>
            <p class="ma-0 pa-0 text-subtitle-2 font-weight-bold text-center">
              Seguridad Privada y Video Vigilancia
            </p>
          </v-row>
          <v-row
            no-gutters
            justify="center"
            align="center"
          >
            <qrcode-vue
              size="200"
              :value="value"
              level="H"
            />
          </v-row>
          <v-row
            no-gutters
            justify="center"
            align="center"
          >
            <p class="text-h6 font-weight-bold">
              {{ value }}
            </p>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <v-row justify="center">
      <v-dialog
        v-model="dialogDelete"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            {{ codeToDelete.name }}
          </v-card-title>
          <v-card-text>Borrar definitivamente este codigo?</v-card-text>
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
    </v-row>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import QrcodeVue from 'qrcode.vue'
export default {
  components: {
    QrcodeVue
  },
  data() {
    return {
      dialog: false,
      dialogQr: false,
      modalDate: false,
      modalStartTime: false,
      modalEndDate: false,
      modalEndTime: false,
      checkboxSetStartTime: false,
      checkboxSetEndTime: false,
      checkboxSetEndDate: false,
      dialogDelete: false,
      codeToDelete: {
        name: null,
        id: null
      },
      //
      itemsPerPage: 4,
      visits: [],
      newVisitor: {
        name: null,
        startDate: this.$moment().format('YYYY-MM-DD'),
        endDate: null,
        startTime: null,
        endTime: null
      },
      itemsSelectAdmin: ['New', 'Existing'],
      itemSelectAdmin: null,
      //QRCODE
      value: null,
      output: null
    }
  },
  computed: {
    ...mapGetters({ user: 'user' }),
    textoPre() {
      if (
        this.newVisitor.startDate &&
        this.newVisitor.endDate &&
        this.newVisitor.startTime &&
        this.newVisitor.endTime
      )
        return (
          (this.newVisitor.name ? this.newVisitor.name : 'Visitante')  +
          ' podra insgresar a partir del dia ' +
          this.$moment(this.newVisitor.startDate, 'YYYY-MM-DD').format('DD MMM YY') +
          ' hasta el dia ' +
          this.$moment(this.newVisitor.endDate, 'YYYY-MM-DD').format('DD MMM YY') +
          ', en un horario de ' +
          this.$moment(this.newVisitor.startTime, 'HH:mm').format('hh:mm a') +
          ' a ' +
          this.$moment(this.newVisitor.endTime, 'HH:mm').format('hh:mm a')
        )
      if (this.newVisitor.startDate && this.newVisitor.endDate && this.newVisitor.startTime)
        return (
          (this.newVisitor.name ? this.newVisitor.name : 'Visitante')  +
          ' podra insgresar a partir del dia ' +
          this.$moment(this.newVisitor.startDate, 'YYYY-MM-DD').format('DD MMM YY') +
          ' hasta el dia ' +
          this.$moment(this.newVisitor.endDate, 'YYYY-MM-DD').format('DD MMM YY') +
          ', a partir de las ' +
          this.$moment(this.newVisitor.startTime, 'HH:mm').format('hh:mm a')
        )
        if (this.newVisitor.startDate && this.newVisitor.endDate)
        return (
          (this.newVisitor.name ? this.newVisitor.name : 'Visitante')  +
          ' podra insgresar a partir del dia ' +
          this.$moment(this.newVisitor.startDate, 'YYYY-MM-DD').format('DD MMM YY') +
          ' hasta el dia ' +
          this.$moment(this.newVisitor.endDate, 'YYYY-MM-DD').format('DD MMM YY')
        )
        if (this.newVisitor.startDate)
        return (
          (this.newVisitor.name ? this.newVisitor.name : 'Visitante')  +
          ' podra insgresar a partir del dia ' +
          this.$moment(this.newVisitor.startDate, 'YYYY-MM-DD').format('DD MMM YY')
        )
      else return ''
    }
  },
  watch: {
    checkboxSetStartTime() {
      this.newVisitor.startTime = null
    },
    checkboxSetEndDate() {
      this.newVisitor.endDate = null
    },
    checkboxSetEndTime() {
      this.newVisitor.endTime = null
    }
  },

  async mounted() {
    await this.getCodes()
  },

  methods: {
    async getCodes() {
      this.visits = await this.$axios
        .get('https://53ea886.online-server.cloud/visits')
        .then((rs) => {
          return rs.data.Data
        })
        .catch((error) => {
          return []
        })
    },
    getDateString(item) {
      if (item.visit_start_date && item.visit_end_date)
        return (
          this.$moment(item.visit_start_date, 'YYYY-MM-DD').format('DD MMM YY') +
          '-' +
          this.$moment().format('DD MMM YY')
        )
      if (item.visit_start_date)
        return this.$moment(item.visit_start_date, 'YYYY-MM-DD').format('DD MMM YY') + '- ∞'
    },
    async createCode() {
        if (!this.newVisitor.name) {
            this.$toast.error('Ingrese el nombre del visitante', {
            position: 'bottom-center',
            timeout: 3000,
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
          return
        }
      await this.$axios
        .post('https://53ea886.online-server.cloud/visits', {
          visit_user_id: this.user.user_id,
          visit_start_date: this.newVisitor.startDate,
          visit_end_date: this.newVisitor.endDate,
          visit_start_time: this.$moment(this.newVisitor.startDate + ' ' + this.newVisitor.startTime, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm:ss"),
          visit_end_time: this.$moment(this.newVisitor.endDate + ' ' + this.newVisitor.endTime, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm:ss"),
          visit_visitor_name: this.newVisitor.name,
          visit_completed: false
        })
        .then((rs) => {
          this.getCodes()
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
    async deleteItem(){
       await this.$axios
        .delete('https://53ea886.online-server.cloud/visits/'+ this.codeToDelete.id)
        .then(async (rs) => {
          this.dialogDelete = false
          await this.getCodes()
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
    async print() {
      const el = this.$refs.printMe
      // add option type to get the image version
      // if not provided the promise will return
      // the canvas.
      const options = {
        type: 'dataURL'
      }
      return await this.$html2canvas(el, options)
    },
    async shareImage(code) {
      const response = await fetch(await this.print())
      const blob = await response.blob()
      const filesArray = [
        new File([blob], 'qr-' + code + '.jpg', {
          type: 'image/jpeg',
          lastModified: new Date().getTime()
        })
      ]
      const shareData = {
        files: filesArray,
        //text: 'Aqui esta el codigo de acceso para que me puedas visitar!'
      }
      navigator.share(shareData)
    }
  }
}
</script>

<style></style>
