<template>
  <div>
    <div
      v-if="
        isAuth && dataProduct.out_stock == false && validateUmbral() == true
      "
      class="mb-0"
    >
      <div v-if="authUser.zipcode == '2000' || authUser.zipcode == '5000'">
        <p
          class="mb-0 text-uppercase"
          style="font-color: #3f3c35; font-size: 1.2em; cursor: pointer"
          v-if="
            dataProduct.product != null &&
            dataProduct.product.product_warehouse.length > 0
          "
          @click="
            ModalProductUser(
              authUser.zipcode,
              dataProduct.product.product_warehouse
            )
          "
        >
          <span
            v-if="
              HandlerReturnWarehouse(
                authUser.zipcode,
                dataProduct.product.product_warehouse
              ) != 'AVISAME'
            "
          >
            <v-icon color="#3F3C35" class="mr-0">mdi-truck-outline</v-icon>
            {{
              HandlerReturnWarehouse(
                authUser.zipcode,
                dataProduct.product.product_warehouse
              )
            }}
          </span>
          <span v-else>
            <v-btn outlined rounded color="#15A7EB">1 AVISAME</v-btn>
          </span>
        </p>
      </div>
      <div v-else>
        <p
          class="mb-0 text-uppercase"
          style="font-color: #3f3c35; font-size: 1.2em"
          v-if="
            dataProduct.product != null &&
            dataProduct.product.product_warehouse.length > 0
          "
          @click="
            ModalProductUser(
              authUser.zipcode,
              dataProduct.product.product_warehouse
            )
          "
        >
          <span
            v-if="
              HandlerReturnWarehouse(
                authUser.zipcode,
                dataProduct.product.product_warehouse
              ) != 'AVISAME'
            "
          >
            <v-icon color="#3F3C35" class="mr-0">mdi-truck-outline</v-icon>
            {{
              HandlerReturnWarehouse(
                authUser.zipcode,
                dataProduct.product.product_warehouse
              )
            }}
            <br />
            <v-btn
              class="mt-3"
              v-if="$route.name != 'product_details'"
              @click="HandlerShowProduct(dataProduct)"
              outlined
              rounded
              color="#15A7EB"
            >
              Comprar
            </v-btn>
          </span>
          <span v-else>
            <div
              v-if="dataProduct.user_product_notification != null"
              class="pt-0"
            ></div>
            <v-btn
              :class="
                dataProduct.user_product_notification == null ? 'mt-5' : 'mt-0'
              "
              outlined
              rounded
              color="#15A7EB"
              v-if="dataProduct.user_product_notification == null"
            >
              AVISAME
            </v-btn>
            <span
              v-if="dataProduct.user_product_notification != null"
              class="black--text d-flex justify-center mb-3"
              style="cursor: default"
            >
              Próximamente
            </span>
            <!-- <span
              v-if="dataProduct.user_product_notification != null"
              style="cursor: default"
            >
              TE AVISAMOS CUANDO ESTÉ
            </span> -->
          </span>
        </p>
      </div>
    </div>

    <div
      v-else-if="
        (isAuth && dataProduct.out_stock == true) || validateUmbral() == false
      "
    >
      <p style="font-size: 1.2em" class="mb-0 pt-1">
        <span
          v-if="
            dataProduct.user_product_notification == null &&
            $route.name == 'products'
          "
          class="black--text d-flex justify-center mt-n1 mb-4 text-uppercase"
          style="cursor: default"
        >
          Próximamente
        </span>
      </p>
      <v-btn
        v-if="dataProduct.user_product_notification == null"
        @click="
          () => {
            showModalReserve = true;
          }
        "
        class="mt-0"
        rounded
        outlined
        color="#3FB7EE"
      >
        AVISAME
      </v-btn>
      <p
        class="mb-0 text-uppercase"
        style="font-size: 1.2em"
        v-else-if="
          dataProduct.user_product_notification != null
        "
      >
        <span
          class="black--text d-flex justify-center mt-n1 mb-6"
          style="cursor: default"
          v-if="$route.name == 'products'"
        >
          LO ELEGISTE
        </span>
        <span style="color: #00a0e9"> TE AVISAMOS CUANDO ESTÉ  </span>
      </p>
    </div>

    <div v-else-if="isAuth == false" class="mb-5">
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
            Completá con tus datos y nos comunicaremos
          </v-card-title>
          <v-card-text>
            <ValidationProvider
              name="nombre"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                @keyup="passes(HandlerNotification)"
                filled
                rounded
                v-model="authUserData.buyer.first_name"
                label="Nombre"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              name="email"
              rules="email|required"
              v-slot="{ errors }"
            >
              <v-text-field
                @keyup="passes(HandlerNotification)"
                filled
                rounded
                label="Email"
                v-model="authUserData.buyer.email"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              name="teléfono"
              rules="numeric|min:8|required"
              v-slot="{ errors }"
            >
              <v-text-field
                @keyup="passes(HandlerNotification)"
                filled
                rounded
                label="Teléfono"
                v-model="authUserData.buyer.phone"
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
      required: false,
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
      responseChazki: null,

      //Notification
      activeNotificacion: false,
      textNotification: "",
      colorNotification: "black",
    };
  },

  async created() {
    if (this.isAuth) {
      const responseChazki = await this.$store.dispatch(
        "products/CHAZKI_VALIDATE"
      );
      this.responseChazki = responseChazki.data.data;
    }
  },

  computed: {
    isAuth() {
      return this.$store.getters["auth/AUTHENTICATED"];
    },

    authUserData() {
      return this.$store.getters["auth/GET_PROFILE"];
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
          if (cp >= 1000 && cp < 1441) {
            return "Recibilo dentro de las 24Hs HÁBILES";
          } else if (this.responseChazki == true) {
            return "Recibilo dentro de las 72Hs HÁBILES";
          } else {
            return "Recibilo en 4-6 días hábiles";
          }
        } else {
          return "AVISAME";
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
          return "Recibilo dentro de las 72Hs HÁBILES ";
        } else if (
          getWarehouseReg.current_stock > 0 &&
          getWarehouseFwl01.current_stock == 0
        ) {
          return "Entrega o Retira en el día";
        } else if (
          getWarehouseReg.current_stock == 0 &&
          getWarehouseFwl01.current_stock == 0
        ) {
          return "AVISAME";
        }
      } else if (
        getWarehouseReg == undefined &&
        getWarehouseFwl01 != undefined
      ) {
        if (getWarehouseFwl01.current_stock > 0) {
          return "Recibilo dentro de las 72Hs HÁBILES ";
        } else if (getWarehouseFwl01.current_stock == 0) {
          return "AVISAME";
        }
      } else if (
        getWarehouseReg != undefined &&
        getWarehouseFwl01 == undefined
      ) {
        if (getWarehouseReg.current_stock > 0) {
          return "Entrega o Retira en el día";
        } else if (getWarehouseReg.current_stock == 0) {
          return "AVISAME";
        }
      }
    },

    ModalProductUser(zip_code, warehouse) {
      if (
        this.HandlerReturnWarehouse(zip_code, warehouse) == "AVISAME" &&
        this.dataProduct.user_product_notification == null
      ) {
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
          email: this.authUserData.buyer.email,
          name: this.authUserData.buyer.first_name,
          phone: this.authUserData.buyer.phone,
        };

        await this.$store.dispatch(
          "products/PRODUCT_NOTIFICATION_USER",
          request
        );

        this.showModalReserve = false;
        this.dataProduct.user_product_notification = true;

        // this.activeNotificacion = true;
        // this.textNotification = "Se ha registrado la información";
        // this.colorNotification = "#00a0e9";
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    validateUmbral() {
      // this.messageProductAdd = false;
      const userZipCode = this.authUserData.zipcode;
      let threshold = 0;

      if (
        this.dataProduct.product != null &&
        this.dataProduct.product.product_warehouse != null
      ) {
        const productWarehouse = this.dataProduct.product.product_warehouse;
        switch (parseInt(userZipCode)) {
          case 2000:
            const warehouse2000 = productWarehouse.filter(
              (whr) =>
                (whr.warehouse_id == 10 && whr.current_stock > 0) ||
                (whr.warehouse_id == 5 && whr.current_stock > 0)
            );

            if (warehouse2000.length == 1) {
              const warehouseThreshold = warehouse2000.some(
                (whr) => whr.current_stock > this.dataProduct.threshold
              );

              if (warehouseThreshold) {
                threshold =
                  warehouse2000[0].current_stock - this.dataProduct.threshold;
              }
            } else {
              const userFindWarehouse2000 = warehouse2000.find(
                (whr) => whr.warehouse_id == 10
              );

              if (
                userFindWarehouse2000.current_stock > this.dataProduct.threshold
              ) {
                threshold =
                  userFindWarehouse2000.current_stock -
                  this.dataProduct.threshold;
              }
            }
            break;
          case 5000:
            const warehouse5000 = productWarehouse.filter(
              (whr) =>
                (whr.warehouse_id == 3 && whr.current_stock > 0) ||
                (whr.warehouse_id == 5 && whr.current_stock > 0)
            );

            if (warehouse5000.length == 1) {
              const warehouseThreshold = warehouse5000.some(
                (whr) => whr.current_stock > this.dataProduct.threshold
              );

              if (warehouseThreshold) {
                threshold =
                  warehouse5000[0].current_stock - this.dataProduct.threshold;
              }
            } else {
              const userFindWarehouse = warehouse5000.find(
                (whr) => whr.warehouse_id == 3
              );

              if (
                userFindWarehouse.current_stock > this.dataProduct.threshold
              ) {
                threshold =
                  userFindWarehouse.current_stock - this.dataProduct.threshold;
              }
            }
            break;
          default:
            const warehouse = productWarehouse.filter(
              (whr) => whr.warehouse_id == 5 && whr.current_stock > 0
            );

            if (warehouse.length > 0) {
              const warehouseThreshold = warehouse.some(
                (whr) => whr.current_stock > this.dataProduct.threshold
              );

              if (warehouseThreshold) {
                threshold =
                  warehouse[0].current_stock - this.dataProduct.threshold;
              }
            }
            break;
        }
        return threshold > 0 ? true : false;
      } else {
        return false;
      }
    },

    HandlerShowProduct(publication) {
      const encryptedID = this.CryptoJS.AES.encrypt(
        publication.product.id.toString(),
        "MyS3c3rtIdPr0Duct"
      ).toString();
      this.$router.push({
        name: "product_details",
        query: { data: encryptedID },
      });
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
