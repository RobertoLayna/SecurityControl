<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-sheet class="ma-3">
        <v-data-iterator
          :items="items"
          :items-per-page.sync="itemsPerPage"
        >
          <template v-slot:header>
            <v-toolbar
              class="mb-2"
              color="primary darken-5"
              dark
              flat
            >
              <v-toolbar-title>Residentials</v-toolbar-title>
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
            <v-row>
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
                    {{ item.name }}
                    <v-spacer />
                    <v-btn
                      dark
                      color="green"
                      @click="$router.push({name: 'AdministratorResidentialDetails', params: { id: item.id } })"
                    >
                      View
                    </v-btn>
                  </v-card-title>

                  <v-divider />

                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content>Residents:</v-list-item-content>
                      <v-list-item-content class="align-end">
                        {{ item.calories }}
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
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
      </v-sheet>
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
              @click="dialog = false"
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
              label="Location"
            />
          </v-col>
          <v-col
            class="d-flex"
            cols="12"
          >
            <v-select
              v-model="itemSelectAdmin"
              :items="itemsSelectAdmin"
              label="Administrator"
              outlined
            />
          </v-col>
          <v-container
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
          </v-container>
          <v-constainer
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
          </v-constainer>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      itemsPerPage: 4,
      items: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          id: 87,
          calcium: '14%',
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          id: 129,
          calcium: '8%',
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          id: 337,
          calcium: '6%',
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          id: 413,
          calcium: '3%',
          iron: '8%'
        }
      ],
      newResidential: {
        name: null,
        location: null
      },
      itemsSelectAdmin: ['New', 'Existing'],
      itemSelectAdmin: null
    }
  }
}
</script>

<style></style>
