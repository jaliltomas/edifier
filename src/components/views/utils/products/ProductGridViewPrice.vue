<template>
  <div>
    <p class="text-center" v-if="price != null && inStock()">
      <span v-if="price.discount === 0" class="product-price">
        {{ price.paymentType }}: ${{ price.value_no_discount | currencyPVP }}
      </span>
      <span v-else class="product-price">
        <v-row>
          <v-col align-self="end" class="pb-0">
            {{ price.paymentType }}:
            <span class="pb-0 text-decoration-line-through text--secondary">
              ${{ price.value_no_discount | currencyPVP }}
            </span>
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <v-col>
            <span class="green--text text--darken-2 ml-3">
              {{ price.discount }}% OFF
            </span>
            <span>$ {{ price.value | currencyPVP }}</span>
          </v-col>
        </v-row>
      </span>
    </p>
    <div style="display:flex; justify-content:center; margin-top:4px;">
      <p
        class="non-stock text-center"
        v-if="inStock() != true && price.paymentType != 'Transferencia'"
      >
        <strong
          >Sin stock, <br />
          Ingresa pronto</strong
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    price: {
      type: Object,
      required: true,
      default: () => {}
    },
    dataProduct: {
      type: Object,
      required: false,
      default: () => {}
    },
    isAuth: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  filters: {
    currencyPVP(value) {
      if (value) {
        const AMOUNT_FORMAT = new Intl.NumberFormat("de-DE", {
          // currency: "ARS",
          // style: "currency",
          maximumFractionDigits: 0,
          minimumFractionDigits: 0
        }).format(value);
        return AMOUNT_FORMAT;
      } else {
        return " ";
      }
    }
  },
  methods: {
    inStock() {
      return this.dataProduct.product.product_warehouse.some(
        ele => ele.current_stock !== 0
      );
    }
  },

  data() {
    return {};
  }
  
};
</script>

<style></style>
