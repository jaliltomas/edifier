<template>
  <v-container fluid>
    <div class="custom-nav" style="height: 75px">
      <div
        class="d-flex px-0 px-sm-15 px-md-15"
        style="height: 75px; align-items: center"
      >
        <v-app-bar-nav-icon
          @click="drawer = !drawer"
          v-if="isMobile"
        ></v-app-bar-nav-icon>

        <v-avatar
          size="120"
          tile
          @click="$router.push({ name: 'home' }).catch((err) => err)"
        >
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
          .
        </div>
        <div v-if="!isMobile">
          <span
            @mouseover="megaMenu = true"
            :style="
              $route.name == 'products'
                ? 'cursor: pointer; color: #00A0E9'
                : 'cursor: pointer;'
            "
          >
            Productos
          </span>
          <span
            @mouseover="megaMenu = false"
            @click="goTo()"
            class="text-capitalize px-10"
            style="cursor: pointer"
          >
            Contacto
          </span>
          <span
            @click="goTo()"
            @mouseover="megaMenu = false"
            class="text-capitalize"
            style="cursor: pointer"
          >
            Soporte técnico
          </span>
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
            <v-btn
              @click="HandlerRouter('cart')"
              icon
              color="#00A0E9"
              dark
              v-bind="attrs"
              v-on="on"
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
                Mi Carrito
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>

      <!-- MEGA MENU -->
      <div
        v-if="megaMenu"
        @mouseleave="megaMenu = false"
        class="mega_menu animate__animated animate__fadeIn animate__faster"
        style="background-color: white"
      >
        <v-container>
          <v-row class="mb-10">
            <v-col
              cols="12"
              md="3"
              v-for="(category, index) in categories"
              :key="index"
            >
              <div
                @click="HandlerGetPublicProducts(category, 1)"
                style="font-size: 1.3em; cursor: pointer"
                class="mt-7 mb-5 text-capitalize"
              >
                {{ category.name }}
              </div>
              <div
                v-if="
                  category.name != 'Línea S' &&
                  category.name != 'Gaming' &&
                  category.name != 'Todo'
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
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      megaMenu: false,
      group: null,

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
    };
  },

  created() {
    this.GetCategories();
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
        this.$store.commit("auth/CLEAR_DATA_LOGOUT");
        this.$router.push({ name: "home" }).catch((err) => err);
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
          everything: false,
        };
        const response = await this.$store.dispatch(
          "products/GET_CATEGORIES",
          request
        );
        this.categories = response.data.data.data;
        console.log("Categorias****", response);
      } catch (error) {
        console.log(error);
      }
    },

    async HandlerGetPublicProducts(item, value) {
      if (value == 1) {
        const category_id = JSON.parse(item.id);
        this.$router
          .push({ name: "products", query: { data: category_id } })
          .catch((err) => err);
      } else {
        const sub_category_id = JSON.parse(item.id);
        this.$router
          .push({
            name: "products",
            query: { sub_data: sub_category_id },
          })
          .catch((err) => err);
      }
      this.megaMenu = false;
    },

    activeSearch() {
      this.$store.commit("activeSearch");
    },

    goTo() {
      window.open("http://www.edifierla.com/hola/");
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
  margin-left: 0px;
}

.custom-nav {
  height: 76px;
  position: fixed;
  z-index: 2;
  background-color: white;
  width: 100%;
  top: 0;
  left: 0;
}
</style>
