<template>
  <div>
    <div
      :style="
        sticky
          ? 'background-color: #ffffff; height: auto'
          : 'background-color: #ffffff; height: auto'
      "
      :class="sticky ? 'header-sticky' : ''"
      v-scroll="onScroll"
    >
      <div style="background-color: #c9cdd9; height: 0px"></div>
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
        <v-tab
          @click="HandlerDowloadManual"
          v-if="
            dataProduct.product != null &&
            dataProduct.product.product_manual !== null
          "
        >
          <span v-if="!loadingManual">MANUAL DE USUARIO</span>
          <span v-else>...</span>
        </v-tab>
      </v-tabs>
    </div>
    <v-sheet color="#EBF1F7" id="product">
      <div class="py-15" v-if="sticky"></div>
      <v-container
        :fluid="
          $vuetify.breakpoint.name == 'lg' || $vuetify.breakpoint.name == 'xl'
            ? false
            : true
        "
      >
        <v-row justify="center" class="mt-10">
          <v-col cols="12" sm="6" md="5">
            <v-img
              :src="dataProduct.images[0]"
              :lazy-src="dataProduct.images[0]"
              contain
              v-if="dataProduct.images != null"
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
                <p class="mb-0 mt-2">
                  <span v-if="dataProduct.price != null">
                    <div
                      style="border-left: 3px solid #00a0e9; padding-left: 8px"
                    >
                      <div class="text-17" v-if="isAuth">
                        <span class="font-weight-bold text-20">
                          $
                          {{
                            dataProduct.price.pvp_18_installments | currencyPVP
                          }}
                        </span>
                        en 18 cuotas de $
                        {{
                          (dataProduct.price.pvp_18_installments / 18)
                            | currencyPVP
                        }}
                      </div>
                      <div class="my-2 text-17">
                        <span class="font-weight-bold text-20">
                          $ {{ dataProduct.price.pvp | currencyPVP }}
                        </span>
                        <span v-if="isAuth">con Débito / Crédito</span>
                      </div>
                      <div class="text-17" v-if="isAuth">
                        <span class="font-weight-bold text-20">
                          $ {{ dataProduct.price.pvp_transfer | currencyPVP }}
                        </span>
                        por Transferencia Bancaria
                      </div>
                    </div>
                    <!-- $ {{ dataProduct.price.pvp | currencyPVP }} -->
                    <div class="mt-4">
                      <i>Podras seleccionar la forma de pago en el Checkout</i>
                    </div>
                  </span>
                </p>
              </div>

              <div class="d-flex justify-space-between mt-10">
                <cp-information
                  style="font-size: 18px"
                  v-if="dataProduct"
                  :dataProduct="dataProduct"
                  :authUser="authUser"
                  class="mt-auto"
                />
              </div>

              <div class="mt-4 mb-2">
                <div
                  v-if="
                    dataProduct.product != null &&
                    dataProduct.product.product_warehouse.length > 0
                  "
                >
                  <span class="mr-1"> Stock en</span>
                  {{ getWarehouse(dataProduct.product.product_warehouse) }}
                </div>
              </div>

              <div>
                <span style="color: #00A0E9">Este paquete sera preparado antes de: <br /></span>
                {{ getDate() }}
              </div>

              <div
                v-if="
                  validateStock() &&
                  validateUmbral() &&
                  dataProduct.out_stock == false
                "
                class="d-flex align-center justify-start py-1"
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
                  validateStock() &&
                  validateUmbral() &&
                  dataProduct.out_stock == false
                "
              >
                <v-btn
                  style="border-width: medium"
                  rounded
                  dark
                  color="#00A0E9"
                  @click="HandlerAddCart()"
                  class="mt-1 mt-md-0 font-weight-bold"
                  outlined
                >
                  Agregar a mi compra
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
            <div class="mb-15 d-flex ml-7">
              <p
                style="color: #00a0e9; cursor: pointer"
                @click="$router.push({ name: 'cart' })"
              >
                Agregaste {{ dataProduct.keywords }} x {{ quantity }}. Ir al
                carrito.
              </p>
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

    <!-- MODAL AVISAME SE SUSTITUYO EN CP-INFORMATION COMPONENT -->
    <!-- <ValidationObserver ref="obs" v-slot="{ passes }">
      <v-dialog
        v-if="showModalReserve"
        v-model="showModalReserve"
        max-width="600"
      >
        <v-card>
          <v-card-title>
            Completá con tus datos y nos comunicaremos
          </v-card-title>
          <v-card-text>
            <ValidationProvider
              name="nombre"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                @keyup="passes(HandlerNotification)"
                filled
                rounded
                v-model="authUser.buyer.first_name"
                label="Nombre"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              name="email"
              rules="email|required"
              v-slot="{ errors }"
            >
              <v-text-field
                @keyup="passes(HandlerNotification)"
                filled
                rounded
                label="Email"
                v-model="authUser.buyer.email"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              name="teléfono"
              rules="numeric|min:8|required"
              v-slot="{ errors }"
            >
              <v-text-field
                @keyup="passes(HandlerNotification)"
                filled
                rounded
                label="Teléfono"
                v-model="authUser.buyer.phone"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="showModalReserve = false">Cancelar</v-btn>
            <v-btn
              :loading="loading"
              dark
              color="#00A0E9"
              @click="passes(HandlerNotification)"
            >
              Continuar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </ValidationObserver> -->

    <div v-html="dataProduct.text_html"></div>
    <suscribe-component />
  </div>
</template>

<script>
import moment from "moment";
import SuscribeComponent from "@/components/Utils/suscribe_component";
import informationCP from "@/components/Utils/informationCP";
export default {
  components: {
    "suscribe-component": SuscribeComponent,
    "cp-information": informationCP,
  },
  data() {
    return {
      dataProduct: {},
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

      //Avisame
      showModalReserve: false,
      email: "",
      name: "",
      phone: "",
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
      this.messageProductAdd = false;
      const productWarehouse = this.dataProduct.product.product_warehouse;
      const userZipCode = this.authUser.zipcode;
      let threshold = 0;

      switch (parseInt(userZipCode)) {
        case 2000:
          const warehouse2000 = productWarehouse.filter(
            (whr) =>
              (whr.warehouse_id == 10 && whr.current_stock > 0) ||
              (whr.warehouse_id == 5 && whr.current_stock > 0)
          );

          if (warehouse2000.length == 1) {
            const warehouseThreshold = warehouse2000.some(
              (whr) => whr.current_stock > this.dataProduct.threshold
            );

            if (warehouseThreshold) {
              threshold =
                warehouse2000[0].current_stock - this.dataProduct.threshold;
            }
          } else {
            const userFindWarehouse2000 = warehouse2000.find(
              (whr) => whr.warehouse_id == 10
            );

            if (
              userFindWarehouse2000.current_stock > this.dataProduct.threshold
            ) {
              threshold =
                userFindWarehouse2000.current_stock -
                this.dataProduct.threshold;
            }
          }
          break;
        case 5000:
          const warehouse5000 = productWarehouse.filter(
            (whr) =>
              (whr.warehouse_id == 3 && whr.current_stock > 0) ||
              (whr.warehouse_id == 5 && whr.current_stock > 0)
          );

          if (warehouse5000.length == 1) {
            const warehouseThreshold = warehouse5000.some(
              (whr) => whr.current_stock > this.dataProduct.threshold
            );

            if (warehouseThreshold) {
              threshold =
                warehouse5000[0].current_stock - this.dataProduct.threshold;
            }
          } else {
            const userFindWarehouse = warehouse5000.find(
              (whr) => whr.warehouse_id == 3
            );

            if (userFindWarehouse.current_stock > this.dataProduct.threshold) {
              threshold =
                userFindWarehouse.current_stock - this.dataProduct.threshold;
            }
          }
          break;
        default:
          const warehouse = productWarehouse.filter(
            (whr) => whr.warehouse_id == 5 && whr.current_stock > 0
          );

          if (warehouse.length > 0) {
            const warehouseThreshold = warehouse.some(
              (whr) => whr.current_stock > this.dataProduct.threshold
            );

            if (warehouseThreshold) {
              threshold =
                warehouse[0].current_stock - this.dataProduct.threshold;
            }
          }
          break;
      }

      if (this.quantity == 1 && quantity == "minus") {
        return;
      } else if (
        quantity == "plus" &&
        this.quantity < threshold &&
        this.quantity < 4
      ) {
        this.quantity++;
      } else if (quantity == "minus") {
        this.quantity--;
      }
    },

    async HandlerAddFavorites(item) {
      try {
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

            await this.$store.dispatch("cart/GET_CURRENT_CART");
          }
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

    validateStock() {
      if (
        this.dataProduct.product != null &&
        this.dataProduct.product.product_warehouse != null
      ) {
        const stock = this.dataProduct.product.product_warehouse.filter(
          (st) => {
            if (st.current_stock > 0) {
              return st;
            }
          }
        );

        if (stock.length > 0) return true;
        else return false;
      } else {
        return false;
      }
    },

    validateUmbral() {
      // this.messageProductAdd = false;
      const userZipCode = this.authUser.zipcode;
      let threshold = 0;

      if (
        this.dataProduct.product != null &&
        this.dataProduct.product.product_warehouse != null
      ) {
        const productWarehouse = this.dataProduct.product.product_warehouse;
        switch (parseInt(userZipCode)) {
          case 2000:
            const warehouse2000 = productWarehouse.filter(
              (whr) =>
                (whr.warehouse_id == 10 && whr.current_stock > 0) ||
                (whr.warehouse_id == 5 && whr.current_stock > 0)
            );

            if (warehouse2000.length == 1) {
              const warehouseThreshold = warehouse2000.some(
                (whr) => whr.current_stock > this.dataProduct.threshold
              );

              if (warehouseThreshold) {
                threshold =
                  warehouse2000[0].current_stock - this.dataProduct.threshold;
              }
            } else {
              const userFindWarehouse2000 = warehouse2000.find(
                (whr) => whr.warehouse_id == 10
              );

              if (
                userFindWarehouse2000.current_stock > this.dataProduct.threshold
              ) {
                threshold =
                  userFindWarehouse2000.current_stock -
                  this.dataProduct.threshold;
              }
            }
            break;
          case 5000:
            const warehouse5000 = productWarehouse.filter(
              (whr) =>
                (whr.warehouse_id == 3 && whr.current_stock > 0) ||
                (whr.warehouse_id == 5 && whr.current_stock > 0)
            );

            if (warehouse5000.length == 1) {
              const warehouseThreshold = warehouse5000.some(
                (whr) => whr.current_stock > this.dataProduct.threshold
              );

              if (warehouseThreshold) {
                threshold =
                  warehouse5000[0].current_stock - this.dataProduct.threshold;
              }
            } else {
              const userFindWarehouse = warehouse5000.find(
                (whr) => whr.warehouse_id == 3
              );

              if (
                userFindWarehouse.current_stock > this.dataProduct.threshold
              ) {
                threshold =
                  userFindWarehouse.current_stock - this.dataProduct.threshold;
              }
            }
            break;
          default:
            const warehouse = productWarehouse.filter(
              (whr) => whr.warehouse_id == 5 && whr.current_stock > 0
            );

            if (warehouse.length > 0) {
              const warehouseThreshold = warehouse.some(
                (whr) => whr.current_stock > this.dataProduct.threshold
              );

              if (warehouseThreshold) {
                threshold =
                  warehouse[0].current_stock - this.dataProduct.threshold;
              }
            }
            break;
        }

        return threshold > 0 ? true : false;
      } else {
        return false;
      }
    },

    HandlerAvisame() {
      this.showModalReserve = true;
    },

    async HandlerNotification() {
      try {
        this.loading = true;
        const request = {
          store_id: 3,
          product_id: this.dataProduct.product_id,
          publication_id: this.dataProduct.id,
          email: this.authUser.buyer.email,
          name: this.authUser.buyer.first_name,
          phone: this.authUser.buyer.phone,
        };

        await this.$store.dispatch(
          "products/PRODUCT_NOTIFICATION_USER",
          request
        );

        this.showModalReserve = false;
        this.dataProduct.user_product_notification = true;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    getWarehouse(warehouse) {
      let warehouseValue = null;
      for (const iterator of warehouse) {
        switch (iterator.warehouse_id) {
          case 5:
            if (iterator.current_stock > 0) {
              warehouseValue = "Central";
              break;
            }
          case 10:
            if (iterator.current_stock > 0) {
              warehouseValue = "Rosario";
              break;
            }
          case 3:
            if (iterator.current_stock > 0) {
              warehouseValue = "Cordoba";
              break;
            }
        }
      }
      return warehouseValue == null ? "Sin Stock" : warehouseValue;
    },

    getDate() {
      // const date = moment().format("YYYY-MM-DD HH:mm:ss");
      // return date
      const dateParse = moment().format("YYYY-MM-DD HH:mm:ss");
      const numberDay = moment(dateParse).day();
      const dateHour = moment(dateParse).format("HH:mm:ss");

      // FORMATO 24HRS
      // const hour = moment(dateParse).format("HH:mm");
      // const dateHour = moment(hour, ["h:mm A"]).format("HH:mm:ss");

      if (numberDay > 0 && numberDay <= 5) {
        const format = "HH:mm:ss";
        const time = moment(dateHour, format);
        const firstTime = moment("00:00:00", format);
        const secondTime = moment("08:59:00", format);

        const firstTime2 = moment("09:00:00", format);
        const secondTime2 = moment("16:30:00", format);

        // console.log('time', time)
        // console.log('firstTime', firstTime)
        // console.log('secondTime', secondTime)

        /**
         * 00:00:00 / 08:59:00
         */
        if (time.isBetween(firstTime, secondTime)) {
          // console.log('primero',date)
          return moment(dateParse).format("YYYY-MM-DD") + " 9:30";
        } else if (time.isBetween(firstTime2, secondTime2)) {
          /**
           * 09:00:00 / 16:30:00
           */
          // console.log('segundo', date)

          const add30Min = moment(time).add(30, "m").format("HH:mm");
          return moment(dateParse).format("YYYY-MM-DD") + " " + add30Min;
        } else {
          const currentDay = moment(dateParse).format("YYYY-MM-DD");
          const addNextDay = moment(currentDay)
            .add(1, "d")
            .format("YYYY-MM-DD");
          return addNextDay + " " + "09:30";
        }
      } else {
        console.log("numberDay", numberDay);
        const number_diff = numberDay == 0 ? 1 : 2;
        const currentDay = moment(dateParse).format("YYYY-MM-DD");
        const addNextDay = moment(currentDay)
          .add(number_diff, "d")
          .format("YYYY-MM-DD");
        return addNextDay + " " + "09:30";
      }
    },

    async HandlerDowloadManual() {
      window.open(this.dataProduct.product.product_manual, "manual_de_usuario");
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
  /* top: 0; */
  z-index: 1;
  margin-bottom: 50px !important;
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

.text-20 {
  font-size: 30px;
}

.text-17 {
  font-size: 17px;
}
</style>
