<template>
  <div class="px-0">
    <div style="max-height: 50vh; overflow-y: auto;" class="custom-scrollbar">
      <v-simple-table v-if="products.length > 0" class="elevation-0 transparent-table">
        <template v-slot:default>
          <thead class="d-none d-md-table-header-group sticky-header">
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <th
                class="text-left font-weight-bold text-uppercase pl-4"
                style="color: #9e9e9e; font-size: 0.75rem; letter-spacing: 1px; background: white;"
              >
                Producto
              </th>
              <th
                class="text-left font-weight-bold text-uppercase"
                style="color: #9e9e9e; font-size: 0.75rem; letter-spacing: 1px; background: white;"
              >
                Precio
              </th>
              <th
                class="text-center font-weight-bold text-uppercase"
                style="color: #9e9e9e; font-size: 0.75rem; letter-spacing: 1px; background: white;"
              >
                Cantidad
              </th>
              <th style="background: white;"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in products"
              :key="index"
              class="cart-item-row"
            >
              <!-- PRODUCT DETAILS -->
              <td class="py-2 pl-4" v-if="item.publication != null">
                <div class="d-flex align-center">
                  <v-avatar tile size="56" class="rounded-lg mr-3" color="grey lighten-5">
                    <v-img
                      v-if="item.publication.images"
                      contain
                      :src="item.publication.images[0]"
                      :lazy-src="item.publication.images[0]"
                      alt="Product Image"
                    ></v-img>
                    <v-img
                      v-else
                      contain
                      src="../../../assets/img/no_image.jpg"
                    ></v-img>
                  </v-avatar>
                  <div class="d-flex flex-column">
                    <span class="font-weight-medium text-body-2 black--text text-truncate" style="max-width: 250px;">
                      {{ item.publication.keywords }}
                    </span>
                    <span class="caption grey--text text--darken-1 d-md-none mt-1">
                      ${{ item.publication.price.pvp | currency }}
                    </span>
                  </div>
                </div>
              </td>

              <!-- PRICE (Hidden on small screens) -->
              <td class="text-body-2 font-weight-bold d-none d-md-table-cell" v-if="item.publication != null">
                ${{ item.publication.price.pvp | currency }}
              </td>

              <!-- QUANTITY CONTROLS -->
              <td class="text-center" v-if="item.publication != null">
                <div class="d-inline-flex align-center justify-center rounded-pill px-1" style="border: 1px solid #eee; height: 32px;">
                  <v-btn
                    @click="HandlerQuantity(item, 'minus')"
                    icon
                    x-small
                    color="grey darken-1"
                    :disabled="item.original_quantity <= 1"
                  >
                    <v-icon size="16">mdi-minus</v-icon>
                  </v-btn>
                  <span class="mx-2 font-weight-medium text-caption">{{ validateQuantity(item) }}</span>
                  <v-btn
                    @click="HandlerQuantity(item, 'plus')"
                    icon
                    x-small
                    color="grey darken-1"
                    :disabled="item.original_quantity >= 5"
                  >
                    <v-icon size="16">mdi-plus</v-icon>
                  </v-btn>
                </div>
              </td>

              <!-- DELETE ACTION -->
              <td class="text-right pr-4">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="ShowRemove(item)"
                      icon
                      small
                      color="grey lighten-1"
                      v-bind="attrs"
                      v-on="on"
                      class="delete-btn"
                    >
                      <v-icon size="20">mdi-close</v-icon>
                    </v-btn>
                  </template>
                  <span>Eliminar</span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <div v-else class="d-flex flex-column align-center justify-center py-8">
          <v-icon size="48" color="grey lighten-3">mdi-cart-outline</v-icon>
          <div class="text-body-2 grey--text text--lighten-1 mt-2">Tu carrito está vacío</div>
      </div>
    </div>

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
import { isValidUmbral } from "@/utils/validateUmbral.js";

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

    authUser() {
      return this.$store.getters["auth/GET_PROFILE"];
    },
  },

  methods: {
    async HandlerQuantity(item, quantity) {
      try {
        const umbral = this.validateUmbral(item);
        const cart = this.productCartState;
        const count =
          quantity == "plus"
            ? item.original_quantity + 1
            : item.original_quantity - 1;
        if (count > 0 && umbral >= count) {
          if (count < 5) {
            this.$store.commit("cart/UPDATE_ITEM", {
              product: item,
              action: quantity,
            });

            if (this.$store.getters["auth/AUTHENTICATED"]) {
                const request = cart.shopping_cart_items.map((prod) => {
                  return {
                    publication_id: prod.publication_id,
                    quantity: prod.original_quantity,
                  };
                });

                await this.$store.dispatch("cart/CREATE_CART", {
                  items: [...request],
                });
            }

            this.$store.commit("cart/TOTAL_AMOUNT", {
              items: [...this.productCartState.shopping_cart_items],
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    ShowRemove(item) {
      this.showAlertRemove = !this.showAlertRemove;
      this.selectProduct = item;
    },

    validateUmbral(item) {
      // Safe access if user is guest
      const userZipCode = this.authUser ? this.authUser.zipcode : null;
      if (!userZipCode) return 99; // Allow adding if no zipcode known yet (guest)

      const paylod = { zipCode: userZipCode, dataProduct: item.publication };

      return isValidUmbral(paylod);
    },

    HandlerCloseDeleteProduct() {
      this.showAlertRemove = !this.showAlertRemove;
    },

    validateQuantity(item) {
      return item.original_quantity;
    },
  },
};
</script>

<style scoped>
.transparent-table {
  background-color: transparent !important;
}
.v-data-table__wrapper {
    overflow: visible !important;
}
.cart-item-row {
    transition: background-color 0.2s ease;
    border-bottom: 1px solid #f9f9f9;
}
.cart-item-row:last-child {
    border-bottom: none;
}
.cart-item-row td {
    border-bottom: 1px solid #f9f9f9 !important;
}
.delete-btn:hover {
    color: #ff5252 !important;
}
.sticky-header th {
  position: sticky;
  top: 0;
  z-index: 2;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e0e0e0; 
  border-radius: 2px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #bdbdbd; 
}
</style>
