<template>
  <v-footer :padless="true">
    <v-card flat tile width="100%" color="#EBF1F7" class="text-start pt-10">
      <v-container>
        <v-row class="mx-0 my-0">
          <v-col cols="6" md="3">
            <v-img
              width="150"
              contain
              src="@/assets/img/edifier-logo-gris.svg"
            ></v-img>
            <div class="mt-10">
              <div style="color: #67696b">Seguinos</div>
              <div class="d-flex justify-start justify-md-start mt-1">
                <v-icon
                  color="#67696B"
                  class="mx-0 px-0 cursor-pointer"
                  @click="
                    HandlerSocialLink(
                      'https://www.facebook.com/edifier.argentina/'
                    )
                  "
                >
                  mdi-facebook
                </v-icon>
                <v-icon
                  color="#67696B"
                  class="mx-2 cursor-pointer"
                  @click="
                    HandlerSocialLink(
                      'https://www.instagram.com/edifier.argentina/'
                    )
                  "
                >
                  mdi-instagram
                </v-icon>
                <v-icon
                  color="#67696B"
                  class="mx-0 cursor-pointer"
                  @click="
                    HandlerSocialLink(
                      'https://www.youtube.com/channel/UCL3TSzB0rmeBxL0PMkPA18w'
                    )
                  "
                >
                  mdi-youtube
                </v-icon>
              </div>
            </div>
          </v-col>
          <v-col cols="6" md="3" class="d-flex justify-center">
            <div class="models-footer">
              <div
                class="
                  d-flex
                  justify-start
                  algin-start
                  font-weight-bold
                  ml-2
                  models-footer-text
                "
              >
                Modelos
              </div>
              <div
                v-for="(item, index) in categories"
                :key="index"
                style="color: #67696b"
                class="ml-2 mt-1"
                @click="productsCategores(item)"
              >
                <v-hover v-slot="{ hover }">
                  <span
                    :style="
                      hover
                        ? 'color: #00A0E9; cursor: pointer'
                        : '#67696b; cursor: pointer'
                    "
                  >
                    {{ item.name }}
                  </span>
                </v-hover>
              </div>
            </div>
          </v-col>
          <v-col cols="6" md="3" class="d-flex justify-center">
            <div class="models-footer">
              <div
                class="
                  d-flex
                  justify-start
                  algin-start
                  font-weight-bold
                  ml-2
                  models-footer-text
                "
              >
                Soporte
              </div>
              <div
                v-for="(item, index) in support"
                :key="index"
                :style="item.name == '.' ? 'color: #EBF1F7' : 'color: #67696b'"
                class="ml-2 mt-1"
                @click="goSection(item)"
              >
                <v-hover v-slot="{ hover }">
                  <span
                    :style="
                      hover
                        ? 'color: #00A0E9; cursor: pointer'
                        : '#67696b; cursor: pointer'
                    "
                  >
                    {{ item.name }}
                  </span>
                </v-hover>
              </div>
            </div>
          </v-col>
          <v-col cols="6" md="3" class="d-flex justify-md-center">
            <div class="models-footer">
              <div
                class="
                  d-flex
                  justify-start
                  algin-start
                  font-weight-bold
                  ml-2
                  models-footer-text
                "
              >
                Empresa
              </div>
              <div
                v-for="(item, index) in company"
                :key="index"
                :style="item.name == '.' ? 'color: #EBF1F7' : 'color: #67696b'"
                class="ml-2 mt-1"
                @click="goToContact(item.name)"
              >
                <v-hover v-slot="{ hover }">
                  <span
                    :style="
                      hover
                        ? 'color: #00A0E9; cursor: pointer'
                        : '#67696b; cursor: pointer'
                    "
                  >
                    {{ item.name }}
                  </span>
                </v-hover>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <div style="max-width: 423px; margin: auto">
        <v-btn
          block
          color="rgb(0, 160, 233)"
          class="white--text repetance-btn1"
          rounded
          large
          @click="dialog = true"
        >
          Botón de arrepentimiento >>
        </v-btn>
      </div>
      <v-dialog v-model="dialog" scrollable width="650">
        <v-card>
          <v-card-title
            class="d-flex flex-row"
            style="justify-content:space-between;"
          >
            <div style="width:100px; height: 30px">
              <v-img
                contain
                src="@/assets/img/edifier-logo-gris.svg"
                lazy-src="@/assets/img/logo_stadio.svg"
              ></v-img>
            </div>
            <div @click="dialog = false" role="button">
              <v-icon>mdi-close</v-icon>
            </div>
          </v-card-title>
          <v-card-text>
            <div class="modal-title">Quiero cancelar mi pedido:</div>
            <div class="small-text" style="margin-bottom:8px">
              Tenés hasta 10 días de corridos desde que lo compraste y/o
              recibiste para realizar la devolución. El producto debe estar tal
              cual lo recibiste, en perfectas condiciones, nuevo, sin muestras
              de uso y con sus embalajes originales incluyendo todos sus
              accesorios y manuales.
            </div>
            <div class="modal-subtitle" v-if="!showNotification">
              Para procesar la solicitud, por favor, completa el siguiente
              formulario y nuestro servicio de atención al cliente te
              proporcionará la información necesaria.
            </div>
            <div v-if="showNotification">
              <div class="wrapper">
                <svg
                  class="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <circle
                    class="checkmark__circle"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    class="checkmark__check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
              </div>
              <div class="success-text">
                Tu solicitud ha sido registrada con éxito, dentro del plazo se
                24hrs hábiles nos pondremos en contacto por e-mail para
                confirmar la gestión.
              </div>
            </div>
            <div class="form-box rounded" v-if="!showNotification">
              <ValidationObserver ref="obs" v-slot="{ passes }">
                <v-row>
                  <v-col cols="12" md="6" style="padding:0px 8px !important">
                    <label for="repentanceName" class="label-text"
                      >Nombre:</label
                    >
                    <ValidationProvider
                      name="Nombre"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        v-model="repentanceName"
                        color="rgb(0, 160, 233)"
                        dense
                        filled
                        placeholder="Nombre"
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" md="6" style="padding:0px 8px !important">
                    <label for="repentanceLastname" class="label-text"
                      >Apellido:</label
                    >
                    <ValidationProvider
                      name="Apellido"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        v-model="repentanceLastname"
                        color="rgb(0, 160, 233)"
                        dense
                        filled
                        placeholder="Apellido"
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                    style="padding:0px 8px !important; margin-top: -10px;"
                  >
                    <label for="repentanceDni" class="label-text">Dni:</label>
                    <ValidationProvider
                      name="Dni"
                      rules="required|numeric"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        v-model="repentanceDni"
                        color="rgb(0, 160, 233)"
                        dense
                        filled
                        placeholder="12345678"
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                    style="padding:0px 8px !important; margin-top: -10px;"
                  >
                    <label for="repentancePhone" class="label-text"
                      >Teléfono:</label
                    >
                    <ValidationProvider
                      name="Teléfono"
                      rules="required|numeric"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        v-model="repentancePhone"
                        color="rgb(0, 160, 233)"
                        dense
                        filled
                        placeholder="12345678"
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    cols="12"
                    md="12"
                    style="padding:0px 8px !important; margin-top: -10px;"
                  >
                    <label for="repentanceEmail" class="label-text"
                      >Email</label
                    >
                    <ValidationProvider
                      name="Email"
                      rules="email|required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        v-model="repentanceEmail"
                        color="rgb(0, 160, 233)"
                        dense
                        filled
                        placeholder="stadio@mail.com"
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    cols="12"
                    md="12"
                    style="padding:0px 8px !important; margin-top: -10px;"
                  >
                    <label for="repentanceProduct" class="label-text"
                      >Producto</label
                    >
                    <ValidationProvider
                      name="Producto"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        v-model="repentanceProduct"
                        color="rgb(0, 160, 233)"
                        dense
                        filled
                        placeholder="Producto"
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    cols="12"
                    md="12"
                    style="padding:0px 8px !important; margin-top: -10px;"
                  >
                    <ValidationProvider
                      name="Motivo"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label for="repentanceReason" class="label-text"
                        >¿Por qué desea cancelar su pedido?</label
                      >
                      <v-select
                        :items="reasons"
                        item-text="title"
                        item-value="value"
                        v-model="repentanceReason"
                        color="rgb(0, 160, 233)"
                        filled
                        dense
                        flat
                        :error-messages="errors"
                      ></v-select>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                    cols="12"
                    md="12"
                    v-if="repentanceReason == 'Otro'"
                    style="padding:0px 8px !important; margin-top: -10px;"
                  >
                    <ValidationProvider name=" " rules="" v-slot="{ errors }">
                      <v-textarea
                        filled
                        rounded
                        class="rounded"
                        dense
                        placeholder="Dar un motivo para la solicitud de cancelación"
                        color="rgb(0, 160, 233)"
                        v-model="otherReason"
                        :error-messages="errors"
                      ></v-textarea>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-btn
                      rounded
                      elevation="0"
                      large
                      block
                      dark
                      color="rgb(0, 160, 233)"
                      class="text-capitalize"
                      :loading="loadingRegret"
                      @click="passes(HandlerRepentance)"
                    >
                      Confirmar cancelación >>
                    </v-btn>
                  </v-col>
                </v-row>
              </ValidationObserver>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
      <div class="mt-10 background-footer">
        <v-container>
          <span style="color: #67696b">
            © EDIFIER 2021 Todos los derechos reservados
            <span class="ml-md-15">Política de privacidad</span>
            <span
              style="cursor: pointer"
              class="ml-md-15"
              @click.prevent="showTerms = true"
            >
              Términos de uso
            </span>
          </span>
        </v-container>
      </div>
    </v-card>

    <v-dialog v-if="showTerms" v-model="showTerms" max-width="800">
      <v-card style="padding: 0 17px 17px">
        <v-card-text>
          <div class="d-flex justify-end">
            <v-btn @click="showTerms = false" icon class="pt-0 mt-2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <p style="font-weight: 500">
            La compra está sujeta a disponibilidad de stock, así como también a
            condiciones de logística y distribución. En caso de no poder hacerse
            la entrega del o de los productos solicitados debido a la falta de
            disponibilidad se dará por anulada la compra. Si el cliente desea
            adquirir un nuevo producto, la compra estará regida por las
            condiciones comerciales correspondientes al momento.
          </p>
          <p style="font-weight: 500" class="">
            La empresa se reserva el derecho de cancelación dentro las 72hs con
            la devolución del pago por el mismo medio en que se efectuó la
            compra, sin perjucio o daño.
          </p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      showTerms: false,
      categories: [],
      support: [
        { name: "Garantía" },
        { name: "Soporte técnico" },
        { name: "EDIFIER Connect APP" },
        { name: "." },
        { name: "." },
        { name: "." },
        { name: "." }
      ],
      company: [
        { name: "Nosotros" },
        { name: "Foro" },
        { name: "Contacto" },
        { name: "." },
        { name: "." },
        { name: "." },
        { name: "." },
        { name: "." }
      ],
      dialog: false,
      repentanceName: "",
      repentanceLastname: "",
      repentanceDni: null,
      repentancePhone: null,
      repentanceEmail: "",
      repentanceProduct: "",
      repentanceReason: "",
      loadingRegret: false,
      showNotification: false,
      otherReason: "",
      reasons: [
        {
          title: "No quiero más este producto",
          value: "No quiero más este producto"
        },
        { title: "Compré por error", value: "Compré por error" },
        {
          title: "La entrega tardará demasiado",
          value: "La entrega tardará demasiado"
        },
        {
          title: "He descubierto un mejor precio en otro lugar",
          value: "He descubierto un mejor precio en otro lugar"
        },
        { title: "Prefiero no decir", value: "Prefiero no decir" },
        { title: "Otro", value: "Otro" }
      ]
    };
  },
  created() {
    this.GetCategories();
  },
  methods: {
    async HandlerRepentance() {
      try {
        this.loadingRegret = true;
        const payload = {
          store_id: 3,
          first_name: this.repentanceName,
          last_name: this.repentanceLastname,
          dni: this.repentanceDni,
          phone: this.repentancePhone,
          email: this.repentanceEmail,
          product_name: this.repentanceProduct,
          cancellation_reason: this.repentanceReason
        };

        await this.$store.dispatch("products/SEND_RETURN_FORM", payload);
        this.showNotification = true;
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingRegret = false;
      }
    },
    goTO() {
      window.open(
        "https://serviciosweb.afip.gob.ar/clavefiscal/qr/publicInfoD.aspx"
      );
    },

    HandlerSocialLink(social) {
      window.open(social);
    },

    async GetCategories() {
      try {
        const request = {
          store: 3,
          page: 1,
          per_page: 10,
          paginate: true,
          everything: false
        };
        const response = await this.$store.dispatch(
          "products/GET_CATEGORIES",
          request
        );
        this.categories = response.data.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    productsCategores(item) {
      const category_id = JSON.parse(item.id);
      this.$router
        .push({ name: "products", query: { data: category_id } })
        .catch(err => err);
    },
    goSection(item) {
      switch (item.name) {
        case "EDIFIER Connect APP":
          this.$router.push({ name: "app_dowload" });
          break;
        case "Soporte técnico":
          window.open("https://soportecliente.com/");
          break;
        default:
          break;
      }
    },
    goToContact(name) {
      switch (name) {
        case "Contacto":
          const url = process.env.VUE_APP_CHECKOUT;
          window.open(`${url}/contact`);
          break;
        case "Foro":
          window.open("http://www.edifierla.com/foro-latam/");
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style>
.community {
  background-color: rgb(0, 160, 233);
  height: auto;
  opacity: 0.9;
}

.text-community {
  font-size: 1.2em;
}

.text-follow {
  color: white;
  font-size: 1.2em;
  font-weight: 600;
}

.social {
  background-color: #16131aa6;
  /* height: auto; */
}

/* @media (min-width: 700px) {
  .social {
    background-color: #16131aa6;
    height: 56.5%;
  }
} */

.text-secretary {
  font-weight: 300;
}

.text-privacy {
  font-size: 1em;
  color: white;
  font-weight: 300;
  cursor: pointer;
}

.vignette {
  width: 8px;
  height: 8px;
  border-radius: 10px;
  background-color: rgb(0, 160, 233);
  margin-top: 9px;
  margin-right: 4px;
}

.text-box {
  display: flex;
  flex: 1;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
}

.modal-subtitle {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}

.small-text {
  font-size: 13px;
}

.form-box {
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 1rem 2rem;
}

.label-text {
  font-size: 14px;
}
.v-messages__message {
  font-size: 11px !important;
}

.success-text {
  color: #09a06e;
  font-size: 500;
  text-align: center;
  padding: 0px 20px;
}

.repetance-btn2 {
  display: none;
}

@media only screen and (max-width: 800px) {
  .repetance-btn1 {
    display: none !important;
  }
  .repetance-btn2 {
    display: flex;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }
}

* {
  padding: 0;
  margin: 0;
}
.wrapper {
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 8px;
  background-color: transparent;
}
.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #7ac142;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}
.checkmark {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px #7ac142;
  animation: fill 0.4s ease-in-out 0.4s forwards,
    scale 0.3s ease-in-out 0.9s both;
}
.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}
@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes scale {
  0%,
  100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}
@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #7ac142;
  }
}
</style>
