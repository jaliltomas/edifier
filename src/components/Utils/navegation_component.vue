<template>
  <v-card height="200" flat color="#E9E9E9" class="elevation-0 d-flex">
    <v-card-text class="align-self-center">
      <div class="d-md-flex">
        <h2 class="text-center text-md-start">{{ title }}</h2>
        <span
          class="d-flex justify-center d-md-nonde ml-md-auto body-1 mt-2 mt-md-0"
        >
          <span
            @click="$router.push({ name: 'home' })"
            style="cursor: pointer"
            class="font-weight-bold"
            >INICIO
          </span>
          / {{ sub_title }}
        </span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: "INICIAR SESION",
    },
    sub_title: {
      type: String,
      required: true,
      default: "INICIAR SESION",
    },
  },
};
</script>

<style>
</style>
