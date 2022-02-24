<template>
  <v-card width="600" height="auto">
    <v-img
      style="width: 100%; height: auto"
      :src="imageBackground"
      :lazy-src="imageBackground"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
  </v-card>
</template>

<script>
export default {
  props: {
    imageBackground: {
      type: String,
      default: "",
      requeried: true,
    },
  },
};
</script>

<style>
</style>