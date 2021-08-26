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
                {{ validateQuantity(item) }}
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
      this.messageProductAdd = false;
      const userZipCode = this.authUser.zipcode;
      let threshold = 0;

      if (
        item.publication != null &&
        item.publication.product != null &&
        item.publication.product.product_warehouse != null
      ) {
        const productWarehouse = item.publication.product.product_warehouse;
        switch (parseInt(userZipCode)) {
          case 2000:
            const warehouse2000 = productWarehouse.filter(
              (whr) =>
                (whr.warehouse_id == 10 && whr.current_stock > 0) ||
                (whr.warehouse_id == 5 && whr.current_stock > 0)
            );

            if (warehouse2000.length == 1) {
              const warehouseThreshold = warehouse2000.some(
                (whr) => whr.current_stock > item.publication.threshold
              );

              if (warehouseThreshold) {
                threshold =
                  warehouse2000[0].current_stock - item.publication.threshold;
              }
            } else {
              const userFindWarehouse2000 = warehouse2000.find(
                (whr) => whr.warehouse_id == 10
              );

              if (
                userFindWarehouse2000.current_stock > item.publication.threshold
              ) {
                threshold =
                  userFindWarehouse2000.current_stock -
                  item.publication.threshold;
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
                (whr) => whr.current_stock > item.publication.threshold
              );

              if (warehouseThreshold) {
                threshold =
                  warehouse5000[0].current_stock - item.publication.threshold;
              }
            } else {
              const userFindWarehouse = warehouse5000.find(
                (whr) => whr.warehouse_id == 3
              );

              if (
                userFindWarehouse.current_stock > item.publication.threshold
              ) {
                threshold =
                  userFindWarehouse.current_stock - item.publication.threshold;
              }
            }
            break;
          default:
            const warehouse = productWarehouse.filter(
              (whr) => whr.warehouse_id == 5 && whr.current_stock > 0
            );

            if (warehouse.length > 0) {
              const warehouseThreshold = warehouse.some(
                (whr) => whr.current_stock > item.publication.threshold
              );

              if (warehouseThreshold) {
                threshold =
                  warehouse[0].current_stock - item.publication.threshold;
              }
            }
            break;
        }
        return threshold;
      } else {
        return false;
      }
    },

    HandlerCloseDeleteProduct() {
      this.showAlertRemove = !this.showAlertRemove;
    },

    validateQuantity(item) {
      // console.log("cantidad", item.original_quantity);
      // const cart = this.productCartState;
      // if (item.original_quantity > 4) {
      //   this.$store.commit("cart/UPDATE_ITEM", {
      //     product: item,
      //     action: "minus",
      //   });

      //   const request = cart.shopping_cart_items.map((prod) => {
      //     return {
      //       publication_id: prod.publication_id,
      //       quantity: prod.original_quantity,
      //     };
      //   });

      //   console.log("request", request);
      // }
      return item.original_quantity;
    },
  },
};
</script>

<style>
</style>
