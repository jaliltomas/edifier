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
                  class="font-weight-bold"
                  :style="`font-size: 3vmax; color: ${item.color}`"
                >
                  {{ item.text_title }}
                </div>
              </v-col>
              <v-col cols="12" md="12">
                <div
                  class="mb-0"
                  :style="`font-size: 3vmax; color: ${item.color}`"
                >
                  {{ item.price }}
                </div>
              </v-col>
              <v-col cols="12" md="12">
                <v-btn
                  :small="$vuetify.breakpoint.smAndDown ? true : false"
                  color="#00A0E9"
                  rounded
                  @click="HandlerLocationCarrusel(item)"
                  class="elevation-0"
                >
                  conocelo en detalle
                </v-btn>
              </v-col>
              <v-col cols="12" md="12">
                <div class="d-flex mt-4">
                  <v-btn color="#495358" fab x-small>
                    <v-icon> mdi-share-variant </v-icon>
                  </v-btn>
                  <span :style="`color: ${item.color}`" class="ml-1 mt-1">
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
                <p class="black--text mr-1 text-uppercase text-center mb-0">
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
                  cover
                  style="width: 100%; height: 350px"
                  :src="item.image_url"
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
                        {{ item.text_title }}
                      </div>
                    </v-col>
                    <v-col cols="12" class="align-self-end">
                      <v-btn
                        @click="HandlerLocation(item)"
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
              </v-hover>
            </v-card>
          </v-col>
        </v-row>
      </section>
    </v-container>

    <section id="destacados">
      <v-responsive>
        <v-sheet color="#EBF1F7" class="mt-15">
          <div class="d-flex justify-center pt-15">
            <span
              class="text-uppercase text-center mb-0"
              style="font-size: 2em; font-weight: 300"
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
          <v-container :fluid="breakpoint > 900">
            <v-row justify="center">
              <v-col
                cols="12"
                :sm="breakpoint < 795 ? '12' : '10'"
                :md="breakpoint < 980 ? '10' : '12'"
                lg="10"
                xl="10"
              >
                <carousel
                  :perPage="
                    breakpoint < 650
                      ? 1
                      : breakpoint > 650 && breakpoint < 980
                      ? 2
                      : 3
                  "
                  paginationColor="#3FB7EE"
                  class="mt-10"
                >
                  <slide
                    v-for="(item, index) in featuredProductsFirst"
                    :key="index"
                    class="d-flex justify-center"
                  >
                    <v-card
                      :width="breakpoint < 1200 ? '20em' : '22em'"
                      height="auto"
                    >
                      <v-img
                        @click="HandlerProductDetails(item)"
                        style="cursor: pointer"
                        contain
                        class="mx-7 my-7"
                        width="auto"
                        height="300px"
                        :src="item.images[0]"
                      >
                      </v-img>
                      <v-card-text class="mx-3">
                        <v-row style="height: auto">
                          <v-col cols="12" class="mt-n5">
                            <span
                              @click="HandlerProductDetails(item)"
                              class="black--text text-uppercase"
                              style="
                                font-weight: 600;
                                font-size: 1.3em;
                                cursor: pointer;
                              "
                            >
                              {{ item.keywords }}
                            </span>
                          </v-col>
                          <v-col cols="12">
                            <div class="mr-3 mt-n5" v-html="item.resume"></div>
                          </v-col>
                          <v-col cols="12" class="align-self-end">
                            <div
                              v-if="item.price != null"
                              class="my-auto black--text"
                              style="font-weight: 600; font-size: 1.3em"
                            >
                              $ {{ item.price.pvp | currency }}
                            </div>
                          </v-col>

                          <v-col>
                            <information-cp
                              class="text-start"
                              :dataProduct="item"
                              :authUser="authUser"
                            />
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </slide>
                </carousel>
              </v-col>
              <v-col cols="12" md="12" class="d-flex justify-center mb-15">
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
import CategoryComponent from "@/components/Utils/categories_component";
import SuscribeComponent from "@/components/Utils/suscribe_component";
import { Carousel, Slide } from "vue-carousel";
import informationCP from "../Utils/informationCP.vue";
// import informationCP from "@/components/Utils/informationCP";
export default {
  components: {
    "category-component": CategoryComponent,
    "suscribe-component": SuscribeComponent,
    Carousel,
    Slide,
    "information-cp": informationCP,
    // "cp-information": informationCP,
  },

  data() {
    return {
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

    breakpoint() {
      console.log(this.$vuetify.breakpoint.name);
      return this.$vuetify.breakpoint.width;
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
          store_id: 3,
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
        console.log("Destacados", this.featuredProductsFirst);
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
          store_id: 3,
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

        console.log("Carrusel", this.carrusel);
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

    HandlerLocation(url) {
      // console.log("Categoria", url);
      const category_id = JSON.parse(url.category_id);
      this.$router.push({ name: "products", query: { data: category_id } });
    },

    HandlerLocationCarrusel(url) {
      location.href = url.url;
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
