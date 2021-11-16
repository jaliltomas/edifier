<template>
  <v-card color="transparent" tile class="elevation-0 py-5 d-flex justify-center">
    <v-row justify="center">
      <v-col cols="12" sm="12" md="12">
        {{ dataResponse }}
        <v-data-table
          v-if="!showDetailsOrder"
          tile
          :headers="headers"
          :items="dataResponse"
          :items-per-page="5"
          class="elevation-0"
          hide-default-footer
          disable-pagination
          width="100%"
        >
          <template v-slot:[`item.date_created`]="{ item }">
            {{ item.date_created | date }}
          </template>
          <template v-slot:[`item.order_item`]="{ item }">
            {{ item.order_item.length }}
          </template>
          <template v-slot:[`item.total_amount`]="{ item }">
            <span v-if="item.total_amount > 0">{{ item.total_amount | currencyTotal }}</span>
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="HandlerMoreData(item)"
                  icon
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </template>
              <span>Ver mas</span>
            </v-tooltip>
          </template>
        </v-data-table>
        <div v-if="showDetailsOrder">
          <details-component :dataOrder="dataOrder" />
          <v-btn
            dark
            small
            rounded
            color="#00A0E9"
            class="mt-2"
            @click="showDetailsOrder = !showDetailsOrder"
          >
            <v-icon size="15" class="mr-2">mdi-arrow-left</v-icon>
            <span class="mr-3">CONTINUAR COMPRANDO</span>
          </v-btn>
        </div>
      </v-col>
      <v-col cols="6" md="4">
        <v-pagination
          v-model="page"
          :length="paginate.lastPage"
          circle
          color="#00A0E9"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import moment from "moment";
import UserDetailsOrder from "../utils/UserDetailsOrder.vue";
export default {
  components: {
    "details-component": UserDetailsOrder,
  },
  data() {
    return {
      // Request
      page: 1,
      per_page: 12,
      date_from: "",
      date_to: "",
      // Response
      dataResponse: [],
      // Table
      headers: [
        {
          text: "Fecha",
          align: "start",
          sortable: false,
          value: "date_created",
          class: "header-text",
        },
        { text: "#ID", value: "meli_id", class: "header-text" },
        { text: "Productos", value: "order_item", class: "header-text" },
        { text: "Estado", value: "order_status", class: "header-text" },
        { text: "Total", value: "total_amount", class: "header-text" },
        { text: "Acción", value: "action", class: "header-text" },
      ],
      dataTable: [],

      //Details Orders
      showDetailsOrder: false,
      dataOrder: {},
      paginate: {},
    };
  },
  created() {
    this.HandlerGetOrders();
  },
  filters: {
    date(val) {
      return moment(val).locale("es").format("DD-MM-YYYY HH:mm");
    },
    currencyTotal(value) {
      return new Intl.NumberFormat("es-AR", {
        currency: "ARS",
        style: "currency",
      }).format(value);
    },
  },
  watch: {
    page(val) {
      this.HandlerGetOrders(val);
    },
  },
  methods: {
    async HandlerGetOrders() {
      try {
        const request = {
          page: this.page,
          per_page: this.per_page,
          date_from: this.date_from,
          date_to: this.date_to,
        };
        const response = await this.$store.dispatch(
          "products/GET_ORDERS_USER",
          request
        );
        this.dataResponse = response.data.data.data;
        this.paginate = {
          lastPage: response.data.data.lastPage,
          page: response.data.data.page,
          perPage: response.data.data.perPage,
          total: response.data.data.total,
        };
      } catch (error) {
        console.log(error);
      }
    },
    HandlerMoreData(item) {
      console.log(item);
      this.dataOrder = { ...item };
      this.showDetailsOrder = true;
      // const orderDetails = JSON.stringify(item);
      // this.$router.push({ name: "order_details", query: orderDetails });
      // console.log(item);
    },
  },
};
</script>

<style>
.header-text {
  font-size: 14px !important;
  color: #00a0e9 !important;
  font-weight: bold;
}
</style>