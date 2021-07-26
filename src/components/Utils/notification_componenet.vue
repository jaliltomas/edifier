<template>
  <v-snackbar :timeout="timeout" :color="color" top right v-model="active">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="close"> Cerrar </v-btn>
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
    color: {
      type: String,
      default: "black",
      required: true,
    },
  },

  data() {
    return {
      timeout: -1,
    };
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