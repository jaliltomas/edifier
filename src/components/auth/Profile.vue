<template>
  <v-container class="mb-5">
    <v-row>
      <v-col cols="12" md="12">
        <navegation-component title="PERFIL" sub_title="PERFIL" />
      </v-col>
      <v-col class="d-flex justify-center" cols="12" sm="12" md="12">
        <v-tabs v-model="tab" centered icons-and-text color="#6C63FF">
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
      <v-col cols="12" sm="12" md="12" class="mb-15">
        <personal-data class="fade-in" v-if="action === 0" />
        <Address class="fade-in" v-if="action === 1" />
        <ChangePassword v-if="action === 2" />
        <UserOrders v-if="action === 3" />
      </v-col>
      <!-- <v-col cols="12" sm="12" md="6" class="d-flex justify-center">
        <v-img max-width="500" contain src="../../assets/img/profile.svg"></v-img>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import NavegationComponent from "@/components/Utils/navegation_component";
import PesonalData from "./utils/PesonalData";
import Address from "./utils/Address";
import ChangePassword from "./utils/ChangePassword";
import UserOrders from './utils/UserOrders'
export default {
  components: {
    "navegation-component": NavegationComponent,
    "personal-data": PesonalData,
    Address,
    ChangePassword,
    UserOrders
  },
  data() {
    return {
      tab: null,
      action: 0,
    };
  },

  watch: {
    tab(val) {
      this.action = val;
    },
  },
};
</script>

<style>
</style>