<template>
  <div class="my-4 text-17 pb-0 mb-0" v-if="price != null">
    <span v-if="price.discount === 0">
      <span
        :style="
          price.paymentType == 'con Débito / Crédito 1 Cuota'
            ? 'color: #5d7286'
            : 'color: #01d879'
        "
        class="weight-medium mr-3 text-20"
      >
        $ {{ price.value_no_discount | currencyPVP }}
      </span>
      <span>{{ price.paymentType }}</span>
    </span>
    <span v-else class="pb-0 mb-0">
      <v-row>
        <v-col class="pb-0 mb-0">
          <span
            class="weight-medium text-12 text-decoration-line-through text--secondary"
          >
            $ {{ price.value_no_discount | currencyPVP }}
          </span>
          <span class="ml-3">{{ price.paymentType }}</span>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col>
          <span
            :style="
              price.paymentType == 'con Débito / Crédito 1 Cuota'
                ? 'color: #5d7286'
                : 'color: #01d879'
            "
            class="weight-medium text-20"
          >
            $ {{ price.value | currencyPVP }}
          </span>
          <span class="green--text text--darken-2 ml-3">
            {{ price.discount }}% de descuento
          </span>
        </v-col>
      </v-row>
    </span>
    <span style="color: #6a6a6a"
      >Precio s/ imp. nac. ${{
        getPriceWithoutIva(
          price.discount ? price.value : price.value_no_discount,
          price.iva
        ) | currencyPVP
      }}</span
    >
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
    isAuth: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    getPriceWithoutIva(precioConIVA, tasaIVA = 21) {
      // Por ejemplo, 21 se convierte en 0.21
      const ivaDecimal = tasaIVA / 100;

      // Calculamos el divisor: 1 (precio base) + el IVA en decimal
      const divisor = 1 + ivaDecimal;

      // Realizamos la división para obtener el precio sin IVA
      const precioSinIVA = precioConIVA / divisor;

      // Devolvemos el resultado redondeado a dos decimales
      return precioSinIVA;
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
.text-15 {
  font-size: 1.3em;
}

.card-payment {
  color: #5d7286;
}

.transfer-payment {
  color: #01d879;
}
</style>
