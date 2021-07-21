<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <navegation-component title="CARRITO" sub_title="CARRITO" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="9">
        <table-items :products="productCartState.shopping_cart_items" />
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="elevation-0 mt-5" color="#FAFAFA">
          <v-card-text>
            <h2 class="font-weight-bold black--text text-center">
              TOTAL DEL CARRITO
            </h2>
            <div class="d-flex justify-space-around mt-15 pt-15">
              <!-- <span>SUBTOTAL</span>
              <span>$6999</span> -->
            </div>
            <div class="d-flex justify-space-around mt-15 pt-15">
              <span>TOTAL</span>
              <span class="font-weight-bold black--text"
                >${{ totalAmount | currency }}</span
              >
            </div>
            <div class="d-flex justify-center">
              <v-card
                :loading="loadingAcceptItem"
                style="cursor: pointer"
                tile
                class="mt-10 mx-5"
                dark
                color="black"
              >
                <v-card-text @click="showSelectDelivery = !showSelectDelivery">
                  <p class="text-center mt-4">Continuar al checkout</p>
                </v-card-text>
              </v-card>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="12">
        <div
          @click="$router.go(-1)"
          class="d-flex justify-center justify-md-start"
          style="cursor: pointer"
        >
          <v-icon>mdi-arrow-left</v-icon>
          <p class="mt-4">Continuar comprando</p>
        </div>
      </v-col>
    </v-row>
    <dialog-notification v-if="showAlertCheckout" :active="showAlertCheckout">
      <acept-no-items
        :data="dataAlertCheckout"
        @dialog:change="HandlerCloseAcceptProduct"
      />
    </dialog-notification>
    <v-dialog
      v-model="showSelectDelivery"
      v-if="showSelectDelivery"
      max-width="600"
    >
      <v-card :loading="loadingCheckout">
        <v-card-title>Elige el medio de retiro</v-card-title>
        <v-card-text>
          <v-radio-group v-model="radioGroup">
            <v-radio
              v-for="n in ['Retiro en tienda', 'Entrega a domicilio']"
              :key="n"
              :label="`${n}`"
              :value="n"
              v-model="retirementValue"
            ></v-radio>
          </v-radio-group>
          <div v-if="radioGroup == 0">
            <div v-if="canBuyWarehouse == null" class="title">
              Vaya, este metodo de entrega no esta disponible para estos
              productos, porfavor intenta con otro.
            </div>
            <div v-else>
              Puedes retirar los productos en el siguiente almacen:
              <br />
              <div class="d-flex">
                <v-icon>mdi-warehouse</v-icon>
                <span v-if="canBuyWarehouse != null" class="ml-1 font-weight-bold align-self-end">
                  {{ canBuyWarehouse.name }}
                </span>
              </div>
            </div>
            <!-- <ul>
              <li
                v-for="(item, index) in depositElements"
                :key="index"
                style="cursor: pointer"
                @click="selectDeposit = item"
                :class="selectDeposit == item ? 'blue--text' : ''"
              >
                {{ item }}
              </li>
            </ul> -->
          </div>
          <div v-if="radioGroup == 1 && userAddress.length == 0">
            <span class="red--text">
              Parece que no tienes ninguna direccion registrada, porfavor
              registra una para poder continuar con el pago
            </span>
            <br />
            <v-btn
              class="mt-2"
              color="black"
              dark
              @click="$router.push({ name: 'profile' })"
              >Perfil</v-btn
            >
          </div>
          <div v-if="radioGroup == 1 && userAddress.length > 0">
            <span class="font-weight-bold" style="cursor: pointer"
              >Seleccione la dirección de entrega</span
            >
            <v-select
              :items="userAddress"
              :item-text="
                (item) =>
                  `${item.street} ${item.street_number} ${item.floor_number} ${item.department_number} ${item.location}`
              "
              item-value="id"
              outlined
              label="Dirección"
              v-model="idAddress"
            ></v-select>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="HandlerClose" text black>Cancelar</v-btn>
          <v-btn
            :loading="loadingCheckout"
            :disabled="
              radioGroup == null
                ? true
                : canBuyWarehouse == null && radioGroup == 0
                ? true
                : radioGroup == 0
                ? false
                : idAddress === null
                ? true
                : false
            "
            @click="HandlerConfirmItems(retirementValue)"
            color="primary"
          >
            Continuar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showAlertPerfil" v-if="showAlertPerfil" max-width="600">
      <v-card>
        <v-card-text>
          <div class="font-weight-bold py-5 title">
            Tu perfil se encuentra incompleto porfavor completa los siguiente
            campos:
          </div>
          <ul>
            <li
              v-for="(item, index) in alertPerfil"
              :key="index"
              class="text-uppercase font-weight-bold"
            >
              {{ item.message }}
            </li>
          </ul>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            class="text-capitalize"
            @click="showAlertPerfil = !showAlertPerfil"
            >Cancelar</v-btn
          >
          <v-btn
            @click="$router.push({ name: 'profile' })"
            black
            dark
            class="text-capitalize"
          >
            Ir
            <span class="text-lowercase mx-1">al</span>
            Perfil
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import NavegationComponent from "@/components/Utils/navegation_component";
import DialogNotification from "./DialogNotification";
import AceptNoItems from "./AceptNoItems";
import TableItems from "./utils/TableItems.vue";
export default {
  components: {
    "navegation-component": NavegationComponent,
    DialogNotification,
    AceptNoItems,
    TableItems,
  },
  data() {
    return {
      items: [],
      originalItems: [],
      showAlertRemove: false,
      selectProduct: null,
      confirmOrder: [],
      showAlertCheckout: false,
      dataAlertCheckout: {},

      //Checkout
      radioGroup: null,
      retirementValue: "",
      userAddress: [],
      idAddress: null,
      loadingAcceptItem: false,
      loadingCheckout: false,
      showSelectDelivery: false,
      showAddressChange: false,
      depositElements: ["CABA", "Rosario", "Córdoba Capital"],
      selectDeposit: "",

      // Notifiction Checkout
      alertNotificationBuy: false,
      canBuyWarehouse: null,

      // Error Checkout
      showAlertPerfil: false,
      alertPerfil: [],
    };
  },

  created() {
    this.HandlerGetCartsProducts();
    this.HandlerGetAddress();
  },

  watch: {
    radioGroup(val) {
      console.log("***********", val);
      if (val == 0) {
        this.getUserAddressPriority();
        this.ValidateProductWarehouse();
      }
    },
  },

  computed: {
    isAuth() {
      return this.$store.getters["auth/AUTHENTICATED"];
    },

    productCartState() {
      return this.$store.getters["cart/CART_PRODUCTS"];
    },

    totalAmount() {
      return this.$store.getters["cart/TOTAL_AMOUNT"];
    },
  },

  methods: {
    async HandlerGetCartsProducts() {
      try {
        const response = await this.$store.dispatch("cart/GET_CURRENT_CART");
        this.originalItems = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async HandlerGetAddress() {
      try {
        const response = await this.$store.dispatch("auth/GET_ADDRESS");
        this.userAddress = response.data.data;
        this.idAddress = this.userAddress.find((addr) => addr.status == true);
      } catch (error) {
        console.log(error);
      }
    },

    getUserAddressPriority() {
      const userAddress = this.userAddress.find((addrr) => {
        if (addrr.status == true) {
          return addrr;
        }
      });
      if (userAddress != undefined) {
        this.idAddress = userAddress.id;
        return userAddress;
      } else return "";
    },

    HandlerClose() {
      this.showSelectDelivery = false;
      this.retirementValue = "";
      this.radioGroup = null;
    },

    async HandlerConfirmItems(value) {
      try {
        const request = { update_items: true };
        const response = await this.$store.dispatch(
          "cart/CONFIRM_PRODUCTS_CART",
          request
        );

        const summary = response.data.data.summary;
        const shopping_cart = response.data.data.shopping_cart;

        console.log("Productos", response.data.data.shopping_cart);
        console.log("Resumen", response.data.data.summary);

        this.$store.commit("cart/SET_CART_SUMMART", summary);

        this.confirmOrder = [
          ...this.getShoppingCartItems(summary, shopping_cart),
        ];

        console.log("Confirm Order", this.confirmOrder);
        // VERIFICAR SI TIENE DIRECCION REGISTRADA
        if (this.radioGroup == 1) {
          const responseAddress = await this.$store.dispatch(
            "auth/GET_ADDRESS"
          );

          if (responseAddress.data.data.length > 0) {
            // SI LA NO HAY PRODUCTOS MOSTRAAMOS LA INFO
            if (this.confirmOrder.length > 0) {
              this.showAlertCheckout = !this.showAlertCheckout;
              this.dataAlertCheckout = {
                order: this.confirmOrder,
                pickup: this.radioGroup == 0 ? true : false,
                address: this.radioGroup == 1 ? this.idAddress.id : "",
                response: response.data.data,
              };
            } else {
              console.log("Pagar de una 1");
              if (this.confirmOrder.length > 0) {
                this.showAlertCheckout = !this.showAlertCheckout;
                this.dataAlertCheckout = {
                  order: this.confirmOrder,
                  pickup: this.radioGroup == 0 ? true : false,
                  address: this.radioGroup == 1 ? this.idAddress.id : "",
                  response: response.data.data,
                };
              } else {
                this.HandlerCheckout();
              }
            }
          } else {
            console.log("Mostrar Alerta para que llene su direccion");
          }
        } else {
          // this.HandlerCheckout();
          if (this.confirmOrder.length > 0) {
            this.showAlertCheckout = !this.showAlertCheckout;
            this.dataAlertCheckout = {
              order: this.confirmOrder,
              pickup: this.radioGroup == 0 ? true : false,
              address: this.radioGroup == 1 ? this.idAddress.id : "",
              response: response.data.data,
            };
          } else {
            console.log("Pagar de una 2 **");
            this.HandlerCheckout();
          }
        }
        // }
      } catch (error) {
        console.log(error);
      } finally {
        // this.loadingAcceptItem = false;
      }
    },

    getShoppingCartItems(summary, shopping_cart) {
      let cont = -1;
      return summary.reduce((out, current) => {
        cont++;
        if (current.available < current.requested) {
          const getItem = shopping_cart.shopping_cart_items.find((item) => {
            return item.id == current.shopping_cart_item_id;
          });

          if (getItem !== undefined) {
            out.push({
              isValid: false,
              summary_position: cont,
              requested: current.requested,
              available: current.available,
              product: getItem,
            });
          }
        }
        return out;
      }, []);
    },

    async HandlerCheckout() {
      try {
        this.loadingCheckout = true;
        const request = {
          shopping_cart_id: this.originalItems.id,
          route_success: `${process.env.VUE_APP_CHECKOUT}/checkout_notification`,
          route_failure: `${process.env.VUE_APP_CHECKOUT}/checkout_notification`,
          route_pending: `${process.env.VUE_APP_CHECKOUT}/checkout_notification`,
          store_pickup: this.radioGroup == 0 ? true : false,
          addresse_id:
            this.radioGroup == 1
              ? this.idAddress.id == undefined
                ? this.idAddress
                : this.idAddress.id
              : "",
          warehouse_id: "",
        };

        // console.log("Request checkout", request);

        const response = await this.$store.dispatch(
          "products/CHECKOUT_DO",
          request
        );
        window.location.replace(response.data.data.url);
      } catch (error) {
        console.log(error);
        if (
          error.response.data.error.message ==
          "perfil actual incompleto para realizar compra"
        ) {
          this.showAlertPerfil = true;
          this.alertPerfil = error.response.data.error.details;
          this.showSelectDelivery = !this.showSelectDelivery;
        }
      } finally {
        this.loadingCheckout = false;
      }
    },

    HandlerCloseAcceptProduct() {
      this.showAlertCheckout = false;
    },

    async ValidateProductWarehouse() {
      try {
        const publication_ids = this.originalItems.shopping_cart_items.map(
          (item) => {
            return [item.publication_id];
          }
        );

        const request = {
          publication_ids: [...publication_ids.flat()],
          debug: true,
        };

        const response = await this.$store.dispatch(
          "products/VALIDATE_PRODUCT_WAREHOUSE",
          request
        );

        if (response.data.data.store_pickup == false)
          this.alertNotificationBuy = true;
        if (response.data.data.store_pickup == true)
          this.canBuyWarehouse = response.data.data.warehouse;

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>
