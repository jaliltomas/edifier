<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <navegation-component title="TIENDA" sub_title="TIENDA" />
      </v-col>
    </v-row>
    <v-row class="mb-0 pb-0">
      <v-col cols="12" sm="12" md="12" v-if="loading">
        <v-progress-linear
          indeterminate
          color="red darken-2"
        ></v-progress-linear>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="12"
        v-if="$route.query.product != undefined"
        class="d-flex justify-end"
      >
        <div class="d-flex justify-end mb-2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="resetSearch"
                icon
                large
                color="black"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon size="40">mdi-autorenew</v-icon>
              </v-btn>
            </template>
            <span>Resetear busqueda</span>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <!-- MOSTRAR CATEGORIAS -->
      <v-col cols="12" sm="12" md="3" v-if="productsCategories.length > 0">
        <v-card color="#FAFAFA" tile class="elevation-0">
          <v-divider></v-divider>
          <v-subheader>Categorías</v-subheader>
          <v-card-text>
            <v-list tile nav>
              <div v-for="(item1, i) in productsCategories" :key="i">
                <v-list-group v-if="item1.sub_category.length > 0" no-action>
                  <template v-slot:activator>
                    <v-list-item-title
                      class="ml-0 text-capitalize"
                      v-text="item1.name"
                    ></v-list-item-title>
                  </template>

                  <v-list-item
                    v-for="(item2, j) in item1.sub_category"
                    :key="j"
                    @click="() => {}"
                    class="pl-0"
                    active-class="text-capitalize secondary white--text active-shadow-item"
                    style="text-decoration: none"
                  >
                    <!-- <v-list-item-title
                      class="text-capitalize ml-3"
                      v-text="item2.name"
                    ></v-list-item-title> -->
                    <v-checkbox
                      :label="item2.name"
                      @change="categorySearch(item2)"
                    ></v-checkbox>
                  </v-list-item>
                  <v-divider class="mb-2"></v-divider>
                </v-list-group>
                <v-list-item
                  v-else
                  no-action
                  active-class="secondary white--text active-shadow-item"
                  :to="{ name: item1.path }"
                >
                  <v-list-item-title
                    class="text-capitalize"
                    v-text="item1.name"
                  ></v-list-item-title>
                </v-list-item>
              </div>
            </v-list>
          </v-card-text>
        </v-card>
        <v-btn
          block
          class="mt-3"
          color="black"
          dark
          @click="HandlerGetProducts(page)"
        >
          Buscar
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="9"
        v-if="!loading && productsData.length > 0"
      >
        <v-row>
          <v-col
            v-for="(item, index) in productsData"
            :key="index"
            cols="12"
            sm="4"
            md="3"
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
            <p class="text-center mb-1 title font-weight-bold text-uppercase">
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
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="9"
        v-if="!loading && productsData.length == 0"
      >
        <v-alert
          outlined
          type="warning"
          prominent
          border="left"
          class="d-flex justify-center"
          >No hay productos disponibles para mostrar</v-alert
        >
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-col v-if="paginationData.total > 0" cols="12" md="4">
        <div class="text-center">
          <v-pagination
            color="black"
            v-model="page"
            :length="paginationData.lastPage"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </v-container>
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
      categoriesArray: [],
    };
  },

  created() {
    this.HandlerGetProducts(this.page, this.$route.query.data);
    // this.HanderGetProductsBrand();
  },

  watch: {
    page(page) {
      this.HandlerGetProducts(page);
    },

    $route() {
      this.HandlerGetProducts();
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
    HandlerGetProducts(page, category_id) {
      if (!this.isAuth) this.HandlerGetPublicProducts(page, category_id);
      if (this.isAuth) this.HandlerGetAuthProducts(page, category_id);
    },

    async HandlerGetPublicProducts(page) {
      try {
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
              : JSON.stringify(this.categoriesArray),
        };

        const response = await this.$store.dispatch(
          "products/GET_PRODUCTS",
          request
        );
        this.productsCategories = response.data.categories;
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
              : JSON.stringify(this.categoriesArray),
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
    },
  },
};
</script>

<style>
</style>

