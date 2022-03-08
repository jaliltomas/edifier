<template>
  <div>
    <div
      v-if="isAuth && !dataProduct.out_stock && validateUmbral()"
      class="mb-0"
    >
      <div v-if="authUser.zipcode == '2000' || authUser.zipcode == '5000'">
        <p
          class="mb-0 text-uppercase"
          style="color: #3f3c35; font-size: 1.2em; cursor: pointer"
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
                dataProduct.product.product_warehouse,
                dataProduct
              ) != 'AVISAME'
            "
          >
            <v-icon color="#3F3C35" class="mr-0">mdi-truck-outline</v-icon>
            {{
              HandlerReturnWarehouse(
                authUser.zipcode,
                dataProduct.product.product_warehouse,
                dataProduct
              )
            }}
            <br />
            <v-btn
              v-if="$route.name != 'product_details' && $route.name != 'cart'"
              @click="HandlerShowProduct(dataProduct)"
              rounded
              outlined
              color="#00A0E9"
              class="mt-3"
            >
              Comprar
            </v-btn>
          </span>
          <span v-else>
            <v-btn
              @click="HandlerModalAvisame()"
              outlined
              rounded
              color="#15A7EB"
            >
              AVISAME
            </v-btn>
          </span>
        </p>
      </div>
      <div v-else>
        <p
          class="mb-0 text-uppercase"
          style="color: #3f3c35; font-size: 1.2em"
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
                dataProduct.product.product_warehouse,
                dataProduct
              ) != 'AVISAME'
            "
          >
            <v-icon color="#3F3C35" class="mr-0">mdi-truck-outline</v-icon>
            {{
              HandlerReturnWarehouse(
                authUser.zipcode,
                dataProduct.product.product_warehouse,
                dataProduct
              )
            }}
            <br />
            <v-btn
              class="mt-3"
              v-if="$route.name != 'product_details' && $route.name != 'cart'"
              @click="HandlerShowProduct(dataProduct)"
              outlined
              rounded
              color="#00A0E9"
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
              color="#00A0E9"
              v-if="dataProduct.user_product_notification == null"
            >
              AVISAME
            </v-btn>
            <span
              v-if="dataProduct.user_product_notification != null"
              class="black--text d-flex justify-center mb-3"
              style="cursor: default"
            >
              INGRESA EN {{ getMonth() }}
            </span>
          </span>
        </p>
      </div>
    </div>

    <div v-else-if="isAuth && !dataProduct.out_stock && !validateUmbral()">
      <p style="font-size: 1.2em" class="mb-0 pt-1">
        <span
          v-if="
            (dataProduct.user_product_notification == null &&
              $route.name == 'products') ||
            $route.name == 'home'
          "
          :class="
            $route.name != 'home'
              ? 'black--text d-flex justify-center mt-n1 mb-4 text-uppercase'
              : 'black--text d-flex justify-start mt-n1 mb-4 text-uppercase'
          "
          style="cursor: default"
        >
          INGRESA EN {{ getMonth() }}
        </span>
      </p>
      <v-btn
        v-if="dataProduct.user_product_notification == null"
        @click="HandlerModalAvisame()"
        class="mt-0"
        rounded
        outlined
        color="#00A0E9"
      >
        AVISAME
      </v-btn>
      <p
        class="mb-0 text-uppercase"
        style="font-size: 1.2em"
        v-else-if="dataProduct.user_product_notification != null"
      >
        <span
          class="black--text d-flex justify-center mt-n1 mb-6"
          style="cursor: default"
          v-if="$route.name == 'products'"
        >
          LO ELEGISTE
        </span>
        <span style="color: #00a0e9"> TE AVISAMOS CUANDO ESTÉ </span>
      </p>
    </div>

    <div v-else-if="isAuth && dataProduct.out_stock && validateUmbral()">
      <p style="font-size: 1.2em" class="mb-0 pt-1">
        <span
          v-if="
            (dataProduct.user_product_notification == null &&
              $route.name == 'products') ||
            $route.name == 'home'
          "
          :class="
            $route.name != 'home'
              ? 'black--text d-flex justify-center mt-n1 mb-4 text-uppercase'
              : 'black--text d-flex justify-start mt-n1 mb-4 text-uppercase'
          "
          style="cursor: default"
        >
          INGRESA EN {{ getMonth() }}
        </span>
      </p>
      <v-btn
        v-if="dataProduct.user_product_notification == null"
        @click="HandlerModalAvisame()"
        class="mt-0"
        rounded
        outlined
        color="#00A0E9"
      >
        AVISAME
      </v-btn>
      <p
        class="mb-0 text-uppercase"
        style="font-size: 1.2em"
        v-else-if="dataProduct.user_product_notification != null"
      >
        <span
          class="black--text d-flex justify-center mt-n1 mb-6"
          style="cursor: default"
          v-if="$route.name == 'products'"
        >
          LO ELEGISTE
        </span>
        <span style="color: #00a0e9"> TE AVISAMOS CUANDO ESTÉ </span>
      </p>
    </div>

    <div v-else-if="isAuth == false" class="mb-5">
      <p
        class="mb-0 text-uppercase"
        style="cursor: pointer; color: #3f3c35"
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
              rounded
              :loading="loading"
              color="#AC2632"
              class="white--text"
              @click="passes(HandlerNotification)"
              >Continuar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </ValidationObserver>
  </div>
</template>

<script>
import moment from "moment";
import { isValidUmbral } from "@/utils/validateUmbral.js";

export default {
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
    HandlerReturnWarehouse(cp, warehouse, dataProduct) {
      switch (parseInt(cp)) {
        case 2000:
          return this.getDeposit(warehouse, 10, 5, dataProduct);
        case 5000:
          return this.getDeposit(warehouse, 3, 5, dataProduct);
        default:
          return this.getDepostCentral(warehouse, cp, 5);
      }
    },

    getDepostCentral(warehouse, cp, cenId) {
      const getWarehouseFwl01 = warehouse.find(
        (value) => value.warehouse_id == cenId
      );
      if (getWarehouseFwl01?.current_stock > 0) {
        if (cp >= 1000 && cp < 1441) {
          let text = this.$route.name == "cart" ? "Llega" : "RECIBILO";
          return `${text} dentro de las 24Hs HÁBILES`;
        } else if (this.responseChazki == true) {
          let text = this.$route.name == "cart" ? "Llega" : "RECIBILO";
          return `${text} dentro de las 72Hs HÁBILES`;
        } else {
          let text = this.$route.name == "cart" ? "Llega" : "RECIBILO";
          return `${text} en 4-6 días hábiles`;
        }
      } else {
        return "AVISAME";
      }
    },

    getDeposit(warehouse, regId, cenId, dataProduct) {
      const getWarehouseReg = warehouse.find(
        (value) => value.warehouse_id == regId
      );

      const getWarehouseFwl01 = warehouse.find(
        (value) => value.warehouse_id == cenId
      );

      if (
        getWarehouseReg?.current_stock > dataProduct.threshold &&
        getWarehouseFwl01?.current_stock > 0
      ) {
        // if (this.warehouseValue === 5) {
        let text = this.$route.name == "cart" ? "Llega" : "RECIBILO";
        return `${text} dentro de las 24Hs HÁBILES `;
        // } else {
        //   let text = this.$route.name == "cart" ? "Llega" : "RECIBILO";
        //   return `${text} en 4-6 días hábiles`;
        // }
      } else if (
        getWarehouseReg.current_stock < dataProduct.threshold &&
        getWarehouseFwl01.current_stock > 0
      ) {
        let text = this.$route.name == "cart" ? "Llega" : "RECIBILO";
        return `${text} en 4-6 días hábiles`;
      } else if (
        getWarehouseReg.current_stock > 0 &&
        getWarehouseFwl01.current_stock == 0
      ) {
        let text = this.$route.name == "cart" ? "Llega" : "RECIBILO";
        return `${text} dentro de las 24Hs HÁBILES `;
      } else if (
        getWarehouseReg.current_stock == 0 &&
        getWarehouseFwl01.current_stock == 0
      ) {
        return "AVISAME";
      } else if (
        getWarehouseReg == undefined &&
        getWarehouseFwl01 != undefined
      ) {
        if (getWarehouseFwl01.current_stock > 0) {
          let text = this.$route.name == "cart" ? "Llega" : "RECIBILO";
          return `${text} dentro de las 72Hs HÁBILES`;
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
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    getMonth() {
      const currentDay = moment().format("DD");
      const currentMonth = moment().format("MM") - 1;
      if (currentDay < 15) {
        return moment().locale("es").format("MMMM");
      }
      return moment()
        .month(parseInt(currentMonth) + 1)
        .locale("es")
        .format("MMMM");
    },

    validateUmbral() {
      const userZipCode = this.authUserData.zipcode;
      const dataProductValue = { ...this.dataProduct };
      const paylod = { zipCode: userZipCode, dataProduct: dataProductValue };

      return isValidUmbral(paylod) > 0 ? true : false;
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

    HandlerModalAvisame() {
      if (this.isAuth) {
        this.showModalReserve = true;
      } else {
        this.$router.push({ name: "login" });
      }
    },
  },
};
</script>

<style>
</style>
