<template>
  <v-dialog
    v-model="showModalTransfer"
    max-width="100%"
    max-height="100%"
    persistent
    scrollable
  >
    <v-card color="#F1F1F1">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <div style="position: relative;">
                 <!-- Close Button -->
                 <v-btn icon absolute top right @click="HandlerGoProfile()" class="mr-n2 mt-n2">
                    <v-icon color="grey darken-2">mdi-close</v-icon>
                 </v-btn>

                 <!-- Success Header -->
                 <div class="text-center pt-8 pb-6">
                    <v-icon size="72" color="#00C853" class="mb-4">mdi-check-circle</v-icon>
                    <h2 class="text-h5 font-weight-bold grey--text text--darken-3 mb-2">¡Felicitaciones!</h2>
                    <div class="subtitle-1 grey--text text--darken-1">
                       Muchas gracias por tu compra
                    </div>
                 </div>
              </div>

              <!-- Bank Transfer Section -->
              <div v-if="bankTransfer()" class="mb-6 px-md-10">
                 <div class="text-center mb-4">
                    <v-chip outlined color="primary" class="font-weight-bold text-uppercase">
                       Forma de Pago Elegida
                    </v-chip>
                 </div>
                 
                 <v-card outlined class="rounded-xl overflow-hidden" style="border: 2px solid #F5F5F5;">
                    <!-- Bank Header -->
                    <div class="d-flex align-center pa-5 grey lighten-5">
                       <v-img 
                         max-width="50" 
                         contain 
                         src="@/assets/img/checkout/transferencia.svg"
                         class="mr-4"
                       ></v-img>
                       <div>
                          <div class="subtitle-1 font-weight-bold grey--text text--darken-4">Transferencia Bancaria</div>
                          <div class="caption grey--text">Datos para realizar el pago</div>
                       </div>
                    </div>
                    <v-divider></v-divider>

                    <div class="pa-5">
                       <!-- Bank Details Grid -->
                       <v-row dense class="mb-4">
                          <v-col cols="12" sm="6" >
                             <div class="d-flex flex-column mb-3">
                                <span class="caption grey--text text-uppercase font-weight-bold">Banco</span>
                                <span class="body-2 grey--text text--darken-3">Banco Francés</span>
                             </div>
                          </v-col>
                          <v-col cols="12" sm="6">
                             <div class="d-flex flex-column mb-3">
                                <span class="caption grey--text text-uppercase font-weight-bold">Titular</span>
                                <span class="body-2 grey--text text--darken-3">G. IKONO SA</span>
                             </div>
                          </v-col>
                          <v-col cols="12" sm="6">
                             <div class="d-flex flex-column mb-3">
                                <span class="caption grey--text text-uppercase font-weight-bold">Cuenta</span>
                                <span class="body-2 grey--text text--darken-3">470-0003973/1</span>
                             </div>
                          </v-col>
                          <v-col cols="12" sm="6">
                             <div class="d-flex flex-column mb-3">
                                <span class="caption grey--text text-uppercase font-weight-bold">CUIT</span>
                                <span class="body-2 grey--text text--darken-3">30-70497382-5</span>
                             </div>
                          </v-col>
                       </v-row>
                       
                       <!-- CBU Box -->
                       <v-sheet 
                          color="#E1F5FE" 
                          class="rounded-lg pa-4 text-center mb-5 d-flex flex-column align-center"
                          style="border: 1px dashed #039BE5;"
                        >
                          <div class="caption blue--text text--darken-3 font-weight-bold mb-1">CBU / ALIAS</div>
                          <div class="text-h6 font-weight-black blue--text text--darken-4 mb-3 text-break" style="font-family: monospace;">
                             0170470320000000397319
                          </div>
                          <v-btn 
                            color="#0288D1" 
                            dark 
                            rounded 
                            small 
                            elevation="0"
                            @click="handlerCoy('0170470320000000397319')"
                          >
                             <v-icon left small>mdi-content-copy</v-icon>
                             {{ isCopyCBU === 'CBU1' ? '¡Copiado!' : 'Copiar CBU' }}
                          </v-btn>
                       </v-sheet>
                       
                        <!-- Instructions (Timer) -->
                       <v-alert
                          dense
                          text
                          type="info"
                          color="blue-grey"
                          class="mb-0 caption"
                          border="left"
                       >
                          Tu operación se mantiene activa por <strong>1 hora</strong>. 
                          Monto a transferir: <strong>{{ (orderData.total_amount + (orderData.total_amount_with_shipping - orderData.total_amount)) | currencyTotal }}</strong>
                       </v-alert>
                    </div>

                    <v-divider></v-divider>

                    <!-- Upload Action -->
                    <div class="pa-5">
                       <div v-if="!dowloadTransfer">
                          <div class="d-flex flex-column flex-sm-row align-center justify-space-between">
                             <div class="mb-3 mb-sm-0 text-center text-sm-left mr-sm-4">
                                <div class="subtitle-2 font-weight-bold black--text">Subir Comprobante</div>
                                <div class="caption grey--text">Para finalizar y agilizar el envío</div>
                             </div>
                             <v-btn 
                               color="#A5253E" 
                               dark 
                               rounded
                               depressed
                               @click="uploadTransfer = true"
                             >
                                <v-icon left>mdi-cloud-upload</v-icon>
                                Adjuntar
                             </v-btn>
                          </div>
                       </div>
                       <v-alert
                         v-else
                         type="success"
                         text
                         dense
                         class="mb-0"
                       >
                         <strong>¡Comprobante subido!</strong> Verificaremos tu pago en breve.
                       </v-alert>
                    </div>
                    
                    <!-- Footer Info -->
                     <div class="pa-3 grey lighten-4 text-center">
                         <span class="caption grey--text text--darken-1">
                             También podés subirlo luego desde <strong>Perfil > Compras</strong>
                         </span>
                     </div>
                 </v-card>
              </div>
            </v-col>
            <v-col cols="12" md="12">
              <div class="text-sub-title-order ml-10">DETALLE DE TU COMPRA</div>
              <v-simple-table class="mt-5">
                <template v-slot:default>
                  <thead style="background-color: #fafafa">
                    <tr>
                      <th
                        style="font-size: 14px; font-weight: 600; width: 70%"
                        class="text-left pl-10"
                      >
                        Producto
                      </th>
                      <th
                        style="font-size: 14px; font-weight: 600; width: 15%"
                        class="text-center"
                      >
                        Cantidad
                      </th>
                      <th
                        style="font-size: 14px; font-weight: 600; width: 15%"
                        class="text-center"
                      >
                        Precio
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in orderData.order_item"
                      :key="index"
                    >
                      <td v-if="item.publication != null">
                        <div class="d-flex align-center pl-5">
                          <v-avatar
                            tile
                            v-if="item.publication.images.length > 0"
                          >
                            <v-img
                              :src="item.publication.images[0]"
                              :lazy-src="item.publication.images[0]"
                              contain
                            >
                            </v-img>
                          </v-avatar>
                          <div class="text-uppercase ml-2">
                            {{ item.publication.keywords }}
                          </div>
                        </div>
                      </td>
                      <td class="text-center">
                        {{ item.quantity }}
                      </td>
                      <td class="text-center">
                        {{
                          priceProduct(item.publication.price) | currencyTotal
                        }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-card class="mt-2 py-2 elevation-0" color="transparent">
                <v-card
                  max-width="200px"
                  class="ml-auto py-2 pr-md-12 elevation-0"
                >
                  <div class="d-flex justify-space-between">
                    <span style="font-size: 0.8.5em" class="pl-3">ENVÍO</span>
                    <span style="font-size: 0.8.5em">
                      {{
                        (orderData.total_amount_with_shipping -
                          orderData.total_amount)
                          | currencyTotal
                      }}
                    </span>
                  </div>
                  <div class="d-flex justify-space-between mt-3">
                    <span style="font-size: 0.8.5em" class="pl-3">TOTAL</span>
                    <span style="font-size: 0.8.5em">
                      {{ orderData.total_amount_with_shipping | currencyTotal }}
                    </span>
                  </div>
                </v-card>
              </v-card>
            </v-col>
            <v-col cols="12" md="5">
               <v-card outlined class="fill-height rounded-xl" style="border: 1px solid #E0E0E0;">
                  <div class="pa-4 grey lighten-5 d-flex align-center">
                     <v-icon color="primary" class="mr-2">mdi-receipt</v-icon>
                     <div class="subtitle-2 font-weight-bold grey--text text--darken-3 text-uppercase">
                        Datos de Facturación
                     </div>
                  </div>
                  <v-divider></v-divider>
                  <div class="pa-4">
                     <div class="d-flex align-center mb-3">
                        <v-icon size="20" color="grey lighten-1">mdi-account</v-icon>
                        <div class="ml-3">
                           <div class="caption grey--text">Nombre</div>
                           <div class="subtitle-2 font-weight-regular text-truncate" v-if="authUser.buyer != null">
                              {{ authUser.buyer.first_name }}
                           </div>
                        </div>
                     </div>
                     <div class="d-flex align-center mb-3">
                        <v-icon size="20" color="grey lighten-1">mdi-email</v-icon>
                        <div class="ml-3" style="min-width: 0; flex: 1;">
                           <div class="caption grey--text">Email</div>
                           <div class="subtitle-2 font-weight-regular text-truncate" v-if="authUser.buyer != null">
                              {{ authUser.buyer.email }}
                           </div>
                        </div>
                     </div>
                     <div class="d-flex align-center mb-3">
                        <v-icon size="20" color="grey lighten-1">mdi-phone</v-icon>
                        <div class="ml-3">
                           <div class="caption grey--text">Teléfono</div>
                           <div class="subtitle-2 font-weight-regular" v-if="authUser.buyer != null">
                              {{ authUser.buyer.phone }}
                           </div>
                        </div>
                     </div>
                     <div class="d-flex align-center">
                        <v-icon size="20" color="grey lighten-1">mdi-card-account-details</v-icon>
                        <div class="ml-3">
                           <div class="caption grey--text">{{ authUser.buyer.doc_type || 'Documento' }}</div>
                           <div class="subtitle-2 font-weight-regular" v-if="authUser.buyer != null">
                              {{ authUser.buyer.doc_number }}
                           </div>
                        </div>
                     </div>
                  </div>
               </v-card>
            </v-col>
            
            <v-col cols="12" md="7">
               <v-card outlined class="fill-height rounded-xl" style="border: 1px solid #E0E0E0;">
                  <div class="pa-4 grey lighten-5 d-flex align-center">
                     <v-icon color="primary" class="mr-2">mdi-truck-delivery</v-icon>
                     <div class="subtitle-2 font-weight-bold grey--text text--darken-3 text-uppercase">
                        Datos de Envío
                     </div>
                  </div>
                  <v-divider></v-divider>
                  <div class="pa-4">
                     <v-row v-if="shippingAddress">
                        <!-- Location -->
                        <v-col cols="12" sm="6" class="pb-2">
                           <div class="d-flex">
                              <v-icon size="20" color="grey lighten-1" class="mt-1">mdi-map-marker</v-icon>
                              <div class="ml-3">
                                 <div class="caption grey--text">Ubicación</div>
                                 <div class="subtitle-2 font-weight-regular text-capitalize">
                                    {{ shippingAddress.location }}, {{ shippingAddress.state?.name || 'N/A' }}
                                 </div>
                                 <div class="caption grey--text mt-1">CP: {{ shippingAddress.zipcode }}</div>
                              </div>
                           </div>
                        </v-col>
                        
                        <!-- Address -->
                        <v-col cols="12" sm="6" class="pb-2">
                           <div class="d-flex">
                              <v-icon size="20" color="grey lighten-1" class="mt-1">mdi-home</v-icon>
                              <div class="ml-3">
                                 <div class="caption grey--text">Dirección</div>
                                 <div class="subtitle-2 font-weight-regular">
                                    {{ shippingAddress.street }} {{ shippingAddress.street_number }}
                                 </div>
                                 <div class="caption grey--text mt-1">
                                    {{ shippingAddress.floor_number ? `Piso ${shippingAddress.floor_number}` : '' }} 
                                    {{ shippingAddress.department_number ? `Dpto ${shippingAddress.department_number}` : '' }}
                                 </div>
                              </div>
                           </div>
                        </v-col>
                     </v-row>
                     
                     <div v-else class="text-center pa-4 text--secondary">
                        <v-icon large color="grey lighten-2" class="mb-2">mdi-store</v-icon>
                        <div>Retiro en tienda</div>
                     </div>
                  </div>
               </v-card>
            </v-col>
          </v-row>
          <v-row justify="center">
            <div class="d-flex justify-center">
              <v-btn
                @click="HandlerGoProfile()"
                color="#00A0E9"
                dark
                rounded
                class="d-flex justify-center"
              >
                Cerrar
              </v-btn>
            </div>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="uploadTransfer"
      v-if="uploadTransfer"
      max-width="600"
      persistent
    >
      <ValidationObserver ref="obs" v-slot="{ passes }">
        <v-card class="px-5 py-5">
          <label for="">Numero de transferencia</label>
          <ValidationProvider
            name="transferencia"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="transfer_id"
              class="mt-2"
              color="#A81331"
              dense
              filled
              :error-messages="errors"
            >
            </v-text-field>
          </ValidationProvider>
          <label for="">Comprobante de transferencia</label>
          <ValidationProvider
            name="comprobante"
            rules="required"
            v-slot="{ errors }"
          >
            <v-file-input
              v-model="file"
              prepend-icon=""
              dense
              filled
              :error-messages="errors"
            ></v-file-input>
            <div class="d-flex">
              {{ message }}
            </div>
          </ValidationProvider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="uploadTransfer = false">cancelar</v-btn>
            <v-btn
              :disabled="dowloadTransfer == true"
              :loading="loadingUpload"
              rounded
              color="#A5253E"
              :dark="dowloadTransfer == true ? false : true"
              @click="passes(handlerUploadFile)"
            >
              continuar
            </v-btn>
          </v-card-actions>
        </v-card>
      </ValidationObserver>
    </v-dialog>
    <v-snackbar v-model="showAlertPay" centered multi-line>
      <span style="font-size: 1.2em"
        >Solo dispone una (1) hora para completar el pago</span
      >

      <template v-slot:action="{ attrs }">
        <v-btn icon color="pink" text v-bind="attrs" @click="goToProfile()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-dialog>
</template>

<script>
import moment from "moment";

export default {
  props: {
    showModalTransfer: {
      type: Boolean,
      default: false,
      required: true
    },
    productCartState: {
      type: Object,
      default: () => {},
      required: true
    },
    responseTransferCheckout: {
      type: Object,
      default: () => {},
      required: true
    },
    selectedAddress: {
      type: Object,
      default: () => null,
      required: false
    }
  },

  data() {
    return {
      //Data
      orderData: {},
      uploadTransfer: false,
      dowloadTransfer: false,
      loadingUpload: false,
      message: "",
      transfer_id: "",
      file: [],
      isCopyAlias: "ikono0",
      isCopyCBU: "CBU0",
      productPriceTotal: 0,
      loadingLocation: false,
      showAlertPay: false
    };
  },

  created() {
    this.HandlerGetData();
  },

  computed: {
    authUser() {
      return this.$store.getters["auth/GET_PROFILE"];
    },
    shippingAddress() {
      return this.selectedAddress || this.authUser?.address;
    }
  },

  watch: {
    showAlertPay(val) {
      if (!val) this.goToProfile();
    }
  },

  filters: {
    today(val) {
      return moment(val)
        .add("hour", 1)
        .locale("es")
        .format("HH:mm");
    },
    currencyTotal(value) {
      return new Intl.NumberFormat("es-AR", {
        currency: "ARS",
        style: "currency"
      }).format(value);
    }
  },

  methods: {
    currentHour() {
      return moment(new Date(), "DD-MM-YYYY hh:mm:ss")
        .add(60, "minutes")
        .format("DD/MM/YYYY hh:mm:ss");
    },
    async goToEmailTransfer() {
      try {
        this.loadingLocation = true;
        await this.$store.dispatch("products/EMAIL_TRANSFER");
        this.$snotify.success(
          `Email enviado con los datos bancarios`,
          "Exitos"
        );
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingLocation = false;
      }
    },

    async HandlerGetData() {
      try {
        const request = {
          id: this.responseTransferCheckout.id
        };
        const response = await this.$store.dispatch(
          "products/ODERS_DETAILS",
          request
        );
        this.orderData = { ...response.data.data };
      } catch (error) {
        console.log(error);
      }
    },

    async handlerUploadFile() {
      try {
        this.loadingUpload = true;
        const request = new FormData();
        request.append("voucher", this.file);
        request.append("transfer_id", this.transfer_id);
        request.append("order_id", this.orderData.id);

        const response = await this.$store.dispatch(
          "checkout/UPLOAD_TRANSFER",
          request
        );

        this.message = response.data.message;
        this.dowloadTransfer = true;
      } catch (error) {
        this.message = error.response.data.error.details;
      } finally {
        this.loadingUpload = false;
      }
    },

    handlerCoy(item) {
      let that = this;
      navigator.clipboard.writeText(item).then(
        function() {
          if (item == "ikono") {
            that.isCopyAlias = "ikono1";
            that.isCopyCBU = "CBU0";
          } else if (item == "0170470320000000397319") {
            that.isCopyCBU = "CBU1";
            that.isCopyAlias = "ikono0";
          }
        },
        function(err) {
          console.error("Async: Could not copy text: ", err);
        }
      );
    },

    HandlerGoProfile() {
      this.showAlertPay = true;
    },

    goToProfile() {
      this.$router.push({ name: "profile", query: { action: 3 } });
    },

    priceProduct(price) {
      let priceProduct = 0;
      if (
        Object.keys(this.orderData).length > 0 &&
        this.orderData.payment != null
      ) {
        priceProduct = this.orderData.payment.reduce((acc, arr) => {
          switch (arr.installment) {
            case null:
              acc += price.pvp_transfer;
              break;
            case "18":
              acc += price.pvp_18_installments;
              break;
            case "1":
              acc += price.pvp;
              break;
          }
          return acc;
        }, 0);
      }
      return priceProduct;
    },

    bankTransfer() {
      if (Object.keys(this.orderData).length > 0) {
        const payment = this.orderData.payment;

        const type_payment = payment.find(
          pay => pay.payment_type_id == "bank_transfer"
        );

        if (type_payment != undefined) {
          return true;
        } else {
          return false;
        }
      }
    },

    price() {
      if (Object.keys(this.orderData).length > 0) {
        if (
          this.orderData.order_item.length > 0 &&
          this.orderData.order_item[0].publication != null &&
          this.orderData.order_item[0].publication.price != null
        ) {
          return true;
        }
      } else {
        return false;
      }
    },

    goToChat() {
      this.loadingLocation = true;
      window.open("https://edifier.reamaze.com/chat-with-us/25266");
      setTimeout(() => {
        this.loadingLocation = false;
      }, 1000);
    }
  }
};
</script>

<style>
.text-sub-title-order {
  color: #393939;
  font-size: 1.2em;
  font-weight: 500;
}

.font-title {
  font-weight: 500 !important;
  font-size: 0.9em;
  width: 30%;
  color: #393939;
}
</style>
