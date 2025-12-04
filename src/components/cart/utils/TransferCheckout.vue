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
            <v-col cols="12" sm="12" md="12" class="mt-10">
              <div
                class="
                  text-title text-capitalize
                  ml-10
                  d-flex
                  justify-space-between
                "
                style="color: #393939; font-size: 1.6em"
              >
                FELICITACIONES Y GRACIAS POR TU COMPRA
                <v-btn icon @click="HandlerGoProfile()">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
              <div
                v-if="bankTransfer()"
                class="text-sub-title-order mt-3 ml-10"
              >
                FORMA DE PAGO ELEGIDA
              </div>
            </v-col>
            <v-col cols="12" md="12" v-if="bankTransfer()">
              <v-card class="elevation-0">
                <div class="px-5 py-5">
                  <div class="d-flex justify-space-between">
                    <div class="d-flex">
                      <v-img
                        width="100px"
                        contain
                        src="@/assets/img/checkout/transferencia.svg"
                      ></v-img>
                      <div class="align-self-center">
                        Transferencia Bancaria
                      </div>
                    </div>
                  </div>
                  <div class="ml-5 mt-4">
                    <v-alert
                      border="left"
                      colored-border
                      color="#00A0E9"
                      elevation="1"
                      class="mb-4 white"
                    >
                      <div class="subtitle-1 font-weight-bold mb-2 grey--text text--darken-3">Datos Bancarios:</div>
                      <div class="body-2 grey--text text--darken-2">
                        <div class="mb-1"><strong>Titular:</strong> G. IKONO SA</div>
                        <div class="mb-1"><strong>Banco:</strong> Banco Francés</div>
                        <div class="mb-1"><strong>Cuenta:</strong> 470-0003973/1</div>
                        <div class="mb-1"><strong>CUIT:</strong> 30-70497382-5</div>
                        <div class="d-flex align-center mt-2 pa-2 grey lighten-4 rounded">
                          <strong class="mr-2">CBU:</strong> 
                          <span class="text-truncate">0170470320000000397319</span>
                          <v-btn icon small color="#00A0E9" @click="handlerCoy('0170470320000000397319')" class="ml-auto">
                             <v-icon small>mdi-content-copy</v-icon>
                          </v-btn>
                        </div>
                        <div v-if="isCopyCBU === 'CBU1'" class="caption green--text mt-1">¡CBU Copiado!</div>
                      </div>
                    </v-alert>

                    <v-divider class="my-4"></v-divider>

                    <div class="subtitle-1 font-weight-bold mb-2 grey--text text--darken-3">Pasos a seguir:</div>
                    <p class="body-2 grey--text text--darken-2 mb-3">
                      Le pedimos por favor que cuando realice la transferencia cargue el comprobante en la página.
                    </p>
                    
                    <div class="pl-2">
                        <div class="d-flex mb-3 align-start">
                            <v-icon color="#00A0E9" small class="mt-1 mr-2">mdi-numeric-1-circle</v-icon>
                            <span class="body-2 grey--text text--darken-2">Ir al <strong>Perfil</strong> > <strong>Compras</strong></span>
                        </div>
                        <div class="d-flex mb-3 align-start">
                            <v-icon color="#00A0E9" small class="mt-1 mr-2">mdi-numeric-2-circle</v-icon>
                            <span class="body-2 grey--text text--darken-2">Busca la compra y en acción selecciona <strong>ver más</strong>.</span>
                        </div>
                        <div class="d-flex mb-3 align-start">
                            <v-icon color="#00A0E9" small class="mt-1 mr-2">mdi-numeric-3-circle</v-icon>
                            <span class="body-2 grey--text text--darken-2">
                                En el detalle, busque el cartel celeste en el margen superior derecho <strong>"envía tu comprobante de pago"</strong> y cárguelo allí.
                            </span>
                        </div>
                    </div>
                  </div>
                  <div class="ml-5 mt-3" style="font-size: 0.9em">
                    Finalizá tu compra realizando una transferencia por la suma
                    de
                    {{
                      (orderData.total_amount +
                        (orderData.total_amount_with_shipping -
                          orderData.total_amount))
                        | currencyTotal
                    }}
                  </div>
                  <div class="ml-5 mt-3" style="font-size: 0.9em">
                    Tu operación se mantiene activa por 1 hora para hacer el
                    pago
                  </div>
                  <div class="ml-5 mt-3" style="font-size: 0.9em">
                    Podrás subir el comprobante hasta las
                    {{ orderData.date_created | today }} hs, desde COMPRAS ->
                    Ver más en tu Perfil
                  </div>
                </div>
              </v-card>
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
              <div class="text-sub-title-order ml-10 mb-5">
                DATOS DE FACTURACIÓN
              </div>
              <v-sheet color="#FFFFFF">
                <div class="py-5 px-5">
                  <div class="d-flex ml-5">
                    <div class="font-title mr-4 d-flex">Nombre:</div>
                    <span v-if="authUser.buyer != null">
                      {{ authUser.buyer.first_name }}
                    </span>
                  </div>
                  <div class="d-flex ml-5">
                    <div class="font-title mr-0 d-flex">Email:</div>
                    <span
                      v-if="authUser.buyer != null"
                      style="
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                      "
                      class="ml-4"
                    >
                      {{ authUser.buyer.email }}
                    </span>
                  </div>
                  <div class="d-flex ml-5">
                    <div class="font-title mr-4 d-flex">Teléfono:</div>
                    <span v-if="authUser.buyer != null">
                      {{ authUser.buyer.phone }}
                    </span>
                  </div>
                  <div class="d-flex ml-5">
                    <div class="font-title mr-4 d-flex">
                      {{ authUser.buyer.doc_type }}:
                    </div>
                    <span v-if="authUser.buyer != null">
                      {{ authUser.buyer.doc_number }}
                    </span>
                  </div>
                </div>
              </v-sheet>
            </v-col>
            <v-col cols="12" md="7">
              <div class="text-sub-title-order ml-5 mb-5">DATOS DE ENVIO</div>
              <v-sheet color="#FFFFFF">
                <div class="py-5 px-5">
                  <v-row v-if="authUser.address != null">
                    <v-col cols="12" sm="6" md="4" class="py-1">
                      <div>
                        <span class="font-title"> Estado: </span>
                        <span class="text-capitalize">
                          {{ authUser.address.state.name }}
                        </span>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" class="py-1">
                      <span class="font-title"> Municipio: </span>
                      <span class="text-capitalize">
                        {{ authUser.address.location }}
                      </span>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" class="py-1">
                      <span class="font-title"> Código Postal: </span>
                      <span>
                        {{ authUser.address.zipcode }}
                      </span>
                    </v-col>
                  </v-row>
                  <v-row v-if="authUser.address != null">
                    <v-col cols="12" sm="6" md="4" class="py-1">
                      <div>
                        <span class="font-title"> Calle: </span>
                        <span v-if="authUser.address != null">
                          {{ authUser.address.street }}
                        </span>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" class="py-1">
                      <span class="font-title"> Nº: </span>
                      <span v-if="authUser.address != null">
                        {{ authUser.address.street_number }}
                      </span>
                    </v-col>
                  </v-row>
                  <v-row v-if="authUser.address != null">
                    <v-col cols="12" sm="6" md="4" class="py-1">
                      <div>
                        <span class="font-title"> Piso: </span>

                        <span v-if="authUser.address != null">
                          {{ authUser.address.floor_number }}
                        </span>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" class="py-1">
                      <span class="font-title"> Dpto: </span>

                      <span v-if="authUser.address != null">
                        {{ authUser.address.department_number }}
                      </span>
                    </v-col>
                  </v-row>
                </div>
              </v-sheet>
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
