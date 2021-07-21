<template>
  <v-snackbar top right v-model="active">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="pink" text v-bind="attrs" @click="close"> Cerrar </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
      required: true,
    },
    text: {
      type: String,
      default: "",
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit("dialog:change", false);
    },
  },
};
</script>

<style>
</style>