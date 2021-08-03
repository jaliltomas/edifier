<template>
  <v-container fluid>
    <v-app-bar
      dense
      flat
      :class="$route.name == 'home' ? 'elevation-0 mb-0' : 'elevation-0 mb-0'"
      color="transparent"
      light
    >
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        v-if="isMobile"
      ></v-app-bar-nav-icon>

      <v-avatar size="120" tile @click="$router.push({ name: 'home' })">
        <v-img
          style="cursor: pointer"
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
        e
      </div>
      <div v-if="!isMobile">
        <span @mouseover="megaMenu = true" style="cursor: pointer">
          Productos
        </span>
        <span
          @mouseover="megaMenu = false"
          class="text-capitalize px-10"
          style="cursor: pointer"
        >
          Soporte
        </span>
        <span class="text-capitalize" style="cursor: pointer"> Contacto </span>
      </div>

      <v-spacer></v-spacer>

      <!-- BUSCADOR -->
      <v-btn @click="activeSearch" icon>
        <v-icon color="black">mdi-magnify</v-icon>
      </v-btn>

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
      <div v-if="!isMobile && isAuth == true">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="$router.push({ name: 'profile' })"
              v-if="isAuth"
              class="mr-1 ml-2 elevation-1"
              color="#E9E9E9"
              fab
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

      <!-- INGRESAR NO AUTENTICADO -->
      <v-btn
        v-if="isMobile == false && isAuth == false"
        class="text-capitalize"
        text
        @click="HandlerRouter('login')"
      >
        <v-icon class="mr-1">mdi-account-outline</v-icon>
        Ingresar
      </v-btn>

      <!-- SALIR APP -->
      <v-btn
        v-if="isMobile == false && isAuth == true"
        class="text-capitalize"
        text
        @click="HandlerLogout"
      >
        <v-icon class="mr-1">mdi-exit-to-app</v-icon>
        Salir
      </v-btn>

      <v-btn
        v-if="isMobile == true && isAuth == false"
        class="text-capitalize"
        text
        @click="$router.push({ name: 'login' })"
      >
        <v-icon class="mr-1">mdi-account</v-icon>
      </v-btn>

      <v-btn
        v-if="isMobile && isAuth == true"
        @click="HandlerLogout()"
        class="ml-0 mr-0"
        color="black"
        text
        icon
      >
        <v-icon>mdi-exit-to-app </v-icon>
      </v-btn>

      <!-- CARRITO -->
      <!-- <v-badge
        v-if="products"
        :content="products.length"
        :value="products.length"
        bordered
        color="#00A0E9"
        overlap
      >
        <v-btn color="black" icon @click="HandlerRouter('cart')">
          <v-icon>mdi-cart-outline</v-icon>
        </v-btn>
      </v-badge> -->

      <v-menu
        open-on-hover
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="#00A0E9" dark v-bind="attrs" v-on="on">
            <v-icon>mdi-cart-outline</v-icon>
          </v-btn>
        </template>

        <v-card v-if="productCartState.shopping_cart_items != null && productCartState.shopping_cart_items.length > 0">
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
              Carrito
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      bottom
      color="transparent"
      fixed
      height="auto"
      overlay-color="secondary"
      overlay-opacity=".6"
      temporary
      v-bind="$attrs"
      v-on="$listeners"
    >
      <v-list color="white" shaped>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in drawerItems" :key="i">
            <v-list-item-content>
              <v-btn
                v-if="item.func == true"
                color="#2696A6"
                text
                class="font-medium text-capitalize"
                @click="HandlerRoute(item.href, item.value)"
              >
                {{ item.text }}
              </v-btn>
              <v-btn
                v-if="item.func == false"
                color="#2696A6"
                text
                @click="HandlerRoute(item.href, item.value)"
                class="font-medium text-capitalize"
              >
                {{ item.text }}
              </v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <div
      v-if="megaMenu"
      @mouseleave="megaMenu = false"
      class="mega_menu animate__animated animate__fadeIn animate__faster"
    >
      <v-list nav dense style="padding-left: 18em; padding-right: 18em">
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>

    <v-dialog max-width="600" v-model="showRegion">
      <v-card :loading="loadingProducts">
        <v-card-title>Selecciona tu region</v-card-title>
        <v-card-text class="mb-0 pb-0">
          <v-select
            @change="selectRegion"
            dense
            outlined
            color="black"
            :items="dataRegion"
            item-text="name"
            item-value="id"
            label="Region"
            v-model="regionSelected"
          ></v-select>
        </v-card-text>
        <v-card-actions class="mt-0 pt-0">
          <v-spacer></v-spacer>
          <v-btn
            :loading="loadingProducts"
            v-if="regionSelected != ''"
            @click="showRegion = false"
            text
            color="black"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      megaMenu: false,
      group: null,

      // Regions
      showRegion: false,
      dataRegion: [
        {
          name: "CABA",
          id: 1,
        },
        {
          name: "GBA",
          id: 2,
        },
        {
          name: "Rosario",
          id: 3,
        },
        {
          name: "Cordoba Capital",
          id: 4,
        },
      ],
      regionSelected: "",

      // Loading
      loadingProducts: false,

      // search
      search: false,

      // CART
      fav: true,
      menu: false,
      message: false,
      hints: true,
    };
  },

  watch: {
    isMobile(val) {
      if (!val) this.drawer = false;
    },
  },

  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.mobile;
    },

    isAuth() {
      return this.$store.getters["auth/AUTHENTICATED"];
    },

    favoriteProduct() {
      console.log(
        "Productos favoritos",
        this.$store.getters["products/GET_PRODUCT_FAVORITES"]
      );
      return this.$store.getters["products/GET_PRODUCT_FAVORITES"];
    },

    drawerItems() {
      const isAuth = this.$store.getters["auth/AUTHENTICATED"];
      let items;
      if (isAuth) {
        items = [
          { text: "Inicio", func: true, href: "home", value: "home" },
          { text: "Perfil", func: false, href: "profile", value: "profile" },
          {
            text: "Productos",
            func: false,
            href: "products",
            vlue: "products",
          },
          {
            text: "Carrito",
            func: false,
            href: "cart",
            value: "cart",
          },
          {
            text: "Favoritos",
            func: false,
            href: "product_favorite",
            value: "product_favorite",
          },
        ];
      } else {
        items = [
          { text: "Inicio", func: false, href: "home", value: "home" },
          {
            text: "Productos",
            func: false,
            href: "products",
            value: "products",
          },
        ];
      }
      return items;
    },

    productCartState() {
      return this.$store.getters["cart/CART_PRODUCTS"];
    },

    products() {
      const cart = this.$store.getters["cart/CART_PRODUCTS"];
      return cart.length == 0 ? [] : cart.shopping_cart_items;
    },
  },

  methods: {
    HandlerRouter(router) {
      this.$router.push({ name: router }).catch((err) => {});
    },

    HandlerRoute(route, value) {
      this.$router.push({ name: route }).catch((err) => {});
    },

    async HandlerLogout() {
      try {
        // await this.$store.dispatch("auth/LOGOUT");
        this.$store.commit("auth/CLEAR_DATA_LOGOUT");
        // console.log(response);
        this.$router.push({ name: "home" }).catch((err) => err);
      } catch (error) {
        console.log(error);
      }
    },

    getRegion() {
      if (this.isAuth) {
        const authUser = this.$store.getters["auth/GET_PROFILE"];
        const regionData = this.getRegionData(authUser.warehouse_id);
        return regionData.length > 0 ? regionData[0].name : "";
      } else {
        if (sessionStorage.getItem("region") == null) {
          return "";
        }
        const myRegion = parseInt(sessionStorage.getItem("region"));
        const regionData = this.getRegionData(myRegion);
        return regionData.length > 0 ? regionData[0].name : "";
      }
    },

    getRegionData(region) {
      const selectRegion = this.dataRegion
        .map((reg) => {
          if (reg.id == region) {
            return reg;
          }
        })
        .filter((val) => val != undefined);
      return selectRegion;
    },

    selectRegion(evt) {
      this.regionSelected = evt;
      this.showRegion = false;
      sessionStorage.setItem("region", this.regionSelected);
      this.HandlerGetProductByRegion(this.regionSelected);
      this.HandlerGetCategoriesByRegion(this.regionSelected);
    },

    async HandlerGetProductByRegion(region) {
      try {
        this.loadingProducts = true;
        const request = {
          store: 3,
          page: 1,
          per_page: 12,
          paginate: true,
          warehouse_id: region,
        };

        if (!this.isAuth) {
          await this.$store.dispatch("products/GET_PRODUCTS", request);
        } else {
          await this.$store.dispatch("products/GET_AUTH_PRODUCTS", request);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingProducts = false;
      }
    },

    HandlerShowRegion() {
      console.log(this.isAuth);
      if (this.isAuth == true) {
        this.$snotify.warning("Modifica tu region en el perfil", "Alerta!");
      } else {
        this.showRegion = true;
      }
    },

    async HandlerGetCategoriesByRegion(region) {
      try {
        this.loadingProducts = true;
        const request = {
          store: 3,
          page: 1,
          per_page: 10,
          paginate: true,
          warehouse_id: region,
        };
        await this.$store.dispatch("products/GET_CATEGORIES", request);
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingProducts = false;
      }
    },

    activeSearch() {
      this.$store.commit("activeSearch");
    },
  },
};
</script>

<style>
.center-me {
  position: absolute;
  margin-left: 50%;
  transform: translate(-50%, 0);
}
.my-custom-dialog {
  align-self: flex-end;
}
.fade-transition-leave-active {
  position: absolute;
  width: 100%;
}

.mega_menu {
  position: absolute;
  z-index: 1;
  width: 100%;
  margin-left: -12px;
}
</style>
