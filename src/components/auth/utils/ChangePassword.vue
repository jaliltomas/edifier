<template>
  <ValidationObserver ref="obs" v-slot="{ passes }">
    <v-card color="white" tile class="elevation-0 py-5 d-flex justify-center">
      <v-card-text>
        <v-row class="mx-5 my-5" justify="center">
          <v-col cols="12" sm="12" md="12">
            <label
              for="password_current"
              class="text-uppercase font-weight-bold"
            >
              Contraseña actual
            </label>
            <ValidationProvider
              name="contraseña actual"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                type="password"
                v-model="password_old"
                class="mt-2 elevation-0"
                color="#00A0E9"
                dense
                filled
                flat
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
            <label for="new_password" class="text-uppercase font-weight-bold">
              Nueva contraseña
            </label>
            <ValidationProvider
              name="contraseña nueva"
              rules="required|confirmed:confirmation"
              v-slot="{ errors }"
            >
              <v-text-field
                type="password"
                v-model="password"
                class="mt-2 elevation-0"
                color="#00A0E9"
                dense
                filled
                flat
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
            <label for="email" class="text-uppercase font-weight-bold">
              Confirmar contraseña
            </label>
            <ValidationProvider
              name="confirmar contraseña"
              rules="required"
              v-slot="{ errors }"
              vid="confirmation"
            >
              <v-text-field
                type="password"
                v-model="confirm_password"
                class="mt-2 elevation-0"
                color="#00A0E9"
                dense
                filled
                flat
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
        <div class="d-flex justify-center mt-5">
          <v-btn
            :loading="loading"
            @click="passes(HandlerChangePassword)"
            elevation="0"
            rounded
            dark
            color="#00A0E9"
            width="250"
            class="text-capitalize"
          >
            Actualizar
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </ValidationObserver>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      password_old: "",
      password: "",
      confirm_password: "",
    };
  },
  computed: {
    getAuthUser() {
      return this.$store.getters["auth/GET_PROFILE"];
    },
  },

  methods: {
    async HandlerChangePassword() {
      try {
        const request = {
          password_old: this.password_old,
          password: this.password,
        };
        await this.$store.dispatch("auth/CHANGE_PASSWORD", request);
        this.$snotify.success("Contrseña cambiada", "Exitos!");
        this.clearFill();
      } catch (error) {
        this.$snotify.error(error.response.data.error.err_message, "Error!");
        console.log(error.response);
      }
    },

    clearFill() {
      this.password_old = "";
      this.password = "";
      this.confirm_password = "";
      this.$refs.obs.reset();
    },
  },
};
</script>

<style>
</style>