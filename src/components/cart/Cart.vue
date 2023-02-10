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
                <div
                  class="font-weight-bold black--text text-center"
                  style="font-size: 1.1em; color: #3c3c3c"
                >
                  FORMA DE PAGO
                </div>
                <v-row class="mt-2">
                  <v-col cols="12" md="4" class="d-flex align-stretch">
                    <v-sheet
                      color="#E9E9E9"
                      width="100%"
                      class="d-flex flex-column"
                    >
                      <div>
                        <v-img
                          width="100%"
                          class="d-flex justify-center pt-5"
                          contain
                          src="@/assets/img/checkout/18cuotas.svg"
                        ></v-img>
                        <span
                          class="d-flex justify-center mt-n2"
                          style="font-size: 0.83em"
                        >
                          18
                        </span>
                        <span
                          class="d-flex justify-center mt-n2"
                          style="font-size: 0.83em"
                        >
                          Cuotas
                        </span>
                      </div>
                      <div class="mt-auto">
                        <div class="d-flex justify-center">
                          <v-radio-group v-model="radioGroupDues">
                            <v-radio @change="checkoutType(1)"></v-radio>
                          </v-radio-group>
                        </div>
                      </div>
                    </v-sheet>
                  </v-col>
                  <v-col cols="12" md="4" class="d-flex align-stretch">
                    <v-sheet
                      color="#E9E9E9"
                      width="100%"
                      class="d-flex flex-column"
                    >
                      <div>
                        <v-img
                          width="250"
                          class="d-flex justify-center pt-5"
                          contain
                          src="@/assets/img/checkout/deb-cred.svg"
                        ></v-img>
                        <span
                          class="d-flex justify-center mt-n2"
                          style="font-size: 0.83em"
                        >
                          1 Pago
                        </span>
                        <span
                          class="d-flex justify-center mt-n2"
                          style="font-size: 0.83em"
                        >
                          Débito
                        </span>
                        <span
                          class="d-flex justify-center mt-n2"
                          style="font-size: 0.83em"
                        >
                          Crédito
                        </span>
                      </div>
                      <div class="mt-auto">
                        <div class="d-flex justify-center">
                          <v-radio-group v-model="radioGroupCredit">
                            <v-radio @change="checkoutType(2)"></v-radio>
                          </v-radio-group>
                        </div>
                      </div>
                    </v-sheet>
                  </v-col>
                  <v-col cols="12" md="4" class="d-flex align-stretch">
                    <v-sheet
                      color="#E9E9E9"
                      width="100%"
                      class="d-flex flex-column"
                    >
                      <div>
                        <v-img
                          width="250"
                          class="d-flex justify-center pt-4"
                          contain
                          src="@/assets/img/checkout/transferencia.svg"
                        ></v-img>
                        <span
                          class="d-flex justify-center mt-n1"
                          style="font-size: 0.83em"
                        >
                          Transferencia
                        </span>
                        <span
                          class="d-flex justify-center mt-n2"
                          style="font-size: 0.83em"
                        >
                          Bancaria
                        </span>
                      </div>
                      <div class="mt-auto">
                        <div class="d-flex justify-center">
                          <v-radio-group v-model="radioGroupTransfer">
                            <v-radio
                              @change="checkoutType(3)"
                              class="mt-1 ml-2"
                            ></v-radio>
                          </v-radio-group>
                        </div>
                      </div>
                    </v-sheet>
                  </v-col>
                </v-row>
                <v-divider class="my-3"></v-divider>
                <div>
                  <div
                    class="font-weight-bold black--text text-center"
                    style="font-size: 1.1em; color: #3c3c3c"
                  >
                    TOTAL DEL CARRITO
                  </div>
                  <div class="d-flex justify-space-between">
                    <span class="ml-4 mt-2">TOTAL</span>
                    <span
                      v-if="totalPrice(originalItems.shopping_cart_items) > 0"
                      class="font-weight-bold black--text mr-4 mt-2"
                    >
                      ${{
                        totalPrice(originalItems.shopping_cart_items) | currency
                      }}
                    </span>
                    <span v-else class="font-weight-bold black--text mr-4 mt-2">
                      ${{ totalAmount | currency }}
                    </span>
                  </div>
                </div>
                <div class="d-flex justify-center">
                  <v-btn
                    :disabled="
                      radioGroupDues == null ||
                      radioGroupCredit == null ||
                      radioGroupTransfer == null
                        ? true
                        : false
                    "
                    :loading="loadingAcceptItem"
                    style="cursor: pointer"
                    class="mt-10 mx-5 white--text"
                    color="#00a0e9"
                    rounded
                    @click="canCheckout()"
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
              <v-radio-group
                v-model="radioGroup"
                @change="HandlerShippingQuote()"
              >
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
                  No disponible para este modelo.
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
                <span class="font-weight-bold" style="cursor: pointer">
                  Seleccione la dirección de entrega
                </span>
                <v-select
                  @change="HandlerShippingQuote()"
                  :items="userAddress"
                  :item-text="
                    item =>
                      `${item.street} ${item.street_number} ${item.floor_number} ${item.department_number} ${item.location}`
                  "
                  item-value="id"
                  outlined
                  label="Dirección"
                  v-model="idAddress"
                ></v-select>

                <div>
                  Costo del envio:
                  <span class="font-weight-bold black--text"
                    >${{ quote | currency }}</span
                  >
                </div>
                <div>
                  Total:

                  <span
                    v-if="totalPrice(originalItems.shopping_cart_items) > 0"
                    class="font-weight-bold black--text mr-4 mt-2"
                  >
                    ${{
                      (totalPrice(originalItems.shopping_cart_items) + quote)
                        | currency
                    }}
                  </span>
                  <span v-else class="font-weight-bold black--text mr-4 mt-2">
                    ${{ (totalAmount + quote) | currency }}
                  </span>
                </div>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="HandlerClose" text black>Cancelar</v-btn>
              <v-btn
                rounded
                :loading="loadingCheckout"
                :disabled="disableCheckoutButton()"
                @click="HandlerConfirmItems()"
                color="#14A7EB"
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
                color="#00a0e9"
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
    <!-- PAGO POR TRANSFERENCIA -->
    <transfer-checkout
      v-if="showModalTransfer"
      :showModalTransfer="showModalTransfer"
      :productCartState="productCartState"
      :responseTransferCheckout="responseTransferCheckout"
    />
    <suscribe-component />
  </div>
</template>

<script>
import DialogNotification from "./DialogNotification";
import AceptNoItems from "./AceptNoItems";
import TableItems from "./utils/TableItems.vue";
import Suscribe from "../Utils/suscribe_component.vue";
import TransferCheckout from "./utils/TransferCheckout.vue";
export default {
  components: {
    DialogNotification,
    AceptNoItems,
    TableItems,
    "suscribe-component": Suscribe,
    "transfer-checkout": TransferCheckout
  },
  data() {
    return {
      quote: 0,
      errorGetQuoute: false,
      statusQuote: false,
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
      dues: false,
      credit: false,
      transfer: false,
      radioGroupDues: null,
      radioGroupCredit: null,
      radioGroupTransfer: null,
      payments_type: "",
      default_installments: "",

      showModalTransfer: false,

      // Notifiction Checkout
      alertNotificationBuy: false,
      canBuyWarehouse: null,

      // Checkout
      responseTransferCheckout: {},

      // Error Checkout
      showAlertPerfil: false,
      alertPerfil: [],

      loadingLocation: false
    };
  },

  created() {
    this.HandlerGetCartsProducts();
    this.HandlerGetAddress();
    window.fbq("trackCustom", "CartView");
  },

  watch: {
    radioGroup(val) {
      if (val == 0) {
        this.getUserAddressPriority();
        this.ValidateProductWarehouse();
      }
    }
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
    }
  },

  methods: {
    disableCheckoutButton() {
      const condition1 = this.radioGroup == null || !this.statusQuote;
      const condition2 = this.canBuyWarehouse == null && this.radioGroup == 0;
      const condition3 = this.radioGroup == 0;
      const condition4 = this.idAddress === null;

      const disabled =
        condition1 ||
        condition2 ||
        (!condition3 && (condition4 || this.errorGetQuoute));

      return disabled;
    },

    async HandlerShippingQuote() {
      try {
        this.statusQuote = false;

        if (this.radioGroup == 0) {
          return;
        }

        const request = {
          address_id: this.idAddress?.id || this.idAddress
        };

        const response = await this.$store.dispatch(
          "cart/SHIPPING_QUOTE_ARG",
          request
        );

        this.quote = response.data.data;
        this.total_order = this.totalAmount + this.quote;
      } catch (error) {
        console.log(error);
        this.errorGetQuoute = true;
      } finally {
        this.statusQuote = true;
      }
    },

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
        this.idAddress = this.userAddress.find(addr => addr.status == true);
      } catch (error) {
        console.log(error);
      }
    },

    getUserAddressPriority() {
      const userAddress = this.userAddress.find(addrr => {
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

    async HandlerConfirmItems() {
      try {
        const request = {
          update_items: true,
          address_id: this.idAddress.id || this.idAddress
        };
        const response = await this.$store.dispatch(
          "cart/CONFIRM_PRODUCTS_CART",
          request
        );

        const summary = response.data.data.summary;
        const shopping_cart = response.data.data.shopping_cart;

        this.$store.commit("cart/SET_CART_SUMMART", summary);

        this.confirmOrder = [
          ...this.getShoppingCartItems(summary, shopping_cart)
        ];

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
                address: this.radioGroup == 1 ? this.idAddress : "",
                response: response.data.data,
                payment_type: this.payments_type,
                default_installments: this.default_installments
              };
            } else {
              if (this.confirmOrder.length > 0) {
                this.showAlertCheckout = !this.showAlertCheckout;
                this.dataAlertCheckout = {
                  order: this.confirmOrder,
                  pickup: this.radioGroup == 0 ? true : false,
                  address: this.radioGroup == 1 ? this.idAddress : "",
                  response: response.data.data,
                  payment_type: this.payments_type,
                  default_installments: this.default_installments
                };
              } else {
                if (this.radioGroupTransfer === 0) {
                  this.HandlerTransferCheckout(shopping_cart);
                } else {
                  this.HandlerCheckout();
                }
              }
            }
          } else {
            this.$router.push({ name: "profile" });
          }
        } else {
          // this.HandlerCheckout();
          if (this.confirmOrder.length > 0) {
            this.showAlertCheckout = !this.showAlertCheckout;
            this.dataAlertCheckout = {
              order: this.confirmOrder,
              pickup: this.radioGroup == 0 ? true : false,
              address: this.radioGroup == 1 ? this.idAddress.id : "",
              response: response.data.data
            };
          } else {
            if (this.radioGroupTransfer === 0) {
              this.HandlerTransferCheckout(shopping_cart);
            } else {
              this.HandlerCheckout();
            }
          }
        }
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
          const getItem = shopping_cart.shopping_cart_items.find(item => {
            return item.id == current.shopping_cart_item_id;
          });

          if (getItem !== undefined) {
            out.push({
              isValid: false,
              summary_position: cont,
              requested: current.requested,
              available: current.available,
              product: getItem
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
          warehouse_id: this.radioGroup == 0 ? this.canBuyWarehouse.id : "",
          store_id: 3,
          payment_type: this.payments_type,
          default_installments: this.default_installments
        };

        const response = await this.$store.dispatch(
          "products/CHECKOUT_DO",
          request
        );
        window.location.replace(response.data.data.url);
      } catch (error) {
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
          item => {
            return [item.publication_id];
          }
        );

        const request = {
          publication_ids: [...publication_ids.flat()],
          debug: true
        };

        const response = await this.$store.dispatch(
          "products/VALIDATE_PRODUCT_WAREHOUSE",
          request
        );

        if (response.data.data.store_pickup == false)
          this.alertNotificationBuy = true;
        if (response.data.data.store_pickup == true)
          this.canBuyWarehouse = response.data.data.warehouse;
      } catch (error) {
        console.log(error);
      }
    },

    checkoutType(val) {
      switch (val) {
        case 1:
          this.dues = true;
          this.radioGroupDues = true;
          this.credit = false;
          this.radioGroupCredit = false;
          this.transfer = false;
          this.radioGroupTransfer = false;
          break;
        case 2:
          this.dues = false;
          this.radioGroupDues = false;
          this.credit = true;
          this.radioGroupCredit = true;
          this.transfer = false;
          this.radioGroupTransfer = false;
          break;
        case 3:
          this.dues = false;
          this.radioGroupDues = false;
          this.credit = false;
          this.radioGroupCredit = false;
          this.transfer = true;
          this.radioGroupTransfer = true;
          break;
      }
    },

    canCheckout() {
      if (this.radioGroupDues === 0) {
        this.showSelectDelivery = true;
        this.payments_type = "installments";
        this.default_installments = 18;
        this.totalPrice();
      }

      if (this.radioGroupCredit === 0) {
        this.showSelectDelivery = true;
        this.payments_type = "card";
        this.default_installments = "";
        this.totalPrice();
      }

      if (this.radioGroupTransfer === 0) {
        this.showSelectDelivery = true;
        this.totalPrice();
      }
    },

    async HandlerTransferCheckout(cart) {
      try {
        this.loadingCheckout = true;

        const address =
          this.idAddress == undefined
            ? ""
            : typeof this.idAddress == "number"
            ? this.idAddress
            : this.idAddress.id;
        const id = address;
        const request = {
          store_id: 3,
          store_pickup: this.radioGroup == 0 ? true : false,
          shopping_cart_id: cart.id,
          addresse_id: id,
          warehouse_id: this.radioGroup == 0 ? this.canBuyWarehouse.id : "",
          quote: this.quote
        };

        const response = await this.$store.dispatch(
          "checkout/CHECKOUT_TRANSFER",
          request
        );

        await this.goToEmailTransfer();

        this.responseTransferCheckout = response.data.data;
        this.showModalTransfer = true;
      } catch (error) {
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

    totalPrice(cart_items) {
      let priceTotal = 0;
      if (cart_items != undefined) {
        priceTotal = cart_items.reduce((acc, arr) => {
          if (this.radioGroupDues === 0) {
            acc +=
              arr.publication.price.pvp_18_installments * arr.original_quantity;
          } else if (this.radioGroupCredit === 0) {
            acc += arr.publication.price.pvp * arr.original_quantity;
          } else if (this.radioGroupTransfer === 0) {
            acc += arr.publication.price.pvp_transfer * arr.original_quantity;
          }
          return acc;
        }, 0);
      }
      return priceTotal;
    },

    async goToEmailTransfer() {
      try {
        this.loadingLocation = true;

        await this.$store.dispatch("products/EMAIL_TRANSFER");
        this.$snotify.success(
          `Se ha enviado un email con los datos bancarios`,
          "Exitos"
        );
      } catch (error) {
        this.$snotify.error(
          "No se ha podido enviar los datos al correo, intente mas tarde",
          "Error"
        );
      } finally {
        this.loadingLocation = false;
      }
    }
  }
};
</script>

<style></style>
