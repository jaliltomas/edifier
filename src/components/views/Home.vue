<template>
  <div>
    <div style="position: relative;">
      <v-carousel
        v-model="item"
        height="100%"
        :interval="5000"
        :hide-delimiter-background="true"
        :show-arrows-on-hover="false"
        :show-arrows="false"
        :cycle="activeCycle"
        next-icon="mdi-chevron-right"
      >
        <v-carousel-item
          contain
          v-for="(item, i) in promotions[isDesktopDisplay? 'desktop':'mobile'].carrusel"
          :key="i"
          reverse-transition="fade-transition"
          transition="fade-transition"
          @click="redirectToUrl(item)"
          style="cursor: pointer;"
        >
          <v-img :src="urlImage(item.image_url)" style="height: 37vmax">
          </v-img>
        </v-carousel-item>
      </v-carousel>
      <v-btn @click="handlerActiveCycle" class="simple-play-btn" :style="{ left: `calc(50% + ${playBtnLeft}px + 10px)` }">
        <v-icon color="black" v-if="!activeCycle">
          mdi-play
        </v-icon>
        <v-icon color="black" v-else>
          mdi-pause
        </v-icon>
      </v-btn>
    </div>

    <v-container fluid>
      <section id="categorias" class="my-4">
        <div class="featured-info">
          <div class="featured-title">Productos destacados</div>
          <div class="featured-text">Conoce nuestra selección de productos destacados y convertite en un #EDIFAN</div>
        </div>
        <div class="featured-row mt-3">
          <div 
            class="featured-item" 
            v-for="(item, index) in promotions[isDesktopDisplay? 'desktop':'mobile'].destacados"
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
              @click="redirectToUrl(item)"
            >
              <v-hover v-slot="{ hover }">
                <v-img
                  :gradient="
                    !hover
                      ? 'to top, rgba(40, 41, 40, .15), rgba(24, 28, 31,.2)'
                      : ''
                  "
                  :class="hover ? 'hvr-grow featured-image' : 'featured-image'"
                  cover
                  :src="urlImage(item.image_url)"
                >
                </v-img>
              </v-hover>
            </v-card>
          </div>
        </div>
      </section>
    </v-container>

    <div class="news-banners mt-12" :style="isDesktopDisplay ? 'display:flex':'display:none'">
      <v-img 
        v-for="(item, index) in promotions.desktop.novedades"
        :src="urlImage(item.image_url)" 
        :class="index !== 0 ? 'news-image mt-8' : 'news-image'"
        @click="redirectToUrl(item)"
      />
    </div>

    <div class="news-banners-mobile mt-12" :style="!isDesktopDisplay ? 'display:flex':'display:none'">
      <v-img 
        v-for="(item, index) in promotions.mobile.novedades"
        :src="urlImage(item.image_url)" 
        :class="index !== 0 ? 'news-image-mobile mt-4' : 'news-image-mobile'"
        @click="redirectToUrl(item)"
      />
    </div>

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
      promotions:{
        desktop:{
          carrusel:[],
          destacados: [],
          novedades: [],
        }, 
        mobile:{
          carrusel:[],
          destacados: [],
          novedades: [],
        },
      },

      isVisible: true,

      item: 0,

      //Carrusel
      perPage: 3,
      activeCycle: true,
      playBtnLeft: 0,
      dummyCategory: [
        {image_url: require('../../assets/img/headphones.png')},
        {image_url: require('../../assets/img/bugles.png')},
        {image_url: require('../../assets/img/w-headphones.png')},
      ],
      windowWidth: 0,
      isDesktopDisplay: true,
    };
  },

  created() {
    this.HandlerGetProductFeatured();
    this.HandlerGetListPromotions();
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
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
    },
    windowWidth(){
      if(this.windowWidth > 600){
        this.isDesktopDisplay = true;
      } else {
        this.isDesktopDisplay = false;
      }
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
    },
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
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

    urlImage(url){
      const newUrl = url.replace('0.0.0.0:', 'localhost:');
      return newUrl
    },

    redirectToUrl(item) {
      if (item.url) {
        console.log(item.url);
        if (!item.url.startsWith('http://') && !item.url.startsWith('https://')) {
          item.url = 'http://' + item.url;
        }
        window.location.href = item.url;
      }
    },

    async HandlerGetListPromotions() {
      try {
        const request = {
          store_id: 3,
          type: "",
        };

        const response = await this.$store.dispatch(
          "products/LIST_PROMOTIONS",
          request
        );

        setTimeout(() => {
          this.getElementWidth();
        }, 50);

        for (const iterator of response.data.data) {
          switch (iterator.type) {
            case "banners_principales":
              if(iterator.display_device == "Desktop"){
                this.promotions.desktop.carrusel.push(iterator);
              } else{
                this.promotions.mobile.carrusel.push(iterator);
              }
              break;
            case "productos_destacados":
              if(iterator.display_device == "Desktop"){
                this.promotions.desktop.destacados.push(iterator);
              } else{
                this.promotions.mobile.destacados.push(iterator);
              }
              break;
            case "novedades":
              if(iterator.display_device == "Desktop"){
                this.promotions.desktop.novedades.push(iterator);
              } else{
                this.promotions.mobile.novedades.push(iterator);
              }
              break;
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
    },

    handlerActiveCycle() {
      this.activeCycle = !this.activeCycle;
    },

    getElementWidth() {
      const elemento = this.$el.querySelector('.v-carousel__controls>.v-item-group');
      if (elemento) {
        this.playBtnLeft = elemento.offsetWidth/2;
      }
    },
    
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  }
};
</script>

<style>
.featured-row{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0 2rem;
}

.featured-row .featured-item{
  width: 28%;
  height: 430px;
  max-width: 430px;
}
.featured-info{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3rem;
}

.featured-info .featured-title{
  color: #262626;
  font-size: 1.6em;
  font-weight: 600;
  line-height: 1.6em;
  text-align: center;
}

.featured-info .featured-text{
  color: #262626;
  font-size: 1.4em;
  font-weight: 400;
  padding: 0 0 1rem 0;
  text-align: center;
}

.featured-image{
  width: 100%; 
  height: 430px;
  max-width: 430px;
}

@media only screen and (max-width: 1280px) {
  .featured-row .featured-item{
    width: 30%;
    height: 420px;
  }
}

@media only screen and (max-width: 960px) {
  .featured-row{
    padding: 0 1rem;
  }
  .featured-row .featured-item{
    width: 32%;
    height: 380px;
  }
  .featured-image{
    width: 100%; 
    height: 380px
  }
}

@media only screen and (max-width: 780px) {
  .featured-row{
    padding: 0;
  }
  .featured-row .featured-item{
    width: 33%;
    height: 320px;
  }
  .featured-image{
    width: 100%; 
    height: 320px
  }
}

@media only screen and (max-width: 600px) {
  .featured-info{
    padding: 0 1.5rem;
  }
  .featured-row{
    flex-direction: column;
    align-items: center;
    padding: 0 1.5rem;
  }
  .featured-row .featured-item{
    width: 100%;
    height: 386px;
    margin-bottom: 1.5rem;
  }
  .featured-image{
    width: 100%; 
    height: 386px
  }
  .featured-info .featured-title{
    font-size: 1.2em;
  }

  .featured-info .featured-text{
    font-size: 1em;
  }
}

.news-banners{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 3rem;
}

.news-banners-mobile{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.news-banners .news-image{
  width: 100%;
  cursor: pointer;
}

.news-banners-mobile .news-image-mobile{
  width: 100%;
  cursor: pointer;
}

@media only screen and (max-width: 960px) {
  .news-banners{
    padding: 0 2rem;
  }
}
@media only screen and (max-width: 600px) {
  .news-banners{
    padding: 0;
  }
}

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
.simple-play-btn{
  left: 50%;
  position: absolute;
  bottom: 30px;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  height: fit-content !important;
  width: fit-content !important;
  min-width: auto !important;
  z-index: 1;
}
.v-carousel--hide-delimiter-background .v-carousel__controls {
  position: relative !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  height: 38px;
}
.v-carousel--hide-delimiter-background .v-carousel__controls .mdi:before, .mdi-set { 
    font: inherit !important;
}
.v-carousel__controls__item {
    margin: 0 3px !important;
    border: 2px solid rgba(0,0,0,.3) !important;
    width: 16px !important;
    height: 16px !important;
}
button.v-carousel__controls__item.v-btn.v-item--active.v-btn--active.v-btn--icon.v-btn--round.theme--dark.v-size--small {
    background-color: black;
}
.v-icon.v-icon:after {
  left: auto !important;
  top: auto !important;
  width: 16px !important;
  height: 16px !important;
}

.v-btn--fab.v-size--default .v-icon, .v-btn--fab.v-size--small .v-icon, .v-btn--icon.v-size--default .v-icon, .v-btn--icon.v-size--small .v-icon {
    height: 16px !important;
    width: 16px !important;
}
.theme--dark.v-btn.v-btn--icon {
    color: transparent !important;
}

/* .VueCarousel-navigation-next::before {
  content: url('../../assets/img/next.svg');
}
.VueCarousel-navigation-prev::before {
  content: url('../../assets/img/next.svg');
} */
</style>
