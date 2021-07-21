<template>
  <div>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <h1
          class="text-title text-capitalize"
          style="color: #424242"
        >
          Historial de Compra
        </h1>
      </v-col>
      <v-col cols="12" md="12">
        <div class="font-weight-bold" style="font-size: 20px; color: #424242">Detalles</div>
        <v-divider></v-divider>
        <div><span class="font-weight-bold">Factura: #</span>{{ orderData.meli_id }}</div>
        <div><span class="font-weight-bold">Comprado el:</span> {{ orderData.date_created }}</div>

        <div class="font-weight-bold mt-5" style="font-size: 20px; color: #424242">Direccion Facturacion</div>
        <v-divider></v-divider>
        <div v-if="orderData.buyer =! null"><span class="font-weight-bold">Nombre:</span> {{ orderData.buyer.first_name }} {{ orderData.buyer.last_name }}</div>
        <div v-if="orderData.shipping =! null"><span class="font-weight-bold">Direccion de envio:</span> {{ orderData.shipping.address_receive }}</div>

        <div class="font-weight-bold mt-5" style="font-size: 20px; color: #424242">Productos Comprados</div>

        <v-data-table
          :headers="headers"
          :items="orderData.order_item"
          :items-per-page="5"
          class="elevation-0 mt-2"
        >
        <template v-slot:[`item.product`]="{ item }">
          <div class="d-flex align-center">
          <v-avatar tile v-if="item.publication.images.length > 0">
            <v-img 
              :src="item.publication.images[0]" 
              :lazy-src="item.publication.images[0]"
              contain
            >
            </v-img>
          </v-avatar>
          <div class="text-uppercase">{{ item.publication.keywords }}</div>
            
          </div>
          <!-- <div>{{ item.publication.resume }}</div> -->
        </template>

        <template v-slot:[`item.brand`]="{ item }">
          <span v-if="item.product != null" class="text-uppercase">{{ item.product.brand.name }}</span>
        </template>

        <template v-slot:[`item.unit_price`]="{ item }">
          <span class="text-uppercase">{{ item.unit_price | currency }}</span>
        </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    dataOrder: {
      type: Object,
      required: true,
      default: () => {},
    },
  },

  data() {
    return {
      //Data
      orderData: {},
      headers: [
        {
          text: "Producto",
          align: "start",
          sortable: false,
          value: "product",
        },
        { text: "Marca", value: "brand" },
        { text: "Cantidad", value: "quantity" },
        { text: "Precio", value: "unit_price" },
      ],
    };
  },

  created() {
    this.HandlerGetData();
  },

  methods: {
    async HandlerGetData() {
      try {
        const request = {
          id: this.dataOrder.id,
        };
        const response = await this.$store.dispatch(
          "products/ODERS_DETAILS",
          request
        );
        this.orderData = { ...response.data.data };
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>