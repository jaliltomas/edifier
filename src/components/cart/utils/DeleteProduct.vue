<template>
  <v-card>
    <v-app-bar dark>
      {{ selectProduct.publication.product.name.toUpperCase() }}
    </v-app-bar>
    <v-card-text>
      <v-alert
        class="mt-5 d-flex"
        outlined
        type="warning"
        prominent
        border="left"
      >
        <div class="d-flex justify-center">
          Estas seguro que deseas eliminar este producto !
        </div>
      </v-alert>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text class="text-capitalize" @click="close">Cancelar</v-btn>
      <v-btn
        text
        color="blue"
        class="text-capitalize"
        @click="HandlerRemoveProduct(selectProduct)"
      >
        Continuar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    selectProduct: {
      type: Object,
      required: true,
      default: () => {},
    },
  },

  data() {
    return {
      imageBack: require("../../../assets/img/carrousel/sad_delete.svg"),
    };
  },

  computed: {
    productCartState() {
      return this.$store.getters["cart/CART_PRODUCTS"];
    },
  },

  methods: {
    close() {
      this.$emit("dialog:change", false);
    },

    async HandlerRemoveProduct(item) {
      try {
        const indexDelete = this.productCartState.shopping_cart_items.findIndex(
          (index) => item.publication_id == index.publication_id
        );

        const products = [...this.productCartState.shopping_cart_items];
        products.splice(indexDelete, 1);

        const request = products.map((prod) => {
          return {
            publication_id: prod.publication_id,
            quantity: prod.original_quantity,
          };
        });

        await this.$store.dispatch("cart/CREATE_CART", {
          items: request,
        });

        this.$store.commit("cart/REMOVE_ITEM", item);
        this.$store.commit("cart/TOTAL_AMOUNT", {
          items: [...this.productCartState.shopping_cart_items],
        });
        this.showAlertRemove = !this.showAlertRemove;
        this.$snotify.success("Has eliminado el producto", "Vaya!");
        this.close();
      } catch (error) {
        console.log(error);
        this.$snotify.error("Al eliminar producto", "Error!");
      }
    },
  },
};
</script>

<style>
</style>