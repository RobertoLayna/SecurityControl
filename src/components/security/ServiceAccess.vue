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
              v-model="newServiceAccess.personal_name"
              outlined
              label="Nombre de la persona"
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
        <v-card-actions>
          <v-btn
            block
            color="success"
            @click="createUser()"
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
    data() {
        return {
            newServiceAccess: {}
        }
    },

}
</script>

<style>

</style>