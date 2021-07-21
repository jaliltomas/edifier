<template>
  <v-container
    style="background-color: #e9e9e9"
    fill-height
    fluid
    class="mx-0 px-0"
  >
    <v-row justify="center" align="center">
      <ValidationObserver ref="obs" v-slot="{ passes }">
        <v-card v-if="!loading && showContent">
          <v-card-title>
            Ingresa tu nueva contraseña para ingresar a tu cuenta
          </v-card-title>
          <v-card-text>
            <ValidationProvider
              name="contraseña"
              rules="required|confirmed:confirmation"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="password"
                type="password"
                solo
                label="Contraseña"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              name="confirmar contraseña"
              rules="required"
              v-slot="{ errors }"
              vid="confirmation"
            >
              <v-text-field
                v-model="confirm_password"
                type="password"
                solo
                label="Confirmar contraseña"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="passes(HandlerChangePassword)" color="black" dark>
              Continuar
            </v-btn>
          </v-card-actions>
        </v-card>
      </ValidationObserver>

      <v-alert
        v-if="!showContent"
        outlined
        type="warning"
        prominent
        border="left"
      >
        {{ errorContent }}
      </v-alert>

      <v-progress-circular
        v-if="loading"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      confirm_password: "",
      loading: false,
      showContent: false,
      errorContent: "",
    };
  },

  created() {
    this.HandlerVerifyCode();
  },

  methods: {
    async HandlerVerifyCode() {
      try {
        const request = { code: this.$route.query.code };
        const response = await this.$store.dispatch(
          "auth/VERIFY_CODE",
          request
        );

        if (response.data.message == "Codigo habilitado") {
          this.showContent = true;
        }
      } catch (error) {
        console.log(error);
        if (error.response.status == 600) {
          this.showContent = false;
          this.errorContent = "No se encuentran registros o codigo ya usado";
        }
      }
    },

    async HandlerChangePassword() {
      try {
        const request = {
          password: this.password,
          code: this.$route.query.code,
        };
        await this.$store.dispatch("auth/CHANGE_PASSWORD_RECOVERY", request);

        this.$snotify.success("Tu contraseña ha sido cambiada", "Exitos!");
        setTimeout(() => {
          this.$router.push({ name: "login" });
        }, 2000);
      } catch (error) {
        console.log(error);
        this.$snotify.error(error.response.data.error.err_message, "Error!");
      }
    },
  },
};
</script>

<style>
</style>