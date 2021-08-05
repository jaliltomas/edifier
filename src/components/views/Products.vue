<template>
  <div>
    <v-sheet>
      <v-img src="@/assets/img/carrousel/Carrusel01.jpg">
        <v-container fill-height>
          <v-row justify="center" no-gutters>
            <v-col cols="12" class="d-flex justify-center">
              <div class="font-weight-bold d-flex">
                <span style="color: #00a0e9; font-size: 2.5em">
                  Auriculares
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
    </v-sheet>

    <v-sheet color="#F1F1F1">
      <v-container>
        <v-row>
          <v-col cols="12" md="3" class="d-flex align-stretch my-5">
            <v-sheet width="100%" height="100%">
              <div
                class="px-5 py-5"
                v-for="(category, index) in productsCategories"
                :key="index"
              >
                <div
                  @click="HandlerFilterCategory(category, 1)"
                  class="text-capitalize"
                  style="font-size: 17px"
                >
                  {{ category.name }}
                </div>
                <div
                  v-for="(sub_cat, index2) in category.sub_category"
                  :key="index2"
                  class="mb-n5"
                >
                  <v-checkbox
                    :label="subCatName(sub_cat.name)"
                    color="#00A0E9"
                    @change="HandlerFilterCategory(sub_cat, 2)"
                    v-model="sub_cat.value"
                  ></v-checkbox>
                </div>
                <v-divider></v-divider>
              </div>
              <div
                @click="HandlerFilterCategory({}, 3)"
                class="text-capitalize px-5 py-5"
                style="font-size: 17px; cursor: pointer"
              >
                Todo
              </div>
            </v-sheet>
          </v-col>
          <v-col cols="12" md="9" class="align-stretch my-5">
            <v-sheet color="white" class="mt-3">
              <v-row>
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
                  <p class="text-center" v-if="item.price != null">
                    <span>${{ item.price.pvp | currencyPVP }}</span>
                  </p>
                  <!-- {{ item }} -->
                  <cp-information
                    class="text-center"
                    :dataProduct="item"
                    :authUser="authUser"
                  />
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
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
import NavegationComponent from "@/components/Utils/navegation_component";
import informationCP from "@/components/Utils/informationCP";
export default {
  components: {
    "navegation-component": NavegationComponent,
    "cp-information": informationCP,
  },
  data() {
    return {
      // Categories
      items: [
        {
          title: "Auriculares",
          icon: "mdi-inbox",
          text: "Inbox",
        },
        {
          title: "Auriculares",
          icon: "mdi-star",
          text: "Star",
        },
        {
          title: "Auriculares",
          icon: "mdi-send",
          text: "Send",
        },
        {
          title: "Auriculares",
          icon: "mdi-email-open",
          text: "Drafts",
        },
      ],
      model: 1,

      loading: false,
      page: 1,
      selectedItem: "",
      items: [
        { text: "Real-Time", icon: "mdi-clock" },
        { text: "Audience", icon: "mdi-account" },
        { text: "Conversions", icon: "mdi-flag" },
      ],
      dataProducts: [],
      dataCategories: [],
      productsCategories: [],
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
      }

      if (this.$route.query.sub_data != undefined) {
        this.categoriesArray[0] = this.$route.query.sub_data;
      } else {
        this.categoriesArray = [];
      }
      this.HandlerGetProducts(this.page);
    },
  },

  filters: {
    currencyPVP(value) {
      if (value) {
        const AMOUNT_FORMAT = new Intl.NumberFormat("de-DE", {
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(value);
        return AMOUNT_FORMAT;
      } else {
        return " ";
      }
    },
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
    },
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
          per_page: 12,
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
          everything: 1,
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
          }
        }

        this.productsCategories = categories;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async HandlerGetAuthProducts(page) {
      try {
        this.loading = true;
        const myPage = page || 1;
        const request = {
          page: myPage,
          per_page: 12,
          paginate: true,
          keywords:
            this.$route.query.product == undefined
              ? ""
              : this.$route.query.product,
          brand_ids:
            this.brandIds.length == 0 ? "" : JSON.stringify(this.brandIds),
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
        };
        const response = await this.$store.dispatch(
          "products/GET_AUTH_PRODUCTS",
          request
        );
        console.log(response.data);
        this.productsCategories = response.data.categories;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    HandlerShowProduct(publication) {
      const encryptedID = this.CryptoJS.AES.encrypt(
        publication.product.id.toString(),
        "MyS3c3rtIdPr0Duct"
      ).toString();
      console.log(encryptedID);
      this.$router.push({
        name: "product_details",
        query: { data: encryptedID },
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

    cleanFilters() {
      console.log(this.selected);
      this.$refs.n.forEach((val, index) => {
        console.log(val);
        this.selected[index] = false;
      });
    },

    subCatName(name) {
      return name[0].toUpperCase() + name.slice(1);
    },

    HandlerFilterCategory(value, action) {
      if (action == 2) {
        if (this.categoriesArray.includes(value.id.toString())) {
          const indexDelete = this.categoriesArray.findIndex(
            (val) => val == value.id.toString()
          );
          this.categoriesArray.splice(indexDelete, 1);
        } else {
          this.categoriesArray.push(value.id.toString());
        }
        // const query = {
        //   ...this.$route.query,
        //   sub_data: this.categoriesArray[0],
        // };
        // this.$router.push({ query });
        this.$router.push({
          path: this.$route.path,
          query: { sub_data: this.categoriesArray[0] },
        });
        this.HandlerGetProducts(this.page);
      } else if (action == 1) {
        this.categoriesArray = [];
        this.category_id = value.id;
        this.HandlerGetProducts(this.page);
      } else {
        console.log("Filtrar por todos");
        this.categoriesArray = [];
        this.category_id = null;
        this.$router.push(this.$route.path);
        this.HandlerGetProducts(this.page);
      }
    },
  },
};
</script>

<style>
</style>

