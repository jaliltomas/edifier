<template>
  <div>
    <v-card tile flat>
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
                style="color: #393939; font-size: 1.2em; font-weight: 500"
                class="mb-5 ml-md-5"
              >
                DETALLE DE TU COMPRA
              </div>
              <div class="ml-5 mb-1">
                <span class="font-title">Factura:</span>
                {{ orderData.meli_id }}
              </div>
              <div class="ml-5">
                <span class="font-title">Comprado el:</span>
                {{ orderData.created_at | today }}
              </div>
              <div class="ml-5 mt-1">
                <span class="font-title">Monto de envio:</span>
                {{ orderData.total_amount_with_shipping - orderData.total_amount  | currencyTotal }}
              </div>
              <div class="ml-5 mt-1">
                <span class="font-title">Monto total a transferir:</span>
                {{ orderData.total_amount_with_shipping | currencyTotal }}
              </div>
            </v-col>
            <v-col
              cols="12"
              md="6"
              v-if="bankTransfer() && orderData.order_invoice.length == 0"
            >
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
                  <span class="text-capitalize mr-1">Subí</span>
                  tu comprobante de pago
                </v-btn>
              </div>
              <div class="d-flex justify-end mr-md-5">
                <v-btn
                  @click="goToEmailTransfer()"
                  class="text-lowercase my-3"
                  color="#FFFFFF"
                  rounded
                  small
                >
                  <v-icon size="20">mdi-bank</v-icon>
                  Enviar datos bancarios a mi e-mail
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
            <v-col cols="12" md="6" v-if="!bankTransfer()">
              <div class="d-flex justify-end mr-md-5" :style="colorStatus">
                {{ typePayment() }}
              </div>
            </v-col>
            <v-col cols="12" md="6" v-if="orderData.order_invoice.length > 0">
              <div
                class="text-lowercase d-flex justify-end mr-md-5"
                color="#FFFFFF"
                small
                rounded
              >
                <v-icon>mdi-arrow-down-bold-circle-outline</v-icon>
                <span class="text-capitalize mr-1">Descargá</span>
                tus Facturas
              </div>
              <div
                class="d-flex justify-end mr-md-5"
                v-for="(item, i) in orderData.order_invoice"
                :key="i"
              >
                <v-btn color="#00A0E9" text @click="HandlerPrintBill(item)">
                  {{ item.bill_number }}
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <div class="py-3"></div>
      </v-sheet>
      <v-sheet>
        <v-container>
          <v-row class="mt-5 pl-md-5">
            <v-col cols="12" sm="12" md="6">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="font-title"
                    >DATOS DE FACTURACIÓN</v-list-item-title
                  >
                  <v-list-item-subtitle class="mt-2">
                    Nombre:
                    <span>
                      {{ orderData.buyer.first_name }}
                    </span>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Email:
                    <span class="ml-1 long-text">
                      {{ orderData.buyer.email }}
                    </span>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Teléfono:
                    <span class="long-text">
                      {{ orderData.buyer.phone }}
                    </span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <v-list-item three-line>
                <v-list-item-content v-if="orderData.address !== null">
                  <v-list-item-title class="font-title"
                    >DATOS DE ENVÍO</v-list-item-title
                  >
                  <v-list-item-subtitle class="mt-2">
                    Estado:
                    <span class="text-capitalize">
                      {{ orderData.address.state.name }}
                    </span>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Municipio:
                    <span class="text-capitalize">
                      {{ orderData.address.location }}
                    </span>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Código Postal:
                    <span>
                      {{ orderData.address.zipcode }}
                    </span>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Calle:
                    <span>
                      {{ orderData.address.street }}
                    </span>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Nº:
                    <span>
                      {{ orderData.address.street_number }}
                    </span>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Entre Calles:
                    <span>
                      {{ orderData.address.between_streets }}
                    </span>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Piso:
                    <span>
                      {{ orderData.address.floor_number }}
                    </span>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Dpto:
                    <span>
                      {{ orderData.address.department_number }}
                    </span>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content v-else>
                  <v-list-item-title class="font-title"
                    >RETIRO EN TIENDA</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <!-- <v-col cols="12">
              <div class="mb-14"></div>
              <div class="d-flex ml-md-3">
                <div style="width: 50%" class="font-weight-bold mr-4">
                  Estado:
                </div>
                <span v-if="authUser.address != null" class="text-capitalize">
                  {{ authUser.address.state.name }}
                </span>
              </div>
              <div class="d-flex ml-md-3">
                <div style="width: 50%" class="font-weight-bold mr-4">
                  Municipio:
                </div>
                <span v-if="authUser.address != null" class="text-capitalize">
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
            </v-col> -->
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
                            </template>
                              <span>Copiar</span>
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
      colorStatus: "#2DA7E3",
    };
  },

  created() {
    this.HandlerGetData();
    window.fbq("trackCustom", "OrderDetailView");
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
    async goToEmailTransfer() {
      try {
        const response = await this.$store.dispatch("products/EMAIL_TRANSFER");
        this.$snotify.success(
          `Email enviado con los datos bancarios`,
          "Exitos"
        );
      } catch (error) {
        console.log(error);
      }
    },

    async HandlerGetData() {
      try {
        const request = {
          id: this.dataOrder.id,
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
      const typePayment = payment.map((pay) => {
        if (pay.payment_type_id === "credit_card") return price.pvp;
        if (pay.payment_type_id === "bank_transfer") return price.pvp_transfer;
        return price.pvp_18_installments;
      });

      if (typePayment.length) return typePayment[0];
      return 0;
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
        this.uploadTransfer = false;
      }
    },

    goToChat(go) {
      switch (go) {
        case "CABA":
          window.open("https://edifier.reamaze.com/chat-with-us/25266");
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
      if (Object.keys(this.orderData).length === 0) {
        return false;
      }
      const payment = this.orderData?.payment;

      const type_payment = payment.find(
        (pay) => pay.payment_type_id == "bank_transfer"
      );

      if (
        !type_payment ||
        ["cancelled", "rejected"].includes(this.orderData.order_status)
      ) {
        return false;
      }

      this.canUploadFile =
        type_payment.path_proof_payment == null ? true : false;
      return true;
    },

    typePayment() {
      const { order_status } = this.dataOrder || null;
      if (!order_status) return;

      switch (order_status) {
        case "cancelled":
          this.colorPayment("cancelled");
          return "Se ha vencido el tiempo de pago de 1 hora vuelva a realizar la compra.";
        case "rejected":
          this.colorPayment("rejected");
          return "Su compra ha sido rechazada";
        default:
          this.colorPayment("default");
          return "Su compra esta pendiente de validar posee 1 hora para registrar el pago";
      }
    },

    colorPayment(status) {
      if (status === "cancelled") return (this.colorStatus = "color: red");
      if (status === "rejected") return (this.colorStatus = "color: red");
      if (status === "default") return (this.colorStatus = "color: #2DA7E3");
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

    async HandlerPrintBill(order) {
      try {
        this.loadingPrintBill = true;
        const invoice_path = order.invoice_path_label;
        const name_array = invoice_path.split("/");
        const name = name_array[1];
        const request = {
          path: invoice_path,
        };
        const response = await this.$store.dispatch(
          "products/PRINT_LABEL",
          request
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingPrintBill = false;
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
.font-title {
  font-weight: 500 !important;
}
</style>
