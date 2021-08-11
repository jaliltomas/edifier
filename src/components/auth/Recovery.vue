<template>
  <v-container
    style="background-color: #ebf1f7"
    fill-height
    fluid
    class="mx-0 px-0"
  >
    <v-row justify="center" align="center">
      <ValidationObserver ref="obs" v-slot="{ passes }">
        <v-img
          @click="$router.push('/')"
          style="cursor: pointer"
          class="mx-auto mt-10"
          contain
          width="250"
          src="@/assets/img/edifier-logo-color.svg"
        ></v-img>
        <v-card v-if="!loading" class="mt-5">
          <v-card-title>
            Ingresa tu nueva contraseña para ingresar a tu cuenta
          </v-card-title>
          <v-col cols="12" md="12">
            <label for="email">Contraseña</label>
            <ValidationProvider
              name="contraseña"
              rules="required|confirmed:confirmation"
              v-slot="{ errors }"
            >
              <v-text-field
                type="password"
                v-model="password"
                class="mt-2"
                color="#00A0E9"
                dense
                outlined
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="12" class="mt-n5">
            <label for="confirm">Confirmar Contraseña</label>
            <ValidationProvider
              name="confirmar contraseña"
              rules="required"
              v-slot="{ errors }"
              vid="confirmation"
            >
              <v-text-field
                @keyup.enter="passes(HandlerChangePassword)"
                type="password"
                v-model="confirm_password"
                class="mt-2"
                color="#00A0E9"
                dense
                outlined
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="12">
            <v-btn
              :loading="loading"
              @click="passes(HandlerChangePassword)"
              rounded
              elevation="0"
              large
              block
              dark
              color="#00A0E9"
              class="text-capitalize"
            >
              Continuar
            </v-btn>
          </v-col>
        </v-card>
      </ValidationObserver>
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

  methods: {
    async HandlerVerifyCode() {
      try {
        const request = { code: this.$route.query.code };
        const response = await this.$store.dispatch(
          "auth/VERIFY_CODE",
          request
        );

        console.log("respuesta****", response);

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