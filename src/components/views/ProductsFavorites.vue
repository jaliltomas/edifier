<template>
  <div style="background-color: #f5f5f5; height: 100%">
    <div class="py-12"></div>
    <v-container>
      <v-row v-if="product.length > 0">
        <v-col
          v-for="(item, index) in product[0].product_favorite"
          :key="index"
          cols="12"
          sm="4"
          md="3"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              tile
              v-show="item.publication.product != null"
              class="elevation-0"
              flat
              @click="HandlerShowProduct(item)"
            >
              <v-card class="elevation-0">
                <img
                  v-if="item.publication.images == null"
                  height="150"
                  width="100%"
                  contain
                  src="../../assets/img/no_image.jpg"
                  :style="hover ? 'cursor: pointer; opacity: 0.8;' : ''"
                />
                <div v-else>
                  <v-img
                    style="width: 100%; height: auto"
                    :src="item.publication.images[0]"
                    :lazy-src="item.publication.images[0]"
                    :style="hover ? 'cursor: pointer; opacity: 0.8;' : ''"
                  >
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="black"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </div>
                <v-card-text>
                  <p
                    class="mb-0 text-title text-capitalize mb-4"
                    style="font-size: 20px"
                  >{{ item.publication.product.name }}</p>
                  <p
                    style="font-size: 20px"
                    class="text-start mb-0 text-uppercase font-weight-light"
                    v-if="item.publication.price != null"
                  >
                    <span>${{ item.publication.price.pvp | currency }}</span>
                  </p>
                </v-card-text>
              </v-card>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
      <div class="py-12"></div>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    product() {
      return this.$store.getters["products/GET_PRODUCT_FAVORITES"];
    },
  },
  mounted() {
    window.fbq("trackCustom", "ProducstsFavoritesView");
  },
  methods: {
    HandlerShowImage(pictures) {
      const images = JSON.parse(pictures);
      return images[0];
    },
    HandlerShowProduct(publication) {
      console.log(publication);
      const encryptedID = this.CryptoJS.AES.encrypt(
        publication.publication.product_id.toString(),
        "MyS3c3rtIdPr0Duct"
      ).toString();
      this.$router.push({
        name: "product_details",
        query: { data: encryptedID },
      });
    },
  },
};
</script>

<style>
</style>