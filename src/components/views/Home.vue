<template>
  <div>
    <v-carousel
      v-model="item"
      hide-delimiters
      height="100%"
      :interval="24000"
      :hide-delimiter-background="false"
      :show-arrows-on-hover="false"
      :show-arrows="false"
      cycle
      next-icon="mdi-chevron-right"
    >
      <v-carousel-item
        contain
        v-for="(item, i) in carrusel"
        :key="i"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-img :src="item.image_url" style="height: 37vmax">
          <v-container fill-height>
            <v-row justify="start" no-gutters>
              <div class="d-flex">
                <v-icon :color="item.color" @click="HandlerLeft" class="ml-n1">
                  mdi-chevron-left
                </v-icon>
                <v-icon :color="item.color" @click="HandlerRight">
                  mdi-chevron-right
                </v-icon>
              </div>
              <v-col cols="12" md="12">
                <div
                  class="font-weight-bold title-carrusel"
                  :style="`color: ${item.color}`"
                >
                  {{ item.text_title }}
                </div>
              </v-col>
              <v-col cols="12" md="12">
                <div
                  class="mb-0 price-carrusel"
                  :style="`color: ${item.color}`"
                >
                  <div v-if="item.price == ' ' || item.price == null">
                    <div class="space-price-null"></div>
                  </div>
                  <div>
                    {{ item.price }}
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="12">
                <v-btn
                  :small="$vuetify.breakpoint.smAndDown ? true : false"
                  color="#00A0E9"
                  rounded
                  @click="HandlerLocationCarrusel(item)"
                  class="elevation-0 button-carrusel"
                >
                  conocelo en detalle
                </v-btn>
              </v-col>
              <v-col cols="12" md="12">
                <div class="d-flex mt-4">
                  <v-btn color="#495358" fab x-small>
                    <v-icon> mdi-share-variant </v-icon>
                  </v-btn>
                  <span :style="`color: ${item.color}`" class="share_carrusel">
                    compartir
                  </span>
                </div>
              </v-col>
            </v-row>
            <v-row
              class="hidden-sm-and-down"
              justify="center"
              :no-gutters="false"
            >
              <v-col
                v-for="(val, index) in item.features"
                :key="index"
                style="background-color: rgb(255 255 255 / 60%)"
                class="mr-1"
                :md="item.features.length == 4 ? '' : 3"
              >
                <p
                  class="
                    black--text
                    mr-1
                    text-uppercase text-center
                    mb-0
                    features-carrusel
                  "
                >
                  {{ val }}
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-img>
      </v-carousel-item>
    </v-carousel>

    <v-container fluid>
      <section id="categorias" class="mt-15">
        <v-row :no-gutters="$vuetify.breakpoint.smAndDown ? true : false">
          <v-col
            cols="12"
            sm="4"
            md="4"
            v-for="(item, index) in categoria"
            :key="index"
          >
            <v-card
              :class="
                index == 1 && $vuetify.breakpoint.name == 'sm'
                  ? 'mx-1'
                  : $vuetify.breakpoint.name == 'xs'
                  ? 'my-1'
                  : ''
              "
            >
              <v-hover v-slot="{ hover }">
                <v-img
                  :gradient="
                    !hover
                      ? 'to top, rgba(40, 41, 40, .5), rgba(24, 28, 31,.7)'
                      : ''
                  "
                  :class="hover ? 'hvr-grow' : ''"
                  cover
                  style="width: 100%; height: 350px"
                  :src="item.image_url"
                  @click="HandlerLocation(item, hover)"
                >
                  <v-row style="height: 22.5em">
                    <v-col cols="12">
                      <div class="title-categories-home">
                        {{ item.text_title }}
                      </div>
                    </v-col>
                  </v-row>
                </v-img>
              </v-hover>
            </v-card>
          </v-col>
        </v-row>
      </section>
    </v-container>

    <section id="destacados">
      <v-responsive>
        <!-- <img src='../../../public/favicon-32x32.png' /> -->
        <v-sheet color="#EBF1F7" class="mt-15">
          <v-container :fluid="breakpoint > 900">
            <v-row justify="center">
              <v-col
                cols="12"
                md="12"
                class="d-flex justify-center "
                style="padding: 60px 0"
              >
                <v-btn
                  dark
                  @click="$router.push({ name: 'products' })"
                  style="border-width: medium"
                  rounded
                  color="#00A0E9"
                >
                  <span class="font-weight-medium"> Ir a la tienda </span>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-responsive>
    </section>

    <suscribe-component />
  </div>
</template>

<script>
import SuscribeComponent from "@/components/Utils/suscribe_component";
import { Carousel, Slide } from "vue-carousel";
import informationCP from "../Utils/informationCP.vue";
import FeaturedProductsCarrouselPrice from "./utils/products/FeaturedProductsPrice";

export default {
  components: {
    "suscribe-component": SuscribeComponent,
    Carousel,
    Slide,
    "featured-products-price": FeaturedProductsCarrouselPrice,
    "information-cp": informationCP
  },

  data() {
    return {
      featuredProductsFirst: [],

      model: null,

      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 2
      },

      // IMAGES
      carrusel: [],
      destacados: [],
      categoria: [],

      isVisible: true,

      item: 0,

      //Carrusel
      perPage: 3
    };
  },

  created() {
    this.HandlerGetProductFeatured();
    this.HandlerGetListPromotions();
  },

  mounted() {
    const remaze = window._support || { ui: {}, user: {} };
    remaze["account"] = "edifier";
    remaze["contact_custom_fields"] = remaze["contact_custom_fields"] || {};

    remaze["contact_custom_fields"]["rmz_form_id_27495"] = {};
    this.$refs.remaze = remaze;
    window.fbq("trackCustom", "HomeView");
  },

  watch: {
    isVisible(val) {
      if (val) this.$refs.slideGroup.setWidths();
    }
  },

  computed: {
    isAuth() {
      return this.$store.getters["auth/AUTHENTICATED"];
    },

    authUser() {
      return this.$store.getters["auth/GET_PROFILE"];
    },

    breakpoint() {
      return this.$vuetify.breakpoint.width;
    },

    nextLabel() {
      return "<img src='../../../flacha-derecha.png' >";
    },

    prevLabel() {
      return "<img src='../../../flacha-izquierda.png' >";
    }
  },

  filters: {
    currencyPVP(value) {
      if (value) {
        const AMOUNT_FORMAT = new Intl.NumberFormat("de-DE", {
          // currency: "ARS",
          // style: "currency",
          maximumFractionDigits: 0,
          minimumFractionDigits: 0
        }).format(value);
        return AMOUNT_FORMAT;
      } else {
        return " ";
      }
    }
  },

  methods: {
    async HandlerGetProduct(page) {
      try {
        const myPage = page || 1;
        const request = {
          store: 3,
          page: myPage,
          per_page: 10,
          paginate: true
        };
        await this.$store.dispatch("products/GET_PRODUCTS", request);
      } catch (error) {
        console.log(error);
      }
    },

    async HandlerGetProductFeatured() {
      try {
        const request = {
          store_id: 3,
          warehouse_id: 3,
          limit: 12,
          paginate: true
        };
        const response = await this.$store.dispatch(
          "products/FEATURED_PRODUCTS",
          request
        );
        const arrayElemnt = response.data.data;
        this.featuredProductsFirst = arrayElemnt;
      } catch (error) {
        console.log(error);
      }
    },

    HandlerProductDetails(product) {
      const encryptedID = this.CryptoJS.AES.encrypt(
        product.product_id.toString(),
        "MyS3c3rtIdPr0Duct"
      ).toString();
      this.$router.push({
        name: "product_details",
        query: { data: encryptedID }
      });
    },

    async HandlerProductFavorite(item) {
      try {
        const request = {
          publication_id: item.publication_id,
          page: 1,
          per_page: 1,
          paginate: false
        };

        const response = await this.$store.dispatch(
          "products/ADD_FAVORITES",
          request
        );
        const data = response.data.data;
        this.$snotify.success(
          `${
            data.product_favorite[0].status == true
              ? "Has agregado como favorito"
              : "Has retirado de favorito"
          }`,
          "Exitos!"
        );
      } catch (error) {
        console.log(error);
      }
    },

    async HandlerGetListPromotions() {
      try {
        const request = {
          store_id: 3,
          type: "",
          page: 1,
          per_page: 12,
          paginate: true
        };

        const response = await this.$store.dispatch(
          "products/LIST_PROMOTIONS",
          request
        );

        for (const iterator of response.data.data.data) {
          if (iterator.active) {
            switch (iterator.type) {
              case "carrusel":
                this.carrusel.push(iterator);
                break;
              case "destacados":
                this.destacados.push(iterator);
                break;
              case "categorias":
                this.categoria.push(iterator);
                break;
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    HandlerLeft() {
      this.item -= 1;
    },
    HandlerRight() {
      this.item += 1;
    },

    HandlerLocation(url, hover) {
      if (hover) {
        const category_id = JSON.parse(url.category_id);
        this.$router.push({ name: "products", query: { data: category_id } });
      }
    },

    HandlerLocationCarrusel(url) {
      location.href = url.url;
    },

    getPvpInfo(item) {
      return {
        paymentType: "Tarjeta",
        value: item.price.pvp,
        discount: Math.round(item.price.discount),
        value_no_discount: item.price.pvp_no_discount
      };
    },

    getPvpTransferInfo(item) {
      return {
        paymentType: "Transferencia",
        value: item.price.pvp_transfer,
        discount: Math.round(item.price.transfer_discount),
        value_no_discount: item.price.pvp_transfer_no_discount
      };
    }
  }
};
</script>

<style>
.title-des {
  font-size: 1.3vmax;
  color: #000;
  line-height: 24px;
  margin-bottom: 38px;
  font-weight: normal;
}
.title-des-description {
  left: 24px;
  line-height: 26px;
  padding-bottom: 22px;
  font-weight: normal;
  color: #fff;
  margin-bottom: 0;
}

.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  width: 100%;
  min-width: 1px;
}

.VueCarousel-navigation-next[data-v-453ad8cd] {
  right: 0;
  transform: translateY(-50%) translateX(100%);
  font-family: "system";
  color: #00a0e9;
}

.VueCarousel-navigation-prev[data-v-453ad8cd] {
  left: 0;
  transform: translateY(-50%) translateX(-100%);
  font-family: "system";
  color: #00a0e9;
}

/* .VueCarousel-navigation-next::before {
  content: url('../../assets/img/next.svg');
}
.VueCarousel-navigation-prev::before {
  content: url('../../assets/img/next.svg');
} */
</style>
