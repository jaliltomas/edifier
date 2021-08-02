<template>
  <div>
    <div
      style="background-color: #ffffff; height: auto"
      :class="sticky ? 'header-sticky' : ''"
      v-scroll="onScroll"
    >
      <div style="background-color: #c9cdd9; height: 5px"></div>
      <v-tabs
        class="d-flex justify-center"
        color="#797A7E"
        background-color="#FFFFFF"
        slider-color="#0EA4E9"
      >
        <v-tab @click="$vuetify.goTo('#product')">
          {{ dataProduct.keywords }}
        </v-tab>
        <v-tab @click="$vuetify.goTo('#detalle_producto')">Descripción</v-tab>
        <v-tab @click="$vuetify.goTo('#especificaciones')">
          Especificaciones
        </v-tab>
        <v-tab @click="HandlerDowloadManual">
          <span v-if="!loadingManual">MANUAL DE USUARIOS</span>
          <span v-else>...</span>
        </v-tab>
      </v-tabs>
    </div>
    <v-sheet color="#EBF1F7" id="product">
      <v-container fluid>
        <v-row justify="center" class="mt-10">
          <v-col cols="12" sm="6" md="5">
            <img
              v-if="dataProduct.images == null"
              height="200"
              width="100%"
              contain
              src="../../assets/img/no_image.jpg"
            />
            <v-img
              :src="dataProduct.images[0]"
              :lazy-src="dataProduct.images[0]"
              contain
              v-else
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <div
              class="py-15"
              v-if="!$vuetify.breakpoint.smAndDown && !messageProductAdd"
            ></div>
            <!-- <div class="py-15" v-if="!$vuetify.breakpoint.smAndDown"></div> -->
          </v-col>
          <v-col cols="12" sm="6" md="5" class="ml-md-15 d-flex flex-column">
            <div>
              <div class="title-font text-uppercase">
                {{ dataProduct.keywords }}
              </div>
              <p class="mt-1">
                <span v-html="dataProduct.resume"></span>
              </p>
            </div>
            <div class="mt-auto">
              <div class="d-md-flex">
                <p>
                  <span
                    v-if="dataProduct.price != null"
                    class="font-weight-light"
                    style="font-size: 40px"
                  >
                    $ {{ dataProduct.price.pvp | currencyPVP }}
                  </span>
                </p>
                <v-chip
                  color="#5A5855"
                  class="align-self-center ml-md-3 mb-4"
                  style="font-size: 16px; color: #424242; font-weight: 400"
                >
                  <span class="white--text" v-if="dataProduct.price != null">
                    18 cuotas sin interés de $
                    {{ `${dataProduct.price.pvp / 18}` | currency }}
                  </span>
                </v-chip>
              </div>

              <div class="d-flex justify-space-between mt-5">
                <cp-information
                  style="font-size: 18px"
                  :dataProduct="dataProduct"
                  :authUser="authUser"
                  class="mt-auto"
                />

                <!-- <div class="d-flex mt-2 mt-md-0">
                  <v-btn
                    style="border-width: medium"
                    fab
                    color="#5A5953"
                    x-small
                  >
                    <v-icon color="white">mdi-share-variant-outline</v-icon>
                  </v-btn>
                  <span class="mt-1 ml-1">COMPARTIR</span>
                </div> -->
              </div>

              <div
                v-if="
                  dataProduct.product != null &&
                  dataProduct.product.product_warehouse != null &&
                  dataProduct.product.product_warehouse[0].current_stock > 0
                "
                class="d-flex align-center justify-start py-1 mt-10"
              >
                <span class="mx-0 text-uppercase" style="font-weight: 500">
                  Cantidad
                </span>
                <span class="ml-1">
                  <v-avatar size="35">
                    <v-btn
                      @click="HandlerQuantity('minus')"
                      color="white"
                      fab
                      x-small
                      class="mx-2 mx-md-0 elevation-0"
                    >
                      <v-icon color="black">mdi-minus</v-icon>
                    </v-btn>
                  </v-avatar>
                  <span class="mx-2">
                    {{ quantity }}
                  </span>
                  <v-avatar @click="HandlerQuantity('plus')" size="35">
                    <v-btn
                      color="white"
                      fab
                      x-small
                      class="mx-0 mx-md-0 elevation-0"
                    >
                      <v-icon color="black">mdi-plus</v-icon>
                    </v-btn>
                  </v-avatar>
                </span>
              </div>

              <div
                class="d-md-flex justify-space-between mt-5"
                style="width: 80%"
                v-if="
                  dataProduct.product != null &&
                  dataProduct.product.product_warehouse != null &&
                  dataProduct.product.product_warehouse[0].current_stock > 0
                "
              >
                <!-- <v-btn
                  dark
                  style="border-width: medium"
                  rounded
                  color="#00A0E9"
                  @click="HandlerAddCart()"
                >
                  Agregar al carrito
                </v-btn> -->

                <v-btn
                  style="border-width: medium"
                  rounded
                  dark
                  color="#00A0E9"
                  @click="HandlerAddCart()"
                  class="mt-1 mt-md-0"
                >
                  Comprar
                </v-btn>

                <div class="d-flex mt-2 mt-md-0">
                  <v-btn
                    style="border-width: medium"
                    fab
                    color="#5A5953"
                    x-small
                  >
                    <v-icon color="white">mdi-share-variant-outline</v-icon>
                  </v-btn>
                  <span
                    class="mt-2 ml-1"
                    style="font-size: 12px; font-weight: 600"
                  >
                    COMPARTIR
                  </span>
                </div>
              </div>
            </div>
            <div
              class="py-15"
              v-if="!$vuetify.breakpoint.smAndDown && !messageProductAdd"
            ></div>
            <div
              v-if="$vuetify.breakpoint.smAndDown"
              class="py-md-15 py-10"
            ></div>
          </v-col>
          <v-col offset-md="6" md="6" v-if="messageProductAdd">
            <div
              class="mb-15 d-flex ml-7"
              style="background-color: #00a0e9; border-radius: 5px; width: 80%"
            >
              <p
                @click="$router.push({ name: 'cart' })"
                class="white--text px-3 py-3 mb-0"
                style="font-size: 16px !important; cursor: pointer"
              >
                Tu producto fue agregado con éxito. Si deseas ir a tu carrito
                haz click aquí, de lo contrario puedes seguir agregando
                productos.
              </p>
              <v-btn icon small @click="messageProductAdd = false">
                <v-icon size="20" color="white">mdi-close</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-container>
      <v-row class="d-flex" justify="center">
        <v-card
          width="150px"
          height="auto"
          v-for="(item, index) in dataProduct.images"
          :key="index"
          class="mt-n15 mt-sm-n10 mt-md-n15 mr-3"
          v-show="index != 0"
          @click="
            () => {
              showImageBackground = true;
              imageBackground = item;
            }
          "
        >
          <v-hover v-slot="{ hover }">
            <v-img
              contain
              :src="item"
              :lazy-src="item"
              :class="hover ? 'elevation-15' : ''"
              :style="
                hover
                  ? 'cursor: pointer; opacity: 0.8; background-color: black; z-index:10;'
                  : ''
              "
            >
              <v-row
                v-if="hover"
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-btn fab color="white" small>
                  <v-icon>mdi-plus-circle-outline</v-icon>
                </v-btn>
              </v-row>
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-hover>
        </v-card>
      </v-row>
    </v-container>
    <div class="py-5"></div>
    <v-dialog v-model="showImageBackground" width="600">
      <v-card width="600" height="auto">
        <v-img
          style="width: 100%; height: auto"
          :src="imageBackground"
          :lazy-src="imageBackground"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-card>
    </v-dialog>
    <div v-html="dataProduct.text_html"></div>
    <suscribe-component />
  </div>
</template>

<script>
import SuscribeComponent from "@/components/Utils/suscribe_component";
import informationCP from "@/components/Utils/informationCP";
export default {
  components: {
    "suscribe-component": SuscribeComponent,
    "cp-information": informationCP,
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
      messageProductAdd: false,
      //CHAZKI
      chazkiResponse: null,
      //loading
      loading: false,
      // Imagen
      showImageBackground: false,
      imageBackground: "",
      //Navbar
      active: false,
      sticky: false,
      fab: false,
      loadingManual: false,
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
    toggleNavClass() {
      if (this.active == false) {
        return "nav";
      } else {
        return "sticky-nav";
      }
    },

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
          store: 3,
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
          store: 3,
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

            this.$store.commit("cart/ADD_ITEM", {
              ...this.dataProduct,
              original_quantity: this.quantity,
            });

            await this.$store.dispatch("cart/CREATE_CART", {
              items: [...itemFilter],
            });
          }
          // this.$snotify.success(
          //   "Has agregado al carrito el producto",
          //   "Excelente"
          // );
          this.messageProductAdd = true;
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

    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 50;
      if (top > 50) {
        this.sticky = true;
      } else {
        this.sticky = false;
      }
    },

    async HandlerDowloadManual() {
      try {
        this.loadingManual = true;
        const request = { url: this.dataProduct.product.product_manual };

        const response = await this.$store.dispatch(
          "products/PRODUCT_MANUAL",
          request
        );

        const name = this.dataProduct.keywords.replaceAll(" ", "_");

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${name}.pdf`);
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingManual = false;
      }
    },
  },
};
</script>

<style>
.title-font {
  font-size: 2.5em;
  font-weight: 600;
}

.header-sticky {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  margin-bottom: 500px !important;
}

.v-dialog {
  border-radius: 4px;
  margin: 24px;
  overflow-y: hidden;
  pointer-events: auto;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: 100%;
  z-index: inherit;
  box-shadow: 0 11px 15px -7px rgb(0 0 0 / 20%),
    0 24px 38px 3px rgb(0 0 0 / 14%), 0 9px 46px 8px rgb(0 0 0 / 12%);
}
</style>
