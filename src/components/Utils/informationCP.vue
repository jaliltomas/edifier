<template>
  <div>
    <div v-if="isAuth" class="mb-0">
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
            <span
              v-if="dataProduct.user_product_notification != null"
              class="blue--text"
              style="cursor: default"
            >
              TE AVISAMOS CUANDO ESTÉ
            </span>
          </span>
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
