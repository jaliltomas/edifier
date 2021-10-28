<template>
  <div>
    <v-card tile>
      <v-sheet color="#EBF1F7">
        <div class="py-3"></div>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="6"
              class="d-flex flex-column align-self-center"
            >
              <div
                style="color: #393939; font-size: 1.2em"
                class="font-weight-bold mb-5 ml-md-5"
              >
                DETALLE DE TU COMPRA
              </div>
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-hover v-slot="{ hover }">
                    <div
                      class="mb-1 ml-md-5"
                      :style="
                        hover
                          ? 'text-decoration: underline #00A0E9; cursor: pointer'
                          : ''
                      "
                      v-bind="attrs"
                      v-on="on"
                    >
                      <span class="font-weight-bold">Factura:</span>
                      {{ orderData.meli_id }}
                    </div>
                  </v-hover>
                </template>
                <span>Descargar</span>
              </v-tooltip>
              <div class="ml-5">
                <span class="font-weight-bold">Comprado el:</span>
                {{ orderData.created_at | today }}
              </div>
            </v-col>
            <v-col cols="12" md="6" v-if="bankTransfer()">
              <div class="d-flex justify-end mr-md-5">
                <v-btn
                  @click="uploadTransfer = true"
                  class="text-lowercase"
                  color="#00A0E9"
                  rounded
                  dark
                  small
                >
                  <v-icon size="20">mdi-arrow-up-bold-circle-outline</v-icon>
                  <span class="text-capitalize mr-1">Enviá</span>
                  tu comprobante de pago
                </v-btn>
              </div>
              <div class="d-flex justify-end mr-md-5">
                <v-btn
                  @click="goToChatData()"
                  class="text-lowercase my-3"
                  color="#FFFFFF"
                  rounded
                  small
                >
                  <v-icon size="20">mdi-bank</v-icon>
                  Consulta los datos de transferencia en el chat
                </v-btn>
              </div>
              <div class="d-flex justify-end mr-md-5">
                <v-btn
                  v-if="!canUploadFile"
                  class="text-lowercase"
                  color="#FFFFFF"
                  small
                  rounded
                >
                  <v-icon>mdi-arrow-down-bold-circle-outline</v-icon>
                  <span class="text-capitalize mr-1">Descargá</span>
                  tus Facturas
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <div class="py-3"></div>
      </v-sheet>
      <v-sheet>
        <v-container>
          <v-row class="mt-5">
            <v-col
              cols="12"
              md="5"
              class="ml-md-5"
              style="border-right: 1px #e6e6e6 solid"
            >
              <div
                style="color: #393939; font-size: 1em"
                class="font-weight-bold mb-10"
              >
                DATOS DE FACTURACIÓN
              </div>
              <div class="d-flex">
                <div class="font-weight-bold mr-4 d-flex" style="width: 30%">
                  Nombre:
                </div>
                <span v-if="authUser.buyer != null">
                  {{ authUser.buyer.first_name }}
                </span>
              </div>
              <div class="d-flex">
                <div style="width: 30%" class="font-weight-bold mr-3">
                  Email:
                </div>
                <span v-if="authUser.buyer != null" class="ml-1 long-text">
                  {{ authUser.buyer.email }}
                </span>
              </div>
              <div class="d-flex">
                <div style="width: 30%" class="font-weight-bold mr-4">
                  Teléfono:
                </div>
                <span v-if="authUser.buyer != null" class="long-text">
                  {{ authUser.buyer.phone }}
                </span>
              </div>
              <div class="d-flex">
                <div style="width: 30%" class="font-weight-bold mr-4">
                  DNI/CUIT:
                </div>
                <span v-if="authUser.buyer != null">
                  {{ authUser.buyer.doc_number }}
                </span>
              </div>
            </v-col>
            <v-col cols="12" md="3" style="border-right: 1px #e6e6e6 solid">
              <div
                style="color: #393939; font-size: 1em"
                class="font-weight-bold mb-10 ml-md-4"
              >
                DATOS DE ENVÍO
              </div>
              <div class="d-flex ml-md-3">
                <div style="width: 50%" class="font-weight-bold mr-4">
                  Quien recibe:
                </div>
                <span>{{ authUser.contact_name }}</span>
              </div>
              <div class="d-flex ml-md-3">
                <div style="width: 50%" class="font-weight-bold mr-4">
                  Teléfono:
                </div>
                <span>
                  {{ authUser.contact_phone }}
                </span>
              </div>
            </v-col>
            <v-col cols="12" md="3">
              <div class="mb-14"></div>
              <div class="d-flex ml-md-3">
                <div style="width: 50%" class="font-weight-bold mr-4">
                  Código Postal:
                </div>
                <span v-if="authUser.address != null">
                  {{ authUser.address.zipcode }}
                </span>
              </div>
              <div class="d-flex ml-md-3">
                <div style="width: 50%" class="font-weight-bold mr-4">
                  Provincia:
                </div>
                <span>provincia</span>
              </div>
              <div class="d-flex ml-md-3">
                <div style="width: 50%" class="font-weight-bold mr-4">
                  Localidad:
                </div>
                <span v-if="authUser.address != null">
                  {{ authUser.address.location }}
                </span>
              </div>
              <div class="d-flex ml-md-3">
                <div style="width: 50%" class="font-weight-bold mr-4">
                  Calle:
                </div>
                <span v-if="authUser.address != null">
                  {{ authUser.address.street }}
                </span>
              </div>
              <div class="d-flex ml-md-3">
                <div style="width: 50%" class="font-weight-bold mr-4">Nº:</div>
                <span v-if="authUser.address != null">
                  {{ authUser.address.street_number }}
                </span>
              </div>
              <div class="d-flex ml-md-3">
                <div style="width: 50%" class="font-weight-bold mr-4">
                  Piso:
                </div>
                <span v-if="authUser.address != null">
                  {{ authUser.address.floor_number }}
                </span>
              </div>
              <div class="d-flex ml-md-3">
                <div style="width: 50%" class="font-weight-bold mr-4">
                  Dpto:
                </div>
                <span v-if="authUser.address != null">
                  {{ authUser.address.department_number }}
                </span>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
      <v-sheet>
        <v-container>
          <v-divider></v-divider>
          <v-col cols="12" md="12">
            <v-simple-table class="mt-5">
              <template v-slot:default>
                <thead style="background-color: #fafafa">
                  <tr>
                    <th
                      style="font-size: 16px; font-weight: 800"
                      class="text-start font-weight-bold black--text"
                    >
                      Producto
                    </th>
                    <th
                      style="font-size: 16px; font-weight: 800"
                      class="text-center font-weight-bold black--text"
                    >
                      Cantidad
                    </th>
                    <th
                      style="font-size: 16px; font-weight: 800"
                      class="text-center font-weight-bold black--text"
                    >
                      Precio
                    </th>
                    <th
                      style="font-size: 16px; font-weight: 800"
                      class="text-center font-weight-bold black--text"
                    >
                      Nº de Tracking
                    </th>
                    <th
                      style="font-size: 16px; font-weight: 800"
                      class="text-center font-weight-bold black--text"
                    >
                      Seguimiento
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in orderData.order_item"
                    :key="index"
                  >
                    <td v-if="item.publication != null">
                      <v-avatar tile v-if="item.publication.images == null">
                        <img
                          height="200"
                          width="100%"
                          contain
                          src="@/assets/img/no_image.jpg"
                        />
                      </v-avatar>
                      <v-avatar tile v-else>
                        <v-img
                          contain
                          :src="item.publication.images[0]"
                          :lazy-src="item.publication.images[0]"
                          alt="Product Image"
                        ></v-img>
                      </v-avatar>
                      <span
                        class="d-flex d-md-inline-flex ml-md-4 text-capitalize"
                      >
                        {{ item.publication.keywords }}
                      </span>
                    </td>
                    <td v-if="item.publication != null">
                      <span class="d-flex justify-center">
                        {{ item.quantity }}
                      </span>
                    </td>
                    <td v-if="item.publication != null">
                      <span class="d-flex justify-center">
                        <!-- {{ item.publication.price.pvp | currencyTotal }} -->
                        {{ getTotal(item.publication.price) | currencyTotal }}
                      </span>
                    </td>
                    <td>
                      <span
                        v-if="orderData.shipping != null"
                        class="d-flex justify-center"
                      >
                        <span v-if="orderData.shipping.shipping_type == 'CABA'">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <span
                                style="cursor: pointer"
                                v-bind="attrs"
                                v-on="on"
                                @click="
                                  handlerCoy(
                                    orderData.shipping.meli_shippings_id
                                  )
                                "
                              >
                                {{ orderData.shipping.meli_shippings_id }}
                              </span>
                              <span>Copiar</span>
                            </template>
                          </v-tooltip>
                        </span>
                        <span v-else>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <span
                                style="cursor: pointer"
                                v-bind="attrs"
                                v-on="on"
                                @click="
                                  handlerCoy(orderData.shipping.tracking_number)
                                "
                              >
                                {{ orderData.shipping.tracking_number }}
                              </span>
                            </template>
                            <span>Copiar</span>
                          </v-tooltip>
                        </span>
                      </span>
                      <span v-else class="d-flex justify-center"> ...... </span>
                    </td>
                    <td>
                      <span
                        class="d-flex justify-center"
                        v-if="orderData.shipping != null"
                      >
                        <v-avatar
                          size="30"
                          tile
                          v-if="orderData.shipping.shipping_type == 'CABA'"
                        >
                          <v-img
                            contain
                            class="black--text cursor-pointer"
                            src="@/assets/img/checkout/chat.svg"
                            @click="goToChat('CABA')"
                          >
                          </v-img>
                        </v-avatar>
                        <v-avatar
                          size="30"
                          tile
                          v-else-if="
                            orderData.shipping.shipping_type == 'zippin'
                          "
                          @click="goToChat('zippin')"
                        >
                          <v-icon class="cursor-pointer" color="#393939">
                            mdi-forum
                          </v-icon>
                        </v-avatar>
                        <v-avatar
                          size="30"
                          tile
                          v-else
                          @click="goToChat('chazki')"
                        >
                          <v-icon class="cursor-pointer" color="#393939">
                            mdi-forum
                          </v-icon>
                        </v-avatar>
                      </span>
                      <span v-else class="d-flex justify-center"> ...... </span>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-container>
      </v-sheet>
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
            ></v-text-field>
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
              color="#00a0e9"
              :dark="dowloadTransfer == true ? false : true"
              @click="passes(handlerUploadFile)"
            >
              continuar
            </v-btn>
          </v-card-actions>
        </v-card>
      </ValidationObserver>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    dataOrder: {
      type: Object,
      required: true,
      default: () => {},
    },
  },

  data() {
    return {
      showTransferData: false,
      uploadTransfer: false,
      isCopyAlias: "ikono0",
      isCopyCBU: "CBU0",
      file: [],
      transfer_id: "",
      message: "",
      loadingUpload: false,
      dowloadTransfer: false,

      //Data
      orderData: {},
      canUploadFile: true,
      uploadTransfer: false,
    };
  },

  created() {
    this.HandlerGetData();
  },

  filters: {
    today(val) {
      return moment(val).locale("es").format("DD/MM/YYYY");
    },

    currencyTotal(value) {
      return new Intl.NumberFormat("es-AR", {
        currency: "ARS",
        style: "currency",
      }).format(value);
    },
  },

  computed: {
    authUser() {
      return this.$store.getters["auth/GET_PROFILE"];
    },
  },

  methods: {
    async HandlerGetData() {
      try {
        console.log("Order", this.dataOrder);
        const request = {
          id: this.dataOrder.id,
        };
        const response = await this.$store.dispatch(
          "products/ODERS_DETAILS",
          request
        );
        this.orderData = { ...response.data.data };
        console.log("Detalle compras", this.orderData);
        console.log("orderData", this.orderData);
      } catch (error) {
        console.log(error);
      }
    },

    handlerCoy(item) {
      let that = this;
      navigator.clipboard.writeText(item).then(
        function () {
          console.log("copye element");
        },
        function (err) {
          console.error("Async: Could not copy text: ", err);
        }
      );
    },

    getTotal(price) {
      const payment = this.orderData?.payment;
      console.log(payment);
      const typePayment = payment.map((pay) => {
        let pricePay = 0;

        if (pay.payment_type_id == "credit_card") {
          pricePay = price.pvp;
        } else if (pay.payment_type_id == "bank_transfer") {
          pricePay = price.pvp_transfer;
        } else {
          pricePay = price.pvp_18_installments;
        }

        return pricePay;
      });
      if (typePayment.length > 0) {
        return typePayment[0];
      } else {
        return 0;
      }
    },

    HandlerGoProfile() {
      this.$router.push({ name: "profile" });
    },

    async handlerUploadFile() {
      try {
        this.loadingUpload = true;
        const request = new FormData();
        request.append("voucher", this.file);
        request.append("transfer_id", this.transfer_id);
        request.append("order_id", this.dataOrder.id);

        const response = await this.$store.dispatch(
          "checkout/UPLOAD_TRANSFER",
          request
        );

        this.message = response.data.message;
        this.dowloadTransfer = true;
        this.canUploadFile = false;
      } catch (error) {
        this.message = error.response.data.error.details;
      } finally {
        this.loadingUpload = false;
      }
    },

    goToChat(go) {
      console.log("entre");
      switch (go) {
        case "CABA":
          window.open("https://stadio.reamaze.com/chat-with-us/25264");
          break;
        case "zippin":
          window.open(
            "https://www.correoargentino.com.ar/formularios/e-commerce"
          );
          break;
        case "chazki":
          window.open("https://chazki.com/argentina");
      }
    },

    goToChatData() {
      window.open("https://edifier.reamaze.com/chat-with-us/25266");
      setTimeout(() => {}, 1000);
    },

    bankTransfer() {
      if (Object.keys(this.orderData).length > 0) {
        const payment = this.orderData.payment;

        const type_payment = payment.find(
          (pay) => pay.payment_type_id == "bank_transfer"
        );

        if (type_payment != undefined) {
          this.canUploadFile =
            type_payment.path_proof_payment == null ? true : false;
          return true;
        } else {
          return false;
        }
      }
    },

    async handlerUploadFile() {
      try {
        this.loadingUpload = true;
        const request = new FormData();
        request.append("voucher", this.file);
        request.append("transfer_id", this.transfer_id);
        request.append("order_id", this.dataOrder.id);

        const response = await this.$store.dispatch(
          "checkout/UPLOAD_TRANSFER",
          request
        );

        this.message = response.data.message;
        this.dowloadTransfer = true;
        this.canUploadFile = false;
      } catch (error) {
        this.message = error.response.data.error.details;
      } finally {
        this.loadingUpload = false;
      }
    },
  },
};
</script>

<style>
.cursor-pointer {
  cursor: pointer !important;
}
.long-text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>