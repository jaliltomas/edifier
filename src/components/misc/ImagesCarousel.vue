<template>
  <Carousel
    id="img-carousel"
    :perPage="1"
    :autoplay="true"
    :autoplayTimeout="10000"
  >
    <Slide v-for="(pic, index) in JSON.parse(product.pictures)" :key="index">
      <img
        class="img-main"
        :src="pic"
        :title="product.model"
        :alt="product.model"
      />
    </Slide>
  </Carousel>
</template>

<script>
import Vue from "vue";
import { Carousel, Slide } from "vue-carousel";

export default Vue.extend({
  name: "ImagesCarousel",
  components: {
    Carousel,
    Slide,
  },

  props: {
    product: {
      type: Object,
      required: true,
      default: () => {},
    },
  },

  data() {
    return {
      // product: this.$attrs.product
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/vars.scss";

#img-carousel {
  display: flex;
  flex-direction: column;
}

.img-main {
  width: $imageWidth;
  height: $imageHeight;
  object-fit: contain;
}
</style>
