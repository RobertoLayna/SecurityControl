<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-toolbar-title>Acceso de servicios</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-container>
          <v-col
            class="d-flex"
            cols="12"
          >
            <v-text-field
              v-model.number="newServiceAccess.service_name"
              outlined
              label="Nombre de servicio (Basura/CFE/etc...)"
            />
          </v-col>
          <v-col
            class="d-flex"
            cols="12"
          >
            <v-text-field
              v-model="newServiceAccess.matricula"
              outlined
              label="No Unidad/ID/MATRICULA"
            />
          </v-col>
        </v-container>
        <v-card-actions>
          <v-btn
            block
            color="success"
            @click="save()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'ServiceAccess',
  data() {
    return {
      newServiceAccess: {
        service_name: null,
        matricula: null
      }
    }
  },
  methods: {
    save() {
      if (!this.newServiceAccess.service_name || !this.newServiceAccess.matricula) {
        this.$toast.error('Ingrese todos los campos', {
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
      } else {
        this.$axios
          .post('https://53ea886.online-server.cloud/special-visits', {
            special_visit_name: this.newServiceAccess.service_name,
            special_visit_vehicle: this.newServiceAccess.matricula,
          })
          .then((rs) => {
            this.$toast.success('Registro guardado correctamente', {
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
            
            setTimeout(() => {
              this.$router.push({ name: 'SecurityScanner' })
              this.newServiceAccess = {
                service_name: null,
                matricula: null
              }
            }, 1500)
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
            this.dialog = false
          })
      }
    }
  }
}
</script>
<style>
</style>