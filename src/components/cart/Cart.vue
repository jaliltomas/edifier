<template>
  <div class="d-flex flex-column" style=" overflow: hidden; background-color: #F8F9FA;">
    <v-container class="d-flex flex-column pa-0" style="max-width: 1000px; height: 100%;">
      
      <!-- COMPACT HEADER -->
      <div class="d-flex flex-column align-center pt-4 pb-2 flex-shrink-0">
        <h1 class="text-h6 font-weight-bold grey--text text--darken-3 mb-1" style="letter-spacing: 0.5px;">
          Lista de Compra
        </h1>
        <div class="primary-underline"></div>
      </div>

      <!-- STEPPER -->
      <v-stepper v-model="e1" alt-labels class="elevation-0 bg-transparent d-flex flex-column flex-grow-1 overflow-hidden">
        <v-stepper-header class="elevation-0 bg-transparent mb-2 flex-shrink-0" style="height: auto;">
          <v-stepper-step :complete="e1 > 1" step="1" color="#00A0E9" class="py-2">
            <span :class="{'font-weight-bold text-primary': e1 === 1}" style="font-size: 0.8rem;">Carrito</span>
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2" color="#00A0E9" class="py-2">
            <span :class="{'font-weight-bold text-primary': e1 === 2}" style="font-size: 0.8rem;">Pago</span>
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 3" step="3" color="#00A0E9" class="py-2">
            <span :class="{'font-weight-bold text-primary': e1 === 3}" style="font-size: 0.8rem;">Envío</span>
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items class="flex-grow-1 overflow-hidden relative">
          <!-- STEP 1: CART ITEMS -->
          <v-stepper-content step="1" class="pa-0 fill-height">
            <div class="d-flex flex-column fill-height overflow-hidden">
            <v-card class="rounded-lg elevation-0 flex-grow-1 d-flex flex-column overflow-hidden white">
              <v-card-text class="pa-0 flex-grow-1 overflow-hidden">
                <v-row no-gutters class="fill-height">
                  <v-col cols="12" class="pa-0 fill-height">
                    <table-items :products="productCartState.shopping_cart_items" />
                  </v-col>
                </v-row>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions class="pa-3 grey lighten-5 d-flex justify-space-between align-center flex-shrink-0">
                  <v-btn
                    text
                    small
                    color="grey darken-1"
                    @click="$router.go(-1)"
                    class="text-capitalize"
                  >
                    <v-icon left small>mdi-arrow-left</v-icon>
                    Volver
                  </v-btn>

                  <div class="d-flex align-center">
                      <div class="mr-4 text-right" v-if="productCartState.shopping_cart_items.length > 0">
                          <span class="text-caption grey--text text--darken-1 d-block" style="line-height: 1;">Subtotal</span>
                          <span class="text-subtitle-1 font-weight-bold black--text">
                              ${{ totalPriceOnePayment(originalItems.shopping_cart_items) | currency }}
                          </span>
                      </div>
                      <v-btn
                        rounded
                        color="#00A0E9"
                        class="white--text px-6 text-capitalize font-weight-bold shadow-blue"
                        @click="e1 = 2"
                        :disabled="productCartState.shopping_cart_items.length === 0"
                        small
                      >
                        Siguiente
                        <v-icon right small>mdi-arrow-right</v-icon>
                      </v-btn>
                  </div>
              </v-card-actions>
            </v-card>
            </div>
          </v-stepper-content>

          <!-- STEP 2: PAYMENT METHOD -->
          <v-stepper-content step="2" class="pa-0 fill-height">
            <div class="d-flex flex-column fill-height overflow-hidden">
            <v-row justify="center" class="fill-height ma-0 overflow-auto custom-scrollbar">
              <v-col cols="12" md="10" lg="8" class="pa-0">
                <v-card class="rounded-lg elevation-0 mt-1 white">
                  <div class="text-center pt-4 pb-1">
                      <h2 class="text-subtitle-1 font-weight-bold grey--text text--darken-3">Forma de pago</h2>
                  </div>
                  
                  <v-card-text class="px-4 py-2">
                    <v-row dense>
                      <!-- 6 CUOTAS -->
                      <v-col cols="12" sm="4" class="d-flex pa-1">
                        <v-card
                          outlined
                          class="flex-grow-1 payment-card d-flex flex-column align-center justify-center pa-3 transition-swing"
                          :class="{'selected-payment-card': radioGroupDues === 0}"
                          @click="checkoutType(1)"
                          ripple
                        >
                          <v-icon :color="radioGroupDues === 0 ? '#00A0E9' : 'grey lighten-1'" class="mb-1">mdi-credit-card-clock-outline</v-icon>
                          <span class="text-body-2 font-weight-bold black--text">6 Cuotas</span>
                          <span class="caption grey--text text-center" style="font-size: 0.7rem;">Sin Interés</span>
                        </v-card>
                      </v-col>

                      <!-- 1 PAGO -->
                      <v-col cols="12" sm="4" class="d-flex pa-1">
                        <v-card
                          outlined
                          class="flex-grow-1 payment-card d-flex flex-column align-center justify-center pa-3 transition-swing"
                          :class="{'selected-payment-card': radioGroupCredit === 0}"
                          @click="checkoutType(2)"
                          ripple
                        >
                           <v-icon :color="radioGroupCredit === 0 ? '#00A0E9' : 'grey lighten-1'" class="mb-1">mdi-credit-card-outline</v-icon>
                           <span class="text-body-2 font-weight-bold black--text">1 Pago</span>
                           <span class="caption grey--text text-center" style="font-size: 0.7rem;">Débito / Crédito</span>
                        </v-card>
                      </v-col>

                      <!-- TRANSFERENCIA -->
                      <v-col cols="12" sm="4" class="d-flex pa-1">
                        <v-card
                          outlined
                          class="flex-grow-1 payment-card d-flex flex-column align-center justify-center pa-3 transition-swing"
                          :class="{'selected-payment-card': radioGroupTransfer === 0}"
                          @click="checkoutType(3)"
                          ripple
                        >
                            <v-icon :color="radioGroupTransfer === 0 ? '#00A0E9' : 'grey lighten-1'" class="mb-1">mdi-bank-transfer</v-icon>
                            <span class="text-body-2 font-weight-bold black--text">Transferencia</span>
                            <span class="caption grey--text text-center" style="font-size: 0.7rem;">Bancaria</span>
                        </v-card>
                      </v-col>
                    </v-row>

                    <v-divider class="my-4"></v-divider>
                    
                    <div class="d-flex justify-space-between align-center px-3 py-2 grey lighten-5 rounded">
                      <span class="text-caption grey--text text--darken-2 font-weight-medium">Total</span>
                      <span class="text-subtitle-1 font-weight-black black--text">
                           ${{ (totalPrice(originalItems.shopping_cart_items) || totalAmount) | currency }}
                      </span>
                    </div>
                  </v-card-text>

                  <v-card-actions class="px-4 pb-4 pt-0 justify-space-between">
                       <v-btn text small color="grey darken-1" @click="e1 = 1" class="text-capitalize">
                           <v-icon left small>mdi-arrow-left</v-icon> Atrás
                       </v-btn>
                       <v-btn
                          :disabled="radioGroupDues == null && radioGroupCredit == null && radioGroupTransfer == null"
                          color="#00A0E9"
                          class="white--text px-6 shadow-blue"
                          rounded
                          small
                          @click="canCheckoutStepper()"
                        >
                          Siguiente
                          <v-icon right small>mdi-arrow-right</v-icon>
                        </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            </div>
          </v-stepper-content>

          <!-- STEP 3: DELIVERY/PICKUP -->
          <v-stepper-content step="3" class="pa-0 fill-height">
            <div class="d-flex flex-column fill-height overflow-hidden">
             <v-row justify="center" class="fill-height ma-0 overflow-auto custom-scrollbar">
              <v-col cols="12" md="10" lg="8" class="pa-0">
                <v-card :loading="loadingCheckout" class="rounded-lg elevation-0 mt-1 white">
                  <div class="text-center pt-4 pb-1">
                      <h2 class="text-subtitle-1 font-weight-bold grey--text text--darken-3">Método de entrega</h2>
                  </div>

                  <v-card-text class="px-4 py-2">
                    <!-- Delivery Selection Cards -->
                    <v-radio-group v-model="radioGroup" @change="HandlerShippingQuote()" class="mt-0" hide-details>
                        <v-row dense class="mb-3">
                            <v-col cols="12" sm="6" class="pa-1">
                                <v-card 
                                  outlined 
                                  class="delivery-option-card pa-3 cursor-pointer transition-swing d-flex align-center"
                                  :class="{'selected-delivery-card': radioGroup === 0}"
                                  @click="radioGroup = 0; HandlerShippingQuote()"
                                  ripple
                                >
                                    <div class="mr-3 rounded-circle blue lighten-5 pa-2 d-flex">
                                        <v-icon small color="#00A0E9">mdi-store</v-icon>
                                    </div>
                                    <div class="flex-grow-1">
                                        <div class="font-weight-bold text-body-2 black--text">Retiro en tienda</div>
                                        <div class="caption grey--text" style="line-height: 1;">Gratis</div>
                                    </div>
                                    <v-radio :value="0" color="#00A0E9" class="ma-0"></v-radio>
                                </v-card>
                            </v-col>
                            <v-col cols="12" sm="6" class="pa-1">
                                <v-card 
                                  outlined 
                                  class="delivery-option-card pa-3 cursor-pointer transition-swing d-flex align-center"
                                  :class="{'selected-delivery-card': radioGroup === 1}"
                                  @click="radioGroup = 1; HandlerShippingQuote()"
                                  ripple
                                >
                                    <div class="mr-3 rounded-circle blue lighten-5 pa-2 d-flex">
                                        <v-icon small color="#00A0E9">mdi-truck-delivery</v-icon>
                                    </div>
                                    <div class="flex-grow-1">
                                        <div class="font-weight-bold text-body-2 black--text">Envío a domicilio</div>
                                        <div class="caption grey--text" style="line-height: 1;">Calculado</div>
                                    </div>
                                    <v-radio :value="1" color="#00A0E9" class="ma-0"></v-radio>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-radio-group>

                    <v-expand-transition>
                        <div v-if="radioGroup !== null">
                            <!-- RETIRO EN TIENDA CONTENT -->
                            <div v-if="radioGroup == 0" class="details-container pa-3 rounded grey lighten-5 mb-2">
                               <div v-if="userAddress.length > 0">
                                   <div v-if="availableWharehouses.length > 0">
                                      <p class="font-weight-bold mb-2 text-caption black--text">Punto de retiro:</p>
                                      <v-radio-group v-model="selectedWharehouse" mandatory dense hide-details>
                                        <v-radio
                                          v-for="n in availableWharehouses"
                                          :key="n.id"
                                          :label="`${depositElements[n.name]}`"
                                          :value="`${n.warehouse_id}`"
                                          color="#00A0E9"
                                          class="mb-1"
                                        >
                                          <template v-slot:label>
                                            <span class="text-caption text-uppercase font-weight-medium">{{depositElements[n.name]}}</span>
                                          </template>
                                        </v-radio>
                                      </v-radio-group>
                                   </div>
                                   <div v-else class="text-center py-2">
                                     <p class="error--text caption font-weight-medium ma-0">Sin stock en tiendas.</p>
                                   </div>
                               </div>
                               <div v-else class="text-center py-2">
                                  <p class="mb-2 text-caption black--text">Necesitamos una dirección de facturación.</p>
                                  <cart-address-form @address-added="HandlerAddressAdded" />
                               </div>
                            </div>

                            <!-- ENTREGA A DOMICILIO CONTENT -->
                            <div v-if="radioGroup == 1" class="details-container pa-3 rounded grey lighten-5 mb-2">
                              <div v-if="userAddress.length > 0">
                                 <p class="font-weight-bold mb-2 text-caption black--text">Dirección de entrega:</p>
                                 <v-select
                                    @change="HandlerShippingQuote()"
                                    :items="userAddress"
                                    :item-text="item => `${item.street} ${item.street_number} - ${item.location}`"
                                    item-value="id"
                                    outlined
                                    dense
                                    background-color="white"
                                    placeholder="Elige una dirección"
                                    return-object
                                    v-model="idAddress"
                                    hide-details="auto"
                                    class="text-body-2"
                                  >
                                    <template v-slot:prepend-inner>
                                        <v-icon small color="#00A0E9">mdi-map-marker</v-icon>
                                    </template>
                                  </v-select>
                                  
                                  <div class="d-flex justify-end mt-1">
                                      <v-btn x-small text color="#00A0E9" @click="$router.push({ name: 'profile', query: { action: 1 } })" class="px-0">
                                          <v-icon left x-small>mdi-plus</v-icon> Gestionar
                                      </v-btn>
                                  </div>
                              </div>
                              <div v-else>
                                 <cart-address-form @address-added="HandlerAddressAdded" />
                              </div>
                            </div>
                        </div>
                    </v-expand-transition>

                    <!-- SUMMARY SECTION -->
                    <v-card flat outlined class="mt-3 rounded">
                        <v-card-text class="py-2 px-3">
                            <div class="d-flex justify-space-between mb-1">
                                <span class="grey--text text--darken-1 text-caption">Subtotal</span>
                                <span class="font-weight-medium black--text text-caption">
                                    ${{ totalPrice(originalItems.shopping_cart_items) | currency }}
                                </span>
                            </div>
                            <div class="d-flex justify-space-between mb-1" v-if="radioGroup === 1">
                                <span class="grey--text text--darken-1 text-caption">Envío</span>
                                <span class="font-weight-medium black--text text-caption">
                                    <span v-if="quote > 0">${{ quote | currency }}</span>
                                    <span v-else class="green--text">Calculando...</span>
                                </span>
                            </div>
                            <v-divider class="my-1"></v-divider>
                            <div class="d-flex justify-space-between align-end">
                                <span class="text-body-2 font-weight-bold black--text">Total</span>
                                <span class="text-h6 font-weight-black blue--text text--darken-1">
                                    ${{ (totalPrice(originalItems.shopping_cart_items) + (radioGroup === 1 ? quote : 0)) | currency }}
                                </span>
                            </div>
                        </v-card-text>
                    </v-card>

                    <div v-if="errorGetQuoute" class="error--text text-center mt-2 caption" style="line-height: 1.2;">
                      No se pudo cotizar el envío. Verifica tu dirección.
                    </div>

                  </v-card-text>
                  <v-card-actions class="px-4 pb-4 pt-0 justify-space-between">
                    <v-btn text small color="grey darken-1" @click="e1 = 2" class="text-capitalize">
                        <v-icon left small>mdi-arrow-left</v-icon> Atrás
                    </v-btn>
                    <v-btn
                      rounded
                      small
                      :loading="loadingCheckout"
                      :disabled="
                        radioGroup == null ||
                        (radioGroup == 1 && (!statusQuote || userAddress.length === 0 || !idAddress || errorGetQuoute)) ||
                        (radioGroup == 0 && (userAddress.length === 0 || canBuyWarehouse == null || !selectedWharehouse))
                      "
                      @click="HandlerConfirmItems()"
                      color="#14A7EB"
                      class="white--text px-6 shadow-blue text-capitalize font-weight-bold"
                    >
                      Finalizar
                      <v-icon right small>mdi-check</v-icon>
                    </v-btn>
                  </v-card-actions>
                  </v-card>
              </v-col>
             </v-row>
             </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>

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
        v-model="showAlertPerfil"
        v-if="showAlertPerfil"
        max-width="600"
        persistent
      >
        <cart-profile-form
            :missingDetails="alertPerfil"
            @cancel="showAlertPerfil = false"
            @profile-updated="HandlerProfileUpdated"
        />
      </v-dialog>
      <v-dialog
        v-model="checkoutDialog"
        max-width="1100"
        scrollable
        persistent
      >
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center pr-2">
            <div class="d-flex align-center">
              <v-icon color="#00A0E9" left>mdi-credit-card</v-icon>
              <span class="font-weight-bold text-subtitle-1">Finaliza tu pago</span>
            </div>
            <v-btn icon @click="closeCheckoutDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider class="mb-0"></v-divider>
          <v-card-text class="pa-0">
            <div class="checkout-frame-wrapper">
              <iframe
                v-if="checkoutUrl"
                class="checkout-frame"
                :src="checkoutUrl"
                frameborder="0"
                allowfullscreen
              ></iframe>
              <div v-else class="d-flex align-center justify-center py-12">
                <v-progress-circular indeterminate color="#00A0E9"></v-progress-circular>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
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
import CartAddressForm from "./utils/CartAddressForm.vue";
import CartProfileForm from "./utils/CartProfileForm.vue";

export default {
  components: {
    DialogNotification,
    AceptNoItems,
    TableItems,
    "suscribe-component": Suscribe,
    "transfer-checkout": TransferCheckout,
    "cart-address-form": CartAddressForm,
    "cart-profile-form": CartProfileForm
  },
  data() {
    return {
      e1: 1,
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
      depositElements: {
        FWL01: "CABA",
        ROS01: "Rosario",
        CBA01: "Córdoba Capital"
      },
      selectDeposit: "",
      dues: false,
      credit: false,
      transfer: false,
      radioGroupDues: null,
      radioGroupCredit: null,
      radioGroupTransfer: null,
      payments_type: "",
      default_installments: "",
      availableWharehouses: [],
      selectedWharehouse: "",

      showModalTransfer: false,

      // Notifiction Checkout
      alertNotificationBuy: false,
      canBuyWarehouse: null,

      // Checkout
      responseTransferCheckout: {},

      // Error Checkout
      showAlertPerfil: false,
      alertPerfil: [],

      loadingLocation: false,
      freeShipping: true,

      // Embedded checkout
      checkoutDialog: false,
      checkoutUrl: ""
    };
  },

    created() {
    this.HandlerGetCartsProducts();
    if (this.isAuth) {
      this.HandlerGetAddress();
    }
    window.fbq("trackCustom", "CartView");
  },

  mounted() {
    window.addEventListener("message", this.handleCheckoutMessage);
  },

  beforeDestroy() {
    window.removeEventListener("message", this.handleCheckoutMessage);
  },

    watch: {
    radioGroup(val) {
      console.log(val);
      if (val == 0) {
        this.ValidateProductWarehouse();
      }
    },
    e1(val) {
      if(val === 3) {
        this.HandlerGetAddress();
        // Check if we have addresses, if so, prioritize one
        if (this.userAddress.length > 0 && this.radioGroup == 1) {
           this.getUserAddressPriority();
        }
        // If pickup is selected and we have addresses, ensure warehouse validation
        if (this.radioGroup == 0 && this.userAddress.length > 0) {
           this.ValidateProductWarehouse();
        }
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
    async HandlerShippingQuote() {
      try {
        let calculatedQuote = 0;
        if (!this.freeShipping) {
          this.errorGetQuoute = false;
          this.loadingCheckout = true;
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

          calculatedQuote = response.data.data;
        }
        this.quote = calculatedQuote;
        this.total_order = this.totalAmount + this.quote;
      } catch (error) {
        if (this.userAddress.length > 0) {
          this.errorGetQuoute = true;
        }
      } finally {
        this.statusQuote = true;
        this.loadingCheckout = false;
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
          warehouse_id:
            this.radioGroup == 0 ? Number(this.selectedWharehouse) : "",
          store_id: 3,
          payment_type: this.payments_type,
          default_installments: this.default_installments,
          quote: this.radioGroup == 0 ? 0 : this.quote
        };

        const response = await this.$store.dispatch(
          "products/CHECKOUT_DO",
          request
        );
        this.checkoutUrl = response.data.data.url;
        this.checkoutDialog = true;
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

    handleCheckoutMessage(event) {
      if (event.origin !== window.location.origin) return;
      const data = event.data || {};
      if (data.type === "mp-checkout-result") {
        if (data.success) {
          this.$store.commit("cart/CLEAN_CART");
        }
        this.checkoutDialog = false;
        this.checkoutUrl = "";
        if (data.query) {
          this.$router.push({
            name: "checkout_notifiction",
            query: data.query
          });
        }
      }
    },

    closeCheckoutDialog() {
      this.checkoutDialog = false;
      this.checkoutUrl = "";
    },

    HandlerCloseAcceptProduct() {
      this.showAlertCheckout = false;
    },

    async ValidateProductWarehouse() {
      try {
        this.loadingCheckout = true;
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

        this.availableWharehouses = response.data.data.same_warehouse_summary.filter(
          w => w.count > 0
        );

        this.canBuyWarehouse = true;

        //if (response.data.data.store_pickup == false)
        //  this.alertNotificationBuy = true;
        //if (response.data.data.store_pickup == true)
        //  this.canBuyWarehouse = response.data.data.warehouse;
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingCheckout = false;
      }
    },

    canCheckoutStepper() {
      if (!this.isAuth) {
        this.$router.push({ name: "login" });
        return;
      }
      
      this.errorGetQuoute = false;
      if (this.radioGroupDues === 0) {
        this.payments_type = "installments";
        this.default_installments = 6;
        this.e1 = 3; // Move to delivery step
        this.totalPrice();
      }

      if (this.radioGroupCredit === 0) {
        this.payments_type = "card";
        this.default_installments = "";
        this.e1 = 3; // Move to delivery step
        this.totalPrice();
      }

      if (this.radioGroupTransfer === 0) {
        this.e1 = 3; // Move to delivery step
        this.totalPrice();
      }
    },

    checkoutType(val) {
      switch (val) {
        case 1:
          this.dues = true;
          this.radioGroupDues = 0;
          this.credit = false;
          this.radioGroupCredit = null;
          this.transfer = false;
          this.radioGroupTransfer = null;
          break;
        case 2:
          this.dues = false;
          this.radioGroupDues = null;
          this.credit = true;
          this.radioGroupCredit = 0;
          this.transfer = false;
          this.radioGroupTransfer = null;
          break;
        case 3:
          this.dues = false;
          this.radioGroupDues = null;
          this.credit = false;
          this.radioGroupCredit = null;
          this.transfer = true;
          this.radioGroupTransfer = 0;
          break;
      }
    },

    canCheckout() {
      if (!this.isAuth) {
        this.$router.push({ name: "login" });
        return;
      }
      this.errorGetQuoute = false;
      if (this.radioGroupDues === 0) {
        this.showSelectDelivery = true;
        this.payments_type = "installments";
        this.default_installments = 6;
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
          warehouse_id:
            this.radioGroup == 0 ? Number(this.selectedWharehouse) : "",
          quote: this.radioGroup == 0 ? 0 : this.quote
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

    totalPriceOnePayment(cart_items) {
      let priceTotal = 0;
      if (cart_items != undefined) {
        priceTotal = cart_items.reduce((acc, arr) => {
          acc += arr.publication.price.pvp * arr.original_quantity;
          return acc;
        }, 0);
      }
      return priceTotal;
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
    },

    HandlerAddressAdded() {
      this.HandlerGetAddress();
    },

    async HandlerProfileUpdated() {
        this.showAlertPerfil = false;
        await this.$store.dispatch("auth/AUTH_USER"); // Refresh user data
        // Retry the checkout process depending on the flow
        if (this.radioGroupTransfer === 0) {
             const shopping_cart = this.productCartState; // Assuming this holds the necessary cart info or re-fetch
             this.HandlerTransferCheckout(shopping_cart);
        } else {
             this.HandlerCheckout();
        }
    }
  }
};
</script>

<style scoped>
/* Custom Styles for Modern Cart */
.bg-transparent {
    background-color: transparent !important;
}

.shadow-blue {
    box-shadow: none !important;
}

.primary-underline {
    width: 40px;
    height: 3px;
    background-color: #00A0E9;
    border-radius: 2px;
}

/* Payment Cards */
.payment-card {
    border: 1px solid #E0E0E0 !important;
    background-color: white !important;
    border-radius: 8px !important;
}

.payment-card:hover {
    border-color: #B3E5FC !important;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.05) !important;
}

.selected-payment-card {
    border-color: #00A0E9 !important;
    background-color: #F0F9FF !important;
}

/* Delivery Option Cards */
.delivery-option-card {
    border: 1px solid #E0E0E0 !important;
    background-color: white !important;
    border-radius: 8px !important;
}

.selected-delivery-card {
    border-color: #00A0E9 !important;
    background-color: #F0F9FF !important;
}

.transition-swing {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

/* Input overrides */
.v-input--radio-group--column .v-radio {
    margin-bottom: 4px;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e0e0e0;
  border-radius: 2px;
}

.checkout-frame-wrapper {
  height: 80vh;
  background: #f9f9f9;
}

.checkout-frame {
  width: 100%;
  height: 80vh;
  border: none;
}

@media (max-width: 960px) {
  .checkout-frame-wrapper,
  .checkout-frame {
    height: 70vh;
  }
}
</style>
