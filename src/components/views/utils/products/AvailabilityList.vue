<template>
  <div class="availableBox">
    <div>
      <div class="rowText">
        <div class="availableText">Envío a domicilio:</div>
        <div class="availableText">{{ inStock() }}</div>
      </div>
      <div class="rowText">
        <div class="availableText">Retiro en CABA:</div>
        <div class="availableText">{{ inCaba() }}</div>
      </div>
      <div class="rowText">
        <div class="availableText">Retiro en Rosario:</div>
        <div class="availableText">{{ inRosario() }}</div>
      </div>
      <div class="rowText">
        <div class="availableText">Retiro en Córdoba:</div>
        <div class="availableText">{{ inCordoba() }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { isValidUmbral } from "@/utils/validateUmbral.js";
export default {
  props: {
    dataProduct: {
      type: Object,
      required: false,
      default: () => {}
    }
  },

  data() {
    return {
      warehouseValue: 0
    };
  },

  methods: {
    inStock() {
      const available = this.dataProduct.product.product_warehouse.some(
        ele => ele.current_stock !== 0
      );
      if (available && this.validateUmbral()) {
        return "Disponible";
      } else {
        return "No Disponible";
      }
    },
    inCaba() {
      const stock = this.dataProduct.product.product_warehouse.filter(
        ele => ele.warehouse_id === 5
      )[0].current_stock;
      if (stock > 0 && this.validateUmbral()) {
        return "Disponible";
      } else {
        return "No Disponible";
      }
    },
    inRosario() {
      const stock = this.dataProduct.product.product_warehouse.filter(
        ele => ele.warehouse_id === 10
      )[0].current_stock;
      if (stock > 0 && this.validateUmbral()) {
        return "Disponible";
      } else {
        return "No Disponible";
      }
    },
    inCordoba() {
      const stock = this.dataProduct.product.product_warehouse.filter(
        ele => ele.warehouse_id === 3
      )[0].current_stock;
      if (stock > 0 && this.validateUmbral()) {
        return "Disponible";
      } else {
        return "No Disponible";
      }
    },
    validateUmbral() {
      const dataProductValue = { ...this.dataProduct };
      const paylod = { dataProduct: dataProductValue };

      return isValidUmbral(paylod) > 0 ? true : false;
    }
  }
};
</script>

<style>
.rowText {
  display: flex;
  flex-direction: row;
}
.availableText {
  font-weight: 500;
  font-size: 12px;
  margin-left: 4px;
}
.availableBox {
  margin-top: -8px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
