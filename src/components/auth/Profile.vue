<template>
  <div>
    <v-img contain src="@/assets/img/banners/profile.webp">
      <v-container fill-height>
        <v-row justify="center">
          <v-col cols="12">
            <div
              class="text-center white--text mt-10 mb-5 py-5"
              style="font-size: 1.5em"
            >
              PERFIL DE USUARIO
            </div>
            <div class="d-flex justify-center">
              <v-img
                width="75"
                height="75"
                contain
                src="@/assets/img/profileImage.svg"
              ></v-img>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-img>
    <v-sheet color="#F1F1F1">
      <v-container class="mb-5">
        <v-row>
          <v-col class="d-flex justify-center" cols="12" sm="12" md="12">
            <v-tabs
              background-color="#F1F1F1"
              v-model="tab"
              centered
              icons-and-text
              color="#00A0E9"
            >
              <v-tabs-slider></v-tabs-slider>
              <v-tab>
                Datos personales
                <v-icon>mdi-card-account-details-outline</v-icon>
              </v-tab>
              <v-tab>
                Dirección de envio
                <v-icon>mdi-map-marker-outline</v-icon>
              </v-tab>
              <v-tab>
                Contraseña
                <v-icon>mdi-lock-check-outline</v-icon>
              </v-tab>
              <v-tab>
                Compras
                <v-icon>mdi-basket-outline</v-icon>
              </v-tab>
            </v-tabs>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            offset-md="4"
            :md="action === 3 ? 12 : 8"
            class="mb-15 mx-auto"
          >
            <personal-data
              class="animate__animated animate__fadeIn animate__faster"
              v-if="action === 0"
            />
            <Address
              class="animate__animated animate__fadeIn animate__faster"
              v-if="action === 1"
            />
            <ChangePassword
              class="animate__animated animate__fadeIn animate__faster"
              v-if="action === 2"
            />
            <UserOrders
              class="animate__animated animate__fadeIn animate__faster"
              v-if="action === 3"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <suscribe-component />
  </div>
</template>

<script>
import PesonalData from "./utils/PesonalData";
import Address from "./utils/Address";
import ChangePassword from "./utils/ChangePassword";
import UserOrders from "./utils/UserOrders";
import SuscribeComponent from "../Utils/suscribe_component.vue";
export default {
  components: {
    "personal-data": PesonalData,
    Address,
    ChangePassword,
    UserOrders,
    "suscribe-component": SuscribeComponent,
  },

  data() {
    return {
      tab: null,
      action: 0,
    };
  },

  created() {
    if (this.$route.query.action != undefined) {
      this.action = parseInt(this.$route.query.action);
      this.tab = parseInt(this.$route.query.action);
    }
  },

  watch: {
    tab(val) {
      console.log(val)
      this.action = val;
    },
  },
};
</script>

<style>
</style>