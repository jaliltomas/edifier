<template>
  <div>
    <div v-if="isAuth" class="mb-5">
      <div v-if="authUser.zipcode == '2000' || authUser.zipcode == '5000'">
        <p
          class="mb-0 text-uppercase"
          style="font-color: #3f3c35; font-size: 1.2em; cursor: pointer"
          v-if="dataProduct.product.product_warehouse.length > 0"
          @click="
            ModalProductUser(
              authUser.zipcode,
              dataProduct.product.product_warehouse
            )
          "
        >
          <v-icon color="#3F3C35" class="mr-1">mdi-truck-outline</v-icon>
          {{
            HandlerReturnWarehouse(
              authUser.zipcode,
              dataProduct.product.product_warehouse
            )
          }}
        </p>
      </div>
      <div v-else>
        <p
          class="mb-0 text-uppercase"
          style="font-color: #3f3c35; font-size: 1.2em"
          v-if="dataProduct.product.product_warehouse.length > 0"
          @click="
            ModalProductUser(
              authUser.zipcode,
              dataProduct.product.product_warehouse
            )
          "
        >
          <v-icon color="#3F3C35" class="mr-1">mdi-truck-outline</v-icon>
          {{
            HandlerReturnWarehouse(
              authUser.zipcode,
              dataProduct.product.product_warehouse
            )
          }}
        </p>
      </div>
    </div>
    <div v-else class="mb-5">
      <p
        class="mb-0 text-uppercase"
        style="cursor: pointer; font-color: #3f3c35"
        @click="$router.push({ name: 'login' })"
      >
        <v-icon color="#3F3C35" class="mr-1">mdi-truck-outline</v-icon>
        Conocé el tiempo de entrega
      </p>
    </div>
    <ValidationObserver ref="obs" v-slot="{ passes }">
      <v-dialog
        v-if="showModalReserve"
        v-model="showModalReserve"
        max-width="600"
      >
        <v-card>
          <v-card-title>
            Llena los campos para manternerte informado
          </v-card-title>
          <v-card-text>
            <ValidationProvider
              name="nombre"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                filled
                rounded
                label="nombre"
                v-model="email"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              name="email"
              rules="email|required"
              v-slot="{ errors }"
            >
              <v-text-field
                filled
                rounded
                label="Email"
                v-model="name"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              name="telefono"
              rules="numeric|required"
              v-slot="{ errors }"
            >
              <v-text-field
                filled
                rounded
                label="Telefono"
                v-model="phone"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="showModalReserve = false">Cancelar</v-btn>
            <v-btn
              :loading="loading"
              dark
              color="#00A0E9"
              @click="passes(HandlerNotification)"
            >
              Continuar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </ValidationObserver>

    <notification_componenet
      :active="activeNotificacion"
      :text="textNotification"
      :color="colorNotification"
      @dialog:change="responseNotification"
    />
  </div>
</template>

<script>
import NotificationComponent from "./notification_componenet.vue";
export default {
  components: {
    notification_componenet: NotificationComponent,
  },
  props: {
    dataProduct: {
      type: Object,
      required: true,
      default: () => {},
    },
    authUser: {
      type: Object,
      required: true,
      default: () => {},
    },
  },

  data() {
    return {
      loading: false,
      showModalReserve: false,

      //Data
      email: "",
      name: "",
      phone: "",

      //Notification
      activeNotificacion: false,
      textNotification: "",
      colorNotification: "black",
    };
  },

  computed: {
    isAuth() {
      return this.$store.getters["auth/AUTHENTICATED"];
    },
  },

  methods: {
    HandlerReturnWarehouse(cp, warehouse) {
      switch (parseInt(cp)) {
        case 2000:
          return this.getDeposit(warehouse, 10, 5);
        case 5000:
          return this.getDeposit(warehouse, 3, 5);
        default:
          return this.getDepostCentral(warehouse, cp, 5);
      }
    },

    getDepostCentral(warehouse, cp, cenId) {
      const getWarehouseFwl01 = warehouse.find(
        (value) => value.warehouse_id == cenId
      );

      if (getWarehouseFwl01 != undefined) {
        if (getWarehouseFwl01.current_stock > 0) {
          if (cp >= 1000 || cp < 1441) {
            return "Recibilo sin cargo en 24hrs 1";
          } else if (this.responseChazki) {
            return "Recibilo sin cargo en 72hrs";
          } else {
            return "Recibilo sin cargo en 4-6hrs";
          }
        } else {
          return "Proximamente";
        }
      }
    },

    getDeposit(warehouse, regId, cenId) {
      const getWarehouseReg = warehouse.find(
        (value) => value.warehouse_id == regId
      );

      const getWarehouseFwl01 = warehouse.find(
        (value) => value.warehouse_id == cenId
      );

      if (getWarehouseReg != undefined && getWarehouseFwl01 != undefined) {
        if (
          getWarehouseReg.current_stock > 0 &&
          getWarehouseFwl01.current_stock > 0
        ) {
          return "Entrega o Retira en el día";
        } else if (
          getWarehouseReg.current_stock == 0 &&
          getWarehouseFwl01.current_stock > 0
        ) {
          return "Recibilo sin cargo en 72Hrs";
        } else if (
          getWarehouseReg.current_stock > 0 &&
          getWarehouseFwl01.current_stock == 0
        ) {
          return "Entrega o Retira en el día";
        } else if (
          getWarehouseReg.current_stock == 0 &&
          getWarehouseFwl01.current_stock == 0
        ) {
          return "Proximamente";
        }
      } else if (
        getWarehouseReg == undefined &&
        getWarehouseFwl01 != undefined
      ) {
        if (getWarehouseFwl01.current_stock > 0) {
          return "Recibilo sin cargo en 72Hrs";
        } else if (getWarehouseFwl01.current_stock == 0) {
          return "Proximamente";
        }
      } else if (
        getWarehouseReg != undefined &&
        getWarehouseFwl01 == undefined
      ) {
        if (getWarehouseReg.current_stock > 0) {
          return "Entrega o Retira en el día";
        } else if (getWarehouseReg.current_stock == 0) {
          return "Proximamente";
        }
      }
    },

    ModalProductUser(zip_code, warehouse) {
      if (this.HandlerReturnWarehouse(zip_code, warehouse) == "Proximamente") {
        this.showModalReserve = true;
      }
    },

    async HandlerNotification() {
      try {
        this.loading = true;
        const request = {
          store_id: 3,
          product_id: this.dataProduct.product_id,
          publication_id: this.dataProduct.id,
          email: this.email,
          name: this.name,
          phone: this.phone,
        };

        await this.$store.dispatch(
          "products/PRODUCT_NOTIFICATION_USER",
          request
        );

        this.showModalReserve = false;
        this.email = "";
        this.name = "";
        this.phone = "";

        // this.activeNotificacion = true;
        // this.textNotification = "Se ha registrado la información";
        // this.colorNotification = "#00a0e9";
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    responseNotification() {
      this.activeNotificacion = false;
      this.textNotification = "";
      this.colorNotification = "";
    },
  },
};
</script>

<style>
</style>
