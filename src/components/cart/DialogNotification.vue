<template>
  <v-dialog persistent max-width="750" v-model="active">
    <slot></slot>
  </v-dialog>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
};
</script>

<style>
</style>