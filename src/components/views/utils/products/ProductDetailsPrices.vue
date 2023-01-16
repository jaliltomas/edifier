<template>
  <div class="mt-5">
    <div
      v-if="prices != null"
      style="border-left: 3px solid #00a0e9; padding-left: 8px"
    >
      <div v-if="getPvpInfo(prices).value >= getPvpTransferInfo(prices).value">
        <price-display
          v-if="isAuth"
          :price="getPvpTransferInfo(prices)"
          :isAuth="isAuth"
        />
        <price-display :price="getPvpInfo(prices)" :isAuth="isAuth" />
      </div>
      <div v-else>
        <price-display :price="getPvpInfo(prices)" :isAuth="isAuth" />
        <price-display
          v-if="isAuth"
          :price="getPvpTransferInfo(prices)"
          :isAuth="isAuth"
        />
      </div>
      <div class="mt-5 text-17" v-if="isAuth">
        <span class="weight-medium text-20">
          $
          {{ prices.pvp_18_installments | currencyPVP }}
        </span>
        hasta 18 cuotas de $
        {{ (prices.pvp_18_installments / 18) | currencyPVP }}
      </div>

      
    </div>
    <br />
    <div class="mt-4">
      <em> Podrás seleccionar la forma de pago en el Checkout </em>
    </div>
  </div>
</template>

<script>
import ProductDetailsSinglePrice from "./ProductDetailsSinglePrice.vue";

export default {
  props: {
    prices: {
      type: Object,
      required: true,
      default: () => {}
    },
    isAuth: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  components: {
    "price-display": ProductDetailsSinglePrice
  },

  methods: {
    getPvpInfo(prices) {
      return {
        paymentType: "con Débito / Crédito",
        value: prices.pvp,
        discount: Math.round(prices.discount),
        value_no_discount: prices.pvp_no_discount
      };
    },

    getPvpTransferInfo(prices) {
      return {
        paymentType: "por Transferencia Bancaria",
        value: prices.pvp_transfer,
        discount: Math.round(prices.transfer_discount),
        value_no_discount: prices.pvp_transfer_no_discount
      };
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
