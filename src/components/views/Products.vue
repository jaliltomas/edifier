<template>
  <div>
    <v-sheet style="position:relative">
      <v-img
        v-if="imageBanner() && productsCategories.length > 0"
        contain
        width="100%"
        height="auto"
        :src="productsCategories[0].image_url"
        :lazy-src="productsCategories[0].image_url"
      >
        <v-container fill-height>
          <v-row justify="center" no-gutters>
            <v-col cols="12" class="d-flex justify-center">
              <div class="font-weight-bold d-flex">
                <span style="color: #00a0e9; font-size: 2.5em">
                  {{ productsCategories[0].name }}
                </span>
              </div>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <div style="color: white" class="d-flex">
                Descubre tu mejor opción
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-img>
      <v-img
        v-else
        contain
        src="@/assets/img/sections/todoCategories.webp"
        lazy-src="@/assets/img/sections/todoCategories.webp"
      >
        <!-- <v-container fill-height>
          <v-row justify="center" no-gutters>
            <v-col cols="12" class="d-flex justify-center">
              <div class="font-weight-bold d-flex">
                <span style="color: #00a0e9; font-size: 2.5em"> TODO </span>
              </div>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <div style="color: white" class="d-flex">
                Descubre tu mejor opción
              </div>
            </v-col>
          </v-row>
        </v-container> -->
      </v-img>
      <v-col v-if="!isAuth" cols="12" md="9" class="banner-box">
        <div class="banner-container">
          <div class="banner-text">
            Regístrate para acceder a beneficios y promociones
          </div>
          <div class="banner-btn">
            <v-btn
              block
              color="black"
              class="white--text "
              rounded
              style="height: 28px; text-transform: none;"
              @click="HandlerRouter('login', { propsShow: false })"
            >
              Regístrate aquí
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-sheet>

    <v-sheet color="#F1F1F1">
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" sm="12" md="11">
            <v-row justify="center">
              <v-col cols="12" md="3" class="d-flex align-stretch my-5">
                <v-sheet width="100%" height="100%">
                  <div
                    class="px-5 py-5"
                    v-for="(category, index) in productsCategories"
                    :key="index"
                  >
                    <v-hover v-slot="{ hover }">
                      <div
                        @click="HandlerFilterCategory(category, 1)"
                        class="text-capitalize"
                        :style="
                          hover
                            ? 'font-size: 17px; cursor: pointer; color: #00A0E9'
                            : 'font-size: 17px; cursor: pointer;'
                        "
                      >
                        {{ category.name }}
                      </div>
                    </v-hover>
                    <div
                      v-for="(sub_cat, index2) in category.sub_category"
                      :key="index2"
                      :class="!sub_cat.can_see ? 'mb-5' : 'mb-n6'"
                    >
                      <v-checkbox
                        v-if="sub_cat.can_see"
                        :label="subCatName(sub_cat.name)"
                        color="#00A0E9"
                        @change="HandlerFilterCategory(sub_cat, 2)"
                        v-model="sub_cat.value"
                      ></v-checkbox>
                    </div>
                    <v-divider class="mt-5"></v-divider>
                  </div>
                  <div
                    @click="HandlerFilterCategory({}, 3)"
                    class="text-capitalize px-5 py-10"
                  >
                    <v-hover v-slot="{ hover }">
                      <div
                        class="text-capitalize"
                        :style="
                          hover
                            ? 'font-size: 17px; cursor: pointer; color: #00A0E9'
                            : 'font-size: 17px; cursor: pointer;'
                        "
                      >
                        Todo
                      </div>
                    </v-hover>
                  </div>
                </v-sheet>
              </v-col>
              <v-col cols="12" md="9" class="align-stretch my-5">
                <v-sheet color="white" class="mt-3">
                  <v-row v-if="productsData.length > 0">
                    <v-col
                      v-for="(item, index) in productsData"
                      :key="index"
                      cols="12"
                      sm="4"
                      md="4"
                    >
                      <v-card
                        v-if="item.product != null"
                        height="200"
                        class="elevation-0"
                        flat
                        @click="HandlerShowProduct(item)"
                      >
                        <img
                          v-if="item.images == null"
                          :aspect-ratio="4 / 3"
                          height="200"
                          width="100%"
                          contain
                          src="../../assets/img/no_image.jpg"
                        />
                        <div v-else>
                          <v-img
                            height="200"
                            width="100%"
                            contain
                            :src="item.images[0]"
                            :lazy-src="item.images[0]"
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
                        </div>
                        <v-card-text></v-card-text>
                      </v-card>
                      <p
                        class="
                          text-center
                          mb-1
                          title
                          font-weight-bold
                          text-uppercase
                        "
                      >
                        {{ item.keywords }}
                      </p>

                      <div class="mt-5">
                        <price-component
                          v-if="item.store.display_full_prices"
                          :price="getPvpTransferInfo(item)"
                          :dataProduct="item"
                          :isAuth="isAuth"
                        />
                        <price-component
                          :price="getPvpInfo(item)"
                          :dataProduct="item"
                        />
                        <availability-list :dataProduct="item" />
                      </div>

                      <cp-information
                        style="color: #0000"
                        class="text-center"
                        :dataProduct="item"
                        :authUser="authUser"
                      />
                    </v-col>
                  </v-row>
                  <v-row v-else justify="center">
                    <v-col cols="12" md="9" class="d-flex justify-center">
                      <p class="text-center py-10 font-weight-medium">
                        No hay resultados para su busqueda
                      </p>
                    </v-col>
                  </v-row>
                  <v-row justify="center" class="mb-0">
                    <v-col v-if="paginationData.total > 0" cols="12" md="4">
                      <div class="text-center">
                        <v-pagination
                          color="#00A0E9"
                          v-model="page"
                          :length="paginationData.lastPage"
                        ></v-pagination>
                      </div>
                    </v-col>
                  </v-row>
                </v-sheet>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
import ProductGridViewPrice from "./utils/products/ProductGridViewPrice";
import informationCP from "@/components/Utils/informationCP";
import AvailabilityList from "./utils/products/AvailabilityList.vue";

export default {
  components: {
    "price-component": ProductGridViewPrice,
    "cp-information": informationCP,
    "availability-list": AvailabilityList
  },
  data() {
    return {
      // Categories
      items: [
        {
          title: "Auriculares",
          icon: "mdi-inbox",
          text: "Inbox"
        },
        {
          title: "Auriculares",
          icon: "mdi-star",
          text: "Star"
        },
        {
          title: "Auriculares",
          icon: "mdi-send",
          text: "Send"
        },
        {
          title: "Auriculares",
          icon: "mdi-email-open",
          text: "Drafts"
        }
      ],
      model: 1,

      loading: false,
      page: 1,
      selectedItem: "",
      dataProducts: [],
      dataCategories: [],
      productsCategories: [],
      productsFeature: [],
      paginate: {},
      firstImage: null,

      //Region
      showRegion: false,

      // Marcas
      dataBrand: [],
      brandIds: [],
      brand_position: [],

      // Cateogry
      category_id: "",
      sub_category_id: "",
      categoriesArray: [],
      selected: [],
      everything: 1,
      feature_ids: [],
      loadingProducts: false,
      isTodo: false
    };
  },

  created() {
    if (this.$route.query.data == undefined) {
      this.category_id = null;
    } else {
      this.category_id = this.$route.query.data;
      this.categoriesArray = [];
    }

    if (this.$route.query.sub_data != undefined) {
      this.categoriesArray[0] = this.$route.query.sub_data;
    } else {
      this.categoriesArray = [];
    }
    this.HandlerGetProducts(this.page);
    // this.HanderGetProductsBrand();
  },
  mounted() {
    window.fbq("trackCustom", "ProductView");
  },
  watch: {
    page(page) {
      this.HandlerGetProducts(page);
    },

    $route() {
      if (this.$route.query.data == undefined) {
        this.category_id = null;
      } else {
        this.category_id = this.$route.query.data;
        this.categoriesArray = [];
        this.everything = 1;
      }

      if (this.$route.query.sub_data != undefined) {
        this.categoriesArray[0] = this.$route.query.sub_data;
      } else {
        this.categoriesArray = [];
        this.everything = 1;
      }
      this.HandlerGetProducts(this.page);
    }
  },

  filters: {
    currencyPVP(value) {
      if (value) {
        const AMOUNT_FORMAT = new Intl.NumberFormat("de-DE", {
          maximumFractionDigits: 0,
          minimumFractionDigits: 0
        }).format(value);
        return AMOUNT_FORMAT;
      } else {
        return " ";
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

    productsData() {
      return this.$store.getters["products/GET_PRODUCTS"];
    },

    paginationData() {
      return this.$store.getters["products/GET_PAGINATE_PRODUCT"];
    },

    paginationCategories() {
      return this.$store.getters["products/GET_PAGINATE_CATEGORIES"];
    }
  },

  methods: {
    HandlerGetProducts(page) {
      if (!this.isAuth) this.HandlerGetPublicProducts(page);
      if (this.isAuth) this.HandlerGetAuthProducts(page);
    },

    async HandlerGetPublicProducts(page) {
      try {
        let valueNew = [];
        for (const cat of this.categoriesArray) {
          valueNew.push(cat.toString());
        }
        this.categoriesArray = [...valueNew];
        if (
          this.$route.query.sub_data != undefined &&
          this.categoriesArray.length == 0
        ) {
          this.category_id = this.productsCategories[0].id;
          this.$router.push({
            path: this.$route.path,
            query: { data: this.category_id }
          });
        }
        this.loading = true;
        const myPage = page || 1;
        const warehouse_id =
          sessionStorage.getItem("region") == null
            ? 1
            : parseInt(sessionStorage.getItem("region"));

        const request = {
          store: 3,
          page: myPage,
          per_page: 24,
          paginate: true,
          warehouse_id: warehouse_id,
          keywords:
            this.$route.query.product == undefined
              ? ""
              : this.$route.query.product,
          brand_ids: "",
          sub_category_ids:
            this.categoriesArray.length == 0
              ? ""
              : typeof this.categoriesArray == "number"
              ? JSON.stringify([this.categoriesArray])
              : JSON.stringify(this.categoriesArray),
          category_ids:
            this.category_id == undefined
              ? ""
              : JSON.stringify([this.category_id]),
          everything: this.everything,
          feature_ids: JSON.stringify(this.feature_ids),
          sort_position: "asc"
        };

        const response = await this.$store.dispatch(
          "products/GET_PRODUCTS",
          request
        );

        // COLOCAR SUBCATEGORIA TRUE
        const categories = response.data.categories;
        for (const category of categories) {
          for (const sub_cat of category.sub_category) {
            if (this.categoriesArray.includes(sub_cat.id.toString())) {
              sub_cat.value = true;
            } else {
              sub_cat.value = false;
            }
            if (
              sub_cat.name == "Portátiles" ||
              sub_cat.name == "Gaming" ||
              sub_cat.name == "Línea S"
            ) {
              sub_cat.can_see = false;
            } else {
              sub_cat.can_see = true;
            }
          }
          for (const features of response.data.feature) {
            const featuresID = features.id.toString();
            if (this.feature_ids.includes(featuresID)) {
              features.value = true;
            } else {
              features.value = false;
            }
          }
        }

        this.productsCategories = categories;
        this.productsFeature = response.data.feature;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async HandlerGetAuthProducts(page) {
      try {
        this.loadingProducts = true;
        let valueNew = [];
        for (const cat of this.categoriesArray) {
          valueNew.push(cat.toString());
        }
        this.categoriesArray = [...valueNew];
        if (
          this.$route.query.sub_data != undefined &&
          this.categoriesArray.length == 0
        ) {
          this.category_id = this.productsCategories[0].id;
          this.$router.push({
            path: this.$route.path,
            query: { data: this.category_id }
          });
        }
        this.loading = true;
        const myPage = page || 1;
        const warehouse_id =
          sessionStorage.getItem("region") == null
            ? 1
            : parseInt(sessionStorage.getItem("region"));

        const request = {
          store: 3,
          page: myPage,
          per_page: 24,
          paginate: true,
          warehouse_id: warehouse_id,
          keywords:
            this.$route.query.product == undefined
              ? ""
              : this.$route.query.product,
          brand_ids: "",
          sub_category_ids:
            this.categoriesArray.length == 0
              ? ""
              : typeof this.categoriesArray == "number"
              ? JSON.stringify([this.categoriesArray])
              : JSON.stringify(this.categoriesArray),
          category_ids:
            this.category_id == undefined
              ? ""
              : JSON.stringify([this.category_id]),
          everything: this.everything,
          feature_ids: JSON.stringify(this.feature_ids),
          sort_position: "asc"
        };

        const response = await this.$store.dispatch(
          "products/GET_AUTH_PRODUCTS",
          request
        );

        // COLOCAR SUBCATEGORIA TRUE
        const categories = response.data.categories;
        for (const category of categories) {
          for (const sub_cat of category.sub_category) {
            if (this.categoriesArray.includes(sub_cat.id.toString())) {
              sub_cat.value = true;
            } else {
              sub_cat.value = false;
            }
            if (
              sub_cat.name == "Portátiles" ||
              sub_cat.name == "Gaming" ||
              sub_cat.name == "Línea S"
            ) {
              sub_cat.can_see = false;
            } else {
              sub_cat.can_see = true;
            }
          }
          for (const features of response.data.feature) {
            // if (arrayName.includes(features.name)) {
            //   features.isRepit = true;
            // } else {
            //   arrayName.push(features.name);
            //   features.isRepit = false;
            // }
            const featuresID = features.id.toString();
            if (this.feature_ids.includes(featuresID)) {
              features.value = true;
            } else {
              features.value = false;
            }
          }
        }

        this.productsCategories = categories;
        this.productsFeature = response.data.feature;
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingProducts = false;
      }
    },

    HandlerShowProduct(publication) {
      const { product, keywords } = publication;
      this.$router.push({
        path:
          "/product-details/" +
          product?.brand.name +
          "/" +
          keywords.replaceAll(" ", "-")
      });
    },

    resetSearch() {
      this.HandlerGetProducts();
      this.$router.replace({ query: null });
    },

    categorySearch(category) {
      if (this.categoriesArray.length == 0) {
        this.categoriesArray.push(category.id);
      } else {
        if (this.categoriesArray.includes(category.id)) {
          const positioDelete = this.categoriesArray.indexOf(category.id);
          this.categoriesArray.splice(positioDelete, 1);
        } else {
          this.categoriesArray.push(category.id);
        }
      }
      this.HandlerGetProducts(this.page);
    },

    subCatName(name) {
      return name[0].toUpperCase() + name.slice(1);
    },

    HandlerFilterCategory(value, action) {
      if (action == 2) {
        if (this.categoriesArray.includes(value.id.toString())) {
          const indexDelete = this.categoriesArray.findIndex(
            val => val == value.id.toString()
          );
          this.categoriesArray.splice(indexDelete, 1);
        } else {
          this.categoriesArray.push(value.id.toString());
        }
        if (this.categoriesArray.length > 0) {
          this.$router
            .push({
              path: this.$route.path,
              query: { sub_data: this.categoriesArray[0] }
            })
            .catch(err => err);
        }
        this.everything = 1;
        this.HandlerGetProducts(this.page);
      } else if (action == 1) {
        this.categoriesArray = [];
        this.category_id = value.id;
        this.$router
          .push({
            path: this.$route.path,
            query: { data: this.category_id }
          })
          .catch(err => err);
        this.everything = 1;
        this.HandlerGetProducts(this.page);
      } else {
        this.categoriesArray = [];
        this.category_id = null;
        this.$router.push(this.$route.path).catch(err => err);
        this.everything = 0;
        this.feature_ids = [];
        this.isTodo = true;
        this.HandlerGetProducts(this.page);
      }
    },

    HandlerFilterFeatures(feature) {
      if (this.feature_ids.includes(feature.id.toString())) {
        const indexDelete = this.feature_ids.findIndex(
          val => val == feature.id.toString()
        );
        this.feature_ids.splice(indexDelete, 1);
      } else {
        this.feature_ids.push(feature.id.toString());
      }
      this.everything = 1;
      this.HandlerGetProducts(this.page);
    },

    imageBanner() {
      if (
        this.$route.query.data == undefined &&
        this.$route.query.sub_cat == undefined &&
        this.$route.query.brand == undefined
      ) {
        return false;
      } else {
        return true;
      }
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
.banner-box {
  position: absolute;
  padding: 0;
  bottom: -16px;
  right: 10px;
  padding: 0px 30px !important;
}
.banner-container {
  background-color: rgb(0, 160, 233);
  border-radius: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 20px;
  position: relative;
  height: 38px;
}
.banner-text {
  font-size: 18px;
  font-weight: 500;
  color: white;
  margin-right: 8px;
}
.banner-btn {
  position: absolute;
  right: 12px;
}
@media only screen and (max-width: 800px) {
  .banner-container {
    justify-content: start;
  }
  .banner-text {
    font-size: 14px;
    margin-right: 0px;
  }
  .banner-container {
    height: 34px;
  }
  .banner-box {
    right: 0px;
    padding: 0px 10px !important;
  }
}
@media only screen and (max-width: 480px) {
  .banner-box {
    bottom: -26px;
  }
  .banner-container {
    height: auto;
    flex-direction: column;
  }
  .banner-text {
    font-size: 12px;
    text-align: center;
  }
  .banner-btn {
    position: relative;
    margin-top: 2px;
  }
}
</style>
