<template>
  <v-container>
    <v-toolbar
      dark
      color="primary"
    >
      <v-toolbar-title>Escaner de acceso</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-row>
      <v-col cols="12">
        <qrcode-stream
          :key="_uid"
          :track="selected.value"
          :camera="camera"
          @decode="onDecode"
          @init="onInit"
        >
          <div
            v-if="validationSuccess"
            class="validation-success"
          >
            This is a URL
          </div>

          <div
            v-if="validationFailure"
            class="validation-failure"
          >
            This is NOT a URL!
          </div>

          <div
            v-if="validationPending"
            class="validation-pending"
          >
            Long validation in progress...
          </div>
        </qrcode-stream>
      </v-col>
    </v-row>
    <v-row
      no-gutters
      class="my-3"
      align="center"
      justify="center"
    >
      <v-col cols="12">
        <v-row
          no-gutters
          align="center"
        >
          <v-text-field
            v-model="inputCode"
            outlined
            label="Insert code"
            :hide-details="true"
          />
          <v-btn
            class="ma-1"
            color="success"
            @click="isValidateQr(inputCode)"
          >
            <v-icon>mdi-arrow-right-circle</v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-row
      no-gutters
      justify="center"
    >
      <v-dialog
        v-model="infoDialog"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            Visitante
          </v-card-title>
          <v-card-text>
            <v-row
              no-gutters
              class="pb-0"
            >
              <p class="h6 black--text pb-0 mb-0">
                {{ visitor.visit_visitor_name }}
              </p>
            </v-row>
            <v-row
              no-gutters
              class="pt-0"
            >
              <p class="caption pt-0">
                Nombre del visitante
              </p>
            </v-row>
            <v-row
              no-gutters
              class="pb-0"
            >
              <p class="h6 black--text pb-0 mb-0">
                {{ userVisitor.user_complete_name }}
              </p>
            </v-row>
            <v-row
              no-gutters
              class="pt-0"
            >
              <p class="caption pt-0">
                A quien visita
              </p>
            </v-row>
            <v-row
              no-gutters
              class="pb-0"
            >
              <p class="h6 black--text pb-0 mb-0">
                {{ userResidence ? userResidence.residence_address : '' }}
              </p>
            </v-row>
            <v-row
              no-gutters
              class="pt-0"
            >
              <p class="caption pt-0">
                Direccion
              </p>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              text
              @click="/*toDelete.item = {}, */ ;(infoDialog = false), (inputCode = null)"
            >
              Cerrar
            </v-btn>
            <!--v-btn
              color="success"
              text
              @click="deleteUser()"
            >
              Ok
            </v-btn-->
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
  components: {
    QrcodeStream
  },
  data() {
    return {
      options: [
        { text: 'nothing (default)', value: undefined },
        { text: 'outline', value: this.paintOutline },
        { text: 'centered text', value: this.paintCenterText },
        { text: 'bounding box', value: this.paintBoundingBox }
      ],
      selected: this.paintOutline,
      isValid: undefined,
      camera: 'auto',
      result: null,
      infoDialog: false,
      inpputCode: null,
      visitor: {},
      userVisitor: {},
      userResidence: {}
    }
  },
  computed: {
    validationPending() {
      return this.isValid === undefined && this.camera === 'off'
    },

    validationSuccess() {
      return this.isValid === true
    },

    validationFailure() {
      return this.isValid === false
    }
  },
  watch: {
    async visitor() {
      await this.getUser()
    },
    async userVisitor() {
      await this.getUserResidence()
    }
  },

  methods: {
    paintOutline(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

        ctx.strokeStyle = 'red'

        ctx.beginPath()
        ctx.moveTo(firstPoint.x, firstPoint.y)
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y)
        }
        ctx.lineTo(firstPoint.x, firstPoint.y)
        ctx.closePath()
        ctx.stroke()
      }
    },

    paintBoundingBox(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const {
          boundingBox: { x, y, width, height }
        } = detectedCode

        ctx.lineWidth = 2
        ctx.strokeStyle = '#007bff'
        ctx.strokeRect(x, y, width, height)
      }
    },

    paintCenterText(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const { boundingBox, rawValue } = detectedCode

        const centerX = boundingBox.x + boundingBox.width / 2
        const centerY = boundingBox.y + boundingBox.height / 2

        const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)
        console.log(boundingBox.width, ctx.canvas.width)

        ctx.font = `bold ${fontSize}px sans-serif`
        ctx.textAlign = 'center'

        ctx.lineWidth = 3
        ctx.strokeStyle = '#35495e'
        ctx.strokeText(detectedCode.rawValue, centerX, centerY)

        ctx.fillStyle = '#5cb984'
        ctx.fillText(rawValue, centerX, centerY)
      }
    },
    onInit(promise) {
      promise.catch(console.error).then(this.resetValidationState)
    },

    resetValidationState() {
      this.isValid = undefined
    },

    async onDecode(content) {
      this.result = content
      this.turnCameraOff()

      // pretend it's taking really long
      await this.timeout(3000)
      this.isValid = this.isValidateQr(this.result)

      // some more delay, so users have time to read the message
      await this.timeout(2000)

      this.turnCameraOn()
    },
    async validateAccess(startD, endD, startT, endT) {
      console.log("dates", startD, endD, startT, endT)
      const now = this.$moment()
      console.log(now <= this.$moment(endD, 'YYYY-MM-DD'))
      if (startD && endD && startT && endT) {
        return (
          now >= this.$moment(startD+ ' ' + startT, 'YYYY-MM-DD HH:mm:ss') &&
          now <= this.$moment(endD+ ' ' + endT, 'YYYY-MM-DD HH:mm:ss') &&
          now >= this.$moment(now.format('YYYY-MM-DD') + ' ' + startT, 'YYYY-MM-DD HH:mm:ss') &&
          now <= this.$moment(now.format('YYYY-MM-DD') + ' ' + endT, 'YYYY-MM-DD HH:mm:ss')
        )
      }

      if (startD && endD && startT)
        return (
          now >= this.$moment(startD+ ' ' + startT, 'YYYY-MM-DD HH:mm:ss') &&
          now <= this.$moment(endD+ ' 23:59:59', 'YYYY-MM-DD') &&
          now >= this.$moment(now.format('YYYY-MM-DD') + ' ' + startT, 'YYYY-MM-DD HH:mm:ss')
        )
      if (startD && endD)
        return now >= this.$moment(startD+ ' 00:00:00', 'YYYY-MM-DD') && now <= this.$moment(endD+ ' 23:59:59', 'YYYY-MM-DD')
      if (startD) return now >= this.$moment(startD, 'YYYY-MM-DD')
      else return false
    },

    async isValidateQr(content) {
      this.residence = await this.$axios
        .get('https://53ea886.online-server.cloud/visits/qr/' + content)
        .then(async (rs) => {
          if (rs.data.Data.length > 0) {
            this.visitor = rs.data.Data[0]
            console.log("validAccess", await this.validateAccess(
                this.visitor.visit_start_date,
                this.visitor.visit_end_date,
                this.visitor.visit_start_time,
                this.visitor.visit_end_time
              ))
            if (
              await this.validateAccess(
                this.visitor.visit_start_date,
                this.visitor.visit_end_date,
                this.visitor.visit_start_time,
                this.visitor.visit_end_time
              )
            ) {
              this.infoDialog = true
              this.$toast.success('Codigo valido', {
                position: 'bottom-center',
                timeout: 1500,
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
            } else {
              this.$toast.error('Horario de acceso no valido', {
                position: 'bottom-center',
                timeout: 10000,
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
            }
          } else {
            this.$toast.error('Codigo invalido', {
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
          }

          return rs.data.Data.length > 0
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
          return false
        })
    },

    async getUser() {
      this.userVisitor = await this.$axios
        .get('https://53ea886.online-server.cloud/users/' + this.visitor.visit_user_id)
        .then((rs) => {
          return rs.data.Data
        })
        .catch((error) => {
          return []
        })
    },

    async getUserResidence() {
      this.userResidence = await this.$axios
        .get('https://53ea886.online-server.cloud/residences/' + this.userVisitor.user_residence_id)
        .then((rs) => {
          return rs.data.Data
        })
        .catch((error) => {
          return []
        })
    },

    turnCameraOn() {
      this.camera = 'auto'
    },

    turnCameraOff() {
      this.camera = 'off'
    },

    timeout(ms) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms)
      })
    }
  }
}
</script>

<style></style>
