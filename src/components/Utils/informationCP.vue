<template>
  <div v-if="isAuth" class="mb-5">
    <div v-if="authUser.zipcode == '2000' || authUser.zipcode == '5000'">
      <p
        class="mb-0 text-uppercase"
        style="font-color: #3f3c35; font-size: 1.2em"
        v-if="dataProduct.product.product_warehouse.length > 0"
      >
        <v-icon color="#3F3C35" class="mr-1">mdi-truck-outline</v-icon>
        {{
          HandlerReturnWarehouse(
            authUser.zipcode,
            dataProduct.product.product_warehouse
          )
        }}
      </p>
    </div>
    <div v-else>
      <p
        class="mb-0 text-uppercase"
        style="font-color: #3f3c35; font-size: 1.2em"
        v-if="dataProduct.product.product_warehouse.length > 0"
      >
        <v-icon color="#3F3C35" class="mr-1">mdi-truck-outline</v-icon>
        {{
          HandlerReturnWarehouse(
            authUser.zipcode,
            dataProduct.product.product_warehouse
          )
        }}
      </p>
    </div>
  </div>
  <div v-else class="mb-5">
    <p
      class="mb-0 text-uppercase"
      style="cursor: pointer; font-color: #3f3c35"
      @click="$router.push({ name: 'login' })"
    >
      <v-icon color="#3F3C35" class="mr-1">mdi-truck-outline</v-icon>
      Conocé el tiempo de entrega
    </p>
  </div>
</template>

<script>
export default {
  props: {
    dataProduct: {
      type: Object,
      required: true,
      default: () => {},
    },
    authUser: {
      type: Object,
      required: true,
      default: () => {},
    },
  },

  computed: {
    isAuth() {
      return this.$store.getters["auth/AUTHENTICATED"];
    },
  },

  methods: {
    HandlerReturnWarehouse(cp, warehouse) {
      switch (parseInt(cp)) {
        case 2000:
          return this.getDeposit(warehouse, 10, 5);
        case 5000:
          return this.getDeposit(warehouse, 3, 5);
        default:
          return this.getDepostCentral(warehouse, cp, 5);
      }
    },

    getDepostCentral(warehouse, cp, cenId) {
      const getWarehouseFwl01 = warehouse.find(
        (value) => value.warehouse_id == cenId
      );

      if (getWarehouseFwl01 != undefined) {
        if (cp >= 1000 || cp < 1441) {
          return "Recibilo sin cargo en 24hrs";
        } else if (this.responseChazki) {
          return "Recibilo sin cargo en 72hrs";
        } else {
          return "Recibilo sin cargo en 4-6hrs";
        }
      }
    },

    getDeposit(warehouse, regId, cenId) {
      const getWarehouseReg = warehouse.find(
        (value) => value.warehouse_id == regId
      );

      const getWarehouseFwl01 = warehouse.find(
        (value) => value.warehouse_id == cenId
      );

      if (getWarehouseReg != undefined && getWarehouseFwl01 != undefined) {
        if (
          getWarehouseReg.current_stock > 0 &&
          getWarehouseFwl01.current_stock > 0
        ) {
          return "Entrega o Retira en el día";
        } else if (
          getWarehouseReg.current_stock == 0 &&
          getWarehouseFwl01.current_stock > 0
        ) {
          return "Recibilo sin cargo en 72Hrs";
        } else if (
          getWarehouseReg.current_stock > 0 &&
          getWarehouseFwl01.current_stock == 0
        ) {
          return "Entrega o Retira en el día";
        } else if (
          getWarehouseReg.current_stock == 0 &&
          getWarehouseFwl01.current_stock == 0
        ) {
          return "Proximamente";
        }
      } else if (
        getWarehouseReg == undefined &&
        getWarehouseFwl01 != undefined
      ) {
        if (getWarehouseFwl01.current_stock > 0) {
          return "Recibilo sin cargo en 72Hrs";
        } else if (getWarehouseFwl01.current_stock == 0) {
          return "Proximamente";
        }
      } else if (
        getWarehouseReg != undefined &&
        getWarehouseFwl01 == undefined
      ) {
        if (getWarehouseReg.current_stock > 0) {
          return "Entrega o Retira en el día";
        } else if (getWarehouseReg.current_stock == 0) {
          return "Proximamente";
        }
      }
    },
  },
};
</script>

<style>
</style>
