<template>
  <div>
    <v-carousel
      v-model="item"
      hide-delimiters
      height="100%"
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
                <v-icon @click="HandlerLeft" class="ml-n1">
                  mdi-chevron-left
                </v-icon>
                <v-icon @click="HandlerRight">mdi-chevron-right</v-icon>
              </div>
              <v-col cols="12" md="12">
                <div
                  class="font-weight-bold"
                  style="font-size: 3vmax; color: white"
                >
                  Edifier R700BTs
                </div>
              </v-col>
              <v-col cols="12" md="12">
                <div class="mb-0" style="font-size: 3vmax; color: white">
                  $ 16.490
                </div>
              </v-col>
              <v-col cols="12" md="12">
                <v-btn
                  :class="$vuetify.breakpoint.smAndDown ? 'x-small' : ''"
                  outlined
                  color="red darken--4"
                  rounded
                >
                  conocelo a detalle
                </v-btn>
              </v-col>
              <v-col cols="12" md="12">
                <div class="d-flex mt-4">
                  <v-btn color="#495358" fab x-small>
                    <v-icon> mdi-share-variant </v-icon>
                  </v-btn>
                  <span class="ml-1 mt-1">compartir</span>
                </div>
              </v-col>
            </v-row>
            <v-row class="hidden-sm-and-down">
              <v-col style="background-color: #ffffff" class="mr-1">
                <span class="black--text"> Twetter de seda</span>
              </v-col>
              <v-col style="background-color: #ffffff" class="mr-1">
                <span class="black--text"> Twetter de seda</span>
              </v-col>
              <v-col style="background-color: #ffffff" class="mr-1">
                <span class="black--text"> Twetter de seda</span>
              </v-col>
              <v-col style="background-color: #ffffff" class="mr-1">
                <span class="black--text"> Twetter de seda</span>
              </v-col>
            </v-row>
          </v-container>
        </v-img>
      </v-carousel-item>
    </v-carousel>
    <v-container fluid>
      <section id="marcas">
        <v-row class="mt-5">
          <v-col cols="12" md="12" class="">
            <div class="d-flex justify-center mb-0">
              <span class="text-uppercase mb-0" style="font-size: 2vmax">
                Titulo para grandes marcas
              </span>
            </div>
            <div class="d-flex justify-center" style="font-size: 1.5vmax">
              <span class="text-uppercase">Encuentralas aqui</span>
            </div>
          </v-col>
          <v-col offset-md="2" cols="12" md="8">
            <v-row no-gutters>
              <v-col
                cols="6"
                md="3"
                v-for="(item, index) in 8"
                :key="index"
                class="d-flex justify-center"
              >
                <v-hover v-slot="{ hover }">
                  <v-avatar tile size="120" class="mt-0 mb-0">
                    <v-img
                      contain
                      :style="!hover ? 'filter: grayscale(100%)' : ''"
                      src="@/assets/img/phillips.png"
                    ></v-img>
                  </v-avatar>
                </v-hover>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </section>
      <section id="categorias">
        <v-row :no-gutters="$vuetify.breakpoint.smAndDown ? true : false">
          <v-col
            cols="12"
            sm="4"
            md="4"
            v-for="(item, index) in imagesCategories"
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
              <v-img
                gradient="to top, rgba(40, 41, 40, .5), rgba(24, 28, 31,.7)"
                cover
                style="width: 100%; height: 350px"
                :src="item.src"
              >
                <v-row style="height: 22.5em">
                  <v-col cols="12">
                    <div
                      class="px-5 py-5 white--text"
                      :style="
                        $vuetify.breakpoint.name == 'sm'
                          ? 'font-size: 1.5em'
                          : 'font-size: 2em'
                      "
                    >
                      {{ item.text }}
                    </div>
                  </v-col>
                  <v-col cols="12" class="align-self-end">
                    <v-btn
                      outlined
                      color="white"
                      class="ml-7 ml-sm-3 ml-md-7 mb-5"
                      rounded
                      :small="$vuetify.breakpoint.name == 'sm' ? true : false"
                    >
                      ver productos
                    </v-btn>
                  </v-col>
                </v-row>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </section>
    </v-container>

    <section id="destacados">
      <v-sheet color="#ECEBE5" class="mt-15">
        <div class="d-flex justify-center pt-15">
          <span
            class="text-uppercase text-center mb-0"
            style="font-size: 2em; font-weight: 200"
          >
            Productos Destacados
          </span>
        </div>
        <div class="d-flex justify-center mt-0">
          <span
            class="text-uppercase text-center mt-n1"
            style="font-size: 1.1em; font-weight: 400"
          >
            Nuestros recomendados para vos
          </span>
        </div>

        <v-row justify="center">
          <v-col cols="12" md="11">
            <carousel
              :perPage="$vuetify.breakpoint.smAndDown ? 1 : 3"
              paginationColor="#B63F55"
              class="mt-10"
            >
              <slide
                v-for="(item, index) in destacadosArray"
                :key="index"
                class="d-flex justify-center"
              >
                <v-card
                  :width="$vuetify.breakpoint.smAndDown ? '20em' : '27em'"
                  height="600px"
                >
                  <v-img
                    cover
                    class="mx-7 my-7"
                    width="auto"
                    height="300px"
                    :src="item.src"
                  >
                  </v-img>
                  <v-card-text class="mx-3">
                    <v-row style="height: 16em">
                      <v-col cols="12">
                        <span class="black--text" style="font-weight: 500">
                          {{ item.title }}
                        </span>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <span
                          class="black--text"
                          style="font-weight: 600; font-size: 1.3em"
                        >
                          {{ item.brand }}
                        </span>
                      </v-col>
                      <v-col cols="12">
                        <div class="mr-3 mt-n5">
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Repellat maxime exercitationem.
                        </div>
                      </v-col>
                      <v-col cols="12" class="align-self-end">
                        <div
                          class="my-auto black--text"
                          style="font-weight: 600; font-size: 1.3em"
                        >
                          $ 15.90
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </slide>
            </carousel>
          </v-col>
          <v-col cols="12" md="12" class="d-flex justify-center mb-15">
            <v-btn
              style="border-width: medium"
              outlined
              rounded
              color="#B63F55"
            >
              <span class="font-weight-medium"> Ir a la tienda </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-sheet>
    </section>

    <suscribe-component />

    <!-- SECCION VIEJAS -->
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          :show-arrows="true"
          v-show="isVisible"
          ref="slideGroup"
        >
          <v-slide-group show-arrows>
            <template v-slot:next>
              <v-icon :size="$vuetify.breakpoint.smAndDown ? 20 : 50">
                mdi-arrow-right
              </v-icon>
            </template>
            <template v-slot:prev>
              <v-icon :size="$vuetify.breakpoint.smAndDown ? 20 : 50">
                mdi-arrow-left
              </v-icon>
            </template>
            <v-slide-item
              v-for="(item, index) in featuredProductsFirst"
              :key="index"
            >
              <v-hover v-slot="{ hover }">
                <v-card
                  tile
                  class="ma-4"
                  flat
                  style="width: 30vh"
                  height="auto"
                >
                  <v-img
                    contain
                    :elevation="hover ? 12 : 2"
                    :style="hover ? 'cursor: pointer; opacity: 0.8;' : ''"
                    :src="item.images[0]"
                    :lazy-src="item.images[0]"
                    @click="HandlerProductDetails(item)"
                    :height="$vuetify.breakpoint.smAndDown ? 'auto' : '30em'"
                    alt="imagen"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="black lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                  <div
                    class="d-flex justify-center mt-0 mt-md-5 mb-0 title-des"
                  >
                    {{ item.keywords.toUpperCase() }}
                  </div>
                  <div
                    style="font-size: 1.5vmax"
                    class="d-flex justify-center mt-0 font-weight-light"
                  >
                    $ {{ item.pvp | currencyPVP }}
                  </div>
                </v-card>
              </v-hover>
            </v-slide-item>
          </v-slide-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="6"
          sm="6"
          md="6"
          v-for="(item, index) in destacados"
          :key="index"
          v-show="destacados.length > 0"
        >
          <v-card tile class="elevation-0">
            <v-hover v-slot="{ hover }">
              <v-img
                cover
                :height="
                  $vuetify.breakpoint.name == 'xs'
                    ? 'auto'
                    : $vuetify.breakpoint.name == 'sm'
                    ? 'auto'
                    : '700px'
                "
                :elevation="hover ? 12 : 2"
                @click="HandlerProductDetails(item)"
                :style="
                  hover ? 'cursor: pointer; opacity: 0.8; width: 100%' : ''
                "
                :src="item.image_url"
                :lazy-src="item.image_url"
                gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
              >
                <div
                  class="
                    d-flex
                    justify-start
                    ml-3 ml-md-7
                    mt-md-15
                    pt-5
                    mb-0
                    title-des-description
                  "
                  :style="`font-size: ${
                    $vuetify.breakpoint.smAndDown ? '16px' : '32px'
                  }`"
                >
                  {{ item.text_body.toUpperCase() }}
                </div>
                <div
                  style="font-size: 32px"
                  class="d-flex justify-start ml-7 mt-0 title-des-description"
                >
                  <!-- $ {{ item.pvp | currencyPVP }} -->
                </div>
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="black lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-hover>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" v-if="categoria.length > 0">
          <v-img :src="categoria[0].image_url">
            <v-container fluid fill-height>
              <v-row justify="center">
                <v-col cols="12" md="12" class="d-flex justify-center">
                  <h1 class="white--text">Ver Categorias</h1>
                </v-col>
                <v-col cols="12" md="12" class="d-flex justify-center">
                  <v-btn
                    @click="$router.push({ name: 'products' })"
                    color="white"
                    outlined
                    x-large
                    >IR</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-img>
        </v-col>
      </v-row>
      <!-- <v-row class="mt-5 mt-md-15">
        <v-col cols="12" md="12">
          <h4
            style="font-weight: 400; font-size: 18px"
            class="text-center mb-5"
          >
            NUESTRA COLECCION DE PRODUCTOS
          </h4>
          <h3
            style="font-weight: 700; font-size: 25px; letter-spacing: 2px"
            class="text-center"
          >
            NAVEGA POR NUESTRAS CATEGORIAS
          </h3>
        </v-col>
        <v-col
          cols="12"
          md="4"
          v-for="(item, index) in Categories"
          :key="index"
        >
          <v-hover v-slot="{ hover }">
            <v-card tile class="elevation-0" flat>
              <v-img src="https://cdn.vuetifyjs.com/images/carousel/planet.jpg">
                <div v-if="!hover" class="d-flex" style="height: 100%">
                  <div class="d-flex mx-auto mt-auto mb-auto mb-2">
                    <v-btn class="elevation-1 mt-0" tile color="#F0F0F0">
                      {{ item }}
                    </v-btn>
                  </div>
                </div>
                <div
                  v-if="hover"
                  class="d-flex display-3 white--text"
                  style="height: 100%; background-color: #fafafa99"
                >
                  <div class="d-flex mx-auto mt-auto mb-auto mb-2">
                    <v-btn class="elevation-1 mt-0" tile color="orange--text">
                      {{ item }}
                    </v-btn>
                  </div>
                </div>
              </v-img>
              <v-card-text>
                <div
                  style="font-weight: 400; font-size: 18px"
                  class="d-flex justify-center"
                >
                  Product Title
                </div>
                <p
                  style="font-size: 16px"
                  class="font-weight-bold text-center mt-5"
                >
                  $0000
                </p>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>-->
      <!-- <category-component /> -->
      
    </v-container>
  </div>
</template>

<script>
import CategoryComponent from "@/components/Utils/categories_component";
import SuscribeComponent from "@/components/Utils/suscribe_component";
import { Carousel, Slide } from "vue-carousel";
// import informationCP from "@/components/Utils/informationCP";
export default {
  components: {
    "category-component": CategoryComponent,
    "suscribe-component": SuscribeComponent,
    Carousel,
    Slide,
    // "cp-information": informationCP,
  },

  data() {
    return {
      Categories: [
        "Superficie de contro",
        "Software",
        "Altavoced de audio",
        "Accesorios de estudio",
        "Refuerzo sonido en vivo",
        "Audio",
      ],

      imagesCategories: [
        {
          src: require("@/assets/img/categoria/categoria1.jpeg"),
          text: "BANDEJAS & CONTROLADORAS",
        },
        {
          src: require("@/assets/img/categoria/categoria2.jpeg"),
          text: "AURICULARES",
        },
        {
          src: require("@/assets/img/categoria/categoria3.jpeg"),
          text: "PARLANTES",
        },
      ],

      destacadosArray: [
        {
          src: require("@/assets/img/destacado/Destacado001.png"),
          title: "ST6",
          brand: "Brand",
        },
        {
          src: require("@/assets/img/destacado/Destacado002.jpeg"),
          title: "EDIFIER",
          brand: "Brand",
        },
        {
          src: require("@/assets/img/destacado/Destacado003.jpeg"),
          title: "EDIFIER",
          brand: "Brand",
        },
        {
          src: require("@/assets/img/destacado/Destacado01.jpg"),
          title: "EDIFIER",
          brand: "Brand",
        },
        {
          src: require("@/assets/img/destacado/Destacado02.jpg"),
          title: "EDIFIER",
          brand: "Brand",
        },
        {
          src: require("@/assets/img/destacado/Destacado03.jpg"),
          title: "EDIFIER",
          brand: "Brand",
        },
      ],

      featuredProductsFirst: [],
      // featuredProductsSecond: [],

      model: null,

      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 2,
      },

      // IMAGES
      carrusel: [],
      destacados: [],
      categoria: [],

      isVisible: true,

      item: 0,

      //Carrusel
      perPage: 3,
    };
  },

  created() {
    // this.HandlerGetProduct();
    this.HandlerGetProductFeatured();
    this.HandlerGetListPromotions();
  },

  watch: {
    isVisible(val) {
      if (val) this.$refs.slideGroup.setWidths();
    },
  },

  computed: {
    isAuth() {
      return this.$store.getters["auth/AUTHENTICATED"];
    },

    authUser() {
      return this.$store.getters["auth/GET_PROFILE"];
    },
  },

  filters: {
    currencyPVP(value) {
      if (value) {
        const AMOUNT_FORMAT = new Intl.NumberFormat("de-DE", {
          // currency: "ARS",
          // style: "currency",
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(value);
        return AMOUNT_FORMAT;
      } else {
        return " ";
      }
    },
  },

  methods: {
    async HandlerGetProduct(page) {
      try {
        const myPage = page || 1;
        const request = {
          store: 3,
          page: myPage,
          per_page: 10,
          paginate: true,
        };
        await this.$store.dispatch("products/GET_PRODUCTS", request);
      } catch (error) {
        console.log(error);
      }
    },

    async HandlerGetProductFeatured() {
      try {
        const request = {
          store_id: 1,
          warehouse_id: 3,
          limit: 12,
          paginate: true,
        };
        const response = await this.$store.dispatch(
          "products/FEATURED_PRODUCTS",
          request
        );
        const arrayElemnt = response.data.data;
        console.log("asdasdsd", arrayElemnt);
        // const elements = arrayElemnt.reduce(
        //   (acc, out) => {
        //     if (acc.arr1.length < 3) {
        //       acc.arr1.push({ ...out });
        //     } else {
        //       acc.arr2.push({ ...out });
        //     }
        //     return acc;
        //   },
        //   { arr1: [], arr2: [] }
        // );
        this.featuredProductsFirst = arrayElemnt;
        // this.featuredProductsSecond = elements.arr2;
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
        query: { data: encryptedID },
      });
    },

    async HandlerProductFavorite(item) {
      try {
        const request = {
          publication_id: item.publication_id,
          page: 1,
          per_page: 1,
          paginate: false,
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
          store_id: 1,
          type: "",
          page: 1,
          per_page: 12,
          paginate: true,
        };

        const response = await this.$store.dispatch(
          "products/LIST_PROMOTIONS",
          request
        );

        // let carrusel = [];
        // let destacados = [];
        // let categoria = [];

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
  },
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
</style>
