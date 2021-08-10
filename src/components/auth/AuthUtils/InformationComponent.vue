<template>
  <v-col
    cols="12"
    md="5"
    v-if="!$vuetify.breakpoint.smAndDown"
    class="py-0 px-0"
  >
    <div
      style="width: 100%; height: 100vh; background-color: #ebf1f7"
      :class="!logo ? '' : 'd-flex flex-column'"
    >
      <div>
        <div class="py-15"></div>
        <v-img
          v-if="logo"
          @click="$router.push('/')"
          style="cursor: pointer"
          class="mx-auto"
          contain
          width="250"
          src="@/assets/img/edifier-logo-color.svg"
          lazy-src="@/assets/img/edifier-logo-color.svg"
        ></v-img>
      </div>
      <div class="mt-auto">
        <v-img
          class="mx-auto pt-15"
          contain
          width="250"
          src="@/assets/img/destacado/Destacado002.jpeg"
          lazy-src="@/assets/img/destacado/Destacado002.jpeg"
        ></v-img>
        <div class="mx-15 text-center">
          {{ message }}
        </div>
        <div class="py-15"></div>
      </div>
    </div>
  </v-col>
</template>

<script>
export default {
  props: {
    message: {
      required: true,
      default: "",
      type: String,
    },
    logo: {
      required: true,
      default: true,
      type: Boolean,
    },
  },
};
</script>

<style>
</style>