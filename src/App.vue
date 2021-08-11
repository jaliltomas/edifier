<template>
  <v-app>
    <v-overlay
      @keydown.esc.native="activeSearchFun"
      :value="activeSearch"
      :opacity="0.8"
    >
      <!-- @dblclick.native="activeSearchFun" -->
      <div class="d-flex" style="z-index: 100">
        <h1 class="mr-15">Buscar</h1>
        <v-icon @click="activeSearchFun" class="ml-15 pl-15 mt-1"
          >mdi-close</v-icon
        >
      </div>
      <v-text-field
        :autofocus="true"
        @keyup.enter="searchProduct"
        style="z-index: 100"
        label="..."
        filled
        outlined
        solo
        inverted
        v-model="product_name"
      >
      </v-text-field>
    </v-overlay>
    <v-main>
      <nav-component
        v-if="$route.name != 'login' && $route.name != 'recovery'"
      />
      <div
        v-if="$route.name != 'login' && $route.name != 'recovery'"
        style="padding-top: 51px"
      ></div>
      <router-view />
    </v-main>
    <footer-component
      v-if="$route.name != 'login' && $route.name != 'recovery'"
    />
    <vue-snotify></vue-snotify>
  </v-app>
</template>

<script>
import NavComponent from "./components/core/nav-component";
import FooterComponent from "./components/core/footer-component";
export default {
  components: {
    "nav-component": NavComponent,
    "footer-component": FooterComponent,
  },
  name: "App",
  data: () => ({
    product_name: "",
  }),
  computed: {
    activeSearch() {
      return this.$store.getters["activeSearchValue"];
    },
  },
  methods: {
    activeSearchFun() {
      this.$store.commit("activeSearch");
    },

    async searchProduct() {
      try {
        this.$router
          .push({
            name: "products",
            query: { product: this.product_name.toLowerCase() },
          })
          .catch((err) => err);
        this.product_name = "";
        this.activeSearchFun();
      } catch (error) {
        console.log(error);
      }
    },
  },
  // created() {
  //   if (sessionStorage.getItem("region") == null) {
  //     sessionStorage.setItem("region", 1);
  //   }
  // },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap");
@import "./assets/styles/index.scss";
// @import "~vue-wysiwyg/dist/vueWysiwyg.css";

#app {
  font-family: "Lato", sans-serif !important;
  word-break: normal !important;
  line-height: normal !important;
}
</style>

