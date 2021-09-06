<template>
  <div>
    <v-sheet>
      <v-img src="@/assets/img/banners/cart.webp">
        <v-container fill-height>
          <v-row justify="center">
            <v-col cols="12">
              <div class="text-center white--text" style="font-size: 2em">
                Lista de compra
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-sheet>
    <v-sheet color="#F1F1F1" class="pb-15">
      <v-container fluid class="px-7 pb-15">
        <v-row>
          <v-col cols="12" md="9">
            <table-items :products="productCartState.shopping_cart_items" />
            <v-btn
              rounded
              dark
              color="#00A0E9"
              @click="$router.go(-1)"
              class="d-flex justify-center justify-md-start mt-5"
            >
              <v-icon>mdi-arrow-left</v-icon>
              <p class="mt-4">Continuar comprando</p>
            </v-btn>
          </v-col>
          <v-col cols="12" md="3">
            <v-card class="elevation-3 mt-5" color="#FAFAFA">
              <v-card-text>
                <div class="font-weight-bold black--text text-center">
                  TOTAL DEL CARRITO
                </div>
                <div class="d-flex justify-space-around mt-7"></div>
                <div class="d-flex justify-space-around mt-7">
                  <span>TOTAL</span>
                  <span
                    v-if="totalAmount > 0"
                    class="font-weight-bold black--text"
                  >
                    ${{ totalAmount | currency }}
                  </span>
                  <span v-else class="font-weight-bold black--text"> $0 </span>
                </div>
                <div class="d-flex justify-center">
                  <v-btn
                    :loading="loadingAcceptItem"
                    style="cursor: pointer"
                    class="mt-10 mx-5"
                    dark
                    color="#00a0e9"
                    rounded
                    @click="showSelectDelivery = !showSelectDelivery"
                  >
                    Continuar al checkout
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <dialog-notification
          v-if="showAlertCheckout"
          :active="showAlertCheckout"
        >
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
                    <span
                      v-if="canBuyWarehouse != null"
                      class="ml-1 font-weight-bold align-self-end"
                    >
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
                  color="#00a0e9"
                  dark
                  rounded
                  @click="$router.push({ name: 'profile' })"
                >
                  Perfil
                </v-btn>
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
                rounded
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
                color="#00a0e9"
                class="white--text"
              >
                Continuar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="showAlertPerfil"
          v-if="showAlertPerfil"
          max-width="600"
        >
          <v-card>
            <v-card-text>
              <div class="font-weight-bold py-5 title">
                Tu perfil se encuentra incompleto porfavor completa los
                siguiente campos:
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
    </v-sheet>
    <suscribe-component />
  </div>
</template>

<script>
import DialogNotification from "./DialogNotification";
import AceptNoItems from "./AceptNoItems";
import TableItems from "./utils/TableItems.vue";
import Suscribe from "../Utils/suscribe_component.vue";
export default {
  components: {
    DialogNotification,
    AceptNoItems,
    TableItems,
    "suscribe-component": Suscribe,
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
          store_id: 3,
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

