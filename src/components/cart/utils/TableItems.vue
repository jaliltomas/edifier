<template>
  <div>
    <v-simple-table class="mt-5" v-if="products.length > 0">
      <template v-slot:default>
        <thead style="background-color: #fafafa">
          <tr>
            <th
              style="font-size: 16px; font-weight: 800"
              class="text-left font-weight-bold black--text"
            >
              Producto
            </th>
            <th
              style="font-size: 16px; font-weight: 800"
              class="text-left font-weight-bold black--text"
            >
              Precio
            </th>
            <th
              style="font-size: 16px; font-weight: 800"
              class="text-left font-weight-bold black--text"
            >
              Cantidad
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in products" :key="index">
            <td v-if="item.publication != null">
              <v-avatar tile v-if="item.publication.images == null">
                <img
                  height="200"
                  width="100%"
                  contain
                  src="../../../assets/img/no_image.jpg"
                />
              </v-avatar>
              <v-avatar tile v-else>
                <v-img
                  contain
                  :src="item.publication.images[0]"
                  :lazy-src="item.publication.images[0]"
                  alt="Product Image"
                ></v-img>
              </v-avatar>
              <span class="d-flex d-md-inline-flex ml-md-4 text-capitalize">
                {{ item.publication.keywords }}
              </span>
            </td>
            <td v-if="item.publication != null">
              ${{ item.publication.price.pvp | currency }}
            </td>
            <td v-if="item.publication != null">
              <p class="mt-3">
                <v-btn
                  @click="HandlerQuantity(item, 'minus')"
                  color="#d6d1d1"
                  fab
                  outlined
                  x-small
                  class="mr-2"
                >
                  <v-icon color="black">mdi-minus</v-icon>
                </v-btn>
                {{ item.original_quantity }}
                <v-btn
                  @click="HandlerQuantity(item, 'plus')"
                  color="#d6d1d1"
                  fab
                  outlined
                  x-small
                  class="mx-2"
                >
                  <v-icon color="black">mdi-plus</v-icon>
                </v-btn>
              </p>
            </td>
            <td>
              <v-icon @click="ShowRemove(item)" color="black">
                mdi-trash-can
              </v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <dialog-notification v-if="showAlertRemove" :active="showAlertRemove">
      <delete-product
        :selectProduct="selectProduct"
        @dialog:change="HandlerCloseDeleteProduct"
      />
    </dialog-notification>
  </div>
</template>

<script>
import DialogNotification from "../DialogNotification";
import DeleteProduct from "./DeleteProduct.vue";
export default {
  components: {
    DialogNotification,
    DeleteProduct,
  },

  props: {
    products: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  data() {
    return {
      showAlertRemove: false,
      selectProduct: null,
    };
  },

  computed: {
    productCartState() {
      return this.$store.getters["cart/CART_PRODUCTS"];
    },
  },

  methods: {
    async HandlerQuantity(item, quantity) {
      try {
        const cart = this.productCartState;
        if (item.original_quantity == 0 && quantity == "minus") {
          this.showAlertRemove = !showAlertRemove;
          this.selectProduct = { ...item };
          return;
        }

        this.$store.commit("cart/UPDATE_ITEM", {
          product: item,
          action: quantity,
        });

        const request = cart.shopping_cart_items.map((prod) => {
          return {
            publication_id: prod.publication_id,
            quantity: prod.original_quantity,
          };
        });

        await this.$store.dispatch("cart/CREATE_CART", {
          items: [...request],
        });

        this.$store.commit("cart/TOTAL_AMOUNT", {
          items: [...this.productCartState.shopping_cart_items],
        });
      } catch (error) {
        console.log(error);
      }
    },

    ShowRemove(item) {
      this.showAlertRemove = !this.showAlertRemove;
      this.selectProduct = item;
    },

    HandlerCloseDeleteProduct() {
      this.showAlertRemove = !this.showAlertRemove;
    },
  },
};
</script>

<style>
</style>
