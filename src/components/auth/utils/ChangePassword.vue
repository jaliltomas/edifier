<template>
  <ValidationObserver ref="obs" v-slot="{ passes }">
    <v-card color="#E9E9E9" tile class="elevation-0 py-5 d-flex justify-center">
      <v-card-text>
        <v-row class="mx-1" justify="center">
          <v-col cols="12" md="6" class="mt-md-0">
            <v-row justify="center">
              <v-col cols="12" sm="12" md="12">
                <label for="email">Contraseña actual</label>
                <ValidationProvider
                  name="contraseña actual"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    type="password"
                    v-model="password_old"
                    class="mt-2 elevation-0"
                    color="black"
                    dense
                    solo
                    flat
                    placeholder="Contraseña actual"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
                <label for="email">Nueva contraseña</label>
                <ValidationProvider
                  name="contraseña nueva"
                  rules="required|confirmed:confirmation"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    type="password"
                    v-model="password"
                    class="mt-2 elevation-0"
                    color="black"
                    dense
                    solo
                    flat
                    placeholder="Contraseña actual"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
                <label for="email" class="text-uppercase">
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
                    color="black"
                    dense
                    solo
                    flat
                    placeholder="Contraseña actual"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions> </v-card-actions>
    </v-card>
    <div class="d-flex justify-center mt-5">
      <v-btn
        :loading="loading"
        @click="passes(HandlerChangePassword)"
        tile
        elevation="0"
        large
        dark
        color="black"
        class="text-capitalize"
      >
        Actualizar
      </v-btn>
    </div>
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