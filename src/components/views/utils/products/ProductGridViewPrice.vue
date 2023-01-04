<template>
  <p class="text-center" v-if="price != null">
    <span v-if="price.discount === 0" class="product-price">
      {{ price.paymentType }}: ${{ price.value | currencyPVP }}
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

<style></style>
