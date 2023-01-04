<template>
  <div v-if="price != null" class="my-auto black--text featured-product-price">
    <span v-if="price.discount === 0">$ {{ price.value | currency }}</span>
    <span v-else>
      <v-row>
        <v-col
          align-self="end"
          class="pb-0 previous-price text-decoration-line-through text--secondary"
        >
          $ {{ price.value_no_discount | currencyPVP }}
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col>
          <span>$ {{ price.value | currencyPVP }}</span>
          <span class="green--text text--darken-2 ml-3">
            {{ price.discount }}% OFF
          </span>
        </v-col>
      </v-row>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    price: {
      type: Object,
      required: true,
      default: () => {}
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

  data() {
    return {};
  }
};
</script>

<style>
.previous-price {
  font-size: 0.8em;
}
</style>
