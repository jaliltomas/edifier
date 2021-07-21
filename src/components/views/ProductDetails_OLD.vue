<template>
  <v-responsive>
    <div style="background-color: #f5f5f5">
      <v-container>
        <v-progress-linear
          v-if="loadingResponse"
          indeterminate
          color="red darken-2"
        ></v-progress-linear>
        <!-- <h1>{{ breakpoint }}</h1> -->
        <v-row justify="center" v-if="dataProduct.product != null">
          <v-col cols="12" sm="10" md="10">
            <v-row>
              <v-col cols="12" md="5">
                <img
                  v-if="dataProduct.images == null"
                  height="200"
                  width="100%"
                  contain
                  :src="dataProduct.images[0]"
                />
                <v-carousel
                  v-else
                  hide-delimiters
                  width="100%"
                  :hide-delimiter-background="false"
                  :show-arrows-on-hover="true"
                  :show-arrows="true"
                  cycle
                >
                  <v-carousel-item
                    contain
                    v-for="(item, i) in dataProduct.images"
                    :key="i"
                    reverse-transition="fade-transition"
                    transition="fade-transition"
                    :src="item"
                  >
                    <!-- <v-img
                      :src="item"
                      :lazy-src="item"
                      contain
                      width="100%"
                      height="90%"
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
                    </v-img> -->
                  </v-carousel-item>
                </v-carousel>
              </v-col>

              <v-col
                cols="12"
                sm="10"
                md="7"
                lg="7"
                class="ml-0 mb-0 pb-0 d-flex flex-column"
              >
                <v-row justify="start" class="mb-0 pb-0">
                  <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <h1
                      class="text-title text-capitalize"
                      style="color: #424242"
                    >
                      {{ dataProduct.keywords }}
                    </h1>
                    <p v-if="isAuth">
                      <v-icon
                        :color="colorHeart"
                        @click="HandlerAddFavorites(dataProduct)"
                      >
                        {{ iconHeart }}
                      </v-icon>
                      Agregar a favoritos
                    </p>
                    <p class="mt-1">
                      <span v-html="dataProduct.resume"></span>
                    </p>
                    <p>
                      <span
                        v-if="dataProduct.price != null"
                        class="font-weight-light"
                        style="font-size: 40px"
                      >
                        $ {{ dataProduct.price.pvp | currencyPVP }}
                      </span>
                    </p>
                    <p
                      class="mt-sm-n2 mt-md-n2"
                      style="font-size: 19px; color: #424242; font-weight: 400"
                    >
                      18 cuotas sin interés de $
                      {{ `${dataProduct.price.pvp / 18}` | currency }}
                    </p>

                    <p v-if="dataProduct.product.product_warehouse.length > 0">
                      <span
                      class="font-weight-bold"
                      style="color: #7dc1f8; font-size: 18px"
                        v-if="
                          dataProduct.product.product_warehouse[0]
                            .current_stock == 0
                        "
                      >
                        No disponible actualmente
                      </span>
                    </p>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    lg="12"
                    xl="12"
                    v-if="dataProduct.product.product_warehouse.length > 0"
                  >
                    <cp-information
                      style="font-size: 18px"
                      :dataProduct="dataProduct"
                      :authUser="authUser"
                      v-if="
                        dataProduct.product.product_warehouse[0].current_stock >
                        0
                      "
                    />

                    <div
                      class="d-md-flex"
                      v-if="
                        dataProduct.product.product_warehouse[0].current_stock >
                        0
                      "
                    >
                      <v-card
                        style="border: 0.5px solid #c1c1c1"
                        tile
                        class="elevation-0 px-3 px-md-1"
                      >
                        <div class="d-flex align-center justify-center py-1">
                          <span class="mx-0">Cantidad</span>
                          <span class="ml-1">
                            <v-avatar size="35">
                              <v-btn
                                @click="HandlerQuantity('minus')"
                                color="#d6d1d1"
                                fab
                                outlined
                                x-small
                                class="mx-2 mx-md-0"
                              >
                                <v-icon color="black">mdi-minus</v-icon>
                              </v-btn>
                            </v-avatar>
                            {{ quantity }}
                            <v-avatar
                              @click="HandlerQuantity('plus')"
                              size="35"
                            >
                              <v-btn
                                color="#d6d1d1"
                                fab
                                outlined
                                x-small
                                class="mx-0 mx-md-0"
                              >
                                <v-icon color="black">mdi-plus</v-icon>
                              </v-btn>
                            </v-avatar>
                          </span>
                        </div>
                      </v-card>
                      <div class="d-flex justify-center justify-md-start">
                        <div
                          style="background-color: black; cursor: pointer"
                          @click="HandlerAddCart()"
                          class="d-flex py-2 py-md-0 mt-2 mt-md-0 ml-0 ml-md-1"
                        >
                          <span class="white--text mx-3 align-self-center">
                            Agregar al carrito
                          </span>
                        </div>
                        <div
                          @click="HandlerBuy()"
                          style="background-color: black; cursor: pointer"
                          class="d-flex py-2 py-md-0 mt-2 mt-md-0 ml-2 ml-md-1"
                        >
                          <span class="white--text mx-3 align-self-center">
                            Comprar
                          </span>
                        </div>
                      </div>
                    </div>
                    <!-- <div
                      v-if="
                        dataProduct.product.product_warehouse[0].current_stock >
                          0 && !dataProduct.out_stock
                      "
                    >
                      <v-card
                        style="border: 0.5px solid #c1c1c1"
                        tile
                        class="elevation-0"
                      >
                        <div class="d-flex align-center justify-center py-1">
                          <span class="ml-1">
                            <v-avatar size="35">
                              <v-btn
                                @click="HandlerQuantity('minus')"
                                color="#d6d1d1"
                                fab
                                outlined
                                x-small
                                class="mx-2 mx-md-0"
                              >
                                <v-icon color="black">mdi-minus</v-icon>
                              </v-btn>
                            </v-avatar>
                            {{ quantity }}
                            <v-avatar size="35">
                              <v-btn
                                @click="HandlerQuantity('plus')"
                                :disabled="disabledUmbral()"
                                color="#d6d1d1"
                                fab
                                outlined
                                x-small
                                class="mx-0 mx-md-0"
                              >
                                <v-icon color="black">mdi-plus</v-icon>
                              </v-btn>
                            </v-avatar>
                          </span>
                        </div>
                      </v-card>
                      <div
                        class="d-flex justify-center"
                        v-if="
                          dataProduct.product.product_warehouse[0]
                            .current_stock > 0 && !dataProduct.out_stock
                        "
                      >
                        <v-btn
                          block
                          @click="HandlerAddCart"
                          max-height="44.75px"
                          dark
                          color="#424242"
                          x-large
                          tile
                          class="text-capitalize elevation-0"
                        >
                          <span class="font-weight-normal">
                            Agregar al carrito
                          </span>
                        </v-btn>
                      </div>
                    </div>
                    <div
                      v-else
                      style="font-size: 17px; font-weight: 500; color: #569add"
                    >
                      Nos quedamos sin stock, pero no te preocupes, preguntanos
                      en el chat
                    </div> -->
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-btn
                  :block="$vuetify.breakpoint.name == 'xs'"
                  v-if="dataProduct.description != null"
                  tile
                  dark
                  @click="action = 1"
                  :color="action == 1 ? 'blue' : 'black'"
                >
                  Descripción
                </v-btn>
                <v-btn
                  :block="$vuetify.breakpoint.name == 'xs'"
                  v-if="dataProduct.specs != null"
                  tile
                  dark
                  @click="action = 2"
                  :color="action == 2 ? 'blue' : 'black'"
                  class="mx-md-2 my-2 my-md-0"
                >
                  Especificaciones
                </v-btn>
                <v-btn
                  :block="$vuetify.breakpoint.name == 'xs'"
                  v-if="dataProduct.qa != null"
                  tile
                  dark
                  @click="action = 3"
                  :color="action == 3 ? 'blue' : 'black'"
                >
                  FAQ
                </v-btn>

                <v-card class="mr-0 mr-sm-0 mb-5 mt-4" text tile outlined>
                  <v-card-text v-if="action == 1">
                    <span
                      style="font-weight: 500"
                      v-html="dataProduct.description"
                    ></span>
                  </v-card-text>
                  <v-card-text v-if="action == 2">
                    <span
                      style="font-weight: 500"
                      v-html="dataProduct.specs"
                    ></span>
                  </v-card-text>
                  <v-card-text v-if="action == 3">
                    <span
                      style="font-weight: 500"
                      v-html="dataProduct.qa"
                    ></span>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <suscribe-component />
      </v-container>
    </div>
  </v-responsive>
</template>

<script>
import CategoryComponent from "@/components/Utils/categories_component";
import SuscribeComponent from "@/components/Utils/suscribe_component";
import informationCP from "@/components/Utils/informationCP";
// import ImagesCarousel from "../misc/ImagesCarousel";
export default {
  components: {
    "category-component": CategoryComponent,
    "suscribe-component": SuscribeComponent,
    "cp-information": informationCP,
    // "image-carrousel-component": ImagesCarousel,
  },
  data() {
    return {
      dataProduct: [],
      productImages: [],
      quantity: 1,
      productCart: [],
      colorHeart: "black",
      iconHeart: "mdi-heart-outlined",
      id: "",
      action: 1,
      //CHAZKI
      chazkiResponse: null,
      //loading
      loading: false,
    };
  },

  async created() {
    const id = this.$route.query.data;
    const decryptedID = this.CryptoJS.AES.decrypt(
      id,
      "MyS3c3rtIdPr0Duct"
    ).toString(this.CryptoJS.enc.Utf8);
    this.HandlerGetProducts(decryptedID);
    if (this.isAuth) {
      this.HandlerGetCartsProducts();
    }
    this.id = decryptedID;

    if (this.isAuth) {
      const responseChazki = await this.$store.dispatch(
        "products/CHAZKI_VALIDATE"
      );
      this.responseChazki = responseChazki.data.data;
    }
  },

  computed: {
    isAuth() {
      return this.$store.getters["auth/AUTHENTICATED"];
    },

    authUser() {
      return this.$store.getters["auth/GET_PROFILE"];
    },

    productCartState() {
      return this.$store.getters["cart/CART_PRODUCTS"];
    },

    breakpoint() {
      console.log(this.$vuetify.breakpoint.name);
      return this.$vuetify.breakpoint.name;
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

    currency(value) {
      if (value) {
        // es-AR
        const AMOUNT_FORMAT = new Intl.NumberFormat("de-DE", {
          // currency: "USD",
          // style: "currency",
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(value);
        return AMOUNT_FORMAT;
      } else {
        return " ";
      }
    },
  },

  methods: {
    quotes(pvp) {
      const value = (pvp * this.quantity) / 18;
      return value;
    },

    disabledUmbral() {
      const currentStock =
        this.dataProduct.product.product_warehouse[0].current_stock;
      const umbral = this.dataProduct.threshold;
      const canBuy = currentStock - umbral;
      if (this.quantity == canBuy) {
        this.showNotifications = true;
        this.textNotification = "No puede agregar mas productos";
        return true;
      } else {
        return false;
      }
    },

    HandlerGetProducts(id) {
      if (this.isAuth === false) this.HandlerGetProductsNoAuth(id);
      if (this.isAuth == true) this.HandlerGetAuthProducts(id);
    },

    async HandlerGetProductsNoAuth(id) {
      try {
        this.loadingResponse = true;
        const request = {
          store: 1,
          page: 1,
          per_page: 1,
          paginate: false,
          product_id: parseInt(id),
          warehouse_id: "",
          keywords:
            this.$route.query.product == undefined
              ? ""
              : this.$route.query.product,
        };

        const response = await this.$store.dispatch(
          "products/GET_PRODUCTS",
          request
        );

        this.dataProduct = response.data.data[0];
        console.log(this.dataProduct);
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingResponse = false;
      }
    },

    async HandlerGetAuthProducts(id) {
      try {
        this.loadingResponse = true;
        const request = {
          store: 1,
          page: 1,
          per_page: 1,
          paginate: false,
          product_id: parseInt(id) || this.id,
          warehouse_id:
            parseInt(sessionStorage.getItem("region")) == null
              ? 1
              : parseInt(sessionStorage.getItem("region")),
          keywords:
            this.$route.query.product == undefined
              ? ""
              : this.$route.query.product,
        };

        const response = await this.$store.dispatch(
          "products/GET_AUTH_PRODUCTS",
          request
        );

        this.dataProduct = response.data.data[0];
        this.HandlerShowFavoriteIcon(this.dataProduct.product_favorite);
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingResponse = false;
      }
    },

    async HandlerGetCartsProducts() {
      try {
        await this.$store.dispatch("cart/GET_CURRENT_CART");
      } catch (error) {
        console.log(error);
      }
    },

    HandlerQuantity(quantity) {
      if (this.quantity == 1 && quantity == "minus") {
        return;
      } else if (quantity == "plus" && this.quantity < 4) {
        this.quantity++;
      } else if (quantity == "minus") {
        this.quantity--;
      }
    },

    async HandlerAddFavorites(item) {
      try {
        console.log(item);
        const request = {
          publication_id: item.id,
          page: 1,
          per_page: 1,
          paginate: false,
        };

        const response = await this.$store.dispatch(
          "products/ADD_FAVORITES",
          request
        );
        const data = response.data.data;
        this.HandlerGetAuthProducts();
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

    HandlerShowFavoriteIcon(product) {
      if (product == null) {
        this.colorHeart = "black";
        this.iconHeart = "mdi-heart-outline";
        return "mdi-heart-outline";
      } else if (product != null && product.status == true) {
        this.colorHeart = "red";
        this.iconHeart = "mdi-heart";
        return "mdi-heart";
      } else {
        this.colorHeart = "black";
        this.iconHeart = "mdi-heart-outline";
        return "mdi-heart-outline";
      }
    },

    async HandlerAddCart() {
      try {
        if (this.isAuth) {
          const cart = this.productCartState;
          console.log("Carrito*******", cart);

          const existingProduct = cart.shopping_cart_items.find(
            (p) => this.dataProduct.id === p.publication_id
          );

          if (existingProduct) {
            existingProduct.original_quantity =
              existingProduct.original_quantity + this.quantity;

            const indexUpdate = cart.shopping_cart_items.findIndex(
              (p) => this.dataProduct.id === p.publication_id
            );

            cart.shopping_cart_items[indexUpdate] = { ...existingProduct };

            const request = cart.shopping_cart_items.map((prod) => {
              return {
                publication_id: prod.publication_id,
                quantity: prod.original_quantity,
              };
            });

            console.log("reqeust ***************", request);

            await this.$store.dispatch("cart/CREATE_CART", {
              items: [...request],
            });
          } else {
            const oldItem = cart.shopping_cart_items.map((prod) => {
              return {
                publication_id: prod.publication_id,
                quantity: prod.original_quantity,
              };
            });
            const newitem = [
              ...oldItem,
              {
                publication_id: this.dataProduct.id,
                quantity: this.quantity,
              },
            ];

            const itemFilter = newitem.filter((value) => {
              if (value.publication_id != undefined) {
                return value;
              }
            });

            console.log("reqeust ***************", newitem);
            this.$store.commit("cart/ADD_ITEM", {
              ...this.dataProduct,
              original_quantity: this.quantity,
            });

            await this.$store.dispatch("cart/CREATE_CART", {
              items: [...itemFilter],
            });
          }
          this.$snotify.success(
            "Has agregado al carrito el producto",
            "Excelente"
          );
        } else {
          this.$router.push({ name: "login" });
        }
      } catch (error) {
        console.log(error);
        this.$snotify.error(
          "Ha ocurrido un error con agregando el producto",
          "Error"
        );
      }
    },

    async HandlerBuy() {
      try {
        if (!this.isAuth) {
          this.$router.push({ name: "login" });
          return;
        }
        const request = {
          update_items: true,
        };

        const response = await this.$store.dispatch(
          "cart/CONFIRM_PRODUCTS_CART",
          request
        );

        const productId = this.dataProduct.product_id;
        // AGREGAR PRODUCTO AL CARRITO E IR A COMPRAR
        const searchProduct =
          response.data.data.shopping_cart.shopping_cart_items.find(
            (product) => {
              if (product.publication.product_id == productId) {
                return product;
              }
            }
          );
        // MANDAR AL CHECKOUT PARA PAGAR
        if (searchProduct != undefined) {
          this.$router.push({ name: "cart" });
        } else {
          // AGREGAR E IR A CHECKOUT
          this.HandlerAddCart();
          setTimeout(() => {
            this.$router.push({ name: "cart" });
          }, 500);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style</style>
