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
      ]
    };
  },
  created() {
    this.GetCategories();
  },
  methods: {
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

<style></style>
