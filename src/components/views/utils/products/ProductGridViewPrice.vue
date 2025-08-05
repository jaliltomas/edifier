<template>
  <div>
    <p
      class="text-center"
      v-if="price != null && inStock() && validateUmbral()"
    >
      <span v-if="price.discount === 0" class="product-price">
        {{ price.paymentType }}: ${{ price.value_no_discount | currencyPVP }}
      </span>
      <span v-else class="product-price">
        <v-row>
          <v-col align-self="end" class="pb-0 products__price-info">
            {{ price.paymentType }}:
            <span class="pb-0 text-decoration-line-through text--secondary">
              ${{ price.value_no_discount | currencyPVP }}
            </span>
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <v-col class="products__price-info">
            <span class="green--text text--darken-2 ml-3">
              {{ price.discount }}% OFF
            </span>
            <span>$ {{ price.value | currencyPVP }}</span>
          </v-col>
        </v-row>
      </span>
      <span style="color: #6a6a6a"
        >Precio sin impuestos: ${{
          getPriceWithoutIva(
            price.discount ? price.value : price.value_no_discount,
            price.iva
          ) | currencyPVP
        }}</span
      >
    </p>
    <div style="display:flex; justify-content:center; margin-top:4px;" v-else>
      <p
        class="non-stock text-center"
        v-if="price.paymentType != 'Transferencia'"
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
import { isValidUmbral } from "@/utils/validateUmbral.js";
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
    },

    validateUmbral() {
      const dataProductValue = { ...this.dataProduct };
      const paylod = { dataProduct: dataProductValue };
      return isValidUmbral(paylod) > 0 ? true : false;
    },

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

  data() {
    return {};
  }
};
</script>

<style></style>
