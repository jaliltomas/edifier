<template>
  <v-container fluid>
    <div class="custom-nav">
      <div class="d-flex px-0 px-sm-15 px-md-15 nav-position">
        <v-app-bar-nav-icon
          @click="drawer = !drawer"
          v-if="isMobile"
        ></v-app-bar-nav-icon>

        <v-avatar
          width="120"
          heigth="75"
          tile
          @click="$router.push({ name: 'home' }).catch(err => err)"
        >
          <v-img
            class="cursor-pointer"
            contain
            @mouseover="megaMenu = false"
            src="@/assets/img/edifier-logo-color.svg"
          ></v-img>
        </v-avatar>
        <div
          v-if="!$vuetify.breakpoint.smAndDown"
          class="px-5"
          @mouseover="megaMenu = false"
          style="color: white; cursor: default"
        >
          .
        </div>
        <div v-if="!isMobile" class="nav-row">
          <span style="position: relative;">
            <v-hover v-slot="{ hover }">
              <span
                @mouseover="headphonesMenu = true; speakersMenu = false"
                :class="hover ? 'nav-item-hover text-capitalize mx-4 py-4':'nav-item text-capitalize mx-4 py-4'"
                :style="
                  (currentURL.toLowerCase().includes('auriculares') || headphonesMenu) ? 'font-weight: 600;' : ''
                "
              >
                Auriculares
              </span>
            </v-hover>
            <div
              v-if="headphonesMenu"
              @mouseleave="headphonesMenu = false"
              class="menu-dropdown mega_menu animate__animated animate__fadeIn animate__faster"
              style="background-color: #f8f8f8"
            > 
              <div 
                v-for="(item, index) in headphonesOptions" 
                :key="index"
                class="row-menu"
                @click="()=>HandlerGoToCategory(item.id, item.type, item.title)"
              >
                <img
                  v-if="item.icon"
                  height="24"
                  width="24"
                  :src="item.icon"
                  style="margin-right: 8px;"
                />
                <div class="row-menu-title" >{{ item.title }}</div>
              </div>
              <div 
                class="see-all-text"
                @click="()=>HandlerGoToCategory(8, 1,'Auriculares')"
              >
                Ver todos
              </div>
            </div>
          </span>
          <span style="position: relative;">
            <v-hover v-slot="{ hover }">
              <span
                @mouseover="speakersMenu = true; headphonesMenu = false"
                :class="hover ? 'nav-item-hover text-capitalize mx-4 py-4':'nav-item text-capitalize mx-4 py-4'"
                :style="
                   (currentURL.toLowerCase().includes('parlantes') || speakersMenu) ? 'font-weight: 600;' : ''
                "
              >
                Parlantes
              </span>
            </v-hover>
            <div
              v-if="speakersMenu"
              @mouseleave="speakersMenu = false"
              class="menu-dropdown mega_menu animate__animated animate__fadeIn animate__faster"
              style="background-color: #f8f8f8"
            > 
              <div 
                v-for="(item, index) in spekersOptions" 
                :key="index"
                class="row-menu"
                @click="()=>HandlerGoToCategory(item.id, item.type, item.title)"
              >
                <img
                  v-if="item.icon"
                  height="24"
                  width="24"
                  :src="item.icon"
                  style="margin-right: 8px;"
                />
                <div class="row-menu-title" >{{ item.title }}</div>
              </div>
              <div 
                class="see-all-text"
                @click="()=>HandlerGoToCategory(7, 1,'Parlantes')"
              >
                Ver todos
              </div>
            </div>
          </span>

          <v-hover v-slot="{ hover }">
            <span
              @click="goToMenu('about_us')"
              @mouseover="closeMenu()"
              :class="hover ? 'nav-item-hover text-capitalize mx-4 py-4':'nav-item text-capitalize mx-4 py-4'"
              :style="
                currentURL.toLowerCase().includes('about_us') ? 'font-weight: 600;' : ''
              "
            >
              Nosotros
            </span>
          </v-hover>
          <v-hover v-slot="{ hover }">
            <span
              @mouseover="closeMenu()"
              @click="goToMenu('contact')"
              :class="hover ? 'nav-item-hover text-capitalize mx-4 py-4':'nav-item text-capitalize mx-4 py-4'"
              :style="
                currentURL.toLowerCase().includes('contact') ? 'font-weight: 600;' : ''
              "
            >
              Contacto
            </span>
          </v-hover>
        </div>

        <v-spacer></v-spacer>

        <!-- BUSCADOR -->
        <v-icon color="black" @click="activeSearch" class="mr-2">
          mdi-magnify
        </v-icon>

        <!-- FAVORITOS AUTENTICADO -->
        <div v-if="!isMobile && favoriteProduct.length > 0">
          <v-btn
            @click="$router.push({ name: 'product_favorite' })"
            v-if="isAuth"
            class="mr-1 ml-2"
            color="black"
            icon
          >
            <v-icon
              class="animate__animated animate__pulse animate__infinite"
              color="red lighten-1"
            >
              mdi-heart
            </v-icon>
          </v-btn>
        </div>

        <!-- PERFIL AUTENTICADO -->
        <div v-if="isAuth == true">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="$router.push({ name: 'profile' })"
                v-if="isAuth"
                class="mr-1 ml-2 elevation-0"
                color="#E9E9E9"
                icon
                small
                v-bind="attrs"
                v-on="on"
              >
                <v-icon color="black">mdi-account-circle-outline </v-icon>
              </v-btn>
            </template>
            <span>Perfil</span>
          </v-tooltip>
        </div>

        <v-btn
          v-if="isMobile == true && isAuth == false"
          class="text-capitalize"
          text
          @click="$router.push({ name: 'login' })"
        >
          <v-icon class="mr-1">mdi-account</v-icon>
        </v-btn>

        <v-menu
          open-on-hover
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-x
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="HandlerRouter('cart')"
              icon
              color="#00A0E9"
              dark
              v-bind="attrs"
              v-on="on"
              class="ml-2"
            >
              <v-icon>mdi-cart-outline</v-icon>
            </v-btn>
          </template>

          <v-card
            v-if="
              productCartState.shopping_cart_items != null &&
                productCartState.shopping_cart_items.length > 0
            "
          >
            <div
              class="pt-3 px-5 d-flex"
              v-for="(item, index) in productCartState.shopping_cart_items"
              :key="index"
            >
              <div>
                <v-avatar tile v-if="item.publication.images == null">
                  <img
                    height="200"
                    width="100%"
                    contain
                    src="@/assets/img/no_image.jpg"
                  />
                </v-avatar>
                <v-avatar v-else tile size="100">
                  <v-img
                    contain
                    :src="item.publication.images[0]"
                    :lazy-src="item.publication.images[0]"
                    alt="Product Image"
                  ></v-img>
                </v-avatar>
              </div>
              <div class="pl-3 align-self-center">
                <div class="">{{ item.publication.keywords }}</div>
                <div
                  class="mt-2"
                  v-if="
                    item.publication != null && item.publication.price != null
                  "
                >
                  $ {{ item.publication.price.pvp | currency }}
                </div>
              </div>
            </div>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                dark
                small
                color="#00a0e9"
                rounded
                @click="HandlerRouter('cart')"
              >
                Lista de compra
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-if="isAuth == true"
              class="ml-3"
              v-bind="attrs"
              v-on="on"
              @click="HandlerLogout"
              color="black"
            >
              mdi-exit-to-app
            </v-icon>
          </template>
          <span>Salir</span>
        </v-tooltip>

        <v-btn
          v-if="isMobile == false && isAuth == false"
          class="text-capitalize"
          text
          @click="HandlerRouter('login')"
        >
          <v-icon class="mr-1">mdi-account-outline</v-icon>
          Ingresar
        </v-btn>
      </div>

      <!-- MEGA MENU -->
      <div
        v-if="megaMenu"
        @mouseleave="megaMenu = false"
        class="mega_menu animate__animated animate__fadeIn animate__faster"
        style="background-color: #f8f8f8"
      >
        <v-container>
          <v-row class="mb-10">
            <v-col
              cols="12"
              md="3"
              v-for="(category, index) in categories"
              :key="index"
            >
              <v-hover v-slot="{ hover }">
                <div
                  @click="HandlerGetPublicProducts(category, 1)"
                  :style="
                    hover
                      ? 'font-size: 1.3em; cursor: pointer; color: #00A0E9'
                      : 'font-size: 1.3em; cursor: pointer'
                  "
                  class="mt-7 mb-5 text-capitalize"
                >
                  {{ category.name }}
                </div>
              </v-hover>
              <div
                v-if="
                  category.name != 'Línea S' &&
                    category.name != 'Gaming' &&
                    category.name != 'Todo' &&
                    category.name != 'Portátiles'
                "
              >
                <div
                  v-for="(sub_cat, j) in category.sub_category"
                  :key="j"
                  class="text-capitalize mb-3"
                >
                  <span
                    @click="HandlerGetPublicProducts(sub_cat, 2)"
                    style="cursor: pointer"
                  >
                    {{ sub_cat.name }}
                  </span>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>

    <v-navigation-drawer
      v-model="drawer"
      color="transparent"
      fixed
      height="auto"
      overlay-color="secondary"
      overlay-opacity="0"
      temporary
      v-bind="$attrs"
      v-on="$listeners"
      style="top:70px; width: 280px;"
    >
      <v-list class="list-menu" shaped>
        <v-list-item-group color="primary">
          <v-expansion-panels accordion >
            <v-list-item v-for="(item, i) in drawerItems" :key="i">
              <v-list-item-content>
                <v-btn
                  color="black"
                  text
                  class="menu-btn"
                  @click="goToMenu(item.url)"
                  v-if="!item.isDropdown"
                >
                  {{ item.title }}
                </v-btn>
                <v-expansion-panel  v-else>
                  <v-expansion-panel-header>
                    {{ item.title }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div 
                      v-for="(itm, index) in item.items" 
                      :key="index"
                      class="row-menu"
                      @click="()=>HandlerGoToCategory(itm.id, itm.type, item.title)"
                    >
                      <img
                        v-if="itm.icon"
                        height="24"
                        width="24"
                        :src="itm.icon"
                        style="margin-right: 8px;"
                      />
                      <div class="row-menu-title" >{{ itm.title }}</div>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-list-item-content>
            </v-list-item>
          </v-expansion-panels>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      megaMenu: false,
      headphonesMenu: false,
      speakersMenu: false,
      group: null,
      showModalContact: false,

      // Loading
      loadingProducts: false,

      // search
      search: false,

      // CART
      fav: true,
      menu: false,
      message: false,
      hints: true,

      //Categories
      categories: [],
      headphonesOptions: [
        {title: "Auriculares In-Ear", icon: require("../../assets/img/headphones-in-ear.png"), id: 53, type:2},
        {title: "Auriculares Over-Ear", icon: require("../../assets/img/headphones-over-ear.png"), id: 54, type:2},
        {title: "Auriculares Gamer/PC", icon: require("../../assets/img/headphones-gamer-pc.png"), id: 54, type:2},
      ],
      spekersOptions: [
        {title: "2.0 / Estudio", icon: require("../../assets/img/speakers-estudio.png"), id: 38, type:2},
        {title: "2.1 / Multimedia", icon: require("../../assets/img/speakers-multimedia.png"), id: 39, type:2},
        {title: "SubWoofer", icon: require("../../assets/img/speakers-portatil.png"), id: 45, type:2},
        {title: "Portátiles", icon: require("../../assets/img/speakers-portatil.png"), id: 13, type:1},
        {title: "Línea Signature", id: 9, type:1},
        {title: "Estilo", id: 46, type:2},
      ],
      currentURL: '',
    };
  },

  created() {
    this.GetCategories();
  },

  mounted() {
    this.currentURL = window.location.href;
  },

  watch: {
    isMobile(val) {
      if (!val) this.drawer = false;
    },
    '$route'(to, from) {
      this.currentURL = window.location.href;
    }
  },

  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.sm ||  this.$vuetify.breakpoint.xs;
    },

    isAuth() {
      return this.$store.getters["auth/AUTHENTICATED"];
    },

    favoriteProduct() {
      return this.$store.getters["products/GET_PRODUCT_FAVORITES"];
    },

    drawerItems() {
      const items = [
        {
          title: "Auriculares", 
          url: "",
          isDropdown: true,
          items: [
            ...this.headphonesOptions,
            {title: "Ver todos", id: 8, type: 1},
          ],
        },
        {
          title: "Parlantes", 
          url: "",
          isDropdown: true,
          items: [
            ...this.spekersOptions,
            {title: "Ver todos", id: 7, type: 1},
          ]
        },
        {title: "Nosotros", url: "about_us"},
        {title: "Contacto", url: "contact"},
      ]
      return items;
    },

    productCartState() {
      return this.$store.getters["cart/CART_PRODUCTS"];
    },

    products() {
      const cart = this.$store.getters["cart/CART_PRODUCTS"];
      return cart.length == 0 ? [] : cart.shopping_cart_items;
    }
  },

  methods: {
    HandlerRouter(router) {
      if (router == "cart") {
        if (this.isAuth) {
          this.$router.push({ name: router }).catch(err => {});
        } else {
          this.$router.push({ name: "login" }).catch(err => {});
        }
      } else {
        this.$router.push({ name: router }).catch(err => {});
      }
    },

    HandlerRoute(route, value) {
      this.$router.push({ name: route }).catch(err => {});
    },

    async HandlerLogout() {
      try {
        this.$store.commit("auth/CLEAR_DATA_LOGOUT");
        this.$store.commit("cart/CLEAN_CART");
        this.$router.push({ name: "home" }).catch(err => err);
      } catch (error) {
        console.log(error);
      }
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

    async HandlerGetPublicProducts(item, value) {
      if (value == 1) {
        const category_id = JSON.parse(item.id);
        this.$router
          .push({ name: "products", query: { data: category_id } })
          .catch(err => err);
      } else {
        const sub_category_id = JSON.parse(item.id);
        this.$router
          .push({
            name: "products",
            query: { sub_data: sub_category_id }
          })
          .catch(err => err);
      }
      this.megaMenu = false;
    },

    async HandlerGoToCategory(id, value, name) {
      if (value == 1) {
        this.$router
          .push({ name: "products", query: { data: id, category_name: name } })
          .catch(err => err);
      } else {
        this.$router
          .push({
            name: "products",
            query: { sub_data: id, category_name: name }
          })
          .catch(err => err);
      }
    },

    activeSearch() {
      this.$store.commit("activeSearch");
    },

    goTo() {
      window.open("https://soportecliente.com/");
    },

    goToContact() {
      const url = process.env.VUE_APP_CHECKOUT;
      location.href = `${url}/contact`;
    },

    goToMenu(url){
      if(url == "showRoom"){
        this.$router.push({ name: "showRoom" });
      } else {
        location.href = url;
      }
    },

    closeMenu(){
      this.headphonesMenu = false;
      this. speakersMenu = false;
    },
  }
};
</script>

<style>
  .nav-row{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .menu-dropdown{
    left: 16px !important;
    top: 32px;
    background-color: white !important;
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    width: 240px !important;
  }
  .row-menu{
    display: flex;
    flex-direction: row;
    padding: 8px 14px;
    align-items: center;
    cursor: pointer;
  }
  .row-menu:hover{
    background-color: rgba(0, 160, 233, 0.25);
  }
  .row-menu-title{
    color: black;
    font-size: 16px;
  }
  .see-all-text{
    color: black;
    font-weight: 600;
    font-size: 14px;
    padding: 8px 12px;
    cursor: pointer;
  }
  .see-all-text:hover{
    background-color: rgba(0, 160, 233, 0.25);
  }
  .menu-btn .v-btn__content{
    justify-content: flex-start;
    color: black;
    font-size: 15px;
    font-weight: 600;
  }
  .menu-btn{
    text-transform: capitalize !important;
    background-color: transparent !important;
  }
  .menu-btn:hover{
    background-color: transparent !important;
  }
  .v-btn:before{
    background-color: transparent !important;
  }
  .v-list-item{
    background-color: transparent !important;
  }
  .v-list-item--link:before {
    background-color: transparent !important;
  }
  .v-list-item__content {
      padding: 0 !important;
  }
  .list-menu{
    background-color:rgba(256,256,256,0.95) !important;
    min-height: 370px !important;
  }
  .v-expansion-panel:before {
    box-shadow: none !important;
  }
  .v-application--is-ltr .v-expansion-panel-header {
    height: 36px !important;
    min-height: 36px !important;
    padding: 0 16px !important;
    color: black !important;
    font-size: 15px !important;
    font-weight: 600 !important;
  }
  .v-application--is-ltr .v-expansion-panel-header__icon {
    display: none !important;
  }
  .v-expansion-panel-content__wrap {
    padding: 0 !important;
  }
  .nav-item-hover{
    cursor: pointer; 
    font-weight: 600;
    display: flex;
    width: 76px;
    justify-content: center;
  }
  .nav-item{
    cursor: pointer; 
    display: flex;
    width: 76px;
    justify-content: center;
  }
  .theme--light.v-expansion-panels .v-expansion-panel {
    background-color: transparent !important;
    color: black !important;
  }
</style>
